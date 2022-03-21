

import { XMLParser } from "fast-xml-parser";
import type { RekordboxXmlJson } from "./xml-interfaces";

declare global {
    interface Window {
        ipcRenderer: IpcRenderer
    }

    interface IpcRenderer {
        importRekordboxXmlJson: (arg: string) => void
    }
}

export const { ipcRenderer } = window;

const parserOptions = {
    attributeNamePrefix: "",
    ignoreAttributes: false,
};

export async function xmlToJson(xmlData: string): Promise<RekordboxXmlJson | null> {
    const parser = new XMLParser(parserOptions);
    const jsonObj = parser.parse(xmlData) as RekordboxXmlJson;

    if (!jsonObj.DJ_PLAYLISTS) {
        return null;
    }

    if (!jsonObj.DJ_PLAYLISTS.PRODUCT || !jsonObj.DJ_PLAYLISTS.COLLECTION || !jsonObj.DJ_PLAYLISTS.PLAYLISTS) {
        return null;
    }

    ipcRenderer.importRekordboxXmlJson("test")

    return jsonObj;
}