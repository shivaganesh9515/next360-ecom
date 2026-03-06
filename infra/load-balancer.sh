#!/bin/bash
# ==============================================================================
# PHASE 11: GCP LOAD BALANCER & ROUTING (infra/load-balancer.sh)
# Description: Creates IP address, SSL cert, Negs, Load Balancer, and Cloud Armor.
# Execution: Run after services are initially deployed to Cloud Run.
# ==============================================================================

set -e

PROJECT_ID="next360-prod"
REGION="asia-south1"

echo "➡️ Setting project to $PROJECT_ID..."
gcloud config set project $PROJECT_ID

echo "➡️ 1. Reserving static external IP..."
gcloud compute addresses create next360-ip --global || true

echo "➡️ 2. Creating Google-managed SSL cert..."
gcloud compute ssl-certificates create next360-cert \
    --domains="next360.in,www.next360.in,admin.next360.in,vendor.next360.in,api.next360.in" --global || true

echo "➡️ 3. Creating Serverless NEGs..."
gcloud compute network-endpoint-groups create neg-web \
    --region=$REGION --network-endpoint-type=serverless --cloud-run-service=next360-web || true

gcloud compute network-endpoint-groups create neg-admin \
    --region=$REGION --network-endpoint-type=serverless --cloud-run-service=next360-admin || true

gcloud compute network-endpoint-groups create neg-vendor \
    --region=$REGION --network-endpoint-type=serverless --cloud-run-service=next360-vendor || true

gcloud compute network-endpoint-groups create neg-api \
    --region=$REGION --network-endpoint-type=serverless --cloud-run-service=next360-api || true

echo "➡️ 4. Creating Backend Services..."
gcloud compute backend-services create backend-web --global || true
gcloud compute backend-services add-backend backend-web --global --network-endpoint-group=neg-web --network-endpoint-group-region=$REGION || true

gcloud compute backend-services create backend-admin --global || true
gcloud compute backend-services add-backend backend-admin --global --network-endpoint-group=neg-admin --network-endpoint-group-region=$REGION || true

gcloud compute backend-services create backend-vendor --global || true
gcloud compute backend-services add-backend backend-vendor --global --network-endpoint-group=neg-vendor --network-endpoint-group-region=$REGION || true

gcloud compute backend-services create backend-api --global || true
gcloud compute backend-services add-backend backend-api --global --network-endpoint-group=neg-api --network-endpoint-group-region=$REGION || true

echo "➡️ 5. Creating URL Map & Host Rules..."
gcloud compute url-maps create next360-url-map --default-service backend-web || true

gcloud compute url-maps add-path-matcher next360-url-map \
    --default-service backend-web \
    --path-matcher-name=path-web \
    --new-hosts="next360.in,www.next360.in" || true

gcloud compute url-maps add-path-matcher next360-url-map \
    --default-service backend-admin \
    --path-matcher-name=path-admin \
    --new-hosts="admin.next360.in" || true

gcloud compute url-maps add-path-matcher next360-url-map \
    --default-service backend-vendor \
    --path-matcher-name=path-vendor \
    --new-hosts="vendor.next360.in" || true

gcloud compute url-maps add-path-matcher next360-url-map \
    --default-service backend-api \
    --path-matcher-name=path-api \
    --new-hosts="api.next360.in" || true

echo "➡️ 6. Creating HTTPS Proxy and Forwarding Rule..."
gcloud compute target-https-proxies create next360-https-proxy \
    --ssl-certificates=next360-cert --url-map=next360-url-map || true

gcloud compute forwarding-rules create next360-https-forwarding-rule \
    --load-balancing-scheme=EXTERNAL \
    --network-tier=PREMIUM \
    --address=next360-ip \
    --global \
    --target-https-proxy=next360-https-proxy \
    --ports=443 || true

echo "➡️ 7. Creating HTTP-to-HTTPS redirect..."
gcloud compute url-maps create http-redirect \
    --default-url-redirect="https://%25h%25p" \
    --redirect-response-code=MOVED_PERMANENTLY_DEFAULT || true

gcloud compute target-http-proxies create http-redirect-proxy --url-map=http-redirect || true

gcloud compute forwarding-rules create http-redirect-rule \
    --load-balancing-scheme=EXTERNAL \
    --network-tier=PREMIUM \
    --address=next360-ip \
    --global \
    --target-http-proxy=http-redirect-proxy \
    --ports=80 || true

echo "➡️ 8. Creating Cloud Armor Policy..."
gcloud compute security-policies create next360-armor --description="DDoS and WAF protection" || true

# Add OWASP Top 10 rule
gcloud compute security-policies rules create 1000 \
    --security-policy=next360-armor \
    --expression="evaluatePreconfiguredExpr('xss-stable') || evaluatePreconfiguredExpr('sqli-stable')" \
    --action="deny-403" \
    --description="Block XSS and SQLi" || true

# Add Rate Limiting rule
gcloud compute security-policies rules create 2000 \
    --security-policy=next360-armor \
    --src-ip-ranges="*" \
    --action="throttle" \
    --rate-limit-threshold-count=100 \
    --rate-limit-threshold-interval-sec=60 \
    --conform-action="allow" \
    --exceed-action="deny-429" \
    --enforce-on-key="IP" \
    --description="Rate limit to 100 req/min per IP" || true

# Require manual configuration for IPs to block, attaching explicit allow as default
gcloud compute security-policies rules update 2147483647 \
    --security-policy=next360-armor \
    --action="allow" || true

echo "➡️ 9. Attaching Cloud Armor to Backend Services..."
gcloud compute backend-services update backend-web --security-policy=next360-armor --global || true
gcloud compute backend-services update backend-admin --security-policy=next360-armor --global || true
gcloud compute backend-services update backend-vendor --security-policy=next360-armor --global || true
gcloud compute backend-services update backend-api --security-policy=next360-armor --global || true

echo "✅ Load balancer and Domains configuration created!"
echo "REMINDER: Point your DNS A Records for next360.in and subdomains to the IP of 'next360-ip'"
