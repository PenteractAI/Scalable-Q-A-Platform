TODO: The RUNNING.md outlines steps needed to run the application separately for the development mode and the production mode.

TODO: For merits, the RUNNING.md also outlines the steps needed to use Kubernetes to run the application with Minikube (or somilar), using kubernetes configuration files created as parts of the passing with merits requirements

- minikube start
- minikube dashboard
- Ctrl+Z to pause the dashboard process
- bg
- Check that the dashboard is running background: jobs
- cd qa-api
- minikube image build -t qa-api -f Dockerfile.prod .
- cd ../qa-ui/
- minikube image build -t qa-ui -f Dockerfile.prod .
- cd ../llm-api/
- minikube image build -t llm-api -f Dockerfile .
- cd ../nginx
- minikube image build -t nginx -f Dockerfile . 
- kubectl apply -f kubernetes/qa-ui-deployment.yaml
- kubectl apply -f kubernetes/qa-ui-service.yaml
- kubectl apply -f kubernetes/llm-api-deployment.yaml
- kubectl apply -f https://raw.githubusercontent.com/cloudnative-pg/cloudnative-pg/release-1.19/releases/cnpg-1.19.1.yaml
- kubectl apply -f kubernetes/qa-database-cluster.yaml
- cd flyway
- minikube image build -t qa-flyway -f Dockerfile .
- kubectl apply -f kubernetes/qa-flyway-job.yaml
- kubectl apply -f kubernetes/qa-api-deployment.yaml
- kubectl apply -f kubernetes/qa-api-service.yaml
- kubectl apply -f kubernetes/qa-api-deployment-hpa.yaml
- kubectl apply -f kubernetes/qa-redis-deployment.yaml
- kubectl apply -f kubernetes/qa-redis-service.yaml
- kubectl apply -f kubernetes/nginx-deployment.yaml
- kubectl apply -f kubernetes/nginx-configmap.yaml
- kubectl apply -f kubernetes/nginx-service.yaml



# Accessing the application
- minikube service nginx-service --url