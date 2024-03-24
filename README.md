![AppName](./public/AppName.png)


## Description

Dieses Project bildet eine Desktop Anwendung welche bei der Verfolgung von Einnahmen und Ausgaben helfen soll. Des Weiteren bring sie dem User eine visuelle Darstellung in Form von Graphen.


## Technologies


### Programming

Die Anwendung läuft auf dem Javascript Framework NextJS in Verbindung mit der React library. Sowohl Frontend als auch Backend sind mit Javascript geschrieben und nutzen libraries für diese Sprache. Um die Anwendung als native Anwendung laufen zu lassen wird electron verwendet.


### Database

Daten werden local in einer JSON gespeichert, sodass jeder Nutzer für seine eigenen Daten verantwortlich ist. Die Anwendung selbst stellt keine Verbindung zu anderen Systemen her.


### Datastructure:

Transaktion:

    name : String
    date: Date
    tag: [String Array]
    amount: Number

Tag:

    name: String
    description: String


## Setup/Run

Um die Anwendung zu starten wird Node.JS und der Paketmanager npm benötigt. Es wird außerdem eine IDE wie Visuall Studio Code empfohlen.


### Initialisieren der Anwendung

Um die benötigten Packages zu installieren wird der paketmanager npm genutzt. in einem Terminal den folgendenen Befehl eingeben um alle dependencies zu ziehen.

    npm install


### Run

Um die Anwendung nun zu starten muss nur noch folgende Anweisung in die Console eingeben:

    npm run dev

Dadurch wird Next.js gestartet. Um die Anwendung allerdings zu nutzen wird noch ein zweiter Befehl in einem anderen Terminal gebraucht.

    npm run electron


## Use

Bei release wird ein Package als Desktop Anwendung verfügbar sein. Weitere Releases werden über andere Kanäle erfolgen.


## License

MIT License

Copyright (c) 2024 GolemT

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.