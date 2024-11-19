INSERT INTO libros (isbn, titulo, autor, copias) VALUES
    ('978-0-06-112008-4', 'To Kill a Mockingbird', 'Harper Lee', 1),
    ('978-0-7432-7356-5', 'The Da Vinci Code', 'Dan Brown', 2),
    ('978-0-14-143960-0', '1984', 'George Orwell', 3),
    ('978-0-06-230167-3', 'The Great Gatsby', 'F. Scott Fitzgerald', 4),
    ('978-0-452-28423-4', 'Pride and Prejudice', 'Jane Austen', 5),
    ('978-1-4516-7321-3', 'The Hunger Games', 'Suzanne Collins', 6),
    ('978-0-316-02346-5', 'Harry Potter and the Sorcerer''s Stone', 'J.K. Rowling', 7),
    ('978-0-345-52835-1', 'The Lord of the Rings: The Fellowship of the Ring', 'J.R.R. Tolkien', 8),
    ('978-1-9848-3435-9', 'Where the Crawdads Sing', 'Delia Owens', 9),
    ('978-0-06-297516-8', 'The Silent Patient', 'Alex Michaelides', 10);

INSERT INTO categorias (id, nombre) VALUES
    (1, 'novela'),
    (2, 'ficción'),
    (3, 'misterio'),
    (4, 'ciencia ficción'),
    (5, 'suspenso'),
    (6, 'sátira'),
    (7, 'fantasía');

INSERT INTO categoria_libro (isbn, categoria_id) VALUES
    ('978-0-06-112008-4', 1),
    ('978-0-06-112008-4', 2),
    ('978-0-7432-7356-5', 3),
    ('978-0-7432-7356-5', 4),
    ('978-0-7432-7356-5', 5),
    ('978-0-14-143960-0', 4),
    ('978-0-06-230167-3', 1),
    ('978-0-06-230167-3', 2),
    ('978-0-452-28423-4', 1),
    ('978-0-452-28423-4', 2),
    ('978-0-452-28423-4', 6),
    ('978-1-4516-7321-3', 1),
    ('978-1-4516-7321-3', 4),
    ('978-1-4516-7321-3', 5),
    ('978-0-316-02346-5', 7),
    ('978-0-345-52835-1', 7),
    ('978-1-9848-3435-9', 1),
    ('978-1-9848-3435-9', 3),
    ('978-0-06-297516-8', 1),
    ('978-0-06-297516-8', 5);

INSERT INTO usuarios (id, nombre, email) VALUES
    (1, 'John Doe', 'johndoe@example.com'),
    (2, 'Alice Smith', 'alicesmith@example.com'),
    (3, 'Bob Johnson', 'bobjohnson@example.com'),
    (4, 'Emma Davis', 'emmadavis@example.com'),
    (5, 'David Wilson', 'davidwilson@example.com');

INSERT INTO prestamos (isbn, usuario_id, fecha_prestamo, fecha_devolucion, estado) VALUES
    ('978-0-316-02346-5', 1, '2024-11-15', NULL, 'activo'),
    ('978-0-06-112008-4', 3, '2023-11-15', '2023-11-30', 'devuelto'),
    ('978-0-7432-7356-5', 3, '2024-10-15', NULL, 'demorado');
