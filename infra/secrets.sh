#!/bin/bash
# ==============================================================================
# PHASE 11: GCP SECRET MANAGER SCRIPT (infra/secrets.sh)
# Description: Creates generic secrets in GCP Secret Manager.
# Execution: Run once locally. Be sure to supply actual secret values interactively
#            or replace the 'ADD_YOUR_VALUE_HERE' locally before running.
# ==============================================================================

set -e

PROJECT_ID="next360-prod"

echo "➡️ Setting project to $PROJECT_ID..."
gcloud config set project $PROJECT_ID

# Define your secrets here.
SECRETS=(
  "DATABASE_URL"
  "REDIS_URL"
  "JWT_SECRET"
  "JWT_REFRESH_SECRET"
  "GCS_BUCKET_NAME"
  "GCS_PROJECT_ID"
  "ALGOLIA_APP_ID"
  "ALGOLIA_API_KEY"
  "RAZORPAY_KEY_ID"
  "RAZORPAY_KEY_SECRET"
  "RAZORPAY_WEBHOOK_SECRET"
  "RESEND_API_KEY"
  "MSG91_API_KEY"
  "MSG91_SENDER_ID"
  "FRONTEND_URL"
  "ADMIN_URL"
  "VENDOR_URL"
)

for SECRET_NAME in "${SECRETS[@]}"; do
  echo "➡️ Creating secret: $SECRET_NAME"
  gcloud secrets create $SECRET_NAME --replication-policy="automatic" || true
  
  # For production security, don't supply string directly here unless this file is safely kept local.
  # Let's populate the initial empty value - user needs to update these via GCP Console or provide them directly.
  echo -n "ADD_YOUR_VALUE_HERE" | gcloud secrets versions add $SECRET_NAME --data-file=- || true
done

echo "✅ Secrets created. Please update their values in the Google Cloud Console."
