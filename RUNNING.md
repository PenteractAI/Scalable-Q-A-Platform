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
- kubectl apply -f https://raw.githubusercontent.com/prometheus-operator/prometheus-operator/main/bundle.yaml --force-conflicts=true --server-side=true
- kubectl apply -f prometheus_rbac.yaml
- kubectl apply -f prometheus_instance.yaml

[//]: # (- kubectl port-forward svc/prometheus-operated 9090:9090)
- kubectl create deployment grafana --image=docker.io/grafana/grafana:latest
- kubectl expose deployment grafana --port 3000
- kubectl port-forward svc/grafana 3000:3000
- username: admin, password: admin
- kubectl apply -f expose_prometheus.yaml
- Grafana will be able to pull the metrics from http://<node_ip>:30900. To view the <node_ip>, run kubectl get nodes -o wide.
  Enter http://<node_ip>:30900 in the URL box, then click Save & Test:

# Accessing the application
- minikube service nginx-service --url