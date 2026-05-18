import appInsights from 'applicationinsights';

appInsights.setup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING)
  .setAutoDependencyCorrelation(true)
  .setAutoCollectRequests(true)
  .setAutoCollectPerformance(true)
  .setAutoCollectExceptions(true)
  .setAutoCollectDependencies(true)
  .start();

import app from './src/app.js';

const porta = process.env.PORT || 3000;
app.listen(porta, () => {
  console.log(`Servidor executando em http://localhost:${porta}/`);
});