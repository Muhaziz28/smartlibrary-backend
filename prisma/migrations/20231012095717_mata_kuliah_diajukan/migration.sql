-- CreateTable
CREATE TABLE "MataKuliahDiajukan" (
    "id" SERIAL NOT NULL,
    "sesi_mata_kuliah_id" INTEGER NOT NULL,
    "nim" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "MataKuliahDiajukan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MataKuliahDiajukan" ADD CONSTRAINT "MataKuliahDiajukan_sesi_mata_kuliah_id_fkey" FOREIGN KEY ("sesi_mata_kuliah_id") REFERENCES "sesi_mata_kuliah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MataKuliahDiajukan" ADD CONSTRAINT "MataKuliahDiajukan_nim_fkey" FOREIGN KEY ("nim") REFERENCES "mahasiswa"("nim") ON DELETE RESTRICT ON UPDATE CASCADE;
