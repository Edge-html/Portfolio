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
    
    // Clear previous images
    gallery.innerHTML = "";

    // Fill Text
    document.getElementById("modalTitle").innerText = title;
    document.getElementById("modalRole").innerText = role;
    document.getElementById("modalDesc").innerText = desc;

    // Loop through the image names and create elements
    imagesArray.forEach(imgName => {
        const img = document.createElement("img");
        img.src = `images/${imgName}.jpg`; // Assumes they are .jpg
        img.className = "gallery-img";
        gallery.appendChild(img);
    });

    modal.style.display = "block";
}