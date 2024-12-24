FROM python:3.12-slim

RUN apt-get update && apt-get install -y --no-install-recommends gnupg && \
    mkdir -p /etc/apt/keyrings && \
    curl -fsSL https://ftp-master.debian.org/keys/archive-key-15.asc | gpg --dearmor -o /etc/apt/keyrings/debian-archive-keyring.gpg && \
    curl -fsSL https://ftp-master.debian.org/keys/archive-key-14.asc | gpg --dearmor -o /etc/apt/keyrings/debian-archive-keyring-14.gpg && \
    echo "deb [signed-by=/etc/apt/keyrings/debian-archive-keyring.gpg] http://deb.debian.org/debian bookworm main" > /etc/apt/sources.list && \
    echo "deb [signed-by=/etc/apt/keyrings/debian-archive-keyring.gpg] http://deb.debian.org/debian bookworm-updates main" >> /etc/apt/sources.list && \
    echo "deb [signed-by=/etc/apt/keyrings/debian-archive-keyring.gpg] http://deb.debian.org/debian-security bookworm-security main" >> /etc/apt/sources.list && \
    apt-get update && apt-get install -y --no-install-recommends \
    curl \
    python3-setuptools \
    git && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . /app


RUN pip install --upgrade pip setuptools

RUN pip install -r requirements.txt

CMD ["sh", "-c", "python manage.py migrate && python manage.py collectstatic --noinput \
&& uvicorn baza.asgi:application --workers 5 --host 0.0.0.0 --port 8000"]

