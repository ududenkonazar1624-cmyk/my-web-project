console.log("JS connected!");


const projects = [
  {
    id: 1,
    title: "Сайт-візитка",
    tech: "HTML/CSS"
  },
  {
    id: 2,
    title: "Todo App",
    tech: "JavaScript"
  },
  {
    id: 3,
    title: "Портфоліо",
    tech: "HTML/CSS/JS"
  }
];

function createProjectCard(project) {
  return `
    <div class="project-card">
      <h3>${project.title}</h3>
      <p>${project.tech}</p>
    </div>
  `;
}

console.log(projects[0]);
console.log(projects[0].title);

// Відображення проєктів

const container =
  document.querySelector('#projects-container');

function renderProjects(list) {
  if (!container) return;

  const html = list
    .map(project =>
      createProjectCard(project)
    )
    .join('');

  container.innerHTML = html;
}

renderProjects(projects);
// Перемикач теми

const themeBtn =
  document.querySelector('#theme-toggle');

const bodyElement = document.body;

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    bodyElement.classList.toggle('dark-theme');
  });
}

// Модальне вікно

const openBtn =
  document.querySelector('#open-modal');

const closeBtn =
  document.querySelector('#close-modal');

const modal =
  document.querySelector('#modal');

if (openBtn && closeBtn && modal) {
  openBtn.addEventListener('click', () => {
    modal.classList.add('is-open');
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('is-open');
  });
}

// Escape

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && modal) {
    modal.classList.remove('is-open');
  }
});

// Форма

const form =
  document.querySelector('#contact-form');

const nameInput =
  document.querySelector('#user-name');

if (form && nameInput) {
  form.addEventListener('submit', event => {
    event.preventDefault();

    if (nameInput.value.trim().length < 2) {
      alert("Ім'я має містити щонайменше 2 символи");
    } else {
      alert("Форму відправлено!");
      modal.classList.remove('is-open');
      form.reset();
    }
  });
}

const searchInput =
  document.querySelector('#search-input');

if (searchInput) {
  searchInput.addEventListener(
    'input',
    () => {
      const value =
        searchInput.value.toLowerCase();

      const filtered =
        projects.filter(project =>
          project.title
            .toLowerCase()
            .includes(value)
        );

      renderProjects(filtered);
    }
  );
}

let allPosts = [];

const postsContainer =
  document.querySelector('#posts-container');

function renderPosts(list) {
  if (!postsContainer) return;

  const html = list
    .map(post => `
      <div class="post">
        <h3>${post.title}</h3>
        <p>${post.body}</p>
      </div>
    `)
    .join('');

  postsContainer.innerHTML = html;
}

async function loadPosts() {
  const loading =
    document.querySelector('#loading');

  try {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts'
    );

    if (!response.ok) {
      throw new Error('Помилка сервера');
    }

    const data = await response.json();

    allPosts = data.slice(0, 10);

    renderPosts(allPosts);

    loading.style.display = 'none';

  } catch (error) {
    console.error(error);

    loading.textContent =
      'Помилка завантаження';
  }
}
loadPosts();
const postsSearchInput =
  document.querySelector('#search-input-posts');

if (postsSearchInput) {
  postsSearchInput.addEventListener(
    'input',
    () => {
      const value =
        postsSearchInput.value.toLowerCase();

      const filtered =
        allPosts.filter(post =>
          post.title
            .toLowerCase()
            .includes(value)
        );

      renderPosts(filtered);
    }
  );
}