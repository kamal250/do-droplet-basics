---
id: database-index
title: 3. Database (MariaDB)
sidebar_label: 3. Database (MariaDB)
slug: /database/
---

Set MariaDB [repository](https://downloads.mariadb.org/mariadb/repositories/#distro=Ubuntu) and then execute following commands to install.

```bash
apt update
apt install mariadb-server -y
```

After installation, secure your database installation, which will ask to configure root user password & several other questions.

```bash
mysql_secure_installation
```