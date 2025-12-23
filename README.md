# Test Weaver - Multi-Stack User Management System

A complete full-stack application demonstrating user management with Node.js API and React applications (both React 18 and React 19) consuming the API through `react-api-weaver`.

## Project Structure

```
test-weaver/
├── nodejs-application/          # Express.js REST API
│   ├── data/
│   │   └── users.js            # In-memory user storage
│   ├── routes/
│   │   └── users.js            # User CRUD endpoints
│   ├── server.js               # Main Express server
│   ├── openapi.yaml            # OpenAPI 3.0 specification
│   └── package.json
│
├── react-19-application/        # React 19 frontend
│   ├── @api-clients/
│   │   └── openapi.yaml        # API specification
│   ├── src/
│   │   ├── api/
│   │   │   └── apiClient.js    # API service layer
│   │   ├── components/
│   │   │   └── UserList.jsx    # User table component
│   │   ├── styles/
│   │   │   └── UserList.css    # Component styles
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── react-18-application/        # React 18 frontend
    ├── @api-clients/
    │   └── openapi.yaml        # API specification
    ├── src/
    │   ├── api/
    │   │   └── apiClient.js    # API service layer
    │   ├── components/
    │   │   └── UserList.jsx    # User table component
    │   ├── styles/
    │   │   └── UserList.css    # Component styles
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

## Features

### Node.js API
- ✅ Express.js REST API with CRUD operations
- ✅ In-memory data storage (no database required)
- ✅ 5 endpoints: GET (with limit), GET by ID, POST, PUT, PATCH, DELETE
- ✅ CORS enabled for React apps
- ✅ Complete OpenAPI 3.0 specification
- ✅ Input validation and error handling
- ✅ 2 pre-populated dummy users

### User Model
```javascript
{
  id: "uuid",
  firstName: "string",
  lastName: "string",
  gender: "Male | Female | Other",
  age: number,
  birthPlace: "string",
  country: "string",
  hobbyList: ["string"]
}
```

### React Applications (Both 18 & 19)
- ✅ Modern, responsive user interface
- ✅ User list table with Name, Gender, Age, Country columns
- ✅ Loading states and error handling
- ✅ Plain CSS styling with gradient effects
- ✅ Integration with `react-api-weaver` for type-safe API calls
- ✅ Mobile-responsive design
- ✅ Hover effects and smooth animations

## Quick Start

### Prerequisites
- Node.js v18 or higher
- npm or yarn

### Option 1: Start Everything at Once (Recommended)

```bash
# Install all dependencies
npm install

# Start all applications (API + React 19 + React 18)
npm run dev
```

This will start:
- **Node.js API** on http://localhost:3001
- **React 19 App** on http://localhost:5173
- **React 18 App** on http://localhost:5174

### Option 2: Start Applications Individually

#### 1. Start the Node.js API

```bash
cd nodejs-application
npm install
npm start
```

The API will start on **http://localhost:3001**

#### Test the API
```bash
# Get all users
curl http://localhost:3001/api/users

# Get users with limit
curl http://localhost:3001/api/users?limit=1

# Get user by ID (use an actual ID from the response)
curl http://localhost:3001/api/users/{id}
```

#### 2. Start React 19 Application

Open a new terminal:

```bash
cd react-19-application
npm install
npm run dev
```

The app will start on **http://localhost:5173**

#### 3. Start React 18 Application

Open another terminal:

```bash
cd react-18-application
npm install
npm run dev
```

The app will start on **http://localhost:5174**

## API Endpoints

| Method | Endpoint | Description | Query Params |
|--------|----------|-------------|--------------|
| GET | `/api/users` | Get all users | `limit` (optional) |
| GET | `/api/users/:id` | Get user by ID | - |
| POST | `/api/users` | Create new user | - |
| PUT | `/api/users/:id` | Update entire user | - |
| PATCH | `/api/users/:id` | Partial update | - |
| DELETE | `/api/users/:id` | Delete user | - |

## API Documentation

The complete OpenAPI 3.0 specification is available at:
- `nodejs-application/openapi.yaml`

This specification is also copied to both React applications in the `@api-clients/` folder for use with `react-api-weaver`.

## react-api-weaver Integration

Both React applications use `react-api-weaver` to generate type-safe API clients from the OpenAPI specification.

### Regenerate API Client

If you modify the OpenAPI spec:

```bash
# In React 19 app
cd react-19-application
npm run generate-api

