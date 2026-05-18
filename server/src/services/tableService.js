import { TableClient, AzureNamedKeyCredential } from '@azure/data-tables';

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const accountKey  = process.env.AZURE_STORAGE_ACCOUNT_KEY;
const tableName   = 'movimentacoesLog';

const credential = new AzureNamedKeyCredential(accountName, accountKey);
const tableClient = new TableClient(
  `https://${accountName}.table.core.windows.net`,
  tableName,
  credential
);

// Cria a tabela se não existir
await tableClient.createTable().catch(() => {}); // ignora erro se já existe

/**
 * Registra uma movimentação no Table Storage
 */
export async function registrarLog(tipo, produto, qtd) {
  const entidade = {
    partitionKey: tipo,           // "entrada" ou "saida"
    rowKey: `${Date.now()}-${produto.id}`,
    produtoId: produto.id,
    nomeProduto: produto.nome,
    quantidade: qtd,
    timestamp: new Date().toISOString(),
  };
  await tableClient.createEntity(entidade);
  console.log(`[Table] Log registrado: ${tipo} - ${produto.nome}`);
}

/**
 * Busca logs por tipo (entrada/saida)
 */
export async function buscarLogsPorTipo(tipo) {
  const logs = [];
  const entidades = tableClient.listEntities({
    queryOptions: { filter: `PartitionKey eq '${tipo}'` }
  });
  for await (const entidade of entidades) {
    logs.push(entidade);
  }
  return logs;
}