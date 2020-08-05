// DEFININDO AS ROTAS
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
import express from 'express';
import ClassesController from './controllers/ClassesController';

const routes = express.Router();
const classesControllers = new ClassesController();

// Primeira rota: criação de uma aula
routes.post('/classes', classesControllers.create);

// Segunda rota: listar as aulas e filtrar por matéria
routes.get('/classes', classesControllers.index);

export default routes;
