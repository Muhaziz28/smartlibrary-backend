-- CreateTable
CREATE TABLE "mata_kuliah" (
    "id" SERIAL NOT NULL,
    "nama_mata_kuliah" TEXT NOT NULL,
    "kode_mata_kuliah" TEXT NOT NULL,
    "sks" INTEGER NOT NULL,
    "prodi_id" INTEGER NOT NULL,

    CONSTRAINT "mata_kuliah_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "mata_kuliah_kode_mata_kuliah_key" ON "mata_kuliah"("kode_mata_kuliah");

-- AddForeignKey
ALTER TABLE "mata_kuliah" ADD CONSTRAINT "mata_kuliah_prodi_id_fkey" FOREIGN KEY ("prodi_id") REFERENCES "prodi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
