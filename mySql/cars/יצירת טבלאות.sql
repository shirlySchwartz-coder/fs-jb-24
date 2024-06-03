CREATE TABLE `cars`.`users` (
  `userId` INT NOT NULL AUTO_INCREMENT,
  `userName` VARCHAR(15) NOT NULL,
  `userPass` VARCHAR(15) NOT NULL,
  `userEmail` VARCHAR(20) NOT NULL,
  `userRole` VARCHAR(10) NULL,
  PRIMARY KEY (`userId`),
  UNIQUE INDEX `userId_UNIQUE` (`userId` ASC) VISIBLE,
  UNIQUE INDEX `userEmail_UNIQUE` (`userEmail` ASC) VISIBLE);