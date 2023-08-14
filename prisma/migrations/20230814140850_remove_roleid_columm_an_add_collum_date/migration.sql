/*
  Warnings:

  - You are about to drop the column `roleid` on the `cashlog` table. All the data in the column will be lost.
  - Added the required column `date` to the `cashlog` table without a default value. This is not possible if the table is not empty.
  - Made the column `userid` on table `cashlog` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `cashlog` DROP COLUMN `roleid`,
    ADD COLUMN `date` DATETIME(3) NOT NULL,
    MODIFY `userid` INTEGER NOT NULL;
