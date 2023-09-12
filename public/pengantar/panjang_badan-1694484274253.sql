-- -------------------------------------------------------------
-- TablePlus 5.4.0(504)
--
-- https://tableplus.com/
--
-- Database: ayoceting
-- Generation Time: 2023-09-08 11:40:21.7960
-- -------------------------------------------------------------


-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS panjang_badan_id_seq;
DROP TYPE IF EXISTS "public"."jenis_kelamin";
CREATE TYPE "public"."jenis_kelamin" AS ENUM ('L', 'P');
DROP TYPE IF EXISTS "public"."metode_pengukuran";
CREATE TYPE "public"."metode_pengukuran" AS ENUM ('Telentang', 'Berdiri');

-- Table Definition
CREATE TABLE "public"."panjang_badan" (
    "id" int4 NOT NULL DEFAULT nextval('panjang_badan_id_seq'::regclass),
    "idUmurBulan" int4 NOT NULL,
    "jenisKelamin" "public"."jenis_kelamin" NOT NULL,
    "-3sd" float8 NOT NULL,
    "-2sd" float8 NOT NULL,
    "-1sd" float8 NOT NULL,
    "median" float8 NOT NULL,
    "+1sd" float8 NOT NULL,
    "+2sd" float8 NOT NULL,
    "+3sd" float8 NOT NULL,
    "metodePengukuran" "public"."metode_pengukuran" NOT NULL DEFAULT 'Telentang'::metode_pengukuran,
    CONSTRAINT "panjang_badan_idUmurBulan_fkey" FOREIGN KEY ("idUmurBulan") REFERENCES "public"."umur_bulan"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    PRIMARY KEY ("id")
);

