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
          const offsetPosition = elementPosition - headerOffset - 20; // Adjust extra padding if needed
 
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
 
    // Hamburger Menu Toggle
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    menuToggle.addEventListener("click", () => {
       navMenu.classList.toggle("active");
    });
 
    // light Mode Toggle
    const lightModeToggle = document.getElementById("light-mode-toggle");
    lightModeToggle.addEventListener("click", () => {
       document.body.classList.toggle("light-mode");
       // Toggle icon between moon and sun
       const icon = lightModeToggle.querySelector("i");
       if (document.body.classList.contains("light-mode")) {
          icon.classList.remove("fa-sun");
          icon.classList.add("fa-moon");
       } else {
          icon.classList.remove("fa-moon");
          icon.classList.add("fa-sun");
       }
    });
 });
 