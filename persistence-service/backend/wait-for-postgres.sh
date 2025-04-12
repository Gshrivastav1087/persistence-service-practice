#!/bin/sh

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL at $DB_HOST:$DB_PORT..."
until nc -z -v -w30 "$DB_HOST" "$DB_PORT"; do
  echo "Waiting for Postgres..."
  sleep 2
done

echo "PostgreSQL is up - starting the app"
exec "$@"
