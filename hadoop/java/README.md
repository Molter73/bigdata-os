# MapReduce altura promedio por posición en la NFL

La presente es una aplicación Hadoop MapReduce para calcular la altura
promedio de jugadores de la NFL agrupados por la posición que ocupan.

## Creación de fichero jar

La aplicación se basa en [Maven](https://maven.apache.org/), por lo que
cualquier IDE moderno puede importar y compilar el proyecto. En caso
de no querer depender de un IDE, el siguiente comando creará el jar del
proyecto si se ejecuta en el mismo directorio en el que se encuentra el
fichero pom.xml:

```sh
mvn package
```

## Lanzar la aplicación en Hadoop

Los siguientes comandos asumen que:
- Se está utilizando el cluster creado con el fichero
  docker-compose.yaml provisto con este proyecto.
- Los datos se cargaron en Hadoop como se explica en el README.md
  de la raíz del proyecto.
- La terminal está ejecutándose en el contenedor `namenode` como se
  explica en el README.md de la raíz del proyecto.
- El fichero jar de la aplicación se creó con el comando del punto
  anterior.

Si las anteriores condiciones se cumplen, el siguiente comando
ejecutará la operación de MapReduce:

```sh
hadoop jar /avg-height/avg_height-1.0-SNAPSHOT.jar \
    avg_height.App \
    /test/players.csv \
    /avg-height
```

Una vez ejecutada, el siguiente comando mostrará la salida de la
operación:

```sh
hadoop fs -cat /avg-height/part-r-00000
```
