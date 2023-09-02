/*
  Warnings:

  - You are about to drop the column `jurusan_id` on the `dosen` table. All the data in the column will be lost.
  - You are about to drop the column `jurusan_id` on the `prodi` table. All the data in the column will be lost.
  - You are about to drop the `jurusan` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `fakultas_id` to the `dosen` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "dosen" DROP CONSTRAINT "dosen_jurusan_id_fkey";

-- DropForeignKey
ALTER TABLE "jurusan" DROP CONSTRAINT "jurusan_fakultas_id_fkey";

-- DropForeignKey
ALTER TABLE "prodi" DROP CONSTRAINT "prodi_jurusan_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_jurusan_id_fkey";

-- AlterTable
ALTER TABLE "dosen" DROP COLUMN "jurusan_id",
ADD COLUMN     "fakultas_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "mahasiswa" ADD COLUMN     "prodi_id" INTEGER;

-- AlterTable
ALTER TABLE "prodi" DROP COLUMN "jurusan_id";

-- DropTable
DROP TABLE "jurusan";

-- AddForeignKey
ALTER TABLE "mahasiswa" ADD CONSTRAINT "mahasiswa_prodi_id_fkey" FOREIGN KEY ("prodi_id") REFERENCES "prodi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dosen" ADD CONSTRAINT "dosen_fakultas_id_fkey" FOREIGN KEY ("fakultas_id") REFERENCES "fakultas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
