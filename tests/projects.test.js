const request = require('supertest');
const app = require('../app');
const projectStore = require('../projectStore');

beforeAll(() => {
  process.env.USE_IN_MEMORY_DB = 'true';
});

afterEach(() => {
  projectStore.clearProjectsForTests();
});

describe('Projects API', () => {
  it('stores and retrieves projects', async () => {
    const createResponse = await request(app).post('/api/projects').send({
      title: 'Portfolio API',
      description: 'REST API for portfolio projects',
      skills: ['Node.js', 'MongoDB'],
      link: 'https://example.com/project',
    });

    expect(createResponse.status).toBe(201);
    expect(createResponse.body.title).toBe('Portfolio API');

    const listResponse = await request(app).get('/api/projects');

    expect(listResponse.status).toBe(200);
    expect(listResponse.body).toHaveLength(1);
    expect(listResponse.body[0].skills).toEqual(['Node.js', 'MongoDB']);
  });

  it('rejects invalid project payload', async () => {
    const response = await request(app).post('/api/projects').send({
      description: 'missing title',
    });

    expect(response.status).toBe(400);
  });
});
