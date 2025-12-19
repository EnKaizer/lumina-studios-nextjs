import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db/connection';

export async function GET() {
  try {
    const leaderboard = await sql`
      SELECT id, name, email, score, "createdAt"
      FROM leaderboard
      ORDER BY score DESC, "createdAt" ASC
      LIMIT 10
    `;

    return NextResponse.json({
      success: true,
      leaderboard,
    });

  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, score } = body;

    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    if (typeof score !== 'number' || score < 0) {
      return NextResponse.json(
        { error: 'Valid score is required' },
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
      INSERT INTO leaderboard (name, email, score, "createdAt")
      VALUES (${name}, ${email}, ${score}, NOW())
      RETURNING id, name, email, score, "createdAt"
    `;

    return NextResponse.json({
      success: true,
      entry: result[0],
    }, { status: 201 });

  } catch (error) {
    console.error('Error saving score:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
