//script.js
document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('.section'); 
  const links = document.querySelectorAll('.nav-experience a'); 

  function showSection(activeSectionId) {
      sections.forEach(section => {
          if (section.id === activeSectionId) {
              section.style.display = 'block'; 
          } else {
              section.style.display = 'none';
          }
      });
      links.forEach(link => {
          const linkTarget = link.getAttribute('href').substring(1); 
          if (linkTarget === activeSectionId) {
              link.classList.add('active');
          } else {
              link.classList.remove('active');
          }
      });
  }

  links.forEach(link => {
      link.addEventListener('click', function(event) {
          event.preventDefault(); 
          const targetSection = link.getAttribute('href').substring(1); 
          showSection(targetSection);
      });
  });


  showSection('education');
});
function toggleNavbar() {
  var navbar = document.querySelector('.navbar');
  if (navbar.style.display === 'block') {
      navbar.style.display = 'none';
  } else {
      navbar.style.display = 'block';
  }
}
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});



document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    const links = document.querySelectorAll('.nav-experience a');

    function showSection(activeSectionId) {
        sections.forEach(section => {
            if (section.id === activeSectionId) {
                section.classList.add('show');
                section.classList.remove('hide');
                // Trigger animation for boxes inside the section
                const boxes = section.querySelectorAll('.education-box, .skills-box, .work-box');
                boxes.forEach((box, index) => {
                    setTimeout(() => {
                        box.style.opacity = '1';
                        box.style.transform = 'translateY(0)';
                    }, index * 100); // Delay each box animation slightly for a staggered effect
                });
            } else {
                section.classList.add('hide');
                section.classList.remove('show');
                // Reset the boxes inside hidden sections
                const boxes = section.querySelectorAll('.education-box, .skills-box, .work-box');
                boxes.forEach(box => {
                    box.style.opacity = '0';
                    box.style.transform = 'translateY(20px)';
                });
            }
        });

        links.forEach(link => {
            const linkTarget = link.getAttribute('href').substring(1);
            if (linkTarget === activeSectionId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetSection = link.getAttribute('href').substring(1);
            showSection(targetSection);
        });
    });

    // Initially show the first section
    showSection('education');
});
// Function to handle scroll event and toggle the 'scrolled' class on the header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

function openModal(title, role, desc, imagesArray) {
    const modal = document.getElementById("projectModal");
    const gallery = document.getElementById("modalGallery");
    const tableContainer = document.getElementById("modalTableContainer");
    
    gallery.innerHTML = "";
    tableContainer.innerHTML = ""; // Clear old tables

    document.getElementById("modalTitle").innerText = title;
    document.getElementById("modalRole").innerText = role;
    document.getElementById("modalDesc").innerHTML = desc;

    imagesArray.forEach(imgName => {
        const img = document.createElement("img");
        img.src = `images/${imgName}.png`; 
        img.className = "gallery-img";
        gallery.appendChild(img);
    });

    // logic for DeepLabv3+ Tables
    if (title.includes("DeepLabv3+")) {
        tableContainer.innerHTML = `
            <h3 class="table-heading">Software Architecture</h3>
            <table class="project-data-table">
                <thead><tr><th>Module</th><th>Technical Detail</th></tr></thead>
                <tbody>
                    <tr><td><b>Encoder</b></td><td>DCNN backbone with Atrous Convolution</td></tr>
                    <tr><td><b>Bottleneck</b></td><td>ASPP block with dilation rates 6, 12, 18</td></tr>
                    <tr><td><b>Decoder</b></td><td>Refinement using 4x Upsampling and Skip Connections</td></tr>
                    <tr><td><b>Loss Function</b></td><td>Focal Tversky Loss (α=0.7, β=0.3)</td></tr>
                </tbody>
            </table>
        `;
    } 
    // logic for Color Vision System Tables
    else if (title.includes("Color Vision")) {
        tableContainer.innerHTML = `
            <h3 class="table-heading">Hardware Specifications</h3>
            <table class="project-data-table">
                <thead><tr><th>Component</th><th>Specification</th></tr></thead>
                <tbody>
                    <tr><td><b>Microcontroller</b></td><td>ESP32 Dual-Core platform</td></tr>
                    <tr><td><b>Display</b></td><td>2.8-inch IPS TFT LCD</td></tr>
                    <tr><td><b>Communication</b></td><td>SPI Interface for SD/TFT</td></tr>
                    <tr><td><b>Input</b></td><td>4x4 Matrix Keypad</td></tr>
                </tbody>
            </table>
        `;
    }

    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById("projectModal");
    const closeBtn = document.querySelector(".close-modal");

    // Fix for the Close Button (X)
    if (closeBtn) {
        closeBtn.onclick = function() {
            modal.style.display = "none";
            document.body.style.overflow = "auto"; // Re-enable scrolling
        }
    }

    // Fix for clicking outside the content (on the dark background)
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto"; // Re-enable scrolling
        }
    }
});
function openCertModal(imgSrc, certName) {
    const modal = document.getElementById("projectModal");
    const gallery = document.getElementById("modalGallery");
    const tableContainer = document.getElementById("modalTableContainer");

    gallery.innerHTML = "";
    tableContainer.innerHTML = "";

    // Hide all text — image only
    document.getElementById("modalTitle").style.display = "none";
    document.getElementById("modalRole").style.display = "none";
    document.getElementById("modalDesc").style.display = "none";

    const img = document.createElement("img");
    img.src = imgSrc;
    img.className = "gallery-img";
    img.style.width = "100%";
    img.style.maxWidth = "720px";
    img.style.height = "auto";
    img.style.maxHeight = "none";
    gallery.appendChild(img);

    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}