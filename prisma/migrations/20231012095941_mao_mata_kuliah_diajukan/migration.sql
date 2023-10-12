/*
  Warnings:

  - You are about to drop the `MataKuliahDiajukan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MataKuliahDiajukan" DROP CONSTRAINT "MataKuliahDiajukan_nim_fkey";

-- DropForeignKey
ALTER TABLE "MataKuliahDiajukan" DROP CONSTRAINT "MataKuliahDiajukan_sesi_mata_kuliah_id_fkey";

-- DropTable
DROP TABLE "MataKuliahDiajukan";

-- CreateTable
CREATE TABLE "mata_kuliah_diajukan" (
    "id" SERIAL NOT NULL,
    "sesi_mata_kuliah_id" INTEGER NOT NULL,
    "nim" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "mata_kuliah_diajukan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "mata_kuliah_diajukan" ADD CONSTRAINT "mata_kuliah_diajukan_sesi_mata_kuliah_id_fkey" FOREIGN KEY ("sesi_mata_kuliah_id") REFERENCES "sesi_mata_kuliah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mata_kuliah_diajukan" ADD CONSTRAINT "mata_kuliah_diajukan_nim_fkey" FOREIGN KEY ("nim") REFERENCES "mahasiswa"("nim") ON DELETE RESTRICT ON UPDATE CASCADE;
