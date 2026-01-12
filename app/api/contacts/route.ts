import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { contacts } from '@/lib/db/schema';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Nome, email e mensagem são obrigatórios' },
        { status: 400 }
      );
    }

    // Save to database (PlanetScale doesn't support .returning())
    await db.insert(contacts).values({
      name,
      email,
      phone: phone || null,
      company: company || null,
      message,
      status: 'new',
    });

    // Send notification emails to team
    const teamEmails = [
      'contato@lumina-studios.io',
      'fgois.dm@gmail.com',
      'caique1994_1@hotmail.com'
    ];

    await resend.emails.send({
      from: 'Lumina Studios <contato@lumina-studios.io>',
      to: teamEmails,
      subject: `Novo Contato: ${name} - Lumina Studios`,
      html: `
        <h2>Novo Contato Recebido</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Telefone:</strong> ${phone}</p>` : ''}
        ${company ? `<p><strong>Empresa:</strong> ${company}</p>` : ''}
        <p><strong>Mensagem:</strong></p>
        <p>${message}</p>
        <hr>
        <p><small>Recebido em: ${new Date().toLocaleString('pt-BR')}</small></p>
      `,
    });

    // Send confirmation email to user
    await resend.emails.send({
      from: 'Lumina Studios <contato@lumina-studios.io>',
      to: email,
      subject: 'Recebemos sua mensagem - Lumina Studios',
      html: `
        <h2>Olá, ${name}!</h2>
        <p>Recebemos sua mensagem e entraremos em contato em breve.</p>
        <p>Nossa equipe analisará sua solicitação e retornará dentro de 24 a 48 horas.</p>
        <hr>
        <p><strong>Resumo da sua mensagem:</strong></p>
        <p>${message}</p>
        <hr>
        <p>Atenciosamente,<br>Equipe Lumina Studios</p>
      `,
    });

    return NextResponse.json({ success: true, message: 'Contato salvo e emails enviados com sucesso!' });
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json(
      { error: 'Erro ao processar contato' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const allContacts = await db.select().from(contacts).orderBy(contacts.createdAt);
    return NextResponse.json(allContacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar contatos' },
      { status: 500 }
    );
  }
}
