---
id: docs-index
title: Docs
sidebar_label: Home
slug: /
---

## Why this repository?
To help others (beginners like me) to build secure [digitalocean droplets](https://www.digitalocean.com/products/droplets/) effectively.

## Useful Notes
1. I prefer Ubuntu OS for droplets so you'll find shell commands accordingly.
2. I've mentioned several references available on internet which are/were useful to me.
3. I've mostly specified `-y` option on installation commands which don't prompt me to confirm
4. If you are unsure about any command how to use it, then always execute it with `--help` or `-h`. e.g. `certbot --help`
5. Installed services can be found under `/etc/init.d` directory and service can be restarted using `/etc/init.d/sendmail restart`

## Summary of basics
| Sr. # | Step                                      |
|-------|:-----------------------------------------:|
| 1.    | [Web Server (Apache/Nginx)](web-server)                 |
| 2.    | [Server Script (PHP 7.2)](server-script)                   |
| 3.    | [Database (MariaDB)](database)                        |
| 4.    | [Firewall, Security & non-default SSH port](firewall-security-and-non-default-ssh-port) |
| 5.    | [Server timezone](server-timezone)                           |
| 6.    | [SSL certificate (LetsEncrypt)](ssl-certificate-letsencrypt)             |
| 7.    | [Swap memory](swap-memory)                               |
| 8.    | [sFTP (VSFTPD)](sftp-vsftpd)                             |
| 9.    | [SMTP (SendGrid)](smtp-sendgrid)                           |
| 10.   | [HTTP2](http2)                                     |
| 11.   | [MySQL Optimization](mysql-optimization)                        |
| 12.   | [PHP-FPM Optimization](php-fpm-optimization)                      |
| 13.   | [Miscellaneous](miscellaneous)                             |

## Detailed information on basics

Before installation of any packages, it is recommended to update your system repositories:

```bash
apt update
```

It is also recommended to upgrade your packages at regular intervals and restart droplets:

```bash
apt upgrade -y
```