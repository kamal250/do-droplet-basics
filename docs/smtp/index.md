---
id: smtp-index
title: 9. SMTP (SendGrid)
sidebar_label: 9. SMTP (SendGrid)
slug: /smtp-sendgrid/
---

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