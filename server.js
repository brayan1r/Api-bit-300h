import mongoose from 'mongoose';
import app from './app.js';

<<<<<<< HEAD
mongoose.connect("mongodb://localhost:27017/Ejemplo1")
  .then(() => console.log("Conectado a MongoDB"))
  .catch(err => console.error("Error de conexión", err));
=======
const { MONGODB_URI, PORT = 3000 } = process.env;
>>>>>>> d34ca204bab42a5e0a9d3582bf61443db5b590db

async function main() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Mongo conectado');
    const server = app.listen(PORT, () => console.log(`API http://localhost:${PORT}`));

    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      server.close(() => process.exit(0));
    });
  } catch (err) {
    console.error('Error de inicio:', err.message);
    process.exit(1);
  }
}

main();
