import Sequelize from "sequelize";
import createDataBase from "./createDB.js";

const DB = "estoque_autopecas";
const usuario = "root";
const senha = "root";

const sequelize = new Sequelize(DB, usuario, senha, {
  host: "localhost",
  dialect: "mysql",
});

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectOptions: {
      ssl: { rejectUnauthorized: true } // SSL obrigatório no Azure MySQL
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Em config.js — adicionar retry logic
sequelize.authenticate()
  .then(() => console.log('[DB] Conexão estabelecida com sucesso.'))
  .catch(err => {
    console.error('[DB] Erro de conexão:', err);
    process.exit(1); // App Service reiniciará automaticamente
  });

let dbStatusCreate = false;
console.log(dbStatusCreate);

if (dbStatusCreate) {
  await createDataBase(DB,usuario,senha);
  dbStatusCreate = false; 
  console.log(dbStatusCreate);
 
}


export default sequelize;


