/*
  Warnings:

  - The `status` column on the `mata_kuliah_diajukan` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "statusMataKuliahDiajukan" AS ENUM ('pending', 'diterima', 'ditolak');

-- AlterTable
ALTER TABLE "mata_kuliah_diajukan" DROP COLUMN "status",
ADD COLUMN     "status" "statusMataKuliahDiajukan" NOT NULL DEFAULT 'pending';
