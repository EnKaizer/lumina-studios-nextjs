# 🚀 Guia de Deploy na Vercel - Lumina Studios

## 📋 Pré-requisitos

- Conta no GitHub
- Repositório: https://github.com/EnKaizer/lumina-studios-nextjs

---

## 🔧 Passo a Passo

### 1. Acesse a Vercel
https://vercel.com/new

### 2. Faça Login com GitHub
- Clique em "Continue with GitHub"
- Autorize a Vercel

### 3. Importe o Repositório
- Procure por: **lumina-studios-nextjs**
- Clique em "Import"

### 4. Configure o Projeto
A Vercel detectará Next.js automaticamente.

### 5. ⚠️ IMPORTANTE: Adicione a Variável de Ambiente

Antes de clicar em "Deploy":

1. Clique em **"Environment Variables"**
2. Adicione:
   - **Name**: `DATABASE_URL`
   - **Value**: Sua string de conexão PostgreSQL
   - **Environment**: Production, Preview e Development (todas)

3. Clique em "Add"

### 6. Deploy!
- Clique em "Deploy"
- Aguarde ~2-3 minutos

### 7. ✅ Sucesso!
URL: `https://lumina-studios-nextjs.vercel.app`

---

## 🔍 Verificação Pós-Deploy

Teste:
1. ✅ Homepage
2. ✅ Mini-game
3. ✅ Formulário de contato
4. ✅ Leaderboard

**Bom deploy! 🚀**
