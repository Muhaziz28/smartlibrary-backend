-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MAHASISWA', 'DOSEN');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "jurusan_id" INTEGER,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fakultas" (
    "id" SERIAL NOT NULL,
    "nama_fakultas" TEXT NOT NULL,
    "singkatan" TEXT,

    CONSTRAINT "Fakultas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jurusan" (
    "id" SERIAL NOT NULL,
    "nama_jurusan" TEXT NOT NULL,
    "singkatan" TEXT,
    "fakultas_id" INTEGER NOT NULL,

    CONSTRAINT "Jurusan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Fakultas_nama_fakultas_key" ON "Fakultas"("nama_fakultas");

-- CreateIndex
CREATE UNIQUE INDEX "Fakultas_singkatan_key" ON "Fakultas"("singkatan");

-- CreateIndex
CREATE UNIQUE INDEX "Jurusan_nama_jurusan_key" ON "Jurusan"("nama_jurusan");

-- CreateIndex
CREATE UNIQUE INDEX "Jurusan_singkatan_key" ON "Jurusan"("singkatan");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_jurusan_id_fkey" FOREIGN KEY ("jurusan_id") REFERENCES "Jurusan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jurusan" ADD CONSTRAINT "Jurusan_fakultas_id_fkey" FOREIGN KEY ("fakultas_id") REFERENCES "Fakultas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
