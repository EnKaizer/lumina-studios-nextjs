import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db/connection';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, score } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO leads (
        name, 
        email, 
        score, 
        completed, 
        created_at, 
        updated_at
      )
      VALUES (
        ${name || 'Anônimo'}, 
        ${email}, 
        ${score || 0}, 
        true, 
        NOW(), 
        NOW()
      )
      RETURNING id, name, email, score, created_at
    `;

    return NextResponse.json({
      success: true,
      lead: result[0],
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
