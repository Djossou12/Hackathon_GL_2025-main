-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Patient" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "sexe" TEXT,
    "diagnosis" TEXT NOT NULL,
    "poids" REAL,
    "taille" REAL,
    "traitement" TEXT,
    "numSecu" TEXT,
    "medecin" TEXT,
    "rendezvous" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,
    "groupeSanguin" TEXT,
    "allergies" TEXT
);
INSERT INTO "new_Patient" ("age", "allergies", "createdAt", "diagnosis", "groupeSanguin", "id", "medecin", "name", "notes", "numSecu", "poids", "rendezvous", "sexe", "taille", "traitement") SELECT "age", "allergies", "createdAt", "diagnosis", "groupeSanguin", "id", "medecin", "name", "notes", "numSecu", "poids", "rendezvous", "sexe", "taille", "traitement" FROM "Patient";
DROP TABLE "Patient";
ALTER TABLE "new_Patient" RENAME TO "Patient";
CREATE UNIQUE INDEX "Patient_numSecu_key" ON "Patient"("numSecu");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
