#!/bin/bash
# Deploy cesarcai.com — 本地构建 + rsync 产物 + pm2 restart
set -e

SERVER="ubuntu@152.136.209.46"
DEPLOY_DIR="/home/ubuntu/www/cesarcai.com"
PM2_APP="cesarcai-com"

echo "📦 Building (adapter-node)..."
npm run build

echo "🚀 Syncing build output to $SERVER:$DEPLOY_DIR/build/"
rsync -avz --delete build/ $SERVER:$DEPLOY_DIR/build/

echo "🔄 Restarting PM2 ($PM2_APP)..."
ssh $SERVER "pm2 restart $PM2_APP --update-env"

echo "✅ Done → https://cesarcai.com"
