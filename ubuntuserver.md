================================================================================

- to show network connections
  ip a or ip address

================================================================================

# ssh server | https://linuxhint.com/enable-ssh-server-debian/#b1

- installing ssh server
  apt install openshh-server

- check ssh server status
  systemctl status ssh

- start and stop ssh server
  systemctl start/stop/restart ssh

- Adding SSH Service t0 System Startup
  systemctl enable ssh

- manage ssh server
  nano /etc/ssh/sshd_config

================================================================================

# check timezone

timedatectl status | grep "Time zone"

# change time zone

sudo timedatectl set-timezone America/Los_Angeles

================================================================================

# https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-20-04

# Install Node.js && npm

https://github.com/nodesource/distributions#installation-instructions

curl -fsSL https://deb.nodesource.com/setup_21.x | sudo -E bash - &&\
sudo apt-get install -y nodejs

node --version && npm --version

================================================================================

# MongoDB

https://www.mongodb.com/docs/v4.4/tutorial/install-mongodb-on-ubuntu/

================================================================================

# Git

sudo apt install git
git --version

# Cloning the source code

git clone git@github.com:jalfawadleh/mkad.git

================================================================================

# install npm dependencies

npm ci
npm start

Open http://localhost:3000 in your browser.

NODE_ENV=production npm start
Stop the app Ctrl+C.

# update dependencies

https://docs.npmjs.com/updating-packages-downloaded-from-the-registry

npm update
npm outdated
npm install

# update npm dependencies

https://www.freecodecamp.org/news/how-to-update-npm-dependencies/

$ npx npm-check-updates -u
$ npm install

================================================================================

# Nginx

https://gist.github.com/bradtraversy/cd90d1ed3c462fe3bddd11bf8953a896
https://nginx.org/en/docs/http/configuring_https_servers.html#single_http_https_server

https://blog.logrocket.com/how-to-run-a-node-js-server-with-nginx/
https://nginx.org/en/linux_packages.html#Ubuntu

https://linuxhint.com/nginx_block_geo_location/

sudo apt install curl gnupg2 ca-certificates lsb-release ubuntu-keyring
sudo apt install nginx

sudo unlink /etc/nginx/sites-available/default

Create a new configuration file for your Node.js application in the
/etc/nginx/sites-available/ directory. You can name it after your application or domain.

cd /etc/nginx/sites-available
sudo touch mkadifference.config

sudo nano /etc/nginx/sites-available/mkadifference.config

server {
listen 80;
server_name mkadifference.com;

    location / {
        proxy_pass http://localhost:3001; # Proxy pass to Node.js app on port 3001
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

}

server{
if ($host = www.mkadifference.com) {
return 301 https://mkadifference.com;
} # managed by Certbot

    listen 80;
    server_name demo.mkadifference.com;
    return 404; # managed by Certbot

}

sudo ln -s /etc/nginx/sites-available/mkadifference.config /etc/nginx/sites-enabled/

- let’s check the status of Nginx to confirm that the configuration is working properly:
  sudo nginx -t

- restart nginx
  sudo systemctl restart nginx

================================================================================

# UFW

sudo ufw allow proto tcp from any to any port 80,443
https://www.digitalocean.com/community/tutorials/ufw-essentials-common-firewall-rules-and-commands

https://www.cyberciti.biz/faq/how-to-delete-a-ufw-firewall-rule-on-ubuntu-debian-linux/

sudo ufw status
sudo ufw enable

sudo ufw allow 'Nginx Full'
sudo ufw app list

- Block Outgoing SMTP Mail
  sudo ufw deny out 25

- delete a rule
  sudo ufw status numbered
  sudo ufw delete 4

================================================================================

# HTTPS

https://certbot.eff.org/instructions?ws=nginx&os=ubuntufocal
sudo certbot --nginx

================================================================================

# TCPDUMP

sudo tcpdump -i enp0s25 not port 22

sudo tcpdump -i enp0s25 port 80, 450

sudo tcpdump -i enp0s25 not port 22 and not icmp and not port 53 and not mdns and not arp

================================================================================

# random

ps aux | grep node

kill -9 29266

# before build

in src/components/approuter replace http://localhost:3001/api/ to api/
npm run build

================================================================================

# pm2

https://pm2.keymetrics.io/docs/usage/quick-start/

- Install npm
  npm install pm2@latest -g

- start the server and keep it running
  pm2 start server.js

- list the servers running
  pm2 list

- autostart pm2 after restart
  pm2 startup

- remove it
  pm2 unstartup systemd
- save update
  pm2 save

# cluster mode

https://pm2.keymetrics.io/docs/usage/cluster-mode/

pm2 start server.js -i max

pm2 start server.js --watch --name MKaDifference.com
pm2 start server.js --watch --name demo

# production notes

https://itnext.io/how-to-package-your-react-component-for-distribution-via-npm-d32d4bf71b4f

# clam scan AV

clamscan --infected --remove -- recursive /

# web analytics

https://umami.is

https://ubuntu.com/engage/secure-kubernetes-at-the-edge

# https://gist.github.com/crtr0/2896891
