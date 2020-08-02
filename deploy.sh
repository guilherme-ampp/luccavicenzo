#! /bin/sh
cd backend/
sudo killall node
sudo killall nginx
sudo nginx -c nginx.conf -p $(pwd)
yarn start
cd ..

cd frontend/
rm -rf build
yarn build
yarn add global serve
serve -s -l 3000 -d build &
cd ..
