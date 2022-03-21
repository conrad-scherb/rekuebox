const Database = require("better-sqlite3");
const { contextBridge, ipcRenderer } = require("electron");

// Create a database
new Database('prisma/rekuebox.db')

window.ipcRenderer = require('electron').ipcRenderer;
// Expose Prisma db commands to renderer
contextBridge.exposeInMainWorld('ipcRenderer', {
    importRekordboxXmlJson: (xmlJson) => ipcRenderer.invoke("importRekordboxXmlJson", xmlJson)
})

