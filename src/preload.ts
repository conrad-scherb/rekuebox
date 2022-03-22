import Database from "better-sqlite3";
import electron from "electron"
import { contextBridge, ipcRenderer } from "electron";
import type { RekordboxXmlJson } from "./utils/xml-interfaces";

// Create a database
new Database('prisma/rekuebox.db')

//window.ipcRenderer = electron.ipcRenderer;
// Expose Prisma db commands to renderer
contextBridge.exposeInMainWorld('ipcRenderer', {
    importRekordboxXmlJson: (xmlJson: RekordboxXmlJson) => ipcRenderer.invoke("importRekordboxXmlJson", xmlJson)
})

