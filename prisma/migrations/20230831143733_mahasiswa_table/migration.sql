-- CreateTable
CREATE TABLE "mahasiswa" (
    "nim" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username_telegram" TEXT,
    "no_telp" TEXT,

    CONSTRAINT "mahasiswa_pkey" PRIMARY KEY ("nim")
);

-- CreateIndex
CREATE UNIQUE INDEX "mahasiswa_email_key" ON "mahasiswa"("email");

-- CreateIndex
CREATE UNIQUE INDEX "mahasiswa_username_telegram_key" ON "mahasiswa"("username_telegram");

-- CreateIndex
CREATE UNIQUE INDEX "mahasiswa_no_telp_key" ON "mahasiswa"("no_telp");
