import express from 'express';

const app = express();
app.use(express.json())


// http://localhost:3333/users
/*
GET: busca ou lista uma informação
POST: cria uma nova informação
PUT: atualiza uma informação existente
DELETE: deleta uma informação existente
*/
/*
Request body: dados para criação e atualização de registro
Route params: identificar qual recurso atualizar ou deletar
Query params: paginação, filtro, ordenação
*/
// Definindo as rotas
app.get('/', (request, response) => {
    return response.json({ message: 'Hello World!' });
});


app.listen(3333);