INSERT INTO "public"."panjang_badan" ("id", "idUmurBulan", "jenisKelamin", "-3sd", "-2sd", "-1sd", "median", "+1sd", "+2sd", "+3sd", "metodePengukuran") VALUES
(1, 1, 'L', 2.1, 2.5, 2.9, 3.3, 3.9, 4.4, 5, 'Telentang'),
(2, 2, 'L', 2.9, 3.4, 3.9, 4.5, 5.1, 5.8, 6.6, 'Telentang'),
(3, 3, 'L', 3.8, 4.3, 4.9, 5.6, 6.3, 7.1, 8, 'Telentang'),
(4, 4, 'L', 4.4, 5, 5.7, 6.4, 7.2, 8, 9, 'Telentang'),
(5, 5, 'L', 4.9, 5.6, 6.2, 7, 7.8, 8.7, 9.7, 'Telentang'),
(6, 6, 'L', 5.3, 6, 6.7, 7.5, 8.4, 9.3, 10.4, 'Telentang'),
(7, 7, 'L', 5.7, 6.4, 7.1, 7.9, 8.8, 9.8, 10.9, 'Telentang'),
(8, 8, 'L', 5.9, 6.7, 7.4, 8.3, 9.2, 10.3, 11.4, 'Telentang'),
(9, 9, 'L', 6.2, 6.9, 7.7, 8.6, 9.6, 10.7, 11.9, 'Telentang'),
(10, 10, 'L', 6.4, 7.1, 8, 8.9, 9.9, 11, 12.3, 'Telentang'),
(11, 11, 'L', 6.6, 7.4, 8.2, 9.2, 10.2, 11.4, 12.7, 'Telentang'),
(12, 12, 'L', 6.8, 7.6, 8.4, 9.4, 10.5, 11.7, 13, 'Telentang'),
(13, 13, 'L', 6.9, 7.7, 8.6, 9.6, 10.8, 12, 13.3, 'Telentang'),
(14, 14, 'L', 7.1, 7.9, 8.8, 9.9, 11, 12.3, 13.7, 'Telentang'),
(15, 15, 'L', 7.2, 8.1, 9, 10.1, 11.3, 12.6, 14, 'Telentang'),
(16, 16, 'L', 7.4, 8.3, 9.2, 10.3, 11.5, 12.8, 14.3, 'Telentang'),
(17, 17, 'L', 7.5, 8.4, 9.4, 10.5, 11.7, 13.1, 14.6, 'Telentang'),
(18, 18, 'L', 7.7, 8.6, 9.6, 10.7, 12, 13.4, 14.9, 'Telentang'),
(19, 19, 'L', 7.8, 8.8, 9.8, 10.9, 12.2, 13.7, 15.3, 'Telentang'),
(20, 20, 'L', 8, 8.9, 10, 11.1, 12.5, 13.9, 15.6, 'Telentang'),
(21, 21, 'L', 8.1, 9.1, 10.1, 11.3, 12.7, 14.2, 15.9, 'Telentang'),
(22, 22, 'L', 8.2, 9.2, 10.3, 11.5, 12.9, 14.5, 16.2, 'Telentang'),
(23, 23, 'L', 8.4, 9.4, 10.5, 11.8, 13.2, 14.7, 16.5, 'Telentang'),
(24, 24, 'L', 8.5, 9.5, 10.7, 12, 13.4, 15, 16.8, 'Telentang'),
(25, 25, 'L', 8.6, 9.7, 10.8, 12.2, 13.6, 15.3, 17.1, 'Telentang'),
(26, 26, 'L', 8.8, 9.8, 11, 12.4, 13.9, 15.5, 17.5, 'Telentang'),
(27, 27, 'L', 8.9, 10, 11.2, 12.5, 14.1, 15.8, 17.8, 'Telentang'),
(28, 28, 'L', 9, 10.1, 11.3, 12.7, 14.3, 16.1, 18.1, 'Telentang'),
(29, 29, 'L', 9.1, 10.2, 11.5, 12.9, 14.5, 16.3, 18.4, 'Telentang'),
(30, 30, 'L', 9.2, 10.4, 11.7, 13.1, 14.8, 16.6, 18.7, 'Telentang'),
(31, 31, 'L', 9.4, 10.5, 11.8, 13.3, 15, 16.9, 19, 'Telentang'),
(32, 32, 'L', 9.5, 10.7, 12, 13.5, 15.2, 17.1, 19.3, 'Telentang'),
(33, 33, 'L', 9.6, 10.8, 12.1, 13.7, 15.4, 17.4, 19.6, 'Telentang'),
(34, 34, 'L', 9.7, 10.9, 12.3, 13.8, 15.6, 17.6, 19.9, 'Telentang'),
(35, 35, 'L', 9.8, 11, 12.4, 14, 15.8, 17.8, 20.2, 'Telentang'),
(36, 36, 'L', 9.9, 11.2, 12.6, 14.2, 16, 18.1, 20.4, 'Telentang'),
(37, 37, 'L', 10, 11.3, 12.7, 14.3, 16.2, 18.3, 20.7, 'Telentang'),
(38, 38, 'L', 10.1, 11.4, 12.9, 14.5, 16.4, 18.6, 21, 'Telentang'),
(39, 39, 'L', 10.2, 11.5, 13, 14.7, 16.6, 18.8, 21.3, 'Telentang'),
(40, 40, 'L', 10.3, 11.6, 13.1, 14.8, 16.8, 19, 21.6, 'Telentang'),
(41, 41, 'L', 10.4, 11.8, 13.3, 15, 17, 19.3, 21.9, 'Telentang'),
(42, 42, 'L', 10.5, 11.9, 13.4, 15.2, 17.2, 19.5, 22.1, 'Telentang'),
(43, 43, 'L', 10.6, 12, 13.6, 15.3, 17.4, 19.7, 22.4, 'Telentang'),
(44, 44, 'L', 10.7, 12.1, 13.7, 15.5, 17.6, 20, 22.7, 'Telentang'),
(45, 45, 'L', 10.8, 12.2, 13.8, 15.7, 17.8, 20.2, 23, 'Telentang'),
(46, 46, 'L', 10.9, 12.4, 14, 15.8, 18, 20.5, 23.3, 'Telentang'),
(47, 47, 'L', 11, 12.5, 14.1, 16, 18.2, 20.7, 23.6, 'Telentang');
