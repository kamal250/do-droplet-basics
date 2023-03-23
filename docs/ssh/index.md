---
id: ssh-index
title: 15. SSH
sidebar_label: 15. SSH
slug: /ssh/
---

To get remote access of IOT device, you should have [Teleport](https://goteleport.com/) installed on device and then you can create SSH tunnel as mentioned below:

## SSH Tunnel
1. Connect to teleport, install [Ngrok](https://ngrok.com/) and execute `ngrok tcp 22` command, it will show you tcp forwarding line such as `tcp://8.tcp.ngrok.io:12112 -> localhost:22`
2. Then connect your local terminal and execute SSH tunnel command as `ssh -L 0.0.0.0:3000:0.0.0.0:3000 root@8.tcp.ngrok.io -p 12112` [Note: replace actual values & port 3000]
3. You will be asked to enter root password. [I assume you have it.]
4. Then open [http://localhost:3000](http://localhost:3000) in the browser so basically we have forwarded whatever service running on `3000` port.
