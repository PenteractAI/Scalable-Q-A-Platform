#!/bin/bash

# Define path to the different services
QA_API_PATH="qa-api"
QA_UI_PATH="qa-ui"
LLM_API_PATH="llm-api"
NGINX_PATH="nginx"
FLYWAY_PATH="flyway"

# Build the Docker images with Minikube
echo "Building Docker images..."
cd $QA_API_PATH
minikube image build -t qa-api:latest -f ./Dockerfile.prod .

cd ../$QA_UI_PATH
minikube image build -t qa-ui:latest -f ./Dockerfile.prod .

cd ../$LLM_API_PATH
minikube image build -t llm-api:latest -f ./Dockerfile .

cd ../$NGINX_PATH
minikube image build -t nginx:latest -f ./Dockerfile .

cd ../$FLYWAY_PATH
minikube image build -t qa-flyway:latest -f ./Dockerfile .

cd ..

# Ensure nginx-conf ConfigMap exists
#kubectl create configmap nginx-conf --from-file=nginx/nginx_kubernetes.conf

# Install CloudNative PG
echo "Installing CloudNative PG..."
kubectl apply -f https://raw.githubusercontent.com/cloudnative-pg/cloudnative-pg/release-1.19/releases/cnpg-1.19.1.yaml

# Install Prometheus operator
kubectl apply -f https://raw.githubusercontent.com/prometheus-operator/prometheus-operator/main/bundle.yaml --force-conflicts=true --server-side=true

# Apply the configurations for Kubernetes
echo "Applying Kubernetes configurations..."
kubectl apply -f kubernetes/