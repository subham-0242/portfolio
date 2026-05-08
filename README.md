# Personal Portfolio (Full-Stack)

A full-stack personal portfolio built with:

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js + Express.js
- **Database:** MongoDB (Mongoose)

## Setup

```bash
npm install
npm start
```

Server runs at `http://localhost:3000`.

## API

- `GET /api/projects` - list all projects
- `POST /api/projects` - create a new project

Example payload:

```json
{
  "title": "Project Name",
  "description": "Project details",
  "skills": ["Node.js", "MongoDB"],
  "link": "https://example.com"
}
```

## Test

```bash
npm test
```
