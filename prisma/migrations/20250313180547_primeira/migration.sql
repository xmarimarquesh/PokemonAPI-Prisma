-- CreateTable
CREATE TABLE `poke` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `species` VARCHAR(191) NOT NULL,
    `height` INTEGER NOT NULL,
    `weight` INTEGER NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `rarity` INTEGER NOT NULL,
    `captured` BOOLEAN NOT NULL,
    `escapeCount` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
