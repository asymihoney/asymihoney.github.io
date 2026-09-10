const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');
const particles = document.getElementById('particles');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;

      // highlight matching sidebar link
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });

      // swap background + dim particles on project sections
      if (entry.target.classList.contains('project-section')) {
        const bg = entry.target.dataset.bg;
        if (bg) entry.target.style.backgroundImage = `url(${bg})`;
        particles.style.opacity = '0.2';
      } else {
        particles.style.opacity = '1';
      }
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => observer.observe(s));