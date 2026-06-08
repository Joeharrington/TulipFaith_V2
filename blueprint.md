# TulipFaith V2 — Project Blueprint

## What This Is

TulipFaith is a faith formation platform and living memorial to Susan Harrington, built by her husband Joe. It combines serialized Christian fiction, structured Bible study, community prayer, devotional essays, and a personal journal into a single experience. It is built to be a PWA (Progressive Web App) — installable on any device, readable offline.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js (App Router) — `tulipfaith-v2/` |
| Backend | Django 5.2 LTS + Wagtail 7.4 (headless CMS) |
| Database (local) | SQLite |
| Database (production) | Neon (PostgreSQL) |
| Backend host | Render |
| Frontend host | Vercel |
| Auth | Django Auth (JWT via djangorestframework-simplejwt) |
| Styling | Tailwind CSS + CSS custom properties |
| Animation | GSAP + Framer Motion |

**Key paths:**
- Frontend: `c:\Users\jharr\Desktop\All Folders\Projects\TulipFaith_V2\tulipfaith-v2\`
- Backend: `c:\Users\jharr\Desktop\All Folders\Projects\TulipFaithV1\backend\`
- Backend app: `TulipFaithV1/backend/website/`
- Frontend src: `tulipfaith-v2/src/`
- API base URL env var: `NEXT_PUBLIC_API_URL` (default: `http://localhost:8000`)
- Virtual env: `TulipFaithV1/backend/venv312/`

---

## What Is Already Built

### Frontend Pages
| Route | File | Status |
|---|---|---|
| `/` | `src/app/page.js` | ✅ Built (GSAP intro overlay, shatter-to-doves) |
| `/about` | `src/app/about/page.js` | ✅ Built |
| `/our-story` | `src/app/our-story/page.js` | ⚠️ Built — needs Joe's personal content about Susan |
| `/prayer-wall` | `src/app/prayer-wall/page.js` | ✅ Built — categories, 🙏 button, API wired |
| `/community-prayer` | `src/app/community-prayer/page.js` | ✅ Built — countdown + unfolding prayer |
| `/journal` | `src/app/journal/page.js` | ⚠️ Built — localStorage only, needs user accounts |
| `/stories/adult` | `src/app/stories/adult/page.js` | ✅ Built — coming soon cards |
| `/stories/teen` | `src/app/stories/teen/page.js` | ✅ Built — coming soon cards |
| `/stories/children` | `src/app/stories/children/page.js` | ✅ Built — coming soon cards |
| `/stories/[track]/[slug]` | `src/app/stories/[track]/[slug]/page.js` | ⚠️ Template built — no content, no bookshelf reader |
| `/still-waters` | `src/app/still-waters/page.js` | ✅ Built |
| `/still-waters/[slug]` | `src/app/still-waters/[slug]/page.js` | ✅ Built |

### Frontend Components
| Component | File | Status |
|---|---|---|
| Header | `src/components/layout/Header.js` | ✅ Built |
| Footer | `src/components/layout/Footer.js` | ✅ Built |
| IntroOverlay | `src/components/cinematic/IntroOverlay.js` | ✅ Built |
| HighlightToJournal | `src/components/story/HighlightToJournal.js` | ✅ Built |

### Frontend Data
| File | Contents |
|---|---|
| `src/lib/api.js` | `getPrayers`, `submitPrayer`, `getPrayerCategories`, `getHome`, `getPrayerSession` |
| `src/lib/still-waters.js` | Static Still Waters posts array — "The Danger of Small Things" is first post |

### Backend (Django/Wagtail)
| Model | Location | Notes |
|---|---|---|
| `HomePage` | `website/models.py` | Wagtail page |
| `ContentPage` | `website/models.py` | Generic rich text page |
| `PrayerCategory` | `website/models.py` | Snippet — has `prayed_count` field |
| `PrayerWallPage` | `website/models.py` | Wagtail page |
| `Prayer` | `website/models.py` | Has `name`, `is_anonymous`, `category`, `content`, `approved`, `prayed_count` |
| `PrayerSession` | `website/models.py` | Snippet — day, hour (12h choices), minute, timezone, duration, leader |

