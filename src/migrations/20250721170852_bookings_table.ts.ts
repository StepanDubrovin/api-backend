import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('bookings', function(table) {
            table.uuid('id').primary();
            table.date('start_date').notNullable();
            table.date('end_date').notNullable();
            table.integer('status').notNullable();
            table.uuid('user_id').unsigned().notNullable()
                .references('id').inTable('users')
                .onDelete('CASCADE');
            table.uuid('room_id').unsigned().notNullable()
                .references('id').inTable('rooms')
                .onDelete('CASCADE');
            table.integer('user_role').notNullable();
        })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTableIfExists('bookings')
}

