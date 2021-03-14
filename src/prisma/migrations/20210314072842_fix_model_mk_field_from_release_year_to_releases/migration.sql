/*
  Warnings:

  - You are about to drop the column `release_year` on the `Mk` table. All the data in the column will be lost.
  - Added the required column `releases` to the `Mk` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Mk" DROP COLUMN "release_year",
ADD COLUMN     "releases" TEXT NOT NULL;
