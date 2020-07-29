### 13. Miscellaneous

List of commands I am using
```bash
cat /etc/passwd # To get the list of users
netstat -plnt # To get list of running services on different ports
lsof -i :80 # To check process running on port 80
top -c -p `pgrep apache2 -d','` # TOP showing apache process
du -a /home | sort -n -r | head -n 5 # To sort directory home by size
journalctl -n 100 --no-pager # To get the last 100 lines from journalctl
journalctl --unit=apache2 -n 100 --no-pager # To get the last 100 lines from journalctl of apache2 service
kill $( lsof -i:80 -t ) # To kill all the process running on port 80
ln -s ../sites-available/nginx-conf . # To create symlink of nginx-conf file from ../sites-available directory to current directory (.)

find /home/directory/ -type d -exec chmod 755 {} \;
find /home/directory/ -type f -exec chmod 644 {} \;
or
chmod -R a=r,a+X,u+w /your/path

#Note:  chmod -R ugo+rwx directory == chmod -R 0777 directory

#Assign group to newly created files under a directory:
chmod g+s <dir>
chgrp <group> <dir>

#Assign user to newly created files under a directory:
setfacl -R -m u:<group>:rwx <dir>
# e.g. setfacl -R -m u:www-data:rwx /home/directory/

# To remove files from /root directory if rm -rf not working
find /root/ -name 'api_data*'| xargs rm

# List files by size in linux with type
ls --sort=size *.avi

# To replace one keyword with another 
sed 's#search-string#replace-string#g' old_file.sql > new_file.sql

# To get memory usage of apache process
ps -ylC apache2 | awk '{x += $8;y += 1} END {print "Apache Memory Usage (MB): "x/1024; print "Average Proccess Size (MB): "x/((y-1)*1024)}'

# To change extension from PNG to JPG in a directory
find /directory/to/change -name "*.png" -exec bash -c 'mv "$1" "${1%.png}".jpg' - '{}' \;

```

List of commands MySQL queries or MySQL specific commands I am using

<ul>
<li>To get the sizes of databases;</li>

```bash
SELECT table_schema "DB Name",
ROUND(SUM(data_length + index_length) / 1024 / 1024, 1) "DB Size in MB" 
FROM information_schema.tables 
GROUP BY table_schema;
```

<li>To get the list of MyISAM engines & convert all of them to InnoDB (This will give ALTER TABLE query list)</li>

```bash
SELECT CONCAT('ALTER TABLE ',TABLE_NAME,' ENGINE=InnoDB;') 
FROM INFORMATION_SCHEMA.TABLES
WHERE ENGINE='MyISAM'
AND table_schema = 'DB Name';
```

<li>Add indexing to tables</li>

```bash
ALTER TABLE `Table Name` ADD INDEX( `column1`, `column2`);
```

<li>To determine size of tables</li>

```bash
SELECT table_name AS "Table",
ROUND(((data_length + index_length) / 1024 / 1024), 2) AS "Size (MB)"
FROM information_schema.TABLES
WHERE table_schema = "DB Name"
ORDER BY (data_length + index_length) DESC;
```

<li>To export global variables in a file using `mysql` command</li>

```bash
mysql -u root -A -e"SHOW GLOBAL VARIABLES;" > MySQLCurrentSettings.txt
```

<li>To check all transactions performed over INNODB table</li>

```bash
SHOW ENGINE INNODB STATUS;
```

<li>To show engine of all tables from a database</li>

```bash
SELECT TABLE_NAME, ENGINE FROM information_schema.TABLES where TABLE_SCHEMA = 'DB Name';
```

<li>To drop all tables from database, prepare drop queries</li>

```bash
SELECT concat('DROP TABLE IF EXISTS `', table_name, '`;')
FROM information_schema.tables
WHERE table_schema = 'DB Name';
```

<li>To get foreign key of a table</li>

```bash
SELECT TABLE_NAME, COLUMN_NAME, CONSTRAINT_NAME,
REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE REFERENCED_TABLE_SCHEMA = 'DB Name'
AND REFERENCED_TABLE_NAME = 'table_name';
```

<li>To kill process in Sleep mode or running since more than 300</li>

```bash
SELECT concat('KILL ',id,';') from information_schema.processlist where Command='Sleep'; or SELECT concat('KILL ',id,';') from information_schema.processlist where Time>'300';
```

<li>To export SQLDump with procedures using `mysqldump` command</li>

```bash
mysqldump -h <localhost> -u <root-username> -p<root-password> <dbname> --routines > /filename.sql
```

<li>To export SQLDump using `mysqldump` command and compress (i.e. .sql.gz)</li>

```bash
mysqldump -h <localhost> -u <root-username> -p<root-password> <dbname> --routines | gzip -c > /path/to/filename.sql.gz
```

<li>To import compressed dump (.sql.gz) using `mysql` command</li>

```bash
zcat /path/to/filename.sql.gz | mysql -h <localhost> -u <root-username> -p<root-password> <dbname>
```

</ul>

Set authentication on MongoDB

Login to `mongo` shell and then execute following commands:
```bash
use admin
db.createUser({ user: "admin", pwd: "adminpassword", roles: [{ role: "userAdminAnyDatabase", db: "admin" }] })
```

Then modify `mongo.conf`
```bash
nano /etc/mongod.conf
```

Set following value in it and then restart mongo - `service mongod restart`:
```bash
security:
    authorization: enabled
```
Now, let us create specific user through `mongo` shell
```bash
use admin
db.auth("admin", "adminpassword")
use yourdatabase
db.createUser({ user: "youruser", pwd: "yourpassword", roles: [{ role: "dbOwner", db: "yourdatabase" }] })
```