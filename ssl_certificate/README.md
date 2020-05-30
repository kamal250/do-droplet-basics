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