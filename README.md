# Apex Chronicle - F1 Blog API

Backend API server for the Apex Chronicle F1 blog. Built with Express.js and TypeScript.

## Features

- RESTful API for blog articles and categories
- Full-text search across articles
- F1 news aggregation from RSS feeds (Autosport, Motorsport.com, RaceFans)
- JSON-based data storage

## Tech Stack

- Node.js with Express
- TypeScript
- JSON file-based storage

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: Node.js 20+)
- npm 9+

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and configure:

```env
PORT=3001
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

- `PORT` - Server port (default: 3001)
- `CLIENT_URL` - Frontend URL for CORS (default: http://localhost:5173)
- `NODE_ENV` - Environment mode

### Running the Server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm run build
npm start
```

Server runs at: http://localhost:3001

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| GET /api/articles | List articles (paginated) |
| GET /api/articles/featured | Get featured articles |
| GET /api/articles/category/:slug | Get articles by category |
| GET /api/articles/:slug | Get single article |
| GET /api/categories | List all categories |
| GET /api/search?q=query | Search articles |
| GET /api/news | Get latest F1 news from RSS feeds |
| GET /api/health | Health check |

## Project Structure

```
F1-Blog-Server/
├── src/
│   ├── controllers/    # Request handlers
│   ├── services/       # Business logic
│   ├── routes/         # API routes
│   ├── data/           # JSON data files
│   ├── types/          # TypeScript types
│   ├── middleware/     # Error handling
│   └── app.ts          # Express entry point
├── dist/               # Compiled JavaScript
├── package.json
├── tsconfig.json
└── .env
```

## Adding Articles

Add new articles to `src/data/articles.json`. Each article needs:

- Unique `id` and `slug`
- `title`, `excerpt`, and `content` (markdown supported)
- `category` with id, name, slug, description, and color
- `author` with id and name
- `featuredImage` URL
- `imageCredit` with photographer, photographerUrl, and source
- `publishedAt` date
- `readingTime` in minutes
- `tags` array
- `featured` boolean

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run production build |

## Deployment

1. Update `.env` with production values
2. Run `npm run build`
3. Deploy to Node.js hosting (Railway, Render, DigitalOcean, etc.)

## Related Repositories

- [Apex Chronicle Client](https://github.com/your-username/F1-Blog) - React frontend

## License

This project is for personal/educational use.
