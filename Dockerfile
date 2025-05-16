FROM postgres:15

ENV POSTGRES_DB=testdb
ENV POSTGRES_HOST_AUTH_METHOD=trust

COPY ./db-create.sql /docker-entrypoint-initdb.d/
COPY ./db-seed.sql /docker-entrypoint-initdb.d/

# Expose PostgreSQL port
EXPOSE 5432