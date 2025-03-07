import express from 'express';
import pokemonRoute from './routes/pokemonRoute.ts';

const app = express();
app.use(express.json());
app.use('/', pokemonRoute);

app.listen(8080, () => {
  console.log('Servidor rodando na porta 8080');
});
