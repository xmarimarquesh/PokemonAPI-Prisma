import express from 'express';
import pokemonRoute from './routes/pokemonRoute.ts';
import teamRoute from './routes/teamRoute.ts';
import cors from 'cors'

const app = express();
app.use(
  cors({
      origin: "http://localhost:3000", 
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use('/api', pokemonRoute);
app.use('/api', teamRoute);

app.listen(8080, () => {
  console.log('Servidor rodando na porta 8080');
});

