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

======= Clean up"
rm -rf node_modules/
rm -rf yarn.lock
echo "

======= Reinstall"
yarn
echo "

======= Start NGINX"
echo "

======= Start LuccaVicenzo backend"
sudo nginx -c nginx.conf -p $(pwd)
yarn start
cd ..

echo "

======= BACKEND ======="
cd frontend/
rm -rf build
rm -rf node_modules/
rm -rf yarn.lock
yarn
yarn build
yarn add global serve
serve -s -l 3000 -d build &
cd ..
