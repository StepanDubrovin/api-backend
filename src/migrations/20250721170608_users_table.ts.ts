import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('users', function (table) {
            table.uuid('id').primary();
            table.string('firstName', 50).notNullable();
            table.string('lastName', 50).notNullable();
            table.string('middleName', 50);
            table.string('email', 254).notNullable().unique();
            table.integer('role').notNullable();
        });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTableIfExists('users')
}