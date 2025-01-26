import express from 'express';
import cors from 'cors';
import { MongoClient, ServerApiVersion } from 'mongodb';
import peliculaRoutes from './src/pelicula/routes.js';
import actorRoutes from './src/actor/routes.js';

// Conexión a la base de datos MongoDB
const uri = 'mongodb+srv://gmlopezg:uq7LQtQuQjk5OlRl@eva-u3-express.3fvdd.mongodb.net/?retryWrites=true&w=majority&appName=eva-u3-express'

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Rutas
app.all('/', (req, res) => res.status(200).send('Bienvenido al cine Iplacex 🚀'));
app.use('/cine-api/peliculas', peliculaRoutes);
app.use('/cine-api/actores', actorRoutes);

// Conectar a la base de datos MongoDB
const startServer = async () => {
  try {
    await client.connect();  // Conectar a MongoDB Atlas
    console.log('✅ Conectado al clúster de MongoDB');

    app.listen(PORT, () => {
      console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Error al conectar con MongoDB Atlas:', err);
    process.exit(1);  // Detener el servidor si no se puede conectar
  }
};

startServer(); 
