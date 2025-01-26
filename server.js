import express from "express";
import cors from "cors";
import client from "./src/common/db.js";
import peliculaRoutes from "./src/pelicula/routes.js";
import actorRoutes from "./src/actor/routes.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.status(200).send("Bienvenido al cine Iplacex 🚀"));

app.use("/cine-api/peliculas", peliculaRoutes);
app.use("/cine-api/actores", actorRoutes);

client.then(() => {
  app.listen(PORT, () => console.log(`✅ Servidor en https://iplacex-cine-api-german-lopez.onrender.com`));
}).catch(err => {
  console.error("❌ Error al conectar con MongoDB Atlas:", err);
});
