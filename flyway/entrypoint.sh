#!/bin/sh

flyway -user="$FLYWAY_USER" -password="$FLYWAY_PASSWORD" -url="jdbc:postgresql://${DATABASE_CLUSTER_RW_SERVICE_HOST}:${DATABASE_CLUSTER_RW_SERVICE_PORT}/${FLYWAY_USER}" -cleanDisabled=false clean

flyway -user="$FLYWAY_USER" -password="$FLYWAY_PASSWORD" -url="jdbc:postgresql://${DATABASE_CLUSTER_RW_SERVICE_HOST}:${DATABASE_CLUSTER_RW_SERVICE_PORT}/${FLYWAY_USER}" migrate