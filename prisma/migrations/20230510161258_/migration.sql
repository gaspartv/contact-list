-- CreateTable
CREATE TABLE "contact" (
    "id" DECIMAL(65,30) NOT NULL,
    "name" TEXT NOT NULL,
    "age" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "phone" (
    "id" DECIMAL(65,30) NOT NULL,
    "num" TEXT NOT NULL,
    "contactId" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "phone_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "contact_name_key" ON "contact"("name");

-- AddForeignKey
ALTER TABLE "phone" ADD CONSTRAINT "phone_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;
