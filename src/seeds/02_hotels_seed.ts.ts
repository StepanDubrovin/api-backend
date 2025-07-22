import { Knex } from "knex";
import { v7 as uuidv7 } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("hotels").del();

    // Inserts seed entries
    await knex("hotels").insert([
        {
            id: uuidv7(),
            name: "Гранд Отель",
            description: "Роскошный отель в центре города",
            address: "г. Москва, ул. Ленина, д. 1",
        },
        {
            id: uuidv7(),
            name: "Отель Уют",
            description: "Уютный семейный отель",
            address: "г. Санкт-Петербург, Невский пр., д. 100",
        },
        {
            id: uuidv7(),
            name: "Бизнес Отель",
            description: "Идеален для командировок",
            address: "г. Екатеринбург, ул. Мира, д. 5",
        },
    ]);
};
