CREATE TABLE libros (
    isbn VARCHAR(255) PRIMARY KEY NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    copias INT NOT NULL CHECK (copias >= 0)
);

CREATE INDEX libros_titulo_index ON libros(titulo);
CREATE INDEX libros_autor_index ON libros(autor);

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

CREATE INDEX usuarios_nombre_index ON usuarios(nombre);
CREATE INDEX usuarios_email_index ON usuarios(email);

CREATE TYPE estado_t AS ENUM ('activo', 'devuelto', 'demorado');

CREATE TABLE prestamos (
    id SERIAL PRIMARY KEY NOT NULL,
    isbn VARCHAR(255) REFERENCES libros(isbn) ON DELETE CASCADE,
    usuario_id SERIAL REFERENCES usuarios(id) ON DELETE CASCADE,
    fecha_prestamo DATE NOT NULL,
    fecha_devolucion DATE,
    estado estado_t
);

CREATE INDEX prestamos_isbn_index ON prestamos(isbn);
CREATE INDEX prestamos_usuario_id_index ON prestamos(usuario_id);

CREATE TABLE categorias (
    id SERIAL PRIMARY KEY NOT NULL,
    nombre VARCHAR(255)
);

CREATE TABLE categoria_libro(
    isbn VARCHAR(255) REFERENCES libros(isbn) ON DELETE CASCADE,
    categoria_id SERIAL REFERENCES categorias(id) ON DELETE CASCADE
);
