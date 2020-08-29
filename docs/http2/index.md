---
id: http2-index
title: 10. HTTP2
sidebar_label: 10. HTTP2
slug: /http2/
---

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