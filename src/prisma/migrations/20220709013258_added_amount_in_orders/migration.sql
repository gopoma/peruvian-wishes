/*
  Warnings:

  - Added the required column `amount` to the `FoodOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `foodorder` ADD COLUMN `amount` INTEGER NOT NULL;
