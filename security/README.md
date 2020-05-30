### 4. Firewall, Security & non-default SSH port

### 4.1. Firewall

After login to your digitalocean panel, go to Networking->Firewalls and create [firewalls](https://www.digitalocean.com/docs/networking/firewalls/how-to/configure-rules/). (Maximum 10 droplets can be assigned to any firewall.)

I setup different firewalls such as Basic, Mail, Database, etc.

### 4.2. Security (Fail2ban)

Execute following commands to install Fail2ban service used to prevent brute-force attacks upon targetted ports [I generally use it for SSH]

```bash
apt install fail2ban -y
cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
```

Then modify `/etc/fail2ban/jail.local` and update values as below:

```bash
[DEFAULT]
---
bantime = 3600
findtime = 3600
maxretry = 6
```

Then restart the service and check results.

Useful commands:
```bash
service fail2ban restart
fail2ban-client status
fail2ban-client status sshd
```

### 4.3. non-default SSH port

I prefer to set non-default SSH port (i.e. any other port than 22). In order to set it, modify `/etc/ssh/sshd_config` file and set `Port <<your-desired-port>>`. Then restart service - `service sshd restart`.
