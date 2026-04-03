// ============================================================
// SCRIPT.JS — Portfolio JavaScript
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

  // --------------------------------------------------------
  // 1. HAMBURGER MENU
  // --------------------------------------------------------
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navbar       = document.getElementById('navbar');
  const navOverlay   = document.getElementById('navOverlay');

  function openNav() {
    hamburgerBtn.classList.add('open');
    navbar.classList.add('open');
    navOverlay.classList.add('open');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // prevent background scroll
  }

  function closeNav() {
    hamburgerBtn.classList.remove('open');
    navbar.classList.remove('open');
    navOverlay.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', function () {
      navbar.classList.contains('open') ? closeNav() : openNav();
    });
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', closeNav);
  }

  // Close nav when a link is clicked (mobile UX)
  navbar && navbar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });


  // --------------------------------------------------------
  // 2. HEADER SCROLL EFFECT
  // --------------------------------------------------------
  const header = document.querySelector('.header');
  window.addEventListener('scroll', function () {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });


  // --------------------------------------------------------
  // 3. EXPERIENCE TAB SWITCHER
  // --------------------------------------------------------
  const sections = document.querySelectorAll('.section');
  const links    = document.querySelectorAll('.nav-experience a');

  function showSection(activeSectionId) {
    sections.forEach(section => {
      const isActive = section.id === activeSectionId;

      if (isActive) {
        section.style.display = 'block';
        section.classList.add('show');
        section.classList.remove('hide');

        // Stagger box animations
        const boxes = section.querySelectorAll('.education-box, .skills-box, .work-box');
        boxes.forEach((box, index) => {
          box.style.transition = `opacity 0.4s ease ${index * 80}ms, transform 0.4s ease ${index * 80}ms`;
          // Use rAF to ensure transition fires after display:block
          requestAnimationFrame(() => {
            box.style.opacity   = '1';
            box.style.transform = 'translateY(0)';
          });
        });
      } else {
        section.style.display = 'none';
        section.classList.remove('show');
        section.classList.add('hide');

        const boxes = section.querySelectorAll('.education-box, .skills-box, .work-box');
        boxes.forEach(box => {
          box.style.opacity   = '0';
          box.style.transform = 'translateY(16px)';
        });
      }
    });

    links.forEach(link => {
      const target = link.getAttribute('href').substring(1);
      link.classList.toggle('active', target === activeSectionId);
    });
  }

  links.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      showSection(link.getAttribute('href').substring(1));
    });
  });

  // Show education tab by default
  showSection('education');


  // --------------------------------------------------------
  // 4. SMOOTH SCROLL for anchor links
  //    (skip experience tab links handled above)
  // --------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      // Only smooth-scroll top-level section anchors (not tab links)
      if (['#home', '#about', '#projects', '#project'].includes(href)) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });


  // --------------------------------------------------------
  // 5. PROJECT MODAL
  // --------------------------------------------------------
  const projectModal   = document.getElementById('projectModal');
  const closeModalBtn  = document.querySelector('.close-modal');

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', function () {
      projectModal.style.display = 'none';
      document.body.style.overflow = '';
    });
  }

  window.addEventListener('click', function (e) {
    if (e.target === projectModal) {
      projectModal.style.display = 'none';
      document.body.style.overflow = '';
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && projectModal && projectModal.style.display === 'block') {
      projectModal.style.display = 'none';
      document.body.style.overflow = '';
    }
  });


  // --------------------------------------------------------
  // 6. CERTIFICATE VIEWER — close on outside click
  // --------------------------------------------------------
  document.addEventListener('click', function (e) {
    const viewer = document.getElementById('certViewer');
    const card   = document.querySelector('.cert-viewer-card');
    if (viewer && viewer.classList.contains('cert-active')) {
      if (card && !card.contains(e.target) && !e.target.closest('.certificate-box')) {
        closeCertViewer();
      }
    }
  });

}); // end DOMContentLoaded


// ============================================================
// GLOBAL FUNCTIONS (called inline via onclick attributes)
// ============================================================

/**
 * Opens the project detail modal.
 * @param {string}   title       - Project title
 * @param {string}   role        - Role label
 * @param {string}   desc        - HTML description string
 * @param {string[]} imagesArray - Array of image base names (without path/ext)
 */
function openModal(title, role, desc, imagesArray) {
  const modal          = document.getElementById('projectModal');
  const gallery        = document.getElementById('modalGallery');
  const tableContainer = document.getElementById('modalTableContainer');

  gallery.innerHTML        = '';
  tableContainer.innerHTML = '';

  document.getElementById('modalTitle').innerText = title;
  document.getElementById('modalRole').innerText  = role;
  document.getElementById('modalDesc').innerHTML  = desc;

  imagesArray.forEach(imgName => {
    const img = document.createElement('img');
    img.src       = `images/${imgName}.png`;
    img.className = 'gallery-img';
    img.alt       = imgName;
    gallery.appendChild(img);
  });

  // Contextual hardware/architecture tables
  if (title.includes('DeepLabv3+')) {
    tableContainer.innerHTML = `
      <h3 class="table-heading">Software Architecture</h3>
      <table class="project-data-table">
        <thead><tr><th>Module</th><th>Technical Detail</th></tr></thead>
        <tbody>
          <tr><td><b>Encoder</b></td><td>DCNN backbone with Atrous Convolution</td></tr>
          <tr><td><b>Bottleneck</b></td><td>ASPP block with dilation rates 6, 12, 18</td></tr>
          <tr><td><b>Decoder</b></td><td>Refinement using 4× Upsampling and Skip Connections</td></tr>
          <tr><td><b>Loss Function</b></td><td>Focal Tversky Loss (α=0.7, β=0.3)</td></tr>
        </tbody>
      </table>`;
  } else if (title.includes('Color Vision')) {
    tableContainer.innerHTML = `
      <h3 class="table-heading">Hardware Specifications</h3>
      <table class="project-data-table">
        <thead><tr><th>Component</th><th>Specification</th></tr></thead>
        <tbody>
          <tr><td><b>Microcontroller</b></td><td>ESP32 Dual-Core platform</td></tr>
          <tr><td><b>Display</b></td><td>2.8-inch IPS TFT LCD</td></tr>
          <tr><td><b>Communication</b></td><td>SPI Interface for SD/TFT</td></tr>
          <tr><td><b>Input</b></td><td>4×4 Matrix Keypad</td></tr>
        </tbody>
      </table>`;
  }

  modal.style.display     = 'block';
  document.body.style.overflow = 'hidden';
}


/**
 * Opens the certificate floating viewer.
 */
function openCertViewer(imgSrc, name, id, date) {
  const viewer = document.getElementById('certViewer');
  document.getElementById('certViewerImg').src        = imgSrc;
  document.getElementById('certViewerName').textContent = name;
  document.getElementById('certViewerID').textContent   = 'ID: ' + id;
  document.getElementById('certViewerDate').textContent = 'Certified on: ' + date;
  viewer.classList.add('cert-active');
}


/**
 * Closes the certificate floating viewer.
 */
function closeCertViewer() {
  const viewer = document.getElementById('certViewer');
  if (viewer) viewer.classList.remove('cert-active');
}