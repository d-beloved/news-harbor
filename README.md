# NewsHarbor 📰

NewsHarbor is a modern news aggregation platform that pulls articles from multiple trusted sources including NewsAPI, The Guardian, and The New York Times. Built with React, TypeScript, and modern web technologies, it offers a seamless news reading experience with customizable preferences and filters.

## 🌟 Features

- **Multi-source News Aggregation**: Fetch and display news from multiple reputable sources
- **Customizable Feed**: Filter news by categories and sources
- **Search Functionality**: Search across all news sources simultaneously
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Persistent Preferences**: Save user preferences for news sources and categories
- **User Controlled Infinite Scroll**: Load more articles by clicking a button
- **Updates**: Fresh news content with automatic cache management
- **Dark/Light Mode**: Toggle between dark and light themes

## 🛠️ Technology Stack

- **Frontend**: React with TypeScript
- **State Management**: Redux Toolkit with Redux Persist
- **Styling**: TailwindCSS with DaisyUI
- **Build Tool**: Vite
- **Testing**: Vitest with React Testing Library
- **API Integration**: NewsAPI, Guardian API, NYTimes API
- **Containerization**: Docker
- **Code Quality**: ESLint, Prettier

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.18 or higher)
- pnpm (v8 or higher)
- API keys for:
  - NewsAPI
  - The Guardian API
  - The New York Times API

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/news-harbor.git
cd news-harbor
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a .env file in the root directory:

```env
VITE_NEWS_API_KEY=your_news_api_key
VITE_GUARDIAN_API_KEY=your_guardian_api_key
VITE_NYT_API_KEY=your_nyt_api_key
```

4. Start the development server:

```bash
pnpm dev
```

### Docker Setup

1. Build the Docker image:

```bash
pnpm docker:build
```

2. Start the container:

```bash
pnpm docker:start
```

3. Stop and clean up:

```bash
pnpm docker:stop-clean
```

## 🧪 Testing

Run tests:

```bash
# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Run tests in watch mode
pnpm test-watch
```

## 📚 Project Structure

```
news-harbor/
├── src/
│   ├── components/     # Reusable UI components
│   ├── services/       # API integration services
│   ├── hooks/         # Custom React hooks
│   ├── store/         # Redux store configuration
│   ├── slices/        # Redux slices
│   ├── types/         # TypeScript type definitions
│   └── utils/         # Helper functions and utilities
│   ├── test/          # Test files
├── public/            # Static assets
```

## 🔄 API Integration

The application integrates with three major news APIs:

- **NewsAPI**: General news articles from various sources
- **The Guardian API**: Articles from The Guardian
- **The New York Times API**: Articles from NYT

Each API has its own service class that handles:

- Request formatting
- Response parsing
- Error handling
- Data normalization

## 🎨 Styling

The project uses TailwindCSS with DaisyUI for styling:

- Responsive design with mobile-first approach
- Custom animations and transitions
- Dark/light theme support
- Consistent component styling

## 🔧 Configuration

Key configuration files:

- vite.config.ts: Vite configuration
- tailwind.config.js: TailwindCSS configuration
- tsconfig.json: TypeScript configuration
- `.eslintrc.js`: ESLint rules
- docker-compose.yml: Docker configuration

## 📈 Performance Optimization

- Lazy loading of images
- Redux Persist for caching for API responses
- Code splitting and bundle optimization
- Debounced search functionality
- Optimized re-renders with React.memo and useMemo

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details

## 🙏 Acknowledgments

- [NewsAPI](https://newsapi.org/)
- [The Guardian Open Platform](https://open-platform.theguardian.com/)
- [The New York Times Developer Network](https://developer.nytimes.com/)
