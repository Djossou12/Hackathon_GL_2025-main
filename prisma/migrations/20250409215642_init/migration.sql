-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "sexe" TEXT NOT NULL,
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

-- CreateTable
CREATE TABLE "HistoriqueMedical" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "patientId" TEXT NOT NULL,
    "dateConsultation" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "motif" TEXT NOT NULL,
    "observations" TEXT,
    "prescription" TEXT,
    CONSTRAINT "HistoriqueMedical_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Patient_numSecu_key" ON "Patient"("numSecu");
