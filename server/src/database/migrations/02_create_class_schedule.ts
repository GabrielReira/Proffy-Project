// Criando a tabela que vai armazenar o cronograma das aulas
import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('class_schedule', table => {
        table.increments('id').primary();
    
        // Dia da semana: 0 representará domingo e 6 sábado
        table.integer('week_day').notNullable();
        // Horário de X hora até Y hora
        table.integer('from').notNullable();
        table.integer('to').notNullable();

        table.integer('class_id')
            .notNullable()
            .references('id')
            .inTable('classes')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('class_schedule');
}
