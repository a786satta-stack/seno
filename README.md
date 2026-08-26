

# A786 Satta — Next.js App

A mobile-first results platform built with **Next.js 14**, **Tailwind CSS**, and **MongoDB**.

---

## 🗂 Project  Structure

```
satta-app/
├── app/
│   ├── page.tsx                  ← Home: all game results (ISR)
│   ├── results/page.tsx          ← Today's full results table
│   ├── chart/page.tsx            ← Monthly charts (all games)
│   ├── chart/[slug]/page.tsx     ← Single game chart + history
│   ├── admin/
│   │   ├── login/page.tsx        ← Admin login
│   │   ├── dashboard/page.tsx    ← Overview + pending results
│   │   ├── results/page.tsx      ← Post/edit results
│   │   └── games/page.tsx        ← Add/edit games
│   └── api/
│       ├── auth/[...nextauth]/   ← JWT authentication
│       ├── results/              ← GET/POST results
│       ├── results/[id]/         ← PATCH/DELETE single result
│       └── games/                ← GET/POST/PUT games
├── components/
│   ├── frontend/
│   │   ├── Header.tsx            ← Sticky header + ticker + live clock
│   │   ├── ResultCard.tsx        ← Game card (today/yesterday)
│   │   └── MonthlyChartTable.tsx ← Calendar table
│   └── admin/
│       └── AdminSidebar.tsx      ← Top nav + bottom tab bar
├── models/                       ← MongoDB Mongoose schemas
│   ├── Game.ts
│   ├── Result.ts
│   ├── AdminUser.ts
│   └── MonthlyChart.ts
├── lib/db.ts                     ← DB connection with hot-reload cache
└── scripts/seed.ts               ← First-run seed script
```

---

## 🚀 Quick Start

### 0. Install pnpm (if not already installed)
```bash
npm install -g pnpm
```

### 1. Install dependencies
```bash
pnpm install
```

### 2. Configure environment
```bash
cp .env.example .env.local
# Edit .env.local with your MongoDB URI and secret
```

### 3. Seed the database (first time only)
```bash
pnpm dlx ts-node scripts/seed.ts
```
This creates:
- Admin user: `admin` / `admin123` ← **change after first login!**
- 6 sample games: Disawar, Faridabad, Ghaziabad, Delhi Bazar, Shri Ganesh, Hindustan

### 4. Run development server
```bash
pnpm dev
```

---

## 📱 Pages

| URL | Description |
|-----|-------------|
| `/` | Home — all games with today's results |
| `/results` | Live results table for today |
| `/chart` | Monthly charts for all games |
| `/chart/[slug]` | Individual game chart + recent results |
| `/admin/login` | Admin login |
| `/admin/dashboard` | Overview, pending results, quick post |
| `/admin/results` | Post or update a result |
| `/admin/games` | Add/edit/toggle games |

---

## 🗄️ MongoDB Collections

| Collection | Purpose |
|---|---|
| `games` | Game names, time slots, display config |
| `results` | Daily results (2-digit number per game per date) |
| `adminusers` | Admin credentials (bcrypt hashed) |
| `monthlycharts` | Pre-aggregated charts (fast frontend reads) |

---

## 🔌 API Reference

### Results
- `GET /api/results?gameSlug=disawar&limit=30` — fetch published results
- `POST /api/results` — post/update a result (admin)
- `PATCH /api/results/:id` — toggle published state (admin)
- `DELETE /api/results/:id` — delete result (admin)

### Games
- `GET /api/games` — list all active games
- `POST /api/games` — create new game (admin)
- `PUT /api/games` — update game (admin)

---

## 🎨 Design System

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0a0a0f` | Page background |
| `--surface` | `#12121a` | Cards |
| `--primary` | `#f59e0b` | Result numbers, accents |
| `--accent` | `#ef4444` | Warnings, alerts |
| `--success` | `#22c55e` | Live badge, declared |
| `--font-display` | Bebas Neue | Headings, game names |
| `--font-body` | Rajdhani | Body text |
| `--font-mono` | JetBrains Mono | Numbers, times, codes |

---

## 📦 Build for Production

```bash
pnpm build
pnpm start
```

For deployment, use **Vercel** (recommended) or any Node.js host.
Set environment variables in your host's dashboard.