### Backend API Endpoints
| Method | URL | Purpose |
|---|---|---|
| GET | `/api/home` | Hero + story cards |
| GET | `/api/prayers` | All approved prayers |
| POST | `/api/prayers` | Submit prayer (goes in as approved=False) |
| POST | `/api/prayers/<id>/prayed` | Increment individual prayer 🙏 count |
| GET | `/api/prayer/categories` | Categories with prayed_count |
| POST | `/api/prayer/categories/<slug>/prayed` | Increment category 🙏 count |
| GET | `/api/prayer/session` | Next scheduled community prayer session |

### Backend Migrations (applied)
- `0001_initial` — base models
- `0002_prayersession` — prayer session scheduling
- `0003_prayersession_default_tz` — default timezone → America/Chicago
- `0004_prayersession_hour_minute_choices` — 12-hour dropdown in admin
- `0005_prayercategory_prayed_count` — community 🙏 count on categories

---

## What Needs To Be Built

### PHASE 1 — Foundation (must complete before beta)

#### 1A. Django Auth + User Accounts
**Complexity: HIGH — use premium model**

- Extend Django's User model with: `display_name`, `role` (reader / discussion_leader / moderator / admin), `avatar`
- Install `djangorestframework-simplejwt`
- Add API endpoints:
  - `POST /api/auth/register` — create account
  - `POST /api/auth/login` — returns access + refresh JWT tokens
  - `POST /api/auth/refresh` — refresh token
  - `POST /api/auth/logout`
  - `GET /api/auth/me` — current user profile
- Add to `INSTALLED_APPS` and `urls.py`
- Create migration for extended user model
- Frontend: build `/login` and `/register` pages
- Frontend: store JWT in httpOnly cookie or localStorage, attach to API requests
- Frontend: `useAuth()` hook or context for current user state
- Move journal from localStorage to Django (`Journal` model — user FK, title, scripture, body, created_at)
- Add journal API endpoints: `GET /api/journal`, `POST /api/journal`, `DELETE /api/journal/<id>`

**Files to touch:**
- `TulipFaithV1/backend/website/models.py` — add UserProfile, Journal models
- `TulipFaithV1/backend/website/api.py` — add auth + journal endpoints
- `TulipFaithV1/backend/website/api_urls.py` — add routes
- `TulipFaithV1/backend/requirements.txt` — add `djangorestframework-simplejwt`
- `TulipFaithV1/backend/tulipfaith/settings.py` — add JWT config
- `tulipfaith-v2/src/app/login/page.js` — new page
- `tulipfaith-v2/src/app/register/page.js` — new page
- `tulipfaith-v2/src/app/journal/page.js` — migrate from localStorage to API
- `tulipfaith-v2/src/lib/api.js` — add auth + journal functions
- `tulipfaith-v2/src/lib/auth.js` — new: useAuth hook / auth context

#### 1B. PWA Setup
**Complexity: LOW — cheaper model can handle**

- Install `@ducanh2912/next-pwa`
- Update `next.config.mjs` to enable PWA
- Create `src/app/manifest.ts` with:
  - name: "Tulip Faith"
  - short_name: "TulipFaith"
  - theme_color: "#2E1045" (violet deep)
  - background_color: "#FAF8F5" (parchment)
  - display: "standalone"
  - icons: 192×192 and 512×512 from TulipFaith_Logo.png
- Add PWA meta tags to `src/app/layout.js`
- Add `theme-color`, `apple-mobile-web-app-capable`, `apple-mobile-web-app-status-bar-style`
- Service worker caches: story pages, still-waters pages, prayer wall, journal

**Files to touch:**
- `tulipfaith-v2/next.config.mjs`
- `tulipfaith-v2/src/app/manifest.ts` (new)
- `tulipfaith-v2/src/app/layout.js`
- `tulipfaith-v2/public/` — add icon-192.png, icon-512.png (resize from TulipFaith_Logo.png)

#### 1C. Deployment
**Complexity: MEDIUM — follow steps carefully**

1. **Neon** — create database, copy connection string
2. **Render** — deploy Django backend:
   - Set env vars: `DATABASE_URL`, `SECRET_KEY`, `DEBUG=false`, `ALLOWED_HOSTS`, `CORS_ALLOWED_ORIGINS`
   - Run `python manage.py migrate` on deploy
   - Configure static files with whitenoise
3. **Vercel** — deploy Next.js frontend:
   - Set `NEXT_PUBLIC_API_URL` to Render backend URL
   - Connect GitHub repo

