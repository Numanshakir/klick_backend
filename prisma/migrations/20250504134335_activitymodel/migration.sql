-- AlterTable
ALTER TABLE "User" ADD COLUMN     "activity" INTEGER,
ADD COLUMN     "reason" TEXT,
ADD COLUMN     "tone" TEXT;

-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);
