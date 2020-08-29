---
id: swap-memory-index
title: 7. Swap memory
sidebar_label: 7. Swap memory
slug: /swap-memory/
---

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