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

======= FRONTEND ======="
cd frontend/
echo "

======= Resinstall"
rm -rf build
rm -rf node_modules/
rm -rf yarn.lock
yarn

echo "

======= Generate prod build"
yarn build
yarn add global serve
echo "

======= Start LuccaVicenzo frontend"
serve -s -l 3000 -d build &
cd ..
