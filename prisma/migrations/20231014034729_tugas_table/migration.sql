-- CreateTable
CREATE TABLE "tugas" (
    "id" SERIAL NOT NULL,
    "pertemuan_id" INTEGER NOT NULL,
    "file" TEXT,
    "link" TEXT,
    "deskripsi" TEXT,
    "tanggal" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tugas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tugas" ADD CONSTRAINT "tugas_pertemuan_id_fkey" FOREIGN KEY ("pertemuan_id") REFERENCES "pertemuan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
