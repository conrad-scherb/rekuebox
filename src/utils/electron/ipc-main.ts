import { contextBridge, ipcMain, ipcRenderer } from "electron";
import { addRekordboxXmlToDb, loadJsonFromDb } from "./db-utils";
import type { RekordboxXmlJson } from "../shared/xml-interfaces";

export function addIpcHandlers() {
    ipcMain.handle("importRekordboxXmlJson", async (_, ...args) => {
        addRekordboxXmlToDb(args[0]);
    });

    ipcMain.handle("loadJsonFromDb", async (): Promise<boolean> => {
        return loadJsonFromDb();
    });
}

export function exposeIpc() {
    contextBridge.exposeInMainWorld('ipcRenderer', {
        importRekordboxXmlJson: (xmlJson: RekordboxXmlJson) => ipcRenderer.invoke("importRekordboxXmlJson", xmlJson),
        loadJsonFromDb: () => ipcRenderer.invoke("loadJsonFromDb")
    })
}