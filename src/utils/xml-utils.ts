import { XMLParser } from "fast-xml-parser";
import type { RekordboxXmlJson } from "./xml-interfaces";

const parserOptions = {
    attributeNamePrefix: "",
    ignoreAttributes: false,
};

export function xmlToJson(xmlData: string): RekordboxXmlJson | null {
    const parser = new XMLParser(parserOptions);
    const jsonObj = parser.parse(xmlData) as RekordboxXmlJson;

    if (!jsonObj.DJ_PLAYLISTS) {
        return null;
    }

    if (!jsonObj.DJ_PLAYLISTS.PRODUCT || !jsonObj.DJ_PLAYLISTS.COLLECTION || !jsonObj.DJ_PLAYLISTS.PLAYLISTS) {
        return null;
    }

    return jsonObj;
}