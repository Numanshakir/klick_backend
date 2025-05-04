/*
  Warnings:

  - You are about to drop the column `location` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `milkPrice` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `pumped` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "location",
DROP COLUMN "milkPrice",
DROP COLUMN "pumped",
ADD COLUMN     "dateOfBirth" TEXT,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "languages" TEXT[],
ADD COLUMN     "userName" TEXT;
