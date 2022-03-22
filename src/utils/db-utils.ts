import { PrismaClient } from '@prisma/client';
import type { RekordboxXmlJson } from './xml-interfaces';

type PrismaSingleton = {
    (): PrismaClient;
    client?: PrismaClient;
}

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

