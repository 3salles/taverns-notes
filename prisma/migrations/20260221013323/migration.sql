/*
  Warnings:

  - You are about to drop the column `sessionDate` on the `sessions` table. All the data in the column will be lost.
  - Added the required column `session_date` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "sessionDate",
ADD COLUMN     "session_date" TIMESTAMP(3) NOT NULL;
