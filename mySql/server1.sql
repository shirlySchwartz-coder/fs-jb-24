set global local_infile = on;

load data local infile 'E:so.csv' into table servers
fields terminated by ','
ENCLOSED BY '"' 
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES

set server_start=if(@server_start='',null, @server_start) ;