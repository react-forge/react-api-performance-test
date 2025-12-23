# React 18 User Management Application

A modern React 18 application for managing users, consuming the User Management API.

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

The application will start on http://localhost:5174

## API Integration

This application uses `react-api-weaver` to generate API client from the OpenAPI specification located at `@api-clients/openapi.yaml`.

To regenerate the API client after OpenAPI spec changes:

```bash
npm run generate-api
```

## react-api-weaver Bundle Size

This React 18 application includes `react-api-weaver` with the following bundle characteristics:

| Metric | Size |
|--------|------|
| **Package Version** | 2.0.2 |
| **Installed Size** (node_modules) | 424 KB |
| **Bundle Size** (Minified) | 7.2 KB |
| **Gzip Size** | 2.4 KB |
| **Brotli Size** | 2.1 KB |

📊 **Comparison with React 19**: The React 19 version bundles `react-api-weaver` at only **2.2 KB** (70% smaller), demonstrating React 19's improved bundling efficiency.

*Note: Sizes are from production build. Run `npm run build` to generate fresh statistics.*

## Project Structure

```
react-18-application/
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
