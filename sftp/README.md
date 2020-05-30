### 8. sFTP (VSFTPD)

Follow the guideline from [DigitalOcean community](https://www.digitalocean.com/community/tutorials/how-to-set-up-vsftpd-for-a-user-s-directory-on-ubuntu-16-04)

I prefer to set `/bin/false` so user can't connect through terminal when we create sFTP.
```bash
usermod kamal -s /bin/false
```

Modify `/etc/ssh/sshd_config` file and set `Subsystem sftp internal-sftp` and then don't forget to restart SSH service - `service sshd restart` otherwise you'll get error `SFTP Connection Error Received unexpected end-of-file from SFTP server` when you try to connect it.

TODO :: I'll update this section later with more information such as FTP/sFTP/file permission, etc.

Following is the important block that will not allow user to move on unrestricted directories. Put that within `/etc/ssh/sshd_config` and restart SSH service `service sshd restart` which will restrict user `kamal` not to move beyond `/var/www/example` and access files within `/var/www/example/public_html`
```bash
Match User kamal
	ChrootDirectory /var/www/example
	ForceCommand internal-sftp
	AllowTCPForwarding no
	X11Forwarding no
```

Reference URLs
1. [DigitalOcean community](https://www.digitalocean.com/community/tutorials/how-to-set-up-vsftpd-for-a-user-s-directory-on-ubuntu-16-04)
2. [SFTP Connection Error Received unexpected end-of-file from SFTP server](https://www.digitalocean.com/community/questions/sftp-connection-error-received-unexpected-end-of-file-from-sftp-server)
