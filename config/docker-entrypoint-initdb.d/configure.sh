#!/bin/bash

bash /docker-entrypoint-initdb.d/create-multiple-postgresql-databases.sh
cp /docker-entrypoint-initdb.d/postgresql.conf /var/lib/postgresql/data/
