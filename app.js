// Initialize AOS (Animate on Scroll)
AOS.init({
  duration: 800,
  once: true
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  const spans = mobileMenuBtn.querySelectorAll('span');
  spans[0].classList.toggle('rotate-45');
  spans[1].classList.toggle('opacity-0');
  spans[2].classList.toggle('-rotate-45');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      navLinks.classList.remove('active');
      const spans = mobileMenuBtn.querySelectorAll('span');
      spans[0].classList.remove('rotate-45');
      spans[1].classList.remove('opacity-0');
      spans[2].classList.remove('-rotate-45');
    }
  });
});

// Close mobile menu when resizing window
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    navLinks.classList.remove('active');
    const spans = mobileMenuBtn.querySelectorAll('span');
    spans[0].classList.remove('rotate-45');
    spans[1].classList.remove('opacity-0');
    spans[2].classList.remove('-rotate-45');
  }
});

// Updated Projects Data
const projects = [
  {
    title: 'Warded - Community Safety App',
    description: 'Aplicación móvil que crea comunidades seguras a través de grupos privados. Desarrollé el backend completo, incluyendo sistema de notificaciones y gestión de base de datos. La app permite compartir ubicaciones, enviar alertas en tiempo real y asistir a personas con discapacidad.',
    technologies: ['Flutter', 'Dart', 'Firebase', 'Push Notifications'],
  },
  {
    title: 'AirBnB Clone',
    description: 'Recreación completa de la plataforma AirBnB, implementando funcionalidades clave como búsqueda de propiedades, sistema de reservas y gestión de usuarios.',
    technologies: ['Python', 'Flask', 'MySQL', 'RESTful API'],
  },
  {
    title: 'Proyecto en Desarrollo',
    description: 'Actualmente trabajando en un proyecto ambicioso que combina tecnologías modernas para crear soluciones innovadoras. Más detalles próximamente.',
    technologies: ['Coming Soon'],
  }
];

// Populate Projects
const projectsGrid = document.querySelector('.projects-grid');

projects.forEach(project => {
  const projectCard = document.createElement('div');
  projectCard.className = 'project-card';
  projectCard.setAttribute('data-aos', 'fade-up');
  
  projectCard.innerHTML = `
    <div class="project-info">
      <h3 class="project-title">${project.title}</h3>
      <p>${project.description}</p>
      <div class="project-technologies">
        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
      </div>
    </div>
  `;
  
  projectsGrid.appendChild(projectCard);
});

// Add theme switcher functionality with toast notification
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 100);

  // Remove toast after animation
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  html.classList.add('theme-transition');
  html.setAttribute('data-theme', newTheme);
  themeIcon.className = newTheme === 'light' ? 'bx bx-moon' : 'bx bx-sun';
  
  setTimeout(() => {
    html.classList.remove('theme-transition');
  }, 300);
  
  localStorage.setItem('theme', newTheme);
  showToast('Para que sea más agradable a la vista :)');
}

// Load saved theme
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  themeIcon.className = savedTheme === 'light' ? 'bx bx-moon' : 'bx bx-sun';
});

themeToggle.addEventListener('click', toggleTheme);

// Enhanced animations for project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-8px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) scale(1)';
  });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    const headerOffset = 80;
    const elementPosition = target.offsetTop;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  });
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.skill-category, .project-card, .stat-item').forEach(el => {
  observer.observe(el);
});