import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('hotels', function(table) {
            table.uuid('id').primary();
            table.string('name').notNullable();
            table.text('description');
            table.string('address').notNullable();
        })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTableIfExists('hotels')
}

