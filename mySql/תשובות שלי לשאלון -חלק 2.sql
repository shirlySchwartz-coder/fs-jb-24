-- 1
SELECT FirstName, LastName FROM northwind.employees where EmployeeID=3;
-- 2
SELECT ProductName, UnitPrice FROM northwind.products where ProductID =4;
-- 3
SELECT ProductID, ProductName, UnitPrice FROM northwind.products where UnitPrice>20 order by UnitPrice asc;
-- 4
select concat_ws(" ",FirstName ,LastName) as `FullName` ,BirthDate, ReportsTo   from employees where EmployeeID=8;
-- 5
select EmployeeID as LondonEmp, concat_ws(" ",FirstName ,LastName) as `FullName` ,BirthDate   from employees where City = 'LONDON';
-- 6
SELECT * FROM northwind.products where UnitPrice not between 50 and 100 ;
-- 7
SELECT ProductID, ProductName, UnitPrice FROM northwind.products where UnitPrice  between 12.35 and 43.9 order by UnitPrice desc ;
-- 8
select EmployeeID  ,LastName ,HireDate   from employees where City = 'LONDON' or City='TACOMA';
-- 9 
select EmployeeID  ,LastName ,LastName, BirthDate   from employees where EmployeeID = 1 or EmployeeID= 2 or EmployeeID=5;
-- 10 
select EmployeeID  ,LastName ,LastName, BirthDate   from employees where not EmployeeID =4 and not EmployeeID= 5 and not EmployeeID=7;
-- 11
SELECT ProductID, ProductName, CategoryID FROM northwind.products where not CategoryID =1 and not CategoryID =2  and not CategoryID =7 order by CategoryID asc ;
-- 12
select   FirstName ,Region   from employees where Region is null;
-- 13
SELECT   ProductName, UnitPrice FROM northwind.products order by UnitPrice desc limit 3   ;
-- 14
SELECT OrderID, OrderDate, RequiredDate FROM northwind.orders where RequiredDate >= '1996-10-01';
-- 15
SELECT EmployeeID,LastName, ReportsTo FROM northwind.employees where ReportsTo is not null order by EmployeeID asc;
-- 16
SELECT categories.CategoryName, products.ProductName FROM northwind.categories inner join products on categories.CategoryID=products.CategoryID 
where CategoryName like '%o%';
-- 17
SELECT CompanyName, Country FROM northwind.customers where CompanyName like '%a';
-- 18
SELECT * FROM northwind.products where ProductName like '%a_';
-- 19
SELECT CustomerID, EmployeeID  , RequiredDate FROM northwind.orders where RequiredDate >= '1997-04-01' and RequiredDate<='1997-05-01'  
order by OrderDate asc , CustomerID  DESC;
-- 20
SELECT CustomerID, CompanyName, Country, Phone, Region FROM northwind.customers where Country like 'M%'  or Country like 'F%' or Country like 'G%' and Region is null;
-- 21
SELECT concat_ws(" ",EmployeeID, FirstName, LastName)As `FullName`,BirthDate, Country FROM northwind.employees 
where LastName='%K%' or LastName="%D" or BirthDate between '1963-01-01' and '1963-12-31';
