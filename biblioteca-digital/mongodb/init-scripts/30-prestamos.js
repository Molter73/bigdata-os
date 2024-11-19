db = new Mongo().getDB("biblioteca")

db.createCollection("prestamos", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            title: "Préstamos de libros a usuarios",
            required: ["libro_id", "usuario_id", "fecha_prestamo", "fecha_devolucion", "estado"],
            properties: {
                libro_id: {
                    bsonType: "objectId",
                    description: "Identificador del libro prestado",
                },
                usuario_id: {
                    bsonType: "objectId",
                    description: "Identificador del usuario al que se le prestó el libro",
                },
                fecha_prestamo: {bsonType: "date"},
                fecha_devolucion: {bsonType: "date"},
                estado: {
                    bsonType: "string",
                    enum: [ "activo", "demorado", "devuelto" ],
                }
            }
        }
    }
})

db.prestamos.createIndexes([
    {libro_id: 1},
    {usuario_id: 1},
])

// Usuarios con prestamos
john = db.usuarios.findOne({nombre: "John Doe"})
bob = db.usuarios.findOne({nombre: "Bob Johnson"})

// Libros prestados
harry = db.libros.findOne({isbn: "978-0-316-02346-5"})
lotr = db.libros.findOne({isbn: "978-0-345-52835-1"})
mockingbird = db.libros.findOne({isbn: "978-0-06-112008-4"})
davinci = db.libros.findOne({isbn: "978-0-7432-7356-5"})

db.prestamos.insertMany([
    {
        libro_id: harry._id,
        usuario_id: john._id,
        fecha_prestamo: new Date("2024-11-15"),
        estado: "activo",
    },
    {
        libro_id: mockingbird._id,
        usuario_id: bob._id,
        fecha_prestamo: new Date("2023-11-15"),
        fecha_devolucion: new Date("2023-11-30"),
        estado: "devuelto",
    },
    {
        libro_id: davinci._id,
        usuario_id: bob._id,
        fecha_prestamo: new Date("2024-10-15"),
        estado: "demorado",
    },
])

// Actualizar los préstamos activos de cada usuario
// Podría ser más eficiente iterar usuarios y actualizar el array de
// préstamos entero, pero de momento así funciona bien.
db.prestamos.find({}).forEach((e) => {
    db.usuarios.findOneAndUpdate(
        {_id: e.usuario_id},
        {$push: {prestamos_activos: e._id}}
    )
})
