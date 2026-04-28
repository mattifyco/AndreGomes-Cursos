# Publicar no GitHub Pages (passo a passo)

## 1) Criar repositório no GitHub
- Crie um repo novo (ex.: `andre-gomes-academy`).

## 2) Enviar projeto
No terminal, dentro da pasta do projeto:

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/SEU_REPO.git
git push -u origin main
```

## 3) Ativar GitHub Pages
- Vá em **Settings > Pages**
- Em **Build and deployment**:
  - Source: **Deploy from a branch**
  - Branch: **main**
  - Folder: **/ (root)**
- Salve.

## 4) Abrir o link
Depois de 1-3 minutos, o GitHub vai mostrar a URL publicada.

## 5) Dica se algo não carregar
- Faça hard refresh (`Ctrl + F5`).
- Verifique se os arquivos estão na branch `main`.
- Confirme que `index.html` está na raiz.
