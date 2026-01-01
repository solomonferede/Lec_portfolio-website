#!/bin/bash
set -e

# Load .env if present
if [ -f /app/.env ]; then
  export $(grep -v '^#' /app/.env | xargs) || true
fi

echo "Waiting for database to be available..."
python - <<'PY'
import os, time, sys
try:
    import MySQLdb
except Exception as e:
    print('mysqlclient not installed yet:', e)
    sys.exit(1)

host = os.environ.get('DB_HOST', 'db')
user = os.environ.get('DB_USER', 'solomon')
passwd = os.environ.get('DB_PASSWORD', '')
db = os.environ.get('DB_NAME', 'portfolio_db')
port = int(os.environ.get('DB_PORT', 3306))

for i in range(30):
    try:
        conn = MySQLdb.connect(host=host, user=user, passwd=passwd, db=db, port=port)
        conn.close()
        print('Database is available')
        sys.exit(0)
    except Exception as e:
        print(f'Waiting for DB ({i+1}/30):', e)
        time.sleep(2)

print('Database not available after waiting, exiting')
sys.exit(1)
PY

echo "Running migrations..."
python manage.py migrate --noinput

echo "Collecting static files..."
python manage.py collectstatic --noinput || true

echo "Starting Django development server..."
exec python manage.py runserver 0.0.0.0:8000
