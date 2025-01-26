import express from "express";
import cors from "cors";
import connectDB from "./src/common/db.js";  // Importa la función de conexión
import peliculaRoutes from "./src/pelicula/routes.js";
import actorRoutes from "./src/actor/routes.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.status(200).send("Bienvenido al cine Iplacex 🚀"));

app.use("/cine-api/peliculas", peliculaRoutes);
app.use("/cine-api/actores", actorRoutes);

// Conexión a MongoDB y luego inicio del servidor
const startServer = async () => {
  await connectDB();  // Espera la conexión a la base de datos

  app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en https://iplacex-cine-api-german-lopez.onrender.com`);
  });
};

startServer(); 
