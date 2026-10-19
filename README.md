# Clipshub Landings

Отдельный Next.js-проект только с двумя лендингами (без бэкенда).

## Страницы

- `/en/clipper` — лендинг для клипперов
- `/en/business` — лендинг для бизнеса

Корень `/` редиректит на `/business` (с учётом локали: `/en` → `/en/business`).

## Запуск локально

```bash
npm install --legacy-peer-deps
npm run dev
```

Открой:

- http://localhost:3000/en/clipper
- http://localhost:3000/en/business

Прод-сборка:

```bash
npm run build
npm run start
```

## Env

Скопируй `.env.example` → `.env.local` (уже настроено на mock API):

```bash
NEXT_PUBLIC_API_URL=/api/mock
NEXT_PUBLIC_FRONT_BASE_URL=
```

API-запросы (форма Contact Us, словари категорий) идут в локальные заглушки `/api/mock/v1/*` — отдельный бэкенд не нужен.

## Деплой (Vercel и т.п.)

1. Залей этот репозиторий
2. Framework: Next.js
3. Build: `npm run build`
4. Env: `NEXT_PUBLIC_API_URL=/api/mock`

После деплоя ссылки будут вида:

- `https://<your-domain>/en/clipper`
- `https://<your-domain>/en/business`
