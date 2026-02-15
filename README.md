# Concord - Discord Clone

A full-featured Discord clone built with modern web technologies. This project demonstrates enterprise-level architecture with a complete monorepo setup, real-time communication, voice/video support, and microservices patterns.

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript 5
- **Vite 5** for blazing-fast builds
- **Tailwind CSS 3** with custom Discord-inspired theme
- **Zustand 4** for state management
- **React Router 6** for routing
- **Socket.IO Client 4** for real-time communication
- **Axios** for HTTP requests
- **mediasoup-client 3** for WebRTC voice/video

### Backend
- **Node.js 20** with Express 4
- **TypeScript 5** with strict mode
- **Prisma 5** ORM with PostgreSQL
- **Socket.IO 4** for WebSocket connections
- **Redis 7** for caching and sessions
- **mediasoup 3** for SFU media server
- **JWT** authentication with refresh tokens
- **Passport.js** for OAuth (Google, GitHub)

### Infrastructure
- **Turborepo** for monorepo management
- **Docker** and **Docker Compose** for containerization
- **PostgreSQL 16** for primary database
- **MinIO** for S3-compatible object storage
- **Nginx** as reverse proxy with WebSocket support
- **GitHub Actions** for CI/CD

## 📁 Project Structure

```
clone-disco/
├── client/          # React frontend application
├── server/          # Express backend API
├── shared/          # Shared TypeScript types and utilities
├── nginx/           # Nginx reverse proxy configuration
├── database/        # Database initialization scripts
└── .github/         # GitHub Actions workflows
```

## 🏃 Getting Started

### Prerequisites

- **Node.js 20+** and **npm 9+**
- **Docker** and **Docker Compose**
- **Git**

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/oncumuhammed/clone-disco.git
cd clone-disco
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

Edit the `.env` files with your configuration.

4. **Build the shared package**
```bash
npm run build --workspace=@concord/shared
```

### Development

**Option 1: Run services individually**

```bash
# Terminal 1 - Start backend
npm run dev --workspace=@concord/server

# Terminal 2 - Start frontend
npm run dev --workspace=@concord/client
```

**Option 2: Use Docker Compose (recommended)**

```bash
# Start all infrastructure services
docker compose up -d db redis minio

# Run development servers
npm run dev
```

### Building for Production

```bash
# Build all packages
npm run build

# Or build individually
npm run build --workspace=@concord/shared
npm run build --workspace=@concord/server
npm run build --workspace=@concord/client
```

### Docker Deployment

```bash
# Production
docker compose up -d

# Development with hot-reload
docker compose -f docker-compose.yml -f docker-compose.dev.yml up
```

## 📜 Available Scripts

### Root
- `npm run dev` - Run all packages in development mode
- `npm run build` - Build all packages
- `npm run type-check` - Type-check all packages
- `npm run lint` - Lint all packages
- `npm run format` - Format code with Prettier
- `npm run clean` - Clean all build artifacts

### Server
- `npm run dev --workspace=@concord/server` - Start development server
- `npm run build --workspace=@concord/server` - Build server
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database
- `npm run db:studio` - Open Prisma Studio

### Client
- `npm run dev --workspace=@concord/client` - Start Vite dev server
- `npm run build --workspace=@concord/client` - Build for production
- `npm run preview --workspace=@concord/client` - Preview production build

## 🗄️ Database Setup

The project uses PostgreSQL with Prisma ORM. Migrations will be created in future phases.

```bash
# Run migrations
npm run db:migrate

# Seed database
npm run db:seed

# Open Prisma Studio
npm run db:studio
```

## 🔐 Environment Variables

### Server (.env)
```env
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://concord:concord_password@localhost:5432/concord
REDIS_URL=redis://localhost:6379
JWT_ACCESS_SECRET=your-secret-min-32-chars
JWT_REFRESH_SECRET=your-secret-min-32-chars
# ... see server/.env.example for full list
```

### Client (.env)
```env
VITE_API_URL=http://localhost:3001/api
VITE_SOCKET_URL=http://localhost:3001
VITE_S3_URL=http://localhost:9000/concord-uploads
```

## 🧪 Testing

Testing infrastructure will be added in future phases.

## 📝 Code Style

- **TypeScript strict mode** enabled
- **ESLint** with TypeScript rules
- **Prettier** for code formatting
- **EditorConfig** for consistency

Run linting:
```bash
npm run lint
npm run format
```

## 🤝 Contributing

This is a learning project. Contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📖 Development Phases

- [x] **Phase 1**: Monorepo scaffold, configs, Docker, Nginx
- [ ] **Phase 2**: Database schema, Prisma models
- [ ] **Phase 3**: Authentication & user management
- [ ] **Phase 4**: Servers & channels
- [ ] **Phase 5**: Messaging system
- [ ] **Phase 6**: Roles & permissions
- [ ] **Phase 7**: Invites & discovery
- [ ] **Phase 8**: Friends & DMs
- [ ] **Phase 9**: File uploads & media
- [ ] **Phase 10**: Real-time features
- [ ] **Phase 11**: Voice & video (WebRTC)
- [ ] **Phase 12**: Custom emojis & reactions
- [ ] **Phase 13**: Webhooks
- [ ] **Phase 14**: Search & notifications
- [ ] **Phase 15**: Settings & preferences
- [ ] **Phase 16**: Polish & optimization

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Discord for the inspiration
- The open-source community for amazing tools
