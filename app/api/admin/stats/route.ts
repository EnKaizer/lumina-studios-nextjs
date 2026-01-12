import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { contacts } from '@/lib/db/schema';
import { sql } from 'drizzle-orm';

export async function GET() {
  try {
    // Total contacts
    const totalResult = await db.select({ count: sql<number>`count(*)` }).from(contacts);
    const total = Number(totalResult[0]?.count || 0);

    // Contacts by status
    const statusResult = await db
      .select({
        status: contacts.status,
        count: sql<number>`count(*)`
      })
      .from(contacts)
      .groupBy(contacts.status);

    // Contacts by day (last 7 days)
    const dailyResult = await db
      .select({
        date: sql<string>`DATE(created_at)`,
        count: sql<number>`count(*)`
      })
      .from(contacts)
      .where(sql`created_at >= NOW() - INTERVAL '7 days'`)
      .groupBy(sql`DATE(created_at)`)
      .orderBy(sql`DATE(created_at)`);

    return NextResponse.json({
      total,
      byStatus: statusResult.map(r => ({ status: r.status, count: Number(r.count) })),
      byDay: dailyResult.map(r => ({ date: r.date, count: Number(r.count) }))
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar estatísticas' },
      { status: 500 }
    );
  }
}
