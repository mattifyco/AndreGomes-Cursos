# André Gomes Academy — MVP v2

MVP front-end com fluxo de **login**, **página inicial** e painéis separados para **Aluno** e **Admin**.

## Novidades desta versão

- Login demo para dois perfis:
  - Aluno
  - Admin (André)
- Página inicial após login (antes de abrir cursos)
- Painel Aluno:
  - Cursos comprados x bloqueados
  - Módulos e aulas
  - Barra de progresso por curso/aula
  - Central de dúvidas com resposta automática inicial
- Painel Admin:
  - Gestão de cursos (visão geral)
  - Análise de alunos (resumo de progresso)
  - Central de dúvidas para responder manualmente

## Fluxo de uso

1. Abrir o `index.html`
2. Escolher **Entrar como Aluno** ou **Entrar como Admin**
3. Navegar pela página inicial e seções liberadas por perfil
4. No perfil Aluno, enviar pergunta
5. No perfil Admin, responder perguntas na central de dúvidas

## Observação técnica

Continua sendo um MVP estático para GitHub Pages. Para produção, integrar com backend real:

- Auth/Roles: Supabase/Firebase
- Banco: PostgreSQL (Supabase) ou Firestore
- Vídeo: Mux/Vimeo/Wistia
- Pagamento e liberação de curso: Stripe + webhook

