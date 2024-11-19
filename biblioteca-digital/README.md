# Biblioteca digital

El presente proyecto es una implementación simplificada de un sistema de
gestión de una biblioteca, basado en MongoDB/Postgresql y Hasura.

## Despliegue de la aplicación

La aplicación utiliza contenedores estándar y está diseñada para operar
con `docker compose`, por lo que ejecutar el siguiente comando en este
directorio debería ser suficiente para ejecutarla:

```sh
docker compose up
```

Si se desea ejecutar la aplicación en segundo plano, basta con agregar -d:

```sh
docker compose up -d
```

Con el propósito de depurar errores en las bases de datos directamente,
el fichero docker-compose.yaml permite desplegar un contenedor con
mongo-express y otro con pgadmin4. Para desplegar dichos contenedores
se debe pasar el perfil correcto al comando `docker compose`:

```sh
docker compose --profile debug up
```

Una vez se termina de ejecutar la aplicación, el siguiente comando
eliminará los contenedores:

```sh
docker compose down
```

Las bases de datos utilizadas están configuradas para guardar los datos
almacenados en volúmenes de docker por lo que, para eliminar completamente
la aplicación, será necesario utilizar -v con el comando anterior

```sh
docker compose down -v
```

El fichero `.env` variables de entorno con las credenciales y URLs
utilizadas en la aplicación, si se requiere modificar alguno de dichos
valores, puede hacerse directamente en dicho fichero.

### Metadata de Hasura

Para simplificar el despliegue de la aplicación, se provee un fichero
de metadata en `./hasura/metadata/`, este puede ser aplicado
directamente en la configuración de la aplicación.

Se intentó utilizar una imagen que aplica la metadata al inicializar
como se explica en [este enlace](https://hasura.io/docs/2.0/migrations-metadata-seeds/auto-apply-migrations/),
pero al no tener éxito se decidió dejar esta carga como el único paso
manual para el despliegue.

## Servicios
### hasura-engine

Basado en [Hasura GraphQL Engine](https://hasura.io), provee una forma
amigable de operar sobre bases de datos de distintos tipos, permitiendo
formar relaciones entre ellas y desarrollar una API graphql.

Este servicio es accesible en `http://localhost:8080`, las credenciales
se configuran desde el fichero `.env`.

### mongo-data-connector

Servicio utilizado por el motor graphql de Hasura para interactuar con
bases de datos MongoDB.

### hasura-db

Base de datos postgres, necesaria para que Hasura pueda almacenar su
metadata.

### nosql-db

Base de datos [MongoDB](https://mongodb.com), contiene los datos y
esquema de validación para la biblioteca digital.

### mongo-express

Contenedor de depuración para la base de datos MongoDB, puede
utilizarse para interactuar con esta a través de una interfaz web en
la URL `http://localhost:8081`. El servicio está configurado para
conectarse a la base de datos del servicio nosql-db al iniciarse, por
lo que no requiere de configuración adicional.

### sql-db

Base de datos [Postgresql](https://www.postgresql.org/), contiene el
esquema y los datos utilizados por la biblioteca digital.

### pgadmin

Contenedor de depuración para la base de datos Postgresql, puede
utilizarse para interactuar con esta a través de una interfaz web en
la URL `http://localhost:8082`. El servicio está configurado para
cargar la conexión al servicio sql-db al iniciarse, por lo que no
requiere de configuración adicional. pgadmin4 requiere de credenciales
de inicio de sesión al ingresar, las mismas están configuradas en el
fichero `.env`.

## Volúmenes

Como se comentó en una sección anterior, se utilizaron volúmenes de
docker para almacenar los datos de todas las DB. Como alternativa,
se podrían utilizar directorios locales para guardar los datos, pero
dado que el acceso a estos debería hacerse sólo desde la aplicación a
la que están asignados, los volúmenes son más apropiados.
Adicionalmente, esta configuración permite lanzar la aplicación
montando unos pocos directorios del host en modo de sólo lectura, por
lo que es más segura.

## Queries y mutations GraphQL

En el directorio `./hasura/graphql/` se encuentran una serie de queries
y mutations que se pueden utilizar en Hasura para interactuar con la
solución.

## FAQ
### Por qué dos bases de datos?

Originalmente, el proyecto se planteó para ser resuelto con MongoDB.
Sin embargo, Hasura tiene el conector a estas bases de datos detrás de
una licencia paga por lo que, para evitar un posible vendor lock-in, se
migró la solución a Postgresql. La base de datos MongoDB se mantiene por
haber sido requisito inicial.
