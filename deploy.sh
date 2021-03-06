#! /bin/sh
echo "

======= Shutdown all node"
sudo killall node
echo "
======= Shutdown all NGINX"
sudo killall nginx

echo "

======= BACKEND ======="
cd backend/
echo "

======= Start NGINX"
echo "

======= Start LuccaVicenzo backend"
sudo nginx -c nginx.conf -p $(pwd)
yarn start
cd ..

echo "

======= FRONTEND ======="
cd frontend/
yarn add global serve
echo "

======= Start LuccaVicenzo frontend"
serve -s -l 3000 -d build &
cd ..
