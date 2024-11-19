db = new Mongo().getDB("biblioteca")

db.createCollection("usuarios", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            title: "Usuarios de la biblioteca",
            required: ["nombre", "email"],
            properties: {
                nombre: { bsonType: "string"},
                email: {bsonType: "string"},
                prestamos_activos: {
                    bsonType: "array",
                    items: { bsonType: "objectId" },
                },
            },
        }
    }
})

db.usuarios.createIndexes([
    {nombre: 1},
    {email: 1},
])

db.usuarios.insertMany([
    {nombre: "John Doe", email: "johndoe@example.com", prestamos_activos: []},
    {nombre: "Alice Smith", email: "alicesmith@example.com", prestamos_activos: []},
    {nombre: "Bob Johnson", email: "bobjohnson@example.com", prestamos_activos: []},
    {nombre: "Emma Davis", email: "emmadavis@example.com", prestamos_activos: []},
    {nombre: "David Wilson", email: "davidwilson@example.com", prestamos_activos: []},
])
