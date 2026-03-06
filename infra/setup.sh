#!/bin/bash
# ==============================================================================
# PHASE 11: GCP PROJECT SETUP SCRIPT (infra/setup.sh)
# Description: Enables APIs, creates Artifact Registry, Cloud SQL, Redis, GCS, 
#              and configures Service Accounts.
# Execution: Run once locally to bootstrap GCP before deployment.
# ==============================================================================

set -e # Exit immediately if a command exits with a non-zero status.

PROJECT_ID="next360-prod"
REGION="asia-south1"

echo "➡️ Setting project to $PROJECT_ID..."
gcloud config set project $PROJECT_ID

echo "➡️ Enabling Required APIs..."
gcloud services enable \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  artifactregistry.googleapis.com \
  secretmanager.googleapis.com \
  sqladmin.googleapis.com \
  redis.googleapis.com \
  storage.googleapis.com \
  compute.googleapis.com \
  dns.googleapis.com

echo "➡️ Creating Artifact Registry repo..."
gcloud artifacts repositories create next360 \
  --repository-format=docker \
  --location=$REGION \
  --description="Next360 Docker repository" || true

echo "➡️ Creating Cloud SQL Instance (PostgreSQL)..."
# Using Private IP requires a VPC network setup which we assume default or already configured correctly via IAM
gcloud sql instances create next360-db \
  --database-version=POSTGRES_15 \
  --tier=db-g1-small \
  --region=$REGION \
  --no-assign-ip \
  --enable-bin-log \
  --backup-start-time="02:00" || true

echo "➡️ Creating Database and User..."
gcloud sql databases create next360 --instance=next360-db || true
gcloud sql users create next360_user --instance=next360-db --password="CHANGE_ME_LATER" || true

echo "➡️ Creating Memorystore (Redis)..."
gcloud redis instances create next360-redis \
  --size=1 \
  --region=$REGION \
  --tier=BASIC \
  --redis-version=redis_7_0 || true

echo "➡️ Creating Google Cloud Storage Bucket for Assets..."
gcloud storage buckets create gs://next360-assets --location=$REGION --uniform-bucket-level-access || true

echo "➡️ Setting public read access to GCS bucket..."
gcloud storage buckets add-iam-policy-binding gs://next360-assets \
  --member=allUsers \
  --role=roles/storage.objectViewer || true

echo "➡️ Configuring CORS for GCS bucket..."
cat <<EOF > /tmp/cors.json
[
  {
    "origin": ["https://next360.in", "https://admin.next360.in", "https://vendor.next360.in"],
    "method": ["GET", "OPTIONS"],
    "responseHeader": ["Content-Type"],
    "maxAgeSeconds": 3600
  }
]
EOF
gcloud storage buckets update gs://next360-assets --cors-file=/tmp/cors.json

echo "➡️ Creating Service Account for Cloud Run..."
gcloud iam service-accounts create next360-cloudrun \
    --description="Service Account for Next360 Cloud Run services" \
    --display-name="Next360 Cloud Run SA" || true

echo "➡️ Assigning roles to Service Account..."
SA_EMAIL="next360-cloudrun@${PROJECT_ID}.iam.gserviceaccount.com"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:${SA_EMAIL}" \
  --role="roles/cloudsql.client"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:${SA_EMAIL}" \
  --role="roles/redis.viewer"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:${SA_EMAIL}" \
  --role="roles/storage.objectAdmin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:${SA_EMAIL}" \
  --role="roles/secretmanager.secretAccessor"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:${SA_EMAIL}" \
  --role="roles/pubsub.publisher"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:${SA_EMAIL}" \
  --role="roles/pubsub.subscriber"

echo "✅ GCP Setup Complete!"
