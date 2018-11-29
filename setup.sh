#!/bin/bash
#sudo git clone https://github.com/aidhedge/monitor

curl -sSL https://get.docker.com | sh
sudo usermod -aG docker ubuntu
sudo curl -L https://github.com/docker/compose/releases/download/1.21.2/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo touch .env
