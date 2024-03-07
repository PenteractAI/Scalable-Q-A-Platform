FROM flyway/flyway:9.8.3-alpine

COPY sql/ /flyway/sql/

ENTRYPOINT ./flyway migrate -user=$FLYWAY_USER -password=$FLYWAY_PASSWORD -url="jdbc:postgresql://${DATABASE_CLUSTER_RW_SERVICE_HOST}:${DATABASE_CLUSTER_RW_SERVICE_PORT}/${FLYWAY_USER}"