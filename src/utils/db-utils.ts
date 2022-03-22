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

export function addRekordboxXmlToDb(rekordboxXml: RekordboxXmlJson) {
    const client = getPrismaClient();

    client.rekordboxXMLData.create({
        data: {
            xml: JSON.stringify(rekordboxXml['?xml'])
        }
    });
}

