-- CreateTable
CREATE TABLE `cashlog` (
    `id` VARCHAR(191) NOT NULL,
    `cashSent` INTEGER NOT NULL,
    `roleid` INTEGER NOT NULL,
    `userid` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `passwd` VARCHAR(191) NOT NULL,
    `Prompt` VARCHAR(191) NULL,
    `answer` VARCHAR(191) NULL,
    `truename` VARCHAR(191) NULL,
    `idnumber` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `mobilenumber` VARCHAR(191) NULL,
    `province` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `phonenumber` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `postalcode` VARCHAR(191) NULL,
    `gender` INTEGER NULL,
    `creatime` DATETIME(3) NULL,
    `qq` VARCHAR(191) NULL,
    `passwd2` VARCHAR(191) NULL,
    `banido` INTEGER NULL,
    `adm` INTEGER NULL,
    `moeda_loja` VARCHAR(191) NULL,
    `perfil` VARCHAR(191) NULL,
    `money` VARCHAR(191) NULL,
    `parceiroid` INTEGER NULL,
    `token` VARCHAR(191) NULL,
    `token2` VARCHAR(191) NULL,
    `type` INTEGER NOT NULL,
    `code_reward` VARCHAR(191) NULL,
    `safe_token_passwd` VARCHAR(191) NULL,
    `safe_token_email` VARCHAR(191) NULL,
    `safe_token_newmail` VARCHAR(191) NULL,
    `new_email` VARCHAR(191) NULL,

    UNIQUE INDEX `users_name_key`(`name`),
    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_new_email_key`(`new_email`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
