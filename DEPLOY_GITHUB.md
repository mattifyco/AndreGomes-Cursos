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


## 6) Quando atualiza e "fica igual" (cache/build)
Isso é comum. Normalmente o deploy leva de **1 a 5 minutos** após `git push`.

Checklist rápido:
- Confirme em **Actions** se o deploy terminou com sucesso.
- Em **Settings > Pages**, confira branch `main` e pasta `/ (root)`.
- Faça hard refresh (`Ctrl + F5`) ou abra em aba anônima.
- Teste com query string para quebrar cache: `?v=2` no final da URL.
- Se mudou CSS/JS e não refletiu, aguarde mais 2-3 minutos e recarregue.

Se ainda não atualizar, faça um novo commit pequeno (ex.: espaço no README) e `push`.
