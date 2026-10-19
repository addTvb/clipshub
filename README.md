# Clipshub Landings

Отдельный Next.js-проект только с двумя лендингами (без бэкенда). English-only, SSG.

## Страницы

- `/` и `/business` — лендинг для бизнеса
- `/clipper` — лендинг для клипперов

Старые URL с префиксом локали (`/en/business`, `/en/clipper`) редиректят на плоские пути.

## Запуск локально

```bash
npm install --legacy-peer-deps
npm run dev
```

Открой:

- http://localhost:3005/business
- http://localhost:3005/clipper

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
2. Framework: **Next.js** (Output Directory оставь пустым)
3. Build: `npm run build`
4. Env: `NEXT_PUBLIC_API_URL=/api/mock`

После деплоя открой:

- `https://<your-domain>/`
- `https://<your-domain>/business`
- `https://<your-domain>/clipper`
