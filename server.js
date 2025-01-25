import express from "express";
import cors from "cors";
import client from "./src/common/db.js";
import peliculaRoutes from "./src/pelicula/routes.js";
import actorRoutes from "./src/actor/routes.js";

const app = express();
const PORT = process.env.PORT || 443; // Render asigna el puerto automáticamente

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Asignacion Ruta de prueba
app.all("/", (req, res) => {
  return res.status(200).send("Bienvenido al cine Iplacex");
});

// Definicion de las rutas
app.use("/cine-api/peliculas", peliculaRoutes);
app.use("/cine-api/actores", actorRoutes);

// Función asíncrona para iniciar el servidor
async function startServer() {
  try {
    await client.connect();
    console.log("✅ Conectado al clúster de MongoDB Atlas");
    
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error);
  }
}

// Iniciar el servidor
startServer();
