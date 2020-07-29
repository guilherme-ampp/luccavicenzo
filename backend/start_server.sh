#! /bin/sh
nginx -s quit
nginx -c nginx.conf -p $(pwd)
