const { randomUUID } = require('node:crypto');
const mongoose = require('mongoose');
const Project = require('./models/Project');

const inMemoryProjects = [];

function shouldUseMemoryStore() {
  return process.env.USE_IN_MEMORY_DB === 'true' || mongoose.connection.readyState !== 1;
}

async function listProjects() {
  if (shouldUseMemoryStore()) {
    return [...inMemoryProjects];
  }

  return Project.find().sort({ createdAt: -1 }).lean();
}

async function createProject(data) {
  if (shouldUseMemoryStore()) {
    const project = {
      _id: randomUUID(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    inMemoryProjects.unshift(project);
    return project;
  }

  return Project.create(data);
}

function clearProjectsForTests() {
  inMemoryProjects.length = 0;
}

module.exports = {
  listProjects,
  createProject,
  clearProjectsForTests,
};
