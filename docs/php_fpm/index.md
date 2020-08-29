---
id: php-fpm-optimization-index
title: 12. PHP-FPM Optimization
sidebar_label: 12. PHP-FPM Optimization
slug: /php-fpm-optimization/
---

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