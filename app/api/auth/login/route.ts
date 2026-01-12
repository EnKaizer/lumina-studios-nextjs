import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

const ADMIN_EMAIL = 'contato@lumina-studios.io';
const ADMIN_PASSWORD_HASH = bcrypt.hashSync('qev89pt7*', 10);

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    // Check credentials
    if (email === ADMIN_EMAIL && bcrypt.compareSync(password, ADMIN_PASSWORD_HASH)) {
      // Create session token (simplified - in production use JWT)
      const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');
      
      return NextResponse.json({
        success: true,
        token,
        user: { email: ADMIN_EMAIL }
      });
    }

    return NextResponse.json(
      { error: 'Credenciais inválidas' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Error in login:', error);
    return NextResponse.json(
      { error: 'Erro ao fazer login' },
      { status: 500 }
    );
  }
}
