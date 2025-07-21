import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('rooms', function(table) {
            table.uuid('id').primary();
            table.string('type').notNullable();
            table.integer('price').notNullable();
            table.uuid('hotel_id').unsigned().notNullable()
                .references('id').inTable('hotels')
                .onDelete('CASCADE')
        })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTableIfExists('rooms')
}

