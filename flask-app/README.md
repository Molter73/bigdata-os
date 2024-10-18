# Aplicación Flask simple containerizada
Este directorio contiene los ficheros necesarios para crear una
aplicación [Flask](https://flask.palletsprojects.com/en/3.0.x/) básica
dentro de un contenedor [docker](https://docker.com) para simplificar
su despliegue.

## Descripción de ficheros
- app.py: Contiene el código de la aplicación propiamente dicha.
- requirements.txt: Lista de módulos de python necesarios para
  ejecutar la aplicación.
- Dockerfile: Instrucciones para que docker pueda construir el
  contenedor.

## Construir el contenedor
Para construir el contenedor es suficiente ejecutar el siguiente
comando en este directorio:

```sh
docker build -t flask-app:latest .
```

## Desplegar la aplicación con docker
Para despliegar la aplicación puede utilizarse el siguiente comando:

```sh
docker run -d -p 5000:5000 --name flask-app flask-app:latest
```

Puede comprobarse la correcta ejecución de la aplicación navegando a
`localhost:5000` en un navegador estándard o utilizando el siguiente
comando:

```sh
curl localhost:5000
```

## Ejecutar la aplicación localmente
Para simplificar la depuración de la aplicación, los siguientes
comandos pueden utlizarse para ejecutarla utilizando un entorno
virtual local.

```sh
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
./app.py
```
