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
| 1.    | [Web Server (Apache/Nginx)](https://github.com/kamal250/do-droplet-basics/blob/master/web_server/README.md)                 |
| 2.    | [Server Script (PHP 7.2)](https://github.com/kamal250/do-droplet-basics/blob/master/server_script/README.md)                   |
| 3.    | [Database (MariaDB)](https://github.com/kamal250/do-droplet-basics/blob/master/database/README.md)                        |
| 4.    | [Firewall, Security & non-default SSH port](https://github.com/kamal250/do-droplet-basics/blob/master/security/README.md) |
| 5.    | [Server timezone](https://github.com/kamal250/do-droplet-basics/blob/master/server_timezone/README.md)                           |
| 6.    | [SSL certificate (LetsEncrypt)](https://github.com/kamal250/do-droplet-basics/blob/master/ssl_certificate/README.md)             |
| 7.    | [Swap memory](https://github.com/kamal250/do-droplet-basics/blob/master/swap_memory/README.md)                               |
| 8.    | [sFTP (VSFTPD)](https://github.com/kamal250/do-droplet-basics/blob/master/sftp/README.md)                             |
| 9.    | [SMTP (SendGrid)](https://github.com/kamal250/do-droplet-basics/blob/master/smtp/README.md)                           |
| 10.   | [HTTP2](https://github.com/kamal250/do-droplet-basics/blob/master/http2/README.md)                                     |
| 11.   | [MySQL Optimization](https://github.com/kamal250/do-droplet-basics/blob/master/mysql/README.md)                        |
| 12.   | [PHP-FPM Optimization](https://github.com/kamal250/do-droplet-basics/blob/master/php_fpm/README.md)                      |
| 13.   | [Miscellaneous](https://github.com/kamal250/do-droplet-basics/blob/master/miscellaneous/README.md)                             |

## Detailed information on basics

Before installation of any packages, it is recommended to update your system repositories:

```bash
apt update
```

It is also recommended to upgrade your packages at regular intervals and restart droplets:

```bash
apt upgrade -y
```