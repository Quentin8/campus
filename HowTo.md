
## Pre requisite
Install Docker and docker compose :
```
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```
Then give permission to current user on docker (disconnect and reconnect from session after)
```
sudo usermod -aG docker $USER
```
## Create images
### Create backend image
Retrieve APP on github (Front and Backend) :
```
git clone -b master https://github.com/willinho10/campus.git
```
Create docker images (if doesn't exists yet) /!\ docker build command create an image on the same architecture as the host
==> Use docker buildx with qemu to emulate arm architecture (if want to run on rpy) : https://medium.com/@artur.klauser/building-multi-architecture-docker-images-with-buildx-27d80f7e2408

Build the server image :
* Be inside campus directory
```
docker build -f Docker/Dockerfile.nodeapp -t campusfront .
```
### Create backend image :
Build the front image :
* Be inside campus directory
```
docker build -f Docker/Dockerfile.server -t campusbackend .
```
## Launch the APP
Be inside campus/Docker directory
```
docker compose up
```