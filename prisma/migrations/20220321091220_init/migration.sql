-- CreateTable
CREATE TABLE "rekordboxXMLData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "xml" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "DJPlaylist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rekordboxXMLDataId" INTEGER NOT NULL,
    "PRODUCT" TEXT NOT NULL,
    "Version" TEXT NOT NULL,
    CONSTRAINT "DJPlaylist_rekordboxXMLDataId_fkey" FOREIGN KEY ("rekordboxXMLDataId") REFERENCES "rekordboxXMLData" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Collection" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "djPlaylistId" INTEGER NOT NULL,
    CONSTRAINT "Collection_djPlaylistId_fkey" FOREIGN KEY ("djPlaylistId") REFERENCES "DJPlaylist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Track" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "collectionId" INTEGER NOT NULL,
    "TrackID" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Artist" TEXT NOT NULL,
    "Composer" TEXT NOT NULL,
    "Album" TEXT NOT NULL,
    "Grouping" TEXT NOT NULL,
    "Genre" TEXT NOT NULL,
    "Kind" TEXT NOT NULL,
    "Size" TEXT NOT NULL,
    "TotalTime" TEXT NOT NULL,
    "DiscNumber" TEXT NOT NULL,
    "TrackNumber" TEXT NOT NULL,
    "Year" TEXT NOT NULL,
    "AverageBpm" TEXT NOT NULL,
    "DateAdded" TEXT NOT NULL,
    "BitRate" TEXT NOT NULL,
    "SampleRate" TEXT NOT NULL,
    "Comments" TEXT NOT NULL,
    "PlayCount" TEXT NOT NULL,
    "Rating" TEXT NOT NULL,
    "Location" TEXT NOT NULL,
    "Remixer" TEXT NOT NULL,
    "Tonality" TEXT NOT NULL,
    "Label" TEXT NOT NULL,
    "Mix" TEXT NOT NULL,
    "TEMPO" TEXT NOT NULL,
    "POSITION_MARK" TEXT NOT NULL,
    CONSTRAINT "Track_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "DJPlaylist_rekordboxXMLDataId_key" ON "DJPlaylist"("rekordboxXMLDataId");

-- CreateIndex
CREATE UNIQUE INDEX "Collection_djPlaylistId_key" ON "Collection"("djPlaylistId");

-- CreateIndex
CREATE UNIQUE INDEX "Track_collectionId_key" ON "Track"("collectionId");
