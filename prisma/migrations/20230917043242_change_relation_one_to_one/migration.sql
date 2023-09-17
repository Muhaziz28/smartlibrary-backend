/*
  Warnings:

  - A unique constraint covering the columns `[sesi_mata_kuliah_id]` on the table `pengantar` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sesi_mata_kuliah_id]` on the table `rps` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "pengantar_sesi_mata_kuliah_id_key" ON "pengantar"("sesi_mata_kuliah_id");

-- CreateIndex
CREATE UNIQUE INDEX "rps_sesi_mata_kuliah_id_key" ON "rps"("sesi_mata_kuliah_id");
