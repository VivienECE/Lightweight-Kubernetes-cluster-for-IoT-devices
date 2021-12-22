# Project_BDE

The objective of our project is the installation of k3s on Raspberry Pi and the deployment of a data application.

- Requirements
- Installation
- Deployement
- Problems encountered

----

## 1. Requirements

----
To do this project, we use a Raspberry Pi 3B+. We first use the Raspberry PI OS, known as Raspbian. However, we then use ubuntu 20.04, because we needed a version of Docker which was not available on Raspbian.

The project builds on k3s, a smaller version of Kubernetes that is better suited to devices with less capacity.

To use k3s, we used k3d, a tool that allow us to create a Kubernetes cluster on Docker containers.

So we had to download Docker and kubectl before k3d.

## 2. Installation

----

docker
kubectl
k3d

## Docker

`sudo apt-get update`

`sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release`

`curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg`

`echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null`

`sudo apt-get update`

`sudo apt-get install docker-ce docker-ce-cli containerd.io`

### Kubectl

We used snap to install kubectl:

`sudo apt update`

`sudo apt install snapd`

`sudo snap install kubectl --classic`

### K3d

`wget: wget -q -O - https://raw.githubusercontent.com/rancher/k3d/main/install.sh | bash`

## 3. Deployement

----
We can now create a cluster with one server and 2 agents:

`k3d cluster create --agents 2 --port "8080:80@loadbalancer" --volume /mnt/data:/mnt/data`
