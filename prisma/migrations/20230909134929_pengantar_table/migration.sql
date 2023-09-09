-- CreateTable
CREATE TABLE "Pengantar" (
    "id" SERIAL NOT NULL,
    "sesi_mata_kuliah_id" INTEGER NOT NULL,
    "file" TEXT,
    "link" TEXT,
    "deskripsi" TEXT,

    CONSTRAINT "Pengantar_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pengantar" ADD CONSTRAINT "Pengantar_sesi_mata_kuliah_id_fkey" FOREIGN KEY ("sesi_mata_kuliah_id") REFERENCES "sesi_mata_kuliah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
