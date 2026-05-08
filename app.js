const express = require('express');
const cors = require('cors');
const path = require('path');
const projectStore = require('./projectStore');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/projects', async (_req, res) => {
  const projects = await projectStore.listProjects();
  res.json(projects);
});

app.post('/api/projects', async (req, res) => {
  const { title, description, skills = [], link = '' } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'title and description are required' });
  }

  if (!Array.isArray(skills) || skills.some((skill) => typeof skill !== 'string')) {
    return res.status(400).json({ error: 'skills must be an array of strings' });
  }

  const project = await projectStore.createProject({
    title,
    description,
    skills: skills.map((skill) => skill.trim()).filter(Boolean),
    link,
  });

  return res.status(201).json(project);
});

app.use((err, _req, res, _next) => {
  // eslint-disable-next-line no-console
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
