import express from 'express';
import fs from 'fs';
import cors from 'cors';

import produtosRouter from './routes/produtosRoutes.js';

import rotinaEstoque from './routes/rotinaVerificacaoEstoque.js';

import fluxoRoutes from './routes/fluxoRoutes.js';

/** Add arquivo de index.js */
//const html = fs.readFileSync('./src/index/index.html', 'utf8');



const app = express();

/** add o middleware Json */
app.use(express.json());

/** habilita CORS */
app.use(cors({
  origin: '*',
}));

app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://scge-frontend.azurestaticapps.net',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Em app.js — adicionar antes das outras rotas
app.get('/health', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected',
      version: '1.0.0'
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      database: 'disconnected',
      error: error.message
    });
  }
}); 

app.use(express.static('./src/index'));


app.get('/', (req, res) => {
  res.status(200).send(html);
});

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: './src/index' });
});

/** Add Rotas */
app.use(produtosRouter);
app.use(rotinaEstoque);
app.use(fluxoRoutes);

export default app;
