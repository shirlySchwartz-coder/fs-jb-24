-- select `Full Name` , date_add(dd, 8, BirthDate) as `Birth Date`  from employees
select adddate(BirthDate, INTERVAL 8 DAY ) as `Birth Date`,  ReportsTo As Manager   from employees