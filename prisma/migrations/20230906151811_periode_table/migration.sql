-- CreateTable
CREATE TABLE "periode" (
    "id" SERIAL NOT NULL,
    "mulai" TEXT NOT NULL,
    "selesai" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "periode_pkey" PRIMARY KEY ("id")
);
