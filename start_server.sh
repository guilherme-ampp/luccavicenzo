#! /bin/sh
nginx -s reload -c nginx.conf -p $(pwd)
