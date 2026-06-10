const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Página principal
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/Consultas1.html");
});

// =====================
// CONEXIÓN A MONGODB
// =====================

mongoose.connect(
    "mongodb+srv://Barraza-Edith:Pescado1155@cluster0.2r1xxc7.mongodb.net/VeterinariaChikawa?retryWrites=true&w=majority&appName=Cluster0"
)
.then(() => {
    console.log("MongoDB conectado correctamente");
})
.catch((error) => {
    console.log("Error MongoDB:", error);
});

// =====================
// SCHEMAS
// =====================

const ConsultaSchema = new mongoose.Schema({
    consulta: Number,
    mascota: String,
    id_mascota: Number,
    dueno: String,
    especie: String,
    motivo: String,
    fecha: String,
    estado: String,
    diagnostico: {
        type: String,
        default: "Pendiente"
    },
    tratamiento: {
        type: String,
        default: "Pendiente"
    },
    pago: {
        type: String,
        default: "Pendiente"
    }
});

const MascotaSchema = new mongoose.Schema({

    id_mascota: Number,
    nombre: String,
    especie: String,
    raza: String,
    edad: Number,
    genero: String,
    peso: Number,
    propietario: String,
    color: { type: String, default: "Pendiente" },
    vacunas: { type: String, default: "Pendiente" }

});

const DuenoSchema = new mongoose.Schema({
    id_dueno: Number,
    nombre: String,
    id_mascota: Number,
    mascota: String,
    direccion: String,
    telefono: String,
    emergencia: String,
    correo: String
});

const VeterinarioSchema = new mongoose.Schema({
    num: Number,
    veterinario: String,
    cedula: String,
    rfc: String,
    horario: String,
    telefono: String,
    consultorio: String,
    especialidad: String
});

// =====================
// MODELOS
// =====================

const Consulta = mongoose.model(
    "Consulta",
    ConsultaSchema,
    "Consultas"
);

const Mascota = mongoose.model(
    "Mascota",
    MascotaSchema,
    "Mascotas"
);

const Dueno = mongoose.model(
    "Dueno",
    DuenoSchema,
    "Duenos"
);

const Veterinario = mongoose.model(
    "Veterinario",
    VeterinarioSchema,
    "Veterinarios"
);

// =====================
// CONSULTAS
// =====================

// CREAR
app.post("/api/consultas", async (req, res) => {
    try {

        const nuevaConsulta = new Consulta(req.body);

        await nuevaConsulta.save();

        res.json({
            mensaje: "Consulta guardada correctamente"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json(error);

    }
});

// LEER
app.get("/api/consultas", async (req, res) => {
    try {

        const consultas = await Consulta.find();

        res.json(consultas);

    } catch (error) {

        res.status(500).json(error);

    }
});

// ACTUALIZAR
app.put("/api/consultas/:id", async (req, res) => {
    try {

        await Consulta.findByIdAndUpdate(
            req.params.id,
            req.body
        );

        res.json({
            mensaje: "Consulta actualizada"
        });

    } catch (error) {

        res.status(500).json(error);

    }
});

// ELIMINAR
app.delete("/api/consultas/:id", async (req, res) => {
    try {

        await Consulta.findByIdAndDelete(
            req.params.id
        );

        res.json({
            mensaje: "Consulta eliminada"
        });

    } catch (error) {

        res.status(500).json(error);

    }
});

// =====================
// MASCOTAS
// =====================

// CREAR
// ================== MASCOTAS ==================

// CREAR MASCOTA
app.post("/api/mascotas", async (req, res) => {

    try {

        const nuevaMascota = new Mascota(req.body);

        await nuevaMascota.save();

        res.json({
            mensaje: "Mascota guardada correctamente"
        });

    } catch(error) {

        res.status(500).json(error);

    }

});

// LEER MASCOTAS
app.get("/api/mascotas", async (req, res) => {

    try {

        const mascotas = await Mascota.find();

        res.json(mascotas);

    } catch(error) {

        res.status(500).json(error);

    }

});

// ACTUALIZAR MASCOTA
app.put("/api/mascotas/:id", async (req, res) => {

    try {

        await Mascota.findByIdAndUpdate(
            req.params.id,
            req.body
        );

        res.json({
            mensaje: "Mascota actualizada"
        });

    } catch(error) {

        res.status(500).json(error);

    }

});

// ELIMINAR MASCOTA
app.delete("/api/mascotas/:id", async (req, res) => {

    try {

        await Mascota.findByIdAndDelete(
            req.params.id
        );

        res.json({
            mensaje: "Mascota eliminada"
        });

    } catch(error) {

        res.status(500).json(error);

    }

});

// =====================
// DUEÑOS
// =====================

// CREAR
app.post("/api/duenos", async (req, res) => {
    try {

        const dueno = new Dueno(req.body);

        await dueno.save();

        res.json({
            mensaje: "Dueño guardado"
        });

    } catch (error) {

        res.status(500).json(error);

    }
});

// LEER
app.get("/api/duenos", async (req, res) => {
    try {

        const duenos = await Dueno.find();

        res.json(duenos);

    } catch (error) {

        res.status(500).json(error);

    }
});

// ACTUALIZAR
app.put("/api/duenos/:id", async (req, res) => {
    try {

        await Dueno.findByIdAndUpdate(
            req.params.id,
            req.body
        );

        res.json({
            mensaje: "Dueño actualizado"
        });

    } catch (error) {

        res.status(500).json(error);

    }
});

// ELIMINAR
app.delete("/api/duenos/:id", async (req, res) => {
    try {

        await Dueno.findByIdAndDelete(
            req.params.id
        );

        res.json({
            mensaje: "Dueño eliminado"
        });

    } catch (error) {

        res.status(500).json(error);

    }
});

// =====================
// VETERINARIOS
// =====================

// CREAR
app.post("/api/veterinarios", async (req, res) => {
    try {

        const veterinario = new Veterinario(req.body);

        await veterinario.save();

        res.json({
            mensaje: "Veterinario guardado"
        });

    } catch (error) {

        res.status(500).json(error);

    }
});

// LEER
app.get("/api/veterinarios", async (req, res) => {
    try {

        const veterinarios = await Veterinario.find();

        res.json(veterinarios);

    } catch (error) {

        res.status(500).json(error);

    }
});

// ACTUALIZAR
app.put("/api/veterinarios/:id", async (req, res) => {
    try {

        await Veterinario.findByIdAndUpdate(
            req.params.id,
            req.body
        );

        res.json({
            mensaje: "Veterinario actualizado"
        });

    } catch (error) {

        res.status(500).json(error);

    }
});

// ELIMINAR
app.delete("/api/veterinarios/:id", async (req, res) => {
    try {

        await Veterinario.findByIdAndDelete(
            req.params.id
        );

        res.json({
            mensaje: "Veterinario eliminado"
        });

    } catch (error) {

        res.status(500).json(error);

    }
});

// =====================
// PRUEBA
// =====================

app.get("/prueba", (req, res) => {
    res.send("Servidor funcionando correctamente");
});

// =====================
// SERVIDOR
// =====================

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
});

console.log("BASE DE DATOS: VeterinariaChikawa");