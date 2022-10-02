-- CreateTable
CREATE TABLE "Manager" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "bajar" INTEGER NOT NULL DEFAULT 0,
    "buyaBill" INTEGER NOT NULL DEFAULT 0,
    "electricityBill" INTEGER NOT NULL DEFAULT 0,
    "gasBill" INTEGER NOT NULL DEFAULT 0,
    "moylaBill" INTEGER NOT NULL DEFAULT 0,
    "waterBill" INTEGER NOT NULL DEFAULT 0,
    "paperBill" INTEGER NOT NULL DEFAULT 0,
    "othersBill" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Person" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "mealCount" INTEGER NOT NULL DEFAULT 0,
    "joma" INTEGER NOT NULL DEFAULT 0,
    "authorId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Person_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Manager" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Manager_id_key" ON "Manager"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Manager_phone_key" ON "Manager"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Person_id_key" ON "Person"("id");