**Files to touch:**
- `TulipFaithV1/backend/tulipfaith/settings.py` — production database config via DATABASE_URL
- `TulipFaithV1/backend/requirements.txt` — ensure `psycopg2-binary`, `gunicorn`, `whitenoise`
- `TulipFaithV1/backend/Procfile` (new) — `web: gunicorn tulipfaith.wsgi`

---

### PHASE 2 — The Reading Experience

#### 2A. Chapter Data Model (Wagtail)
**Complexity: MEDIUM — use mid-tier model**

Each story is a full faith-based novel delivered chapter by chapter (every 1–2 weeks).
Each book opens with a **prologue** — displayed like the inside cover when a reader first opens the book.

**Adult & Teen chapter structure (in sequence — not skippable):**
1. Chapter number, title, and date/period setting (e.g. "November 2025: The Call That Changed Everything")
2. Chapter narrative body (~2,500 words, rich text, may include illustrations)
3. — Reader "turns" to study section here —
4. Biblical Reflection subtitle
5. Foundation Verses (mix of OT/NT that establish theological ground — minimum 2)
6. Fulfillment Verses (NT verses that complete the foundation — minimum 2)
7. Reflection (substantive theological commentary on chapter themes — rich text)
8. Reflection Questions (list of 3 questions for personal application)
9. Prayer (full written prayer)
10. Further Study & Journaling — Morning session:
    - Scripture reading (reference + optional text)
    - Meditation question
    - Journal prompt
11. Further Study & Journaling — Evening session:
    - Scripture reading (reference + optional text)
    - Meditation question
    - Journal prompt
12. Published date (controls drip — future chapters hidden until publish date)

**Reading rhythm design decision:**
- Narrative: Day 1
- Morning devotional: Day 2 morning (push notification reminder)
- Evening devotional: Day 2 evening (push notification reminder)
- Next chapter drops: Day 7–14

**Children's chapter structure:**
1. Chapter narrative (shorter, simpler language)
2. Optional illustrations
3. Moral of the Story

**Models to add to `website/models.py`:**
- `Story` (Wagtail Page) — title, track (adult/teen/children), description, cover image, slug, prologue (rich text)
- `Chapter` (Wagtail Page, child of Story) — all fields above, chapter_number, period_setting, published_at, illustrations (StreamField)

#### 2B. Bookshelf Reader UI
**Complexity: HIGH — use premium model**

- Bookshelf page at `/stories/[track]` — books displayed on a visual shelf
- Click a book → lift-off-shelf animation → book opens
- First open: prologue displays like the inside cover
- Subsequent opens: opens to current reading position
- Page-turn animation (CSS 3D transform or react-pageflip library)
- Narrative pages and study pages are visually distinct — different background/typography treatment
- Reading progress saved to user account: which chapter, which section (narrative / morning / evening)
- Chapter navigation (prev/next) — locked chapters show as sealed pages
- Waiting experience when caught up:
  - Countdown to next chapter drop
  - Morning/evening notification nudges if day 2 devotional not completed
  - Link to chapter discussion
  - Ability to re-read previous chapters
- Push notifications:
  - New chapter available
  - "Morning devotional waiting for you" (Day 2 AM)
  - "Evening reflection — complete your day" (Day 2 PM)
  - Community Prayer Hour reminder

#### 2C. Chapter Discussion Forum
**Complexity: HIGH — use premium model**

- Per-chapter discussion thread
- Read gate: user must confirm they've read the chapter before entering discussion
- Discussion model: `DiscussionPost` — chapter FK, user FK, body, created_at, parent FK (for replies)
- Discussion leaders can pin posts, moderate
- Future: streaming discussion (like Community Prayer Hour)

**Models to add:**
- `ReadingProgress` — user, story, chapter, completed (bool), completed_at
- `DiscussionPost` — chapter, user, body, parent (nullable, for replies), created_at, is_pinned

---

### PHASE 3 — Future Features (post-launch)

- **Cloned voice audio narration** — Joe's voice reads each chapter
- **Streaming chapter discussions** — live video/audio, like Community Prayer Hour
- **Push notifications** — new chapter drops, prayer hour reminders
- **Discussion leader tools** — assign leaders per story, moderation queue
- **Reading streaks / encouragement** — gentle accountability
- **Mobile illustrations** — per-chapter art that fits the PWA experience

