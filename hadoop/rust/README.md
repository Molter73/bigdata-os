# MapReduce cantidad de cumpleaños por mes

La presente es una aplicación Hadoop MapReduce para calcular la cantidad
de jugadores de la NFL que cumplen años cada mes.

## Compilación

La aplicación está escrita en [Rust](https://www.rust-lang.org) y
utiliza [cargo](https://github.com/rust-lang/cargo) para su
compilación, por lo que la operación debería ser bastante sencilla.
Sin embargo, al intentar compilar en un sistema Fedora 41,
se encontraron problemas de compatibilidad con la librería estándar de
los contenedores del cluster Hadoop, por lo que se recomienda instalar
y compilar el target x86_64-unknown-linux-musl que generará ejecutables
completamente estáticos. Si se instala el toolchain de Rust con rustup,
el siguiente comando agregará el target:

```sh
rustup target add x86_64-unknown-linux-musl
```

Para compilar la aplicación en si, se debe utilizar el siguiente
comando:

```sh
cargo build --target=x86_64-unknown-linux-musl --release
```

## Lanzar la aplicación en Hadoop

Los siguientes comandos asumen que:
- Se está utilizando el cluster creado con el fichero
  docker-compose.yaml provisto con este proyecto.
- Los datos se cargaron en Hadoop como se explica en el README.md
  de la raíz del proyecto.
- La terminal está ejecutándose en el contenedor `namenode` como se
  explica en el README.md de la raíz del proyecto.
- La aplicación se compiló con los comandos provistos en el punto
  anterior.

Si las anteriores condiciones se cumplen, el siguiente comando
ejecutará la operación de MapReduce:

```sh
mapred streaming \
    -files /month-counter/x86_64-unknown-linux-musl/release/month-counter_mapper,/month-counter/x86_64-unknown-linux-musl/release/month-counter_reducer \
    -input /test/players.csv \
    -output /month-counter \
    -mapper month-counter_mapper \
    -reducer month-counter_reducer
```

Una vez ejecutada, el siguiente comando mostrará la salida de la
operación:

```sh
hadoop fs -cat /month-counter/part-00000
```
## Lanzar la aplicación en sistemas *nix

Para simplificar la depuración de la aplicación, el siguiente comando
se puede ejecutar en cualquier sistema Unix/Linux:

```
cargo build --release
cat </path/a/players.csv> | \
    ./target/release/mapreduce-rs_mapper | \
    sort -k1,1 | \
    ./target/release/mapreduce-rs_reducer \
```
