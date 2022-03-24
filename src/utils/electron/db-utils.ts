import { PrismaClient } from '@prisma/client';
import type { PositionMark, Product, RekordboxXmlJson, Tempo, Xml } from '../shared/xml-interfaces';

type PrismaSingleton = {
    (): PrismaClient;
    client?: PrismaClient;
}

// Use this function to ensure only 1 Prisma client will be created
export const getPrismaClient: PrismaSingleton = Object.assign(
    () => {
        if (getPrismaClient.client === undefined) {
            getPrismaClient.client = new PrismaClient();
        }
        return getPrismaClient.client!;
    },
    { client: undefined }
)

export async function addRekordboxXmlToDb(rekordboxXml: RekordboxXmlJson) {
    const client = getPrismaClient();

    const root = await client.rekordboxXMLData.create({
        data: {
            xml: JSON.stringify(rekordboxXml['?xml'])
        }
    });

    const djPlaylist = await client.dJPlaylist.create({
        data: {
            rekordboxXMLDataId: root.id,
            PRODUCT: JSON.stringify(rekordboxXml.DJ_PLAYLISTS.PRODUCT),
            Version: JSON.stringify(rekordboxXml.DJ_PLAYLISTS.Version),
        }
    })

    const collection = await client.collection.create({
        data: {
            djPlaylistId: djPlaylist.id
        }
    })

    // Create Track models for each track in the xml
    for (let track of rekordboxXml.DJ_PLAYLISTS.COLLECTION.TRACK) {
        const tempo = JSON.stringify(track.TEMPO);
        const positionMarks = JSON.stringify(track.POSITION_MARK);

        delete track.POSITION_MARK;
        delete track.TEMPO;

        await client.track.create({
            data: {
                collectionId: collection.id,
                ...track,
                TEMPO: tempo ?? "[]",
                POSITION_MARK: positionMarks ?? "[]"
            }
        })
    }
}

export async function loadJsonFromDb(): Promise<RekordboxXmlJson> {
    const client = getPrismaClient();

    const root = await client.rekordboxXMLData.findFirst({
        orderBy: {
            id: "desc"
        }
    });

    const djPlaylist = await client.dJPlaylist.findUnique({
        where: {
            rekordboxXMLDataId: root.id
        }
    })

    const collection = await client.collection.findUnique({
        where: {
            djPlaylistId: djPlaylist.id
        }
    })

    const tracks = await client.track.findMany({
        where: {
            collectionId: collection.id
        }
    })

    const json: RekordboxXmlJson = {
        '?xml': JSON.parse(root.xml) as Xml,
        DJ_PLAYLISTS: {
            PRODUCT: JSON.parse(djPlaylist.PRODUCT) as Product,
            PLAYLISTS: {
                NODE: []
            },
            Version: djPlaylist.Version,
            COLLECTION: {
                TRACK: [],
                Entries: "0"
            }
        }
    }

    for (const track of tracks) {
        const tempo = JSON.parse(track.TEMPO) as Tempo[];
        const positionMarks = JSON.parse(track.POSITION_MARK) as PositionMark[];

        delete track.TEMPO;
        delete track.POSITION_MARK;

        json.DJ_PLAYLISTS.COLLECTION.TRACK.push({
            ...track,
            TEMPO: tempo,
            POSITION_MARK: positionMarks
        });
    }

    return json;
}