import { QueueClient } from '@azure/storage-queue';

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const queueName = 'estoque-minimo-alerta';

const queueClient = new QueueClient(connectionString, queueName);

// Cria a fila se não existir
await queueClient.createIfNotExists();

/**
 * Enfileira alerta de estoque mínimo
 */
export async function alertarEstoqueMinimo(produto) {
  const mensagem = JSON.stringify({
    produtoId: produto.id,
    nomeProduto: produto.nome,
    qtdAtual: produto.qtd,
    qtdMinima: produto.min_qtd,
    timestamp: new Date().toISOString(),
  });

  // Queue Storage exige Base64
  const mensagemBase64 = Buffer.from(mensagem).toString('base64');
  await queueClient.sendMessage(mensagemBase64);
  console.log(`[Queue] Alerta enfileirado: ${produto.nome} (qtd: ${produto.qtd})`);
}