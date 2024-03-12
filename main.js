const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

const dataPath = path.join(path.join(__dirname), 'app','data.json');
const tagsPath = path.join(path.join(__dirname), 'app', 'tags.json');

// Initialisiere die Daten- und Tags-Datei, falls nicht vorhanden
function initializeDataFiles() {
    if (!fs.existsSync(dataPath)) {
      fs.writeFileSync(dataPath, JSON.stringify({}));
    }
  }

function loadData() {
    const jsonData = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(jsonData);
  }

function loadTags() {
    const jsonData = fs.readFileSync(tagsPath, 'utf8');
    return JSON.parse(jsonData);
  }

function isValidDataFormat(data) {
    // Überprüfe das Format
    // Beispielhaft: Überprüfung auf Existenz notwendiger Felder
    if (!data.name || !data.date || !data.amount) {
      return false;
    }
  
    // Überprüfe die Tags gegen die zugelassenen Tags
    const tagsObj = JSON.parse(fs.readFileSync(tagsPath, 'utf8'));
    // Erstelle ein Array der erlaubten Tag-Schlüssel
    const allowedTags = Object.keys(tagsObj);
    // data.tags sollte ein Array von Strings sein. Überprüfe, ob jeder String in allowedTags enthalten ist.
    // Wenn data.tags nicht bereits ein Array ist, musst du es entsprechend deiner Anwendungslogik anpassen.
    if (!Array.isArray(data.tags) || !data.tags.every(tag => allowedTags.includes(tag))) {
      console.error('Einige Tags sind ungültig.');
      return false;
    }
  
    return true;
}
  
function saveData(newData) {
  try {
    const existingData = loadData();
    const nextId = Object.keys(existingData).length + 1;

    if (!isValidDataFormat(newData)) {
      console.error('Daten entsprechen nicht dem erforderlichen Format oder enthalten ungültige Tags.');
      return false; // Frühe Rückgabe, falls das Datenformat ungültig ist
    }

    // Annahme: `newData` enthält keinen eindeutigen ID-Schlüssel, also wird einer generiert
    existingData[nextId] = newData;

    fs.writeFileSync(dataPath, JSON.stringify(existingData, null, 2));
    return true; // Daten wurden erfolgreich gespeichert
  } catch (error) {
    console.error('Fehler beim Speichern der Daten:', error);
    return false; // Ein Fehler ist aufgetreten, Daten wurden nicht gespeichert
  }
}

function saveTag(newTag) {
  try {
    const tagsData = fs.existsSync(tagsPath) ? fs.readFileSync(tagsPath, 'utf8') : '{}';
    const tags = JSON.parse(tagsData);

    // Prüfe, ob der Tag bereits existiert
    if (tags.hasOwnProperty(newTag.key)) {
      console.log(`Der Tag ${newTag.key} existiert bereits.`);
      return false; // Frühe Rückkehr, da der Tag bereits existiert
    }

    // Füge den neuen Tag hinzu und speichere die aktualisierten Tags
    tags[newTag.key] = newTag.description;
    fs.writeFileSync(tagsPath, JSON.stringify(tags, null, 2));
    console.log(`Der Tag ${newTag.key} wurde hinzugefügt.`);
    return true; // Erfolg, Tag wurde hinzugefügt
  } catch (error) {
    console.error('Fehler beim Speichern des Tags:', error);
    return false; // Ein Fehler ist aufgetreten, die Funktion gibt false zurück
  }
}


ipcMain.handle('load-data', (event) => {
    return loadData();
});
  
ipcMain.handle('save-data', (event, newData) => {
  const success = saveData(newData);
  return success; // Stelle sicher, dass dieser Wert an den Renderer-Prozess zurückgegeben wird
});

ipcMain.handle('load-tags', async (event) => {
  return loadTags();
});

ipcMain.handle('save-tag', (event, newTag) => {
  const success = saveTag(newTag);
  return success;
});


function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: false,
        contextIsolation: true, // Sicherer, benötigt aber Preload-Skripte für IPC
        enableRemoteModule: true, // Nur wenn du `remote` benötigst, was ebenfalls aus Sicherheitsgründen nicht empfohlen wird
    },
  });

  // Lade deine Next.js-Anwendungs-URL
  // Für die Entwicklung: http://localhost:3000
  // Für die Produktion: file://${__dirname}/out/index.html, nachdem du `next build` und `next export` ausgeführt hast
  win.loadURL('http://localhost:3000');
}

app.whenReady().then(() => {
    createWindow();
    initializeDataFiles();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
      app.quit();
  }
});
