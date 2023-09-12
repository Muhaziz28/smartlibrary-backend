/*
  Warnings:

  - You are about to drop the `Pertemuan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pertemuan" DROP CONSTRAINT "Pertemuan_sesi_mata_kuliah_id_fkey";

-- DropTable
DROP TABLE "Pertemuan";

-- CreateTable
CREATE TABLE "pertemuan" (
    "id" SERIAL NOT NULL,
    "sesi_mata_kuliah_id" INTEGER NOT NULL,
    "pertemuan_ke" INTEGER NOT NULL,
    "file" TEXT,
    "link" TEXT,
    "deskripsi" TEXT,
    "tanggal" TEXT,
    "barcode" TEXT,

    CONSTRAINT "pertemuan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pertemuan" ADD CONSTRAINT "pertemuan_sesi_mata_kuliah_id_fkey" FOREIGN KEY ("sesi_mata_kuliah_id") REFERENCES "sesi_mata_kuliah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
