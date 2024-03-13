# Run the project
## Docker
### Development mode
```shell
docker compose --profile migrate  -f .\docker-compose.yml up -d
```
Wait for the logs of qa-api to show "Listening on http://localhost:7777/
"
### Production mode
```shell
docker compose --profile migrate  -f .\docker-compose.prod.yml up -d
```
Wait for the logs of qa-api to show "Listening on http://localhost:7777/
"
## Kubernetes
### Deploy the application
The application can be deployed on Kubernetes using the following commands at the root of the project:
- minikube start

Ensure that you have a fresh installation:
- minikube delete deployments --all
- minikube delete services --all

Build the different images:
- ./build_images.sh

### Accessing the application
Then, the application can be accessed through using:
- minikube service nginx-service --url

### Open Minikube dashboard
- minikube dashboard
- Ctrl + Z
- bg

### Access Grafana
On the other hand, Grafana can be accessed using:
- kubectl create deployment grafana --image=docker.io/grafana/grafana:latest
- kubectl expose deployment grafana --port 3000
- kubectl port-forward svc/grafana 3000:3000

username: admin, password: admin