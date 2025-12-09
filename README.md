# Rick and Morty Character Explorer

A modern web application to explore characters from the Rick and Morty TV series, built for the Transportech.AI Frontend Developer Assessment.

![Rick and Morty Explorer](https://rickandmortyapi.com/api/character/avatar/1.jpeg)

## 🚀 Live Demo

Deployed to Cloudflare Pages: Update the link below once you deploy.

[View Live Demo](https://your-deployed-url.pages.dev) _(Update with your Cloudflare Pages URL)_

## ✨ Features

### Core Features

- **Character List** - Browse 826+ characters with images, names, and status badges
- **Pagination** - Navigate through pages with intuitive controls
- **Search** - Find characters by name with debounced search
- **Filters** - Filter by status (Alive/Dead/Unknown), species, and gender
- **Character Detail** - View full character information including origin, location, and episodes
- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **Loading States** - Skeleton loading with shimmer effects
- **Error Handling** - Graceful error and empty state displays

### Bonus Features

- 🌓 **Dark/Light Mode** - Toggle between themes (persisted to localStorage)
- ❤️ **Favorites** - Save favorite characters (persisted to localStorage)
- 🎬 **Episodes Page** - Browse all episodes grouped by season
- 🎨 **Smooth Animations** - Hover effects and transitions throughout
- 🧪 **Unit Tests** - Jest + React Testing Library tests for key components

## 🛠 Tech Stack

| Technology                | Purpose                         |
| ------------------------- | ------------------------------- |
| **Next.js 16**            | React framework with App Router |
| **TypeScript**            | Type safety                     |
| **Tailwind CSS**          | Styling                         |
| **Zustand**               | State management                |
| **Axios**                 | HTTP client                     |
| **Jest**                  | Unit testing                    |
| **React Testing Library** | Component testing               |

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/transportech.git
cd transportech

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Deploy to Cloudflare Pages

1. Create a new Cloudflare Pages project and connect it to your GitHub repository.
2. Set the build command to:

```bash
npm run build
```

3. Set the Publish directory to:

```
.next
```

4. Optionally set environment variables in Cloudflare Pages if needed.

5. When the deployment finishes, copy the live URL and replace `https://winter-sky-48f5.bimakrishna-project.workers.dev/` in this README.

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── character/[id]/     # Character detail page
│   ├── episodes/           # Episodes list page
│   ├── favorites/          # Favorites page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # React components
│   ├── CharacterCard.tsx
│   ├── CharacterCardSkeleton.tsx
│   ├── EmptyState.tsx
│   ├── ErrorState.tsx
│   ├── FilterPanel.tsx
│   ├── Header.tsx
│   ├── Pagination.tsx
│   ├── SearchBar.tsx
│   └── ThemeProvider.tsx
├── lib/                    # Utilities
│   └── api.ts              # API client
├── store/                  # Zustand stores
│   ├── characterStore.ts
│   ├── favoriteStore.ts
│   └── themeStore.ts
├── types/                  # TypeScript types
│   └── index.ts
└── __tests__/              # Unit tests
    ├── CharacterCard.test.tsx
    └── SearchBar.test.tsx
```

## ⏱ Time Tracking (Estimated)

These are more realistic time estimates for a single frontend developer, accounting for design, implementation, testing, and polish. Times are presented as a reasonable range to reflect differences in familiarity, debugging, and small iteration cycles.

| Task                                      | Time (range)                       |
| ----------------------------------------- | ---------------------------------- |
| Setup & Configuration                     | 30 - 60 min                        |
| API Layer & Types                         | 45 - 90 min                        |
| State Management (Zustand)                | 45 - 90 min                        |
| Core Components (cards, skeletons, UI)    | 3 - 4 hrs                          |
| Pages (Home, Detail, Episodes, Favorites) | 3 - 4 hrs                          |
| Styling & Animations                      | 1 - 2 hrs                          |
| Dark Mode Implementation                  | 30 - 60 min                        |
| Unit Tests                                | 2 - 3 hrs                          |
| Documentation                             | 30 - 60 min                        |
| **Total**                                 | **~12 - 18 hrs (~1.5 - 2.5 days)** |

> Notes: Ranges assume a single engineer working end-to-end. If working with a team or adding extensive E2E tests, alloc time accordingly.

## 🔑 Key Design Decisions

1. **App Router** - Used Next.js 16 App Router for modern React patterns and improved performance
2. **Zustand over Redux** - Simpler API with less boilerplate while maintaining full TypeScript support
3. **Debounced Search** - 300ms debounce to reduce API calls while typing
4. **Skeleton Loading** - Better perceived performance than spinners
5. **LocalStorage Persistence** - Zustand middleware for favorites and theme preferences
6. **Responsive Grid** - 1-4 columns based on viewport width

## 🌐 API

This project uses the [Rick and Morty API](https://rickandmortyapi.com/):

- `GET /api/character` - List characters with pagination
- `GET /api/character/:id` - Get character details
- `GET /api/episode` - List episodes

## 📄 License

MIT License - feel free to use this project as a reference.

---

Built with ❤️ for Transportech.AI
