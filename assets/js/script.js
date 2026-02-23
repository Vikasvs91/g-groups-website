// Wait until DOM loads
document.addEventListener("DOMContentLoaded", function () {

    /* =========================
    Mobile Menu Toggle
    ========================= */

    const navbar = document.getElementById("navbar");
    const navContainer = document.querySelector(".nav-container");
    const overlay = document.getElementById("overlay");

    // Create hamburger
    const menuToggle = document.createElement("div");
    menuToggle.classList.add("menu-toggle");
    menuToggle.innerHTML = "☰";

    // Append inside container
    navContainer.appendChild(menuToggle);

    // Open / Close Menu
    menuToggle.addEventListener("click", function () {
        navbar.classList.toggle("active");
        overlay.classList.toggle("active");
    });

    // Click outside (overlay) → Close
    overlay.addEventListener("click", function () {
        navbar.classList.remove("active");
        overlay.classList.remove("active");
    });

    // Optional: Close when clicking any menu link
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", function () {
            navbar.classList.remove("active");
            overlay.classList.remove("active");
        });
    });


    /* =========================
       2. Smooth Scroll
    ========================== */
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });
 /* =========================
          2. Fade In Animation
 ========================== */

    const fadeInSections = document.querySelectorAll('.fade-in');

        if (fadeInSections.length > 0) {

            const fadeObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('show');
                        observer.unobserve(entry.target); // animate once only
                    }
                });
            }, {
                threshold: 0.15
            });

            fadeInSections.forEach(el => fadeObserver.observe(el));
        }   


    /* =========================
       3. Active Nav Highlight
    ========================== */
    const currentLocation = window.location.pathname.split("/").pop();
    const menuItems = document.querySelectorAll("nav ul li a");

    menuItems.forEach(link => {
        if (link.getAttribute("href") === currentLocation) {
            link.classList.add("active");
        }
    });


    /* =========================
       4. Contact Form Validation
    ========================== */
    const form = document.querySelector("form");

    if (form) {
        form.addEventListener("submit", function (e) {

            const name = form.querySelector("input[name='name']").value.trim();
            const email = form.querySelector("input[name='email']").value.trim();
            const message = form.querySelector("textarea[name='message']").value.trim();

            if (name === "" || email === "" || message === "") {
                e.preventDefault();
                alert("Please fill in all required fields.");
                return;
            }

            const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
            if (!email.match(emailPattern)) {
                e.preventDefault();
                alert("Please enter a valid email address.");
                return;
            }

            alert("Thank you! Your message has been submitted.");
        });
    }


    /* =========================
       5. Scroll Fade Animation
    ========================== */
    const fadeElements = document.querySelectorAll(".box, .service-card, .value-box, .section-title, .section-description");

    function fadeInOnScroll() {
        fadeElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 50) {
                el.classList.add("fade-in");
            }
        });
    }

    window.addEventListener("scroll", fadeInOnScroll);
    fadeInOnScroll();

});