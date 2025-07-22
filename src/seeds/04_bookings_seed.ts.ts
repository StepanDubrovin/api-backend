import { Knex } from "knex";
import { v7 as uuidv7 } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("bookings").del();

    const users = await knex("users").select("id", "role");
    const rooms = await knex("rooms").select("id");

    // Inserts seed entries
    await knex("bookings").insert([
        {
            id: uuidv7(),
            start_date: "2025-08-01",
            end_date: "2025-08-05",
            status: 1,
            user_id: users[0].id,
            room_id: rooms[0].id,
            user_role: users[0].role
        },
        {
            id: uuidv7(),
            start_date: "2025-09-10",
            end_date: "2025-09-12",
            status: 2,
            user_id: users[1].id,
            room_id: rooms[1].id,
            user_role: users[1].role
        },
        {
            id: uuidv7(),
            start_date: "2025-10-15",
            end_date: "2025-10-20",
            status: 1,
            user_id: users[2].id,
            room_id: rooms[2].id,
            user_role: users[2].role,
        },
    ]);
};
