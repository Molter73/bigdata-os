# Hadoop MapReduce

El presente proyecto permite la ejecución de dos operaciones de
MapReduce en un cluster Hadoop desplegado en contenedores.

## Despliegue de la aplicación

La aplicación utiliza contenedores estándar y está basada en la
solución provista en el siguiente repositorio público:
https://github.com/big-data-europe/docker-hadoop

Algunas modificaciones mínimas se realizaron al fichero
docker-compose.yaml, las cuáles serán discutidas en un punto posterior.

Para inicializar el cluster Hadoop basta con ejecutar el siguiente
comando en este directorio:

```sh
docker compose up
```

Si se desea ejecutar la aplicación en segundo plano, basta con agregar -d:

```sh
docker compose up -d
```

Una vez se termina de ejecutar la aplicación, el siguiente comando
eliminará los contenedores:

```sh
docker compose down
```

La aplicación utiliza volúmenes de docker para persistir datos, para
eliminarlos basta con agregar el argumento -v al comando anterior:

```sh
docker compose down -v
```

### Carga de datos en Hadoop

Para simplificar la carga de datos al cluster, el directorio `./data`
se monta directamente en el contenedor `namenode`, por lo que los
siguientes comandos deberían ser suficiente para ingresar al contenedor
y cargar los datos en HDFS.

```sh
docker exec -it namenode bash
hdfs dfs -put /data /test
```

Para validar la carga exitosa de datos se puede utilizar el siguiente
comando en el contenedor:

```sh
hadoop fs -ls /test
```

## Ejecutar operaciones MapReduce

Como se adelantó en un punto anterior, se proveen dos operaciones
MapReduce:
- Una en Java que calcula la altura promedio de jugadores de la NFL
  agrupados por la posición que ocupan.
- Una en Rust que cuenta la cantidad de jugadores de la NFL que nació
  en cada mes.

Para instrucciones detalladas de cómo compilar y ejecutar las
operaciones, vea los README.md provistos en los directorios
correspondientes.
