const projectsContainer = document.getElementById('projects');
const projectForm = document.getElementById('project-form');
const projectsMessage = document.getElementById('projects-message');

function setMessage(text, isError = false) {
  projectsMessage.textContent = text;
  projectsMessage.className = isError ? 'message error' : 'message';
}

function createProjectCard(project) {
  const card = document.createElement('article');
  card.className = 'project-card';

  const title = document.createElement('h3');
  title.textContent = project.title;
  card.appendChild(title);

  const description = document.createElement('p');
  description.textContent = project.description;
  card.appendChild(description);

  if ((project.skills || []).length) {
    const skills = document.createElement('p');
    skills.textContent = `Skills: ${project.skills.join(', ')}`;
    card.appendChild(skills);
  }

  if (project.link) {
    const linkWrap = document.createElement('p');
    const link = document.createElement('a');
    link.href = project.link;
    link.target = '_blank';
    link.rel = 'noreferrer';
    link.textContent = 'View project';
    linkWrap.appendChild(link);
    card.appendChild(linkWrap);
  }

  return card;
}

async function loadProjects() {
  try {
    const response = await fetch('/api/projects');
    if (!response.ok) {
      throw new Error('Unable to load projects');
    }

    const projects = await response.json();
    projectsContainer.innerHTML = '';
    projects.forEach((project) => {
      projectsContainer.appendChild(createProjectCard(project));
    });
    setMessage('');
  } catch (_error) {
    setMessage('Unable to load projects. Please try again.', true);
  }
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

  try {
    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const details = await response.json().catch(() => ({}));
      throw new Error(details.error || 'Failed to add project');
    }

    projectForm.reset();
    setMessage('Project added successfully.');
    await loadProjects();
  } catch (error) {
    setMessage(error.message || 'Unable to add project.', true);
  }
});

loadProjects();
