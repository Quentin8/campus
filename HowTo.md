
## Infos
This app is hosted on a cloud server : 10.30.50.201
Web Interface : http://10.30.50.201:4200/
If this IP change you need to change every occurence of this one inside de campusAp and express files.

* To use the camera you need to be connected to the Campus-connecte network
* The express server listens to '*' hosts, that means if this VM is exposed publicly everyon can access the API endpoints

## On server
### Administration
In order to access this VM, you need to be connected on ISEN-PROJECTS or Campus-connecte.
```
ssh hopital@10.30.50.201
```
To launch the APP
```
cd campus && podman-compose up
```
To shutdown the APP
```
cd campus && podman-compose down
```
## Local (Docker)
Install Docker and docker compose :
```
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```
Then give permission to current user on docker (disconnect and reconnect from session after)
```
sudo usermod -aG docker $USER
```
### Create front image
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