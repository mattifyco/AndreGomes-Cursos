# André Gomes Academy — MVP Multi-páginas

Agora o projeto está separado em páginas diferentes por função:

- **Geral:** login/entrada da plataforma
- **Aluno:** home, cursos/progresso, dúvidas, antes/depois, ranking, lives
- **Admin:** home, tabela de cursos, análise de alunos, tabela de dúvidas, avaliações antes/depois, lives

## Estrutura

- `index.html`
- `shared/styles.css`
- `shared/app.js`
- `student/*.html`
- `admin/*.html`

## Recursos implementados

1. Login por perfil (demo) e roteamento para área correta.
2. Página inicial separada para aluno e para admin.
3. Cursos com progresso por aula e barra de porcentagem.
4. Gamificação:
   - nível por progresso médio
   - badges por módulo concluído
5. Área antes/depois para aluno enviar e admin avaliar.
6. Ranking semanal por consistência (minutos de estudo/prática).
7. Agenda de lives/Q&A com lembrete no painel do aluno e visão consolidada no admin.
8. Dúvidas dos alunos com resposta automática inicial + resposta manual do admin.

## Observação

Continua como MVP estático para GitHub Pages.
Para produção, integrar autenticação real, upload de mídia e backend (Supabase/Firebase + storage + pagamentos).
