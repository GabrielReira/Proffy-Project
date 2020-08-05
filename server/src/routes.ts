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

import db from './database/connection';
import convertHourToMinutes from './utils/convertHourToMinutes';

const routes = express.Router();

// Definindo os formatos de cada item do cronograma
interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

// Primeira rota: criação de uma aula
routes.post('/classes', async (request, response) => {
    // Usuário
    const {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost,
        schedule
    } = request.body;

    const trx = await db.transaction();

    try {
        const insertedUsersIds = await trx('users').insert({
            name,
            avatar,
            whatsapp,
            bio,
        });
        const user_id = insertedUsersIds[0];
    
        // Aula
        const insertedClassesIds = await trx('classes').insert({
            subject,
            cost,
            user_id,
        })
        const class_id = insertedClassesIds[0];
    
        // Agendamento da aula
        // Convertendo os horário das aulas em minutos
        const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
            return {
                class_id,
                week_day: scheduleItem.week_day,
                from: convertHourToMinutes(scheduleItem.from),
                to: convertHourToMinutes(scheduleItem.to),
            }
        })
    
        await trx('class_schedule').insert(classSchedule);
    
        // Insere todas as informações ao mesmo tempo no bd
        await trx.commit();
    
        return response.status(201).send();
    } catch (err) {
        // Em caso de erro, desfazer as alterações do bd
        await trx.rollback();

        return response.status(400).json({
            error: 'Unexpected error while creating new class'
        })
    }
});

export default routes;
