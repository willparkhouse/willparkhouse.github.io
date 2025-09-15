document.addEventListener("DOMContentLoaded", function () {
    // Smooth Scrolling for all nav links
    document.querySelectorAll('nav a[href^="#"]').forEach((anchor) => {
       anchor.addEventListener("click", function (e) {
          e.preventDefault();

          const headerOffset = document.querySelector("header").offsetHeight;
          const targetElement = document.querySelector(
             this.getAttribute("href")
          );
          const elementPosition =
             targetElement.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - headerOffset - 20;

          window.scrollTo({
             top: offsetPosition,
             behavior: "smooth"
          });

          // If mobile nav is active, close it
          if (window.innerWidth <= 768) {
             document.getElementById("nav-menu").classList.remove("active");
          }
       });
    });

    // Hamburger Menu Toggle with improved animation
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    menuToggle.addEventListener("click", () => {
       navMenu.classList.toggle("active");
       
       // Animate hamburger icon
       const icon = menuToggle.querySelector("i");
       if (navMenu.classList.contains("active")) {
          icon.classList.remove("fa-bars");
          icon.classList.add("fa-times");
       } else {
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
       }
    });

    // Close mobile nav when clicking outside
    document.addEventListener("click", (e) => {
       if (window.innerWidth <= 768 && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
          navMenu.classList.remove("active");
          const icon = menuToggle.querySelector("i");
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
       }
    });

    // Light Mode Toggle with improved transitions
    const lightModeToggle = document.getElementById("light-mode-toggle");
    lightModeToggle.addEventListener("click", () => {
       document.body.classList.toggle("light-mode");
       
       // Save preference to localStorage
       localStorage.setItem("lightMode", document.body.classList.contains("light-mode"));
       
       // Toggle icon with animation
       const icon = lightModeToggle.querySelector("i");
       icon.style.transform = "scale(0.8) rotate(180deg)";
       
       setTimeout(() => {
          if (document.body.classList.contains("light-mode")) {
             icon.classList.remove("fa-sun");
             icon.classList.add("fa-moon");
          } else {
             icon.classList.remove("fa-moon");
             icon.classList.add("fa-sun");
          }
          icon.style.transform = "scale(1) rotate(0deg)";
       }, 150);
    });

    // Load saved theme preference
    const savedTheme = localStorage.getItem("lightMode");
    if (savedTheme === "true") {
       document.body.classList.add("light-mode");
       const icon = lightModeToggle.querySelector("i");
       icon.classList.remove("fa-sun");
       icon.classList.add("fa-moon");
    }

    // Header scroll effect
    let lastScrollY = window.scrollY;
    const header = document.querySelector("header");
    
    window.addEventListener("scroll", () => {
       const currentScrollY = window.scrollY;
       
       // Add/remove scrolled class for header styling
       if (currentScrollY > 100) {
          header.classList.add("scrolled");
       } else {
          header.classList.remove("scrolled");
       }
       
       lastScrollY = currentScrollY;
    });

    // Parallax effect for hero section
    const hero = document.querySelector(".hero");
    if (hero) {
       window.addEventListener("scroll", () => {
          const scrolled = window.pageYOffset;
          const parallax = scrolled * 0.5;
          hero.style.transform = `translateY(${parallax}px)`;
       });
    }

    // Add intersection observer for enhanced animations
    const observerOptions = {
       threshold: 0.1,
       rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
       entries.forEach(entry => {
          if (entry.isIntersecting) {
             entry.target.classList.add("animate-in");
          }
       });
    }, observerOptions);

    // Observe all sections and cards
    document.querySelectorAll("section, .experience-card, .education-card, .project-card").forEach(el => {
       observer.observe(el);
    });

    // Typing animation for hero text (optional)
    const heroText = document.querySelector(".hero-text p");
    if (heroText) {
       const text = heroText.textContent;
       heroText.textContent = "";
       heroText.style.borderRight = "2px solid var(--accent-color)";
       
       let i = 0;
       const typeWriter = () => {
          if (i < text.length) {
             heroText.textContent += text.charAt(i);
             i++;
             setTimeout(typeWriter, 50);
          } else {
             setTimeout(() => {
                heroText.style.borderRight = "none";
             }, 1000);
          }
       };
       
       // Start typing animation after a delay
       setTimeout(typeWriter, 1000);
    }
});
 