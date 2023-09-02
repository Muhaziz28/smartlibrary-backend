-- CreateTable
CREATE TABLE "Dosen" (
    "nip" INTEGER NOT NULL,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username_telegram" TEXT,
    "no_telp" TEXT,
    "jurusan_id" INTEGER,

    CONSTRAINT "Dosen_pkey" PRIMARY KEY ("nip")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dosen_nama_key" ON "Dosen"("nama");

-- CreateIndex
CREATE UNIQUE INDEX "Dosen_email_key" ON "Dosen"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Dosen_username_telegram_key" ON "Dosen"("username_telegram");

-- CreateIndex
CREATE UNIQUE INDEX "Dosen_no_telp_key" ON "Dosen"("no_telp");

-- AddForeignKey
ALTER TABLE "Dosen" ADD CONSTRAINT "Dosen_jurusan_id_fkey" FOREIGN KEY ("jurusan_id") REFERENCES "Jurusan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
