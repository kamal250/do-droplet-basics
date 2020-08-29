---
id: server-script-index
title: 2. Server Script (PHP 7.2)
sidebar_label: 2. Server Script (PHP 7.2)
slug: /server-script/
---

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

To install php7.3-mcrypt, follow same steps as explained above for php7.2-mcrypt but change `mcrypt` version:

```bash
apt -y install gcc make autoconf libc-dev pkg-config
apt -y install libmcrypt-dev
pecl install mcrypt-1.0.2
```

If you get issue such as mentioned below:
```bash
sh: 1: phpize: not found
ERROR: 'phpize' failed`
```

then install respective dev extension. For `php7.2`, execute command - `apt install php7.2-dev -y` and for `php7.3`, execute command - `apt install php7.3-dev -y` and then continue installing `mcrypt`.

You should activate it once installation is completed. After installation, you'll be given path such as `/usr/lib/php/20180731/mcrypt.so` or `/usr/lib/php/20170718/mcrypt.so` depending upon your PHP API. Note down it as we'll use it later.

Now, go to your installed PHP directory i.e. `/etc/php/7.3/mods-available` or `/etc/php/7.2/mods-available` and then copy any existing .ini file (I'll choose mbstring - `cp mbstring.ini mcrypt.ini`) and paste `/usr/lib/php/<version>/mcrypt.so` path as extension i.e. `extension=/usr/lib/php/20180731/mcrypt.so`.

Then execute following commands (Replace x with your PHP version):
```bash
cd /etc/php/7.x/fpm/conf.d && ln -s /etc/php/7.x/mods-available/mcrypt.ini 20-mcrypt.ini
cd /etc/php/7.x/cli/conf.d && ln -s /etc/php/7.x/mods-available/mcrypt.ini 20-mcrypt.ini
service php7.x-fpm restart
```

Useful commands:

```bash
php -i | grep "mcrypt"
php -v # To get PHP cli version
php --ini # To get loaded ini file location
```

Reference URLs
1. [lukasmestan.com](https://lukasmestan.com/install-mcrypt-extension-in-php7-2/)
2. [StackOverflow](https://stackoverflow.com/a/58966071/639293)