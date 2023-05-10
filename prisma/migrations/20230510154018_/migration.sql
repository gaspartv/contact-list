-- CreateTable
CREATE TABLE "contact" (
    "id" DECIMAL NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "age" DECIMAL NOT NULL
);

-- CreateTable
CREATE TABLE "phone" (
    "id" DECIMAL NOT NULL PRIMARY KEY,
    "num" TEXT NOT NULL,
    "contactId" DECIMAL NOT NULL,
    CONSTRAINT "phone_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "contact" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "contact_name_key" ON "contact"("name");
