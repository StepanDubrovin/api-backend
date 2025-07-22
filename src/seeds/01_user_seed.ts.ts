import { Knex } from "knex";
import { v7 as uuidv7 } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        {   
            id: '01982eba-6c5f-763d-a0e1-1216b4f6e682', 
            firstName: "Иван", 
            lastName: "Иванов", 
            middleName: "Иванович",
            email: "ivan1@gmail.com", 
            role: 1
        },
        {   
            id: uuidv7(), 
            firstName: "Петр", 
            lastName: "Петров", 
            middleName: "Петрович",
            email: "petr@gmail.com", 
            role: 2
        }, 
        {   
            id: uuidv7(), 
            firstName: "Сергей", 
            lastName: "Сергеев", 
            middleName: "Сергеевич",
            email: "serg@gmail.com", 
            role: 2
        },
    ]);
};