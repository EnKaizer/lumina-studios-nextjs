import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db/connection';

export async function GET(request: NextRequest) {
  try {
    const leads = await sql`
      SELECT 
        id,
        name,
        email,
        score,
        created_at,
        lead_status
      FROM leads
      ORDER BY created_at DESC
    `;

    const stats = await sql`
      SELECT 
        COUNT(*) as total,
        AVG(score) as avg_score,
        MAX(score) as max_score,
        MIN(score) as min_score
      FROM leads
      WHERE score IS NOT NULL
    `;

    return NextResponse.json({
      leads,
      stats: stats[0],
    });

  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