---

## Story Content Plan

### Adult Stories (to be written, then entered in Wagtail CMS)
- "Where the Light Goes" — grief & hope
- "The Long Way Home" — redemption
- "Bread on the Water" — marriage & suffering

### Teen Stories
- "Something Real" — faith & doubt
- "The Weight You Carry" — identity & shame
- "Not What They Told Me" — searching

### Children's Stories
- "The Shepherd Who Searched" — God's love
- "The Seed That Waited" — faith & patience
- "Starlight on the Water" — grief & heaven

### Still Waters (devotional essays — stored in `src/lib/still-waters.js` until CMS migration)
- ✅ "The Danger of Small Things" — published 2026-05-22

---

## Design System

**CSS Variables (defined in `src/app/globals.css`):**
- `--color-parchment` — warm off-white background
- `--color-violet-deep` — dark purple, primary headings
- `--color-violet-primary` — medium purple
- `--color-violet-light` / `--color-lavender` / `--color-lavender-pale`
- `--color-fall-amber` — warm amber/orange accent
- `--color-warm-gray` — body text
- `--color-green-vine` / `--color-green-leaf` — teen track color
- `--font-display` — serif display font
- `--font-body` — body font

**Badge classes:** `badge-adult`, `badge-teen`, `badge-children`
**Button classes:** `btn-primary`, `btn-secondary`

**Still Waters accent color:** `#4A7FA5` (calm lake blue — defined inline, not in CSS vars)
**Prayer Wall / Community Prayer background:** `#06010f` (near black)

---

## Key Business Rules

1. **Prayer privacy** — prayers are NOT required to be private. Users CHOOSE to post with a name or anonymously. The name field is "Who is this prayer for?" (the subject), not who is submitting.
2. **Prayer moderation** — prayers submit as `approved=False`. Joe or a moderator approves before they appear publicly.
3. **Chapter drip** — chapters publish on a schedule (every 1–2 weeks). Future chapters are locked.
4. **Discussion gate** — users must confirm they've read a chapter before joining that chapter's discussion.
5. **Discussion leaders** — a role above standard reader; can pin posts and guide discussion.
6. **Community Prayer Hour** — scheduled weekly by Joe via Wagtail admin (Snippets → Prayer Session Schedule). Uses 12-hour time picker. Displays in visitor's local timezone automatically.
7. **Still Waters** — devotional essays written by Joe. Currently stored statically in `src/lib/still-waters.js`. Will migrate to Wagtail CMS when volume warrants it.

---

## Agent Task Routing Guide

### Cheaper/Faster Model (Haiku / Flash) — suitable for:
- Adding nav links to Header or Footer
- CSS adjustments and color changes
- Creating manifest.json / PWA meta tags
- Simple new static pages with no logic
- Updating copy/text content
- Adding new entries to `src/lib/still-waters.js`
- Simple migration files (adding a single field)
- Writing `Procfile`, `.env.example`, basic config files

### Mid-Tier Model (Sonnet) — suitable for:
- New API endpoints (moderate complexity)
- New Wagtail models and migrations
- New frontend pages with API integration
- Updating existing components
- Deployment configuration
- Chapter data model setup

### Premium Model (Opus) — required for:
- Django Auth + JWT implementation (full system)
- Bookshelf reader + page-turn animation
- Chapter discussion forum architecture
- Multi-file refactors affecting auth state across the app
- Reading progress system
- Any task requiring reasoning across many files simultaneously

---

## Environment Variables

### Backend (`TulipFaithV1/.env`)
```
DEBUG=true
SECRET_KEY=dev-secret-key-tulipfaith-local-only
ALLOWED_HOSTS=localhost,127.0.0.1
CSRF_TRUSTED_ORIGINS=http://localhost:3000
CORS_ALLOWED_ORIGINS=http://localhost:3000
WAGTAILADMIN_BASE_URL=http://localhost:8000
DATABASE_URL=  ← Neon connection string (production only)
```

### Frontend (`tulipfaith-v2/.env.local`)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## Running Locally

### Backend
```bash
cd "TulipFaithV1/backend"
venv312/Scripts/python manage.py runserver
# Admin: http://localhost:8000/cms/
# API:   http://localhost:8000/api/
```

### Frontend
```bash
cd tulipfaith-v2
npm run dev
# App: http://localhost:3000
```
