/*
  Warnings:

  - You are about to drop the `Pengantar` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pengantar" DROP CONSTRAINT "Pengantar_sesi_mata_kuliah_id_fkey";

-- DropTable
DROP TABLE "Pengantar";

-- CreateTable
CREATE TABLE "pengantar" (
    "id" SERIAL NOT NULL,
    "sesi_mata_kuliah_id" INTEGER NOT NULL,
    "file" TEXT,
    "link" TEXT,
    "deskripsi" TEXT,

    CONSTRAINT "pengantar_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pengantar" ADD CONSTRAINT "pengantar_sesi_mata_kuliah_id_fkey" FOREIGN KEY ("sesi_mata_kuliah_id") REFERENCES "sesi_mata_kuliah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
