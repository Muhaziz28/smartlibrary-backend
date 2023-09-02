/*
  Warnings:

  - The primary key for the `Dosen` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Dosen" DROP CONSTRAINT "Dosen_pkey",
ALTER COLUMN "nip" SET DATA TYPE TEXT,
ADD CONSTRAINT "Dosen_pkey" PRIMARY KEY ("nip");
