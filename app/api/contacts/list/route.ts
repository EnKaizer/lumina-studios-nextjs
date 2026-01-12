import { NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!);

export async function GET() {
  try {
    const allContacts = await sql`
      SELECT id, name, email, phone, company, message, status, created_at
      FROM contacts
      ORDER BY created_at DESC
    `;

    return NextResponse.json(allContacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar contatos' },
      { status: 500 }
    );
  }
}
