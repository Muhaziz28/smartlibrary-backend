-- CreateTable
CREATE TABLE "mata_kuliah_diambil" (
    "id" SERIAL NOT NULL,
    "sesi_mata_kuliah_id" INTEGER NOT NULL,
    "nim" TEXT NOT NULL,

    CONSTRAINT "mata_kuliah_diambil_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "mata_kuliah_diambil" ADD CONSTRAINT "mata_kuliah_diambil_sesi_mata_kuliah_id_fkey" FOREIGN KEY ("sesi_mata_kuliah_id") REFERENCES "sesi_mata_kuliah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mata_kuliah_diambil" ADD CONSTRAINT "mata_kuliah_diambil_nim_fkey" FOREIGN KEY ("nim") REFERENCES "mahasiswa"("nim") ON DELETE RESTRICT ON UPDATE CASCADE;
