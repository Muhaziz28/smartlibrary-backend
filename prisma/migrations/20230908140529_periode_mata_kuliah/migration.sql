-- CreateTable
CREATE TABLE "periode_mata_kuliah" (
    "id" SERIAL NOT NULL,
    "periode_id" INTEGER NOT NULL,
    "mata_kuliah_id" INTEGER NOT NULL,

    CONSTRAINT "periode_mata_kuliah_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "periode_mata_kuliah" ADD CONSTRAINT "periode_mata_kuliah_periode_id_fkey" FOREIGN KEY ("periode_id") REFERENCES "periode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "periode_mata_kuliah" ADD CONSTRAINT "periode_mata_kuliah_mata_kuliah_id_fkey" FOREIGN KEY ("mata_kuliah_id") REFERENCES "mata_kuliah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
