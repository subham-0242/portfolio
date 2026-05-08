const projectsContainer = document.getElementById('projects');
const projectForm = document.getElementById('project-form');

function createProjectCard(project) {
  const card = document.createElement('article');
  card.className = 'project-card';

  const skills = (project.skills || []).length
    ? `<p><strong>Skills:</strong> ${project.skills.join(', ')}</p>`
    : '';
  const link = project.link ? `<p><a href="${project.link}" target="_blank" rel="noreferrer">View project</a></p>` : '';

  card.innerHTML = `
    <h3>${project.title}</h3>
    <p>${project.description}</p>
    ${skills}
    ${link}
  `;

  return card;
}

async function loadProjects() {
  const response = await fetch('/api/projects');
  const projects = await response.json();
  projectsContainer.innerHTML = '';
  projects.forEach((project) => {
    projectsContainer.appendChild(createProjectCard(project));
  });
}

projectForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const payload = {
    title: document.getElementById('title').value.trim(),
    description: document.getElementById('description').value.trim(),
    skills: document
      .getElementById('skills')
      .value.split(',')
      .map((item) => item.trim())
      .filter(Boolean),
    link: document.getElementById('link').value.trim(),
  };

  const response = await fetch('/api/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    projectForm.reset();
    await loadProjects();
  }
});

loadProjects();
