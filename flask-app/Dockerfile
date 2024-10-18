FROM python:3.12-slim

RUN mkdir /app
WORKDIR /app

COPY app.py .
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt && \
    rm -f requirements.txt

EXPOSE 5000

ENTRYPOINT ["./app.py"]
