---
id: mysql-optimization-index
title: 11. MySQL Optimization
sidebar_label: 11. MySQL Optimization
slug: /mysql-optimization/
---

[MySQLTuner-perl](https://github.com/major/MySQLTuner-perl) script is very useful to get appropriate parameters changes needed within `/etc/mysql/my.cnf` file.

I generally set `/etc/mysql/my.cnf` file as below:
```bash
[mysqld]
bind-address = server-ip # if you want to allow connection through IP, I generally avoid this if not needed.
innodb_read_io_threads = 64
innodb_write_io_threads = 64
interactive_timeout = 180
wait_timeout = 180
lock_wait_timeout = 180
log_error = /var/log/mysql/error.log
net_read_timeout = 90
net_write_timeout = 90
```

Reference URLs
1. [MySQLTuner-perl](https://github.com/major/MySQLTuner-perl)