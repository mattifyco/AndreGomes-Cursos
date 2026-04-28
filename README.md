# André Gomes Academy — Plano do Site de Cursos

Este repositório contém um **MVP inicial** para o site de cursos do cabeleireiro **André Gomes** com visual dark/underground.

## Objetivo

Criar uma plataforma com:

- Organização por **Cursos → Módulos → Aulas (vídeo)**
- Acesso do aluno apenas ao curso comprado
- Painel de administrador para cadastrar conteúdo
- Barra de progresso por aula/módulo/curso
- Estética dark com elementos urbanos

## Atenção importante sobre GitHub Pages

O GitHub Pages é ótimo para hospedar o front-end, mas **não oferece backend próprio** para:

- Login seguro
- Controle de compra/acesso
- Upload e proteção de vídeo

Por isso, a arquitetura recomendada é:

- **Front-end no GitHub Pages**
- **Backend/Auth/DB em serviço externo** (ex.: Supabase ou Firebase)
- **Vídeos em plataforma própria para streaming protegido** (ex.: Vimeo OTT/Wistia/Mux)

## Stack recomendada (simples e escalável)

- **Front-end:** HTML/CSS/JS (este MVP) ou Next.js/Vite no futuro
- **Banco/Auth:** Supabase
- **Storage/Vídeo:** Mux ou Vimeo privado
- **Pagamentos:** Stripe + webhook para liberar curso comprado

## Modelagem de dados (conceito)

- `users`
- `courses`
- `modules`
- `lessons`
- `purchases` (user_id, course_id, status)
- `lesson_progress` (user_id, lesson_id, watched_percent, completed)

## Regra de progresso

- Aula concluída quando assistir >= 90%
- Progresso do módulo = média de aulas concluídas
- Progresso do curso = média de módulos

## Próximos passos sugeridos

1. Validar layout e identidade visual
2. Escolher backend (Supabase ou Firebase)
3. Implementar login + autorização por compra
4. Conectar vídeos protegidos
5. Publicar front-end no GitHub Pages

---

## Estrutura do MVP neste repositório

- `index.html` — landing/painel visual
- `styles.css` — tema dark underground
- `script.js` — mock de cursos/módulos/aulas com progresso local

> Este MVP é visual e funcional no navegador, mas ainda sem backend real.
