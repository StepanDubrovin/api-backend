import { Knex } from "knex";
import { v7 as uuidv7 } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("rooms").del();

    const hotels = await knex("hotels").select("id");

    // Inserts seed entries
    await knex("rooms").insert([
        {
            id: "01982eba-6c54-758c-bdd2-8ddbbcf0a98a",
            type: "Одноместный",
            price: 3500,
            hotel_id: hotels[0].id,
        },
        {
            id: uuidv7(),
            type: "Двухместный",
            price: 5500,
            hotel_id: hotels[1].id,
        },
        {
            id: uuidv7(),
            type: "Люкс",
            price: 8500,
            hotel_id: hotels[2].id,
        },
    ]);
};
