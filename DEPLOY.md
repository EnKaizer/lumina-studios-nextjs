# 🚀 Guia de Deploy - Lumina Studios Next.js

## ✅ Projeto Pronto para Deploy

O projeto está 100% configurado e pronto para deploy na Vercel!

---

## 📋 Pré-requisitos

1. Conta no GitHub (username: `EnKaizer`)
2. Conta na Vercel (pode fazer login com GitHub)
3. DATABASE_URL do PostgreSQL (Aiven Cloud)

---

## 🎯 Opção 1: Deploy via GitHub + Vercel (RECOMENDADO)

### Passo 1: Criar Repositório no GitHub

1. Acesse https://github.com/new
2. Nome do repositório: `lumina-studios-nextjs`
3. Visibilidade: **Public**
4. **NÃO** adicione README, .gitignore ou license
5. Clique em **Create repository**

### Passo 2: Push do Código

No terminal do sandbox, execute:

```bash
cd /home/ubuntu/lumina-nextjs
git remote add origin https://github.com/EnKaizer/lumina-studios-nextjs.git
git branch -M main
git push -u origin main
```

Quando pedir credenciais:
- Username: `EnKaizer`
- Password: Use um **Personal Access Token** (não a senha)

**Como criar Personal Access Token:**
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token (classic)
3. Scopes: marque `repo` (full control)
4. Generate token e copie (só aparece uma vez!)

### Passo 3: Deploy na Vercel

1. Acesse https://vercel.com/new
2. Faça login com GitHub
3. Importe o repositório `lumina-studios-nextjs`
4. Configure as variáveis de ambiente:
   - `DATABASE_URL`: Cole a URL do PostgreSQL (Aiven)
5. Clique em **Deploy**

✅ **Pronto! Seu site estará no ar em ~2 minutos!**

---

## 🎯 Opção 2: Deploy Direto via Vercel CLI

### Passo 1: Autenticar Vercel CLI

```bash
cd /home/ubuntu/lumina-nextjs
vercel login
```

Siga as instruções no terminal para autenticar.

### Passo 2: Deploy

```bash
vercel --prod
```

Quando perguntar sobre variáveis de ambiente, adicione:
- `DATABASE_URL`: Cole a URL do PostgreSQL

---

## 🔐 Variáveis de Ambiente Necessárias

Adicione estas variáveis no painel da Vercel:

```
DATABASE_URL=postgresql://avnadmin:SENHA@HOST:PORT/defaultdb?sslmode=require
```

**Onde encontrar:**
- Aiven Dashboard → lumina-db → Connection Information

---

## 📦 Arquivos de Configuração

✅ **vercel.json** - Configurações do projeto
✅ **.vercelignore** - Arquivos ignorados no deploy
✅ **next.config.ts** - Configuração do Next.js
✅ **package.json** - Dependências e scripts

---

## 🎨 Build de Produção Local (Teste)

Para testar o build localmente antes do deploy:

```bash
cd /home/ubuntu/lumina-nextjs
pnpm build
pnpm start
```

---

## 🌐 Após o Deploy

Sua URL será algo como:
- `https://lumina-studios-nextjs.vercel.app`
- Ou um domínio customizado que você configurar

---

## 🐛 Troubleshooting

### Erro: "Can't resolve './tailwind.config.js'"
✅ **JÁ CORRIGIDO** - O `@config` usa caminho relativo correto

### Erro: "DATABASE_URL not defined"
- Adicione a variável de ambiente no painel da Vercel

### Build falha
- Verifique os logs no painel da Vercel
- O build local funciona? (`pnpm build`)

---

## 📞 Suporte

Se tiver problemas:
1. Verifique os logs de build na Vercel
2. Teste o build local primeiro
3. Confirme que DATABASE_URL está configurada

---

**Boa sorte com o deploy! 🚀**
