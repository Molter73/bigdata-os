db = new Mongo().getDB("biblioteca")

db.createCollection("libros", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            title: "Validación de schema de libros",
            required: ["isbn", "titulo", "autor"],
            properties: {
                isbn: {
                    bsonType: "string",
                    description: "International Standard Book Number",
                },
                titulo: {
                    bsonType: "string",
                    description: "El título del libro",
                },
                autor: {
                    bsonType: "string",
                    description: "Nombre del autor",
                },
                copias: {
                    bsonType: "int",
                    description: "Número de copias en la biblioteca",
                    minimum: 0,
                },
                categorias: {
                    bsonType: "array",
                    description: "Categorias del libro",
                    items: { bsonType: "string" },
                },
            },
        }
    }
})

db.libros.createIndexes([
    {isbn: 1},
    {titulo: 1},
    {autor: 1},
])

db.libros.insertMany([
    {
        isbn: "978-0-06-112008-4",
        titulo: "To Kill a Mockingbird",
        autor: "Harper Lee",
        copias: 1,
        categorias: [
            "novela",
            "ficcion",
        ],
    },
    {
        isbn: "978-0-7432-7356-5",
        titulo: "The Da Vinci Code",
        autor: "Dan Brown",
        copias: 2,
        categorias: [
            "misterio",
            "ciencia ficcion",
            "suspenso",
        ],
    },
    {
        isbn: "978-0-14-143960-0",
        titulo: "1984",
        autor: "George Orwell",
        copias: 3,
        categorias: [
            "ciencia ficcion",
        ],
    },
    {
        isbn: "978-0-06-230167-3",
        titulo: "The Great Gatsby",
        autor: "F. Scott Fitzgerald",
        copias: 4,
        categorias: [
            "novela",
            "ficcion",
        ],
    },
    {
        isbn: "978-0-452-28423-4",
        titulo: "Pride and Prejudice",
        autor: "Jane Austen",
        copias: 5,
        categorias: [
            "novela",
            "ficcion",
            "satira",
        ],
    },
    {
        isbn: "978-1-4516-7321-3",
        titulo: "The Hunger Games",
        autor: "Suzanne Collins",
        copias: 6,
        categorias: [
            "novela",
            "ciencia ficcion",
            "suspenso",
        ],
    },
    {
        isbn: "978-0-316-02346-5",
        titulo: "Harry Potter and the Sorcerer's Stone",
        autor: "J.K. Rowling",
        copias: 7,
        categorias: [
            "fantasia",
        ],
    },
    {
        isbn: "978-0-345-52835-1",
        titulo: "The Lord of the Rings: The Fellowship of the Ring",
        autor: "J.R.R. Tolkien",
        copias: 8,
        categorias: [
            "fantasia",
        ],
    },
    {
        isbn: "978-1-9848-3435-9",
        titulo: "Where the Crawdads Sing",
        autor: "Delia Owens",
        copias: 9,
        categorias: [
            "novela",
            "misterio",
        ],
    },
    {
        isbn: "978-0-06-297516-8",
        titulo: "The Silent Patient",
        autor: "Alex Michaelides",
        copias: 10,
        categorias: [
            "novela",
            "suspenso",
        ],
    },
])
