/*
  Warnings:

  - You are about to drop the `Dosen` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Fakultas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Jurusan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Dosen" DROP CONSTRAINT "Dosen_jurusan_id_fkey";

-- DropForeignKey
ALTER TABLE "Jurusan" DROP CONSTRAINT "Jurusan_fakultas_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_jurusan_id_fkey";

-- DropTable
DROP TABLE "Dosen";

-- DropTable
DROP TABLE "Fakultas";

-- DropTable
DROP TABLE "Jurusan";

-- CreateTable
CREATE TABLE "dosen" (
    "nip" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username_telegram" TEXT,
    "no_telp" TEXT,
    "jurusan_id" INTEGER,

    CONSTRAINT "dosen_pkey" PRIMARY KEY ("nip")
);

-- CreateTable
CREATE TABLE "fakultas" (
    "id" SERIAL NOT NULL,
    "nama_fakultas" TEXT NOT NULL,
    "singkatan" TEXT,

    CONSTRAINT "fakultas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jurusan" (
    "id" SERIAL NOT NULL,
    "nama_jurusan" TEXT NOT NULL,
    "singkatan" TEXT,
    "fakultas_id" INTEGER NOT NULL,

    CONSTRAINT "jurusan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "dosen_nama_key" ON "dosen"("nama");

-- CreateIndex
CREATE UNIQUE INDEX "dosen_email_key" ON "dosen"("email");

-- CreateIndex
CREATE UNIQUE INDEX "dosen_username_telegram_key" ON "dosen"("username_telegram");

-- CreateIndex
CREATE UNIQUE INDEX "dosen_no_telp_key" ON "dosen"("no_telp");

-- CreateIndex
CREATE UNIQUE INDEX "fakultas_nama_fakultas_key" ON "fakultas"("nama_fakultas");

-- CreateIndex
CREATE UNIQUE INDEX "fakultas_singkatan_key" ON "fakultas"("singkatan");

-- CreateIndex
CREATE UNIQUE INDEX "jurusan_nama_jurusan_key" ON "jurusan"("nama_jurusan");

-- CreateIndex
CREATE UNIQUE INDEX "jurusan_singkatan_key" ON "jurusan"("singkatan");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_jurusan_id_fkey" FOREIGN KEY ("jurusan_id") REFERENCES "jurusan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dosen" ADD CONSTRAINT "dosen_jurusan_id_fkey" FOREIGN KEY ("jurusan_id") REFERENCES "jurusan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jurusan" ADD CONSTRAINT "jurusan_fakultas_id_fkey" FOREIGN KEY ("fakultas_id") REFERENCES "fakultas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
