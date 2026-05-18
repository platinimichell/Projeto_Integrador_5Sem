import { BlobServiceClient } from '@azure/storage-blob';

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = 'relatorios';

const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const containerClient = blobServiceClient.getContainerClient(containerName);

/**
 * Faz upload de um buffer (ex: CSV gerado) para o Blob Storage
 * @param {string} blobName - nome do arquivo (ex: relatorio-2025-11.csv)
 * @param {Buffer|string} content - conteúdo do arquivo
 */
export async function uploadRelatorio(blobName, content) {
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const buffer = Buffer.isBuffer(content) ? content : Buffer.from(content, 'utf-8');
  await blockBlobClient.upload(buffer, buffer.length);
  console.log(`[Blob] Upload realizado: ${blobName}`);
  return blockBlobClient.url;
}

/**
 * Lista todos os relatórios salvos
 */
export async function listarRelatorios() {
  const arquivos = [];
  for await (const blob of containerClient.listBlobsFlat()) {
    arquivos.push({
      nome: blob.name,
      tamanho: blob.properties.contentLength,
      criadoEm: blob.properties.createdOn,
    });
  }
  return arquivos;
}