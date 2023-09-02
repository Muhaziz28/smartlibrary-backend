/*
  Warnings:

  - Added the required column `fakultas_id` to the `prodi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "prodi" ADD COLUMN     "fakultas_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "prodi" ADD CONSTRAINT "prodi_fakultas_id_fkey" FOREIGN KEY ("fakultas_id") REFERENCES "fakultas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
