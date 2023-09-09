-- CreateTable
CREATE TABLE "sesi_mata_kuliah" (
    "id" SERIAL NOT NULL,
    "periode_mata_kuliah_id" INTEGER NOT NULL,
    "kode_sesi" TEXT NOT NULL,
    "jadwal" TEXT NOT NULL,
    "nip" TEXT NOT NULL,

    CONSTRAINT "sesi_mata_kuliah_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sesi_mata_kuliah" ADD CONSTRAINT "sesi_mata_kuliah_periode_mata_kuliah_id_fkey" FOREIGN KEY ("periode_mata_kuliah_id") REFERENCES "periode_mata_kuliah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sesi_mata_kuliah" ADD CONSTRAINT "sesi_mata_kuliah_nip_fkey" FOREIGN KEY ("nip") REFERENCES "dosen"("nip") ON DELETE RESTRICT ON UPDATE CASCADE;
