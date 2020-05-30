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