// Importando parâmetros do express
import { Request, Response } from 'express';

import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

// Definindo os formatos de cada item do cronograma
interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

export default class ClassesController {
    // Rota da listagem de aulas
    async index(request: Request, response: Response) {
        // Filtros de pesquisa por dia da semana, horário e matéria
        const filters = request.query;

        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        if ( !filters.week_day|| !filters.subject || !filters.time ) {
            return response.status(440).json({
                error: 'Missing filters to search classes'
            })
        }

        const timeInMinutes = convertHourToMinutes(time);

        const classes = await db('classes')
            .whereExists(function() {
                this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                    .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                    .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                    .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
            })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*', 'users.*']);

        return response.json(classes);
    }

    // Rota da criação de uma aula
    async create(request: Request, response: Response) {
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
    }
}
