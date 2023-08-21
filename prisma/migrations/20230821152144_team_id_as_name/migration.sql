/*
  Warnings:

  - The primary key for the `FootballTeam` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `FootballTeam` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "FootballTeamMember" DROP CONSTRAINT "FootballTeamMember_footballTeamId_fkey";

-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_footballTeamAwayId_fkey";

-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_footballTeamHomeId_fkey";

-- AlterTable
ALTER TABLE "FootballTeam" DROP CONSTRAINT "FootballTeam_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "FootballTeam_pkey" PRIMARY KEY ("name");

-- AlterTable
ALTER TABLE "FootballTeamMember" ALTER COLUMN "footballTeamId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Match" ALTER COLUMN "footballTeamHomeId" SET DATA TYPE TEXT,
ALTER COLUMN "footballTeamAwayId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "FootballTeamMember" ADD CONSTRAINT "FootballTeamMember_footballTeamId_fkey" FOREIGN KEY ("footballTeamId") REFERENCES "FootballTeam"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_footballTeamHomeId_fkey" FOREIGN KEY ("footballTeamHomeId") REFERENCES "FootballTeam"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_footballTeamAwayId_fkey" FOREIGN KEY ("footballTeamAwayId") REFERENCES "FootballTeam"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
