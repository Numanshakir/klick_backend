-- AlterTable
ALTER TABLE "User" ADD COLUMN     "geoHash" TEXT,
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "locationName" TEXT,
ADD COLUMN     "longitude" DOUBLE PRECISION;
