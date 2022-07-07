/*
  Warnings:

  - You are about to alter the column `role` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(31)` to `Enum("User_role")`.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('REGULAR', 'ADMIN') NOT NULL DEFAULT 'REGULAR';
