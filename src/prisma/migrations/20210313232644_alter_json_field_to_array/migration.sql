/*
  Warnings:

  - The `spec_moves` column on the `Move` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `fin_moves` column on the `Move` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `combos` column on the `Move` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `morphs` column on the `Move` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Move" DROP COLUMN "spec_moves",
ADD COLUMN     "spec_moves" JSONB[],
DROP COLUMN "fin_moves",
ADD COLUMN     "fin_moves" JSONB[],
DROP COLUMN "combos",
ADD COLUMN     "combos" JSONB[],
DROP COLUMN "morphs",
ADD COLUMN     "morphs" JSONB[];
