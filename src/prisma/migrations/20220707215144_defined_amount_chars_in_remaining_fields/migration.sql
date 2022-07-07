-- AlterTable
ALTER TABLE `category` MODIFY `name` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `food` MODIFY `description` VARCHAR(1023) NOT NULL,
    MODIFY `image` VARCHAR(255) NOT NULL;
