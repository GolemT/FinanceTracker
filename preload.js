// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  loadData: () => ipcRenderer.invoke('load-data'),
  saveData: (newData) => ipcRenderer.invoke('save-data', newData),
  loadTags: () => ipcRenderer.invoke('load-tags'),
  saveTag: (newTag) => ipcRenderer.invoke('save-tag', newTag),
  deleteData: (idsToDelete) => ipcRenderer.invoke('delete-data', idsToDelete),
  deleteTag: (tagsToDelete) => ipcRenderer.invoke('delete-tag', tagsToDelete),
});
