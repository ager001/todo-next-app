/* This file handles incoming API requests for the Todo/CTA system */

import { ConnectDB } from '@/lib/config/db'
import TodoModel from '@/lib/models/TodoModel';
import { NextResponse } from 'next/server'

/**
 * GET Handler: Used for fetching data.
 * When you visit /api/todo in your browser, this function runs.
 */
export async function GET(request) {
    // Connect to database before fetching
    await ConnectDB();
    
    // You could also return all todos here using: const todos = await TodoModel.find({});
    return NextResponse.json({
        msg: 'Hello from API route'
    })
}

/**
 * POST Handler: Used for saving new data.
 * This runs when your "Add Todo" or "CTA" button is clicked.
 */
export async function POST(request) {
    // 1. Ensure the database connection is active
    await ConnectDB();

    // 2. Extract the data sent from the frontend form
    // We 'await' the json because request reading is asynchronous in Next.js
    const { title, description } = await request.json();

    // 3. Save the data to MongoDB using the TodoModel
    // This creates a new document in your 'todos' collection
    await TodoModel.create({
        title,
        description
    })

    // 4. Send a success message back to the frontend
    return NextResponse.json({
        msg: 'Todo created successfully'
    })
}