-- CreateTable
CREATE TABLE "prodi" (
    "id" SERIAL NOT NULL,
    "nama_prodi" TEXT NOT NULL,
    "singkatan" TEXT,
    "jurusan_id" INTEGER NOT NULL,

    CONSTRAINT "prodi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "prodi_nama_prodi_key" ON "prodi"("nama_prodi");

-- CreateIndex
CREATE UNIQUE INDEX "prodi_singkatan_key" ON "prodi"("singkatan");

-- AddForeignKey
ALTER TABLE "prodi" ADD CONSTRAINT "prodi_jurusan_id_fkey" FOREIGN KEY ("jurusan_id") REFERENCES "jurusan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
