#! /bin/sh
sudo killall node
sudo killall nginx

cd backend/
rm -rf node_modules/
rm -rf yarn.lock
yarn
sudo nginx -c nginx.conf -p $(pwd)
yarn start
cd ..

cd frontend/
rm -rf build
rm -rf node_modules/
rm -rf yarn.lock
yarn
yarn build
yarn add global serve
serve -s -l 3000 -d build &
cd ..