# In React 18 app
cd react-18-application
npm run generate-api
```

## Initial Data

The API comes pre-loaded with 2 dummy users:

1. **John Doe**
   - Gender: Male
   - Age: 28
   - Birth Place: New York
   - Country: USA
   - Hobbies: Reading, Hiking

2. **Jane Smith**
   - Gender: Female
   - Age: 32
   - Birth Place: London
   - Country: UK
   - Hobbies: Painting, Yoga, Traveling

## Development Workflow

### Adding a New User

```bash
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Alice",
    "lastName": "Johnson",
    "gender": "Female",
    "age": 25,
    "birthPlace": "Paris",
    "country": "France",
    "hobbyList": ["Photography", "Coding"]
  }'
```

### Updating a User

```bash
# Full update (PUT)
curl -X PUT http://localhost:3001/api/users/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Alice",
    "lastName": "Johnson",
    "gender": "Female",
    "age": 26,
    "birthPlace": "Paris",
    "country": "France",
    "hobbyList": ["Photography", "Coding", "Travel"]
  }'

# Partial update (PATCH)
curl -X PATCH http://localhost:3001/api/users/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "age": 26
  }'
```

### Deleting a User

```bash
curl -X DELETE http://localhost:3001/api/users/{id}
```

## Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **UUID** - Unique ID generation

### Frontend (React 19)
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **react-api-weaver** - API client generator

### Frontend (React 18)
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **react-api-weaver** - API client generator

## Port Configuration

| Application | Port | URL |
|-------------|------|-----|
| Node.js API | 3001 | http://localhost:3001 |
| React 19 App | 5173 | http://localhost:5173 |
| React 18 App | 5174 | http://localhost:5174 |

## Building for Production

### Node.js API
```bash
cd nodejs-application
npm start
```

### React 19 Application
```bash
cd react-19-application
npm run build
npm run preview
```

### React 18 Application
```bash
cd react-18-application
npm run build
npm run preview
```

## Available Scripts

From the root directory:

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies for all applications |
| `npm run install:all` | Manually install dependencies in all folders |
| `npm run dev` | Start all applications concurrently |
| `npm run dev:api` | Start only the Node.js API |
| `npm run dev:react19` | Start only the React 19 app |
| `npm run dev:react18` | Start only the React 18 app |
| `npm run build:all` | Build both React applications for production |
| `npm run clean` | Remove all node_modules folders |

## Troubleshooting

### API not accessible from React apps
- Ensure Node.js API is running on port 3001
- Check CORS configuration in `server.js`

### React app shows connection error
- Verify the API is running: `curl http://localhost:3001/api/users`
- Check browser console for specific error messages

### Port already in use
- Kill the process using the port or change the port in the respective config files:
  - Node.js: Change `PORT` in `server.js`
  - React apps: Change `server.port` in `vite.config.js`

## Features to Explore

1. **Limit Query Parameter**: Try `http://localhost:5173?limit=1` or modify the API call to use the limit parameter
2. **Add New Users**: Use the POST endpoint to add users and see them appear in the React apps
3. **Compare React Versions**: Open both React apps side-by-side to see identical functionality
4. **Mobile Responsive**: Resize your browser to see the responsive table design

## Future Enhancements

- [ ] Add user creation form in React apps
- [ ] Implement user editing functionality
- [ ] Add delete confirmation dialog
- [ ] Implement pagination
- [ ] Add search and filter capabilities
- [ ] Integrate with a real database (MongoDB, PostgreSQL)
- [ ] Add authentication and authorization
- [ ] Deploy to cloud platforms

## License

MIT

## Support

For issues or questions, please check the individual README files in each application folder:
- `nodejs-application/README.md`
- `react-19-application/README.md`
- `react-18-application/README.md`
