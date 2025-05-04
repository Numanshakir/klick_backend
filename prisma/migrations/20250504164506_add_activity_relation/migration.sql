/*
  Warnings:

  - You are about to drop the column `activity` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "activity",
ADD COLUMN     "activityId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE SET NULL ON UPDATE CASCADE;
