/*
  Warnings:

  - Added the required column `authorName` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Photo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "authorName" TEXT NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;
