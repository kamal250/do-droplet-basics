# do-droplet-basics
Basics to prepare secure droplet for production ready environment

## Why this repository?
To help others (beginnners like me) to build secure [digitalocean droplets](https://www.digitalocean.com/products/droplets/) effectively.

## Useful Notes
1. I prefer Ubuntu OS for droplets so you'll find shell commands accordingly.
2. I've mentioned several references available on internet which are/were useful to me.
3. I've mostly specified `-y` option on installation commands which don't prompt me to confirm
4. If you are unsure about any command how to use it, then always execute it with `--help` or `-h`. e.g. `certbot --help`
5. Installed services can be found under `/etc/init.d` directory and service can be restarted using `/etc/init.d/sendmail restart`

## Summary of basics
| Sr. # | Step                                      |
|-------|:-----------------------------------------:|
| 1.    | Web Server (Apache/Nginx)                 |
| 2.    | Server Script (PHP 7.2)                   |
| 3.    | Database (MariaDB)                        |
| 4.    | Firewall, Security & non-default SSH port |
| 5.    | Server timezone                           |
| 6.    | SSL certificate (LetsEncrypt)             |
| 7.    | Swap memory                               |
| 8.    | sFTP (VSFTPD)                             |
| 9.    | SMTP (SendGrid)                           |
| 10.   | HTTP2                                     |
| 11.   | MySQL Optimization                        |
| 12.   | PHP-FPM Optimization                      |
| 13.   | Miscellaneous                             |

## Detailed information on basics

Before installation of any packages, it is recommended to update your system repositories:

```bash
apt update
```

It is also recommended to upgrade your packages at regular intervals and restart droplets:

```bash
apt upgrade -y
```


### 1. Web Server (Apache/Nginx)

There are many web servers available such as Apache, Nginx, Caddy, TomCat, etc. I am going to cover Apache & Nginx - widely used web servers.

### 1.1. Apache

Execute following command to install Apache

```bash
apt install apache2 -y
```

Commonly used Apache config file content, I've specified only for HTTP protocol, we don't need to worry about HTTPs protocol because we'll install [LetsEncrypt](https://letsencrypt.org/).

```bash
<VirtualHost *:80>
        # The ServerName directive sets the request scheme, hostname and port that
        # the server uses to identify itself. This is used when creating
        # redirection URLs. In the context of virtual hosts, the ServerName
        # specifies what hostname must appear in the request's Host: header to
        # match this virtual host. For the default virtual host (this file) this
        # value is not decisive as it is used as a last resort host regardless.
        # However, you must set it for any further virtual host explicitly.
        ServerName example.com
        ServerAlias www.example.com
        
        ServerAdmin developer@example.com
        DocumentRoot /var/www/example # I prefer to choose different root rather than /var/www/html
        DirectoryIndex index.php index.html index.htm
        Protocols h2 h2c http/1.1 # I prefer to add this whether I use HTTP2 or not
        <Directory "/var/www/example">
            Options FollowSymLinks
            AllowOverride All
            Require all granted
        </Directory>

        # Available loglevels: trace8, ..., trace1, debug, info, notice, warn,
        # error, crit, alert, emerg.
        # It is also possible to configure the loglevel for particular
        # modules, e.g.
        #LogLevel info ssl:warn

        ErrorLog ${APACHE_LOG_DIR}/example-error.log # I prefer to keep separate
        CustomLog ${APACHE_LOG_DIR}/example-access.log combined # I prefer to keep separate

        # For most configuration files from conf-available/, which are
        # enabled or disabled at a global level, it is possible to
        # include a line for only one particular virtual host. For example the
        # following line enables the CGI configuration for this host only
        # after it has been globally disabled with "a2disconf".
        #Include conf-available/serve-cgi-bin.conf

</VirtualHost>

# vim: syntax=apache ts=4 sw=4 sts=4 sr noet
```

Useful commands:

```bash
apache2 -t # To check syntax
a2ensite example.com.conf # To enable example.com site configuration
a2dissite example.com.conf # To disable example.com site configuration
a2enmod proxy_fcgi # To enable proxy_fcgi module
a2dismod proxy_fcgi # To disable proxy_fcgi module
a2enconf php7.2-fpm # To enable php7.2-fpm configuration
a2disconf php7.2-fpm # To disable php7.2-fpm configuration
```

### 1.2. Nginx

Execute following command to install Nginx

```bash
apt install nginx -y
```

### 2. Server Script (PHP 7.2)

To install PHP7.2, execute following command

```bash
apt install php7.2 -y
```

I am installing following commonly used extensions

```bash
apt install php7.2-common php7.2-mbstring php7.2-soap php7.2-gd php7.2-xml php7.2-intl php7.2-mysql php7.2-zip php7.2-curl php7.2-fpm -y
```

To install php7.2-mcrypt, follow this tutorial from [lukasmestan.com](https://lukasmestan.com/install-mcrypt-extension-in-php7-2/) and below is summary of commands:

```bash
apt -y install gcc make autoconf libc-dev pkg-config
apt -y install libmcrypt-dev
pecl install mcrypt-1.0.1
```

Note: If you notice message such as `E: Unable to locate package php7.2` then add `ondrej PPA` repository by executing `add-apt-repository -y ppa:ondrej/php`

Useful commands:

```bash
php -i | grep "mcrypt"
php -v # To get PHP cli version
php --ini # To get loaded ini file location
```
### 3. Database (MariaDB)

Set MariaDB [repository](https://downloads.mariadb.org/mariadb/repositories/#distro=Ubuntu) and then execute following commands to install.

```bash
apt update
apt install mariadb-server -y
```

After installation, secure your database installation, which will ask to configure root user password & several other questions.

```bash
mysql_secure_installation
```

### 4. Firewall, Security & non-default SSH port

### 4.1. Firewall

After login to your digitalocean panel, go to Networking->Firewalls and create [firewalls](https://www.digitalocean.com/docs/networking/firewalls/how-to/configure-rules/). (Maximum 10 droplets can be assigned to any firewall.)

I setup different firewalls such as Basic, Mail, Database, etc.

### 4.2. Security (Fail2ban)

Execute following commands to install Fail2ban service used to prevent brute-force attacks upon targetted ports [I generally use it for SSH]

```bash
apt install fail2ban -y
cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
```

Then modify `/etc/fail2ban/jail.local` and update values as below:

```bash
[DEFAULT]
---
bantime = 3600
findtime = 3600
maxretry = 6
```

Then restart the service and check results.

Useful commands:
```bash
service fail2ban restart
fail2ban-client status
fail2ban-client status sshd
```

### 4.3. non-default SSH port

I prefer to set non-default SSH port (i.e. any other port than 22). In order to set it, modify `/etc/ssh/sshd_config` file and set `Port <<your-desired-port>>`. Then restart service - `service sshd restart`.

### 5. Server timezone

Execute following command to change timezone of Ubuntu server.

```bash
dpkg-reconfigure tzdata
```

Then follow interface according to your requirement.
<p align="center">
  <img src="https://i.imgur.com/hWjtS36.png"/>
  <br/>
</p>

### 6. SSL certificate (LetsEncrypt)

Execute following commands to install letsencrypt on your server

```bash
add-apt-repository ppa:certbot/certbot
apt update
apt install python-certbot-apache -y # or python-certbot-nginx according to your web server
```

Then execute following command to get SSL certificates and letsencrypt will take care automatically to configure it properly.
```bash
certbot --apache -d example.com -d www.example.com
```

Reference URLs
1. [Apache](https://www.digitalocean.com/community/tutorials/how-to-secure-apache-with-let-s-encrypt-on-ubuntu-16-04)
2. [Nginx](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-16-04)
3. [LetsDebug](https://letsdebug.net/) - Useful when you have to debug SSL certificate related issues

Useful commands:
```bash
certbot -d example.com -d www.example.com --manual --preferred-challenges dns certonly # manual DNS challenge process
certbot certificates
certbot revoke --cert-name example.com
```

### 7. Swap memory

It is the best practice to setup swap memory on your server to keep it running healthy avoiding memory related issues. I generally prefer to create swap memory same as RAM size (check RAM using `free -h`). I have no idea what size it should be ideally.

```bash
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
cp /etc/fstab /etc/fstab.bak
echo '/swapfile none swap sw 0 0' | tee -a /etc/fstab # permanent swap
```

Reference URLs
1. [DigitalOcean community](https://www.digitalocean.com/community/tutorials/how-to-add-swap-space-on-ubuntu-16-04) - I like this community
2. [StackOverflow community](https://unix.stackexchange.com/a/463776/21770) - I also like this community.
3. [Change swap](https://www.digitalocean.com/community/questions/how-to-change-swap-size-on-ubuntu-14-04)

### 8. sFTP (VSFTPD)

Follow the guideline from [DigitalOcean community](https://www.digitalocean.com/community/tutorials/how-to-set-up-vsftpd-for-a-user-s-directory-on-ubuntu-16-04)

I prefer to set `/bin/false` so user can't connect through terminal when we create sFTP.
```bash
usermod kamal -s /bin/false
```

Modify `/etc/ssh/sshd_config` file and set `Subsystem sftp internal-sftp` and then don't forget to restart SSH service - `service sshd restart` otherwise you'll get error `SFTP Connection Error Received unexpected end-of-file from SFTP server` when you try to connect it.

TODO :: I'll update this section later with more information such as FTP/sFTP/file permission, etc.

Following is the important block that will not allow user to move on unrestricted directories. Put that within `/etc/ssh/sshd_config` and restart SSH service `service sshd restart` which will restrict user `kamal` not to move beyond `/var/www/example` and access files within `/var/www/example/public_html`
```bash
Match User kamal
	ChrootDirectory /var/www/example
	ForceCommand internal-sftp
	AllowTCPForwarding no
	X11Forwarding no
```

Reference URLs
1. [DigitalOcean community](https://www.digitalocean.com/community/tutorials/how-to-set-up-vsftpd-for-a-user-s-directory-on-ubuntu-16-04)
2. [SFTP Connection Error Received unexpected end-of-file from SFTP server](https://www.digitalocean.com/community/questions/sftp-connection-error-received-unexpected-end-of-file-from-sftp-server)

### 9. SMTP (SendGrid)

I prefer to use sendmail & sendgrid services for SMTP.

Sendmail process:
```bash
apt install sendmail -y
```

Modify `nano /etc/hosts` and update it as mentioned below.
```bash
127.0.1.1 droplet-name droplet-name
127.0.0.1 localhost localhost.localdomain droplet-name
```

SendGrid process:
Modify `/etc/mail/access` and set authorization as mentioned below. [Note: For SendGrid, username is always `apikey`]
```bash
AuthInfo:smtp.sendgrid.net "U:yourUserName" "P:yourPassword" "M:PLAIN"
```

Then add following lines within `/etc/mail/sendmail.mc` before `MAILER_DEFINITIONS`:
```bash
define(`SMART_HOST', `smtp.sendgrid.net')dnl
FEATURE(`access_db')dnl
define(`RELAY_MAILER_ARGS', `TCP $h 587')dnl
define(`ESMTP_MAILER_ARGS', `TCP $h 587')dnl
```

Then execute following commands:
```bash
cd /etc/mail
m4 sendmail.mc >sendmail.cf
makemap hash access < access
```

Don't forget to restart service - `service sendmail restart` or `/etc/init.d/sendmail restart`

Don't forget to create a firewall and add `25, 465, 587` ports to inbound rules.

Reference URLs
1. [Nico Amarilla's note](https://kosinix.com/install-sendmail-ubuntu-slow/)
2. [sendmail installation hanged](https://askubuntu.com/a/938450/792412)
3. [SendGrid](https://sendgrid.com/docs/for-developers/sending-email/sendmail/)

Useful commands:
```bash
echo "test message" | sendmail -v recipient@example.com
```

### 10. HTTP2

You'll notice performance improvements when you enable HTTP2 protocol. It is mendatory to enable HTTPs on your domain.

Execute following commands to enable http2 protocol. This is specific to Apache2 web server and `apache2 -v` (i.e. Apache version ) must be greater than `2.4.24`.
```bash
apt install php7.2-fpm 
a2enmod proxy_fcgi setenvif
a2enconf php7.2-fpm 
a2dismod php7.2
service apache2 restart
a2dismod mpm_prefork 
a2enmod mpm_event 
service apache2 restart
service php7.2-fpm restart
# Add this line - `Protocols h2 h2c http/1.1` to your conf file, we've already added.
a2enmod http2
service apache2 restart
```

Reference URLs
1. [Tom Davis's note](https://techwombat.com/enable-http2-apache-ubuntu-16-04/)

### 11. MySQL Optimization

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

### 12. PHP-FPM Optimization

I generally set following values in `/etc/php/7.1/fpm/pool.d/www.conf` file according to RAM of server and keep `pm = dynamic`:

`16 GB RAM`
```bash
pm.max_children = 750
pm.start_servers = 40
pm.min_spare_servers = 20
pm.max_spare_servers = 60
pm.max_requests = 1000
```

`8 GB RAM`
```bash
pm.max_children = 375
pm.start_servers = 40
pm.min_spare_servers = 20
pm.max_spare_servers = 60
pm.max_requests = 1000
```

Note: Above specific values are according to my experience, I prefer to avoid having over-broad discussion.

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

<li>To export SQLDump with procedures using `mysqldump` command</li>

```bash
mysqldump -h <localhost> -u <root-username> -p<root-password> <dbname> --routines > /filename.sql
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
