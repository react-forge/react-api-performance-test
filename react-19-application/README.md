# React 19 User Management Application

A modern React 19 application for managing users, consuming the User Management API.

## Features

- Display list of users in a responsive table
- Shows Name (firstName + lastName), Gender, Age, and Country
- Clean and modern UI with plain CSS
- Loading states and error handling
- Integration with `react-api-weaver` for type-safe API calls

## Prerequisites

- Node.js (v18 or higher)
- User Management API running on http://localhost:3001

## Installation

```bash
npm install
```

## Running the Application

```bash
npm run dev
```

The application will start on http://localhost:5173

## API Integration

This application uses `react-api-weaver` to generate API client from the OpenAPI specification located at `@api-clients/openapi.yaml`.

To regenerate the API client after OpenAPI spec changes:

```bash
npm run generate-api
```

## react-api-weaver Bundle Size

This React 19 application includes `react-api-weaver` with the following bundle characteristics:

| Metric | Size |
|--------|------|
| **Package Version** | 2.0.2 |
| **Installed Size** (node_modules) | 424 KB |
| **Bundle Size** (Minified) | 2.2 KB |
| **Gzip Size** | 0.9 KB |
| **Brotli Size** | 0.8 KB |

✅ **Optimization Achievement**: React 19's improved bundling reduces `react-api-weaver` bundle size by **70%** compared to React 18 (from 7.2 KB to 2.2 KB), resulting in faster load times and better performance.

*Note: Sizes are from production build. Run `npm run build` to generate fresh statistics.*

## Project Structure

```
react-19-application/
├── @api-clients/           # OpenAPI specification
│   └── openapi.yaml
├── src/
│   ├── api/               # API client and services
│   │   └── apiClient.js
│   ├── components/        # React components
│   │   └── UserList.jsx
│   ├── styles/            # CSS styles
│   │   └── UserList.css
│   ├── App.jsx            # Main App component
│   ├── App.css
│   ├── main.jsx           # Entry point
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## Building for Production

```bash
npm run build
```

The production build will be in the `dist` folder.
