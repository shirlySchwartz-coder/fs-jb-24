/*1*/
SELECT name FROM world.country where LifeExpectancy<67;
/*2*/
SELECT name FROM world.country where Continent ='Europe';
/*3*/
SELECT count(*) as total FROM world.country where Continent='Europe';
/*4*/
select code from world.country where Name='Israel';