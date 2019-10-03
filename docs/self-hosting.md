---
title: Documentation
permalink: /
description: A Jekyll plugin that provides users with a traditional CMS-style graphical interface to author content and administer Jekyll sites. The project is divided into two parts. A Ruby-based HTTP API that handles Jekyll and filesystem operations, and a Javascript-based front end, built on that API.
---
## Running in production

If you are self-hosting a jekyll site and you want to use jekyll-admin as your front-end
then you can run it behind a nginx reverse proxy.

In this example 
- we have a dedicated user `jekyll`. 
- `GEM_HOME=/home/jekyll/gems`
- jekyll site at `/home/jekyll/example`
- generated content in `/home/jekyll/example/_site`

nginx config:

```nginx
server {
    listen 80;

    server_name www.example.com;
    root /hoem/jekyll/example/_site;

    location ^~ /admin {
        auth_basic "Administration";
        auth_basic_user_file /etc/nginx/htpasswd;

        proxy_pass http://127.0.0.1:4000/admin;

        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $http_host;
    }

    location ^~ /_api {
        auth_basic "Administration";
        auth_basic_user_file /etc/nginx/htpasswd;

        proxy_pass http://127.0.0.1:4000/_api;

        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $http_host;
    }
```

systemd unit file - tested on Ubuntu 18.04

```systemd
[Unit]
Description=example.com
Requires=network.target

[Service]
Type=simple
User=jekyll
Group=jekyll
WorkingDirectory=/home/jekyll/example
ExecStart=/home/jekyll/gems/bin/bundle exec /home/jekyll/gems/bin/jekyll serve -V --trace
TimeoutSec=30
RestartSec=15s
Restart=always

Environment=GEM_HOME=/home/jekyll/gems

# security settings - recommended
# NoNewPrivileges=yes
# PrivateTmp=yes
# PrivateDevices=yes
# DevicePolicy=closed
# ProtectSystem=strict
# ReadWritePaths=/home/jekyll/example
# #ReadOnlyPaths=
# ProtectControlGroups=yes
# ProtectKernelModules=yes
# ProtectKernelTunables=yes
# RestrictAddressFamilies=AF_UNIX AF_INET AF_INET6 AF_NETLINK
# RestrictRealtime=yes
# RestrictNamespaces=yes

[Install]
WantedBy=multi-user.target
```

