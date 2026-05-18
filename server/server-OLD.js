import app from './src/app.js'


const porta = process.env.PORT || 3000;

//const cors = require('cors');
//app.use(cors());


app.listen(porta,() => {
    // http://localhost:3000/
    console.log(`Servidor executando em http://localhost:${porta}/`);
})


// app.listen(porta, '0.0.0.0', () => {
//   console.log(`Servidor escutando em http://0.0.0.0:${porta}/`);
// });
