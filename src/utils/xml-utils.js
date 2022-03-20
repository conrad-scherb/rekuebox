import { XMLParser } from "fast-xml-parser";

const parserOptions = {
    attributeNamePrefix: "",
    ignoreAttributes: false,
};

export function xmlToJson(xmlData) {
    const parser = new XMLParser(parserOptions);
    const jsonObj = parser.parse(xmlData);
    return jsonObj;
}