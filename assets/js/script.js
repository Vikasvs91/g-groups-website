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
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';

    // Append inside container
    navContainer.appendChild(menuToggle);

    // Open / Close Menu
    menuToggle.addEventListener("click", function () {
        navbar.classList.toggle("active");
        menuToggle.classList.toggle("active");

        if (navbar.classList.contains("active")) {
            menuToggle.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        } else {
            menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        }

        if (overlay) overlay.classList.toggle("active");
    });

    // Click outside (overlay) → Close
    if (overlay) {
        overlay.addEventListener("click", function () {
            navbar.classList.remove("active");
            overlay.classList.remove("active");
        });
    }

    // Optional: Close when clicking any menu link
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", function () {
            navbar.classList.remove("active");
            if (overlay) overlay.classList.remove("active");
        });
    });

    const header = document.querySelector(".main-header");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

  // ==============================
    // Global Theme Sync (All Pages)
    // ==============================

    const body = document.body;
    const toggleBtn = document.getElementById("themeToggle");

    // 1. Get saved theme
    const savedTheme = localStorage.getItem("theme");

    // 2. Apply saved theme
    if (savedTheme === "dark") {
        body.classList.add("dark");
    } else {
        body.classList.remove("dark");
    }

    // 3. Handle toggle button
    if (toggleBtn) {
        const icon = toggleBtn.querySelector(".icon");

        // Set correct icon on page load
        if (body.classList.contains("dark")) {
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
        } else {
            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");
        }

        // 4. Toggle on click
        toggleBtn.addEventListener("click", () => {
            body.classList.toggle("dark");

            const isDark = body.classList.contains("dark");
            localStorage.setItem("theme", isDark ? "dark" : "light");

            icon.classList.remove("fa-moon", "fa-sun");
            icon.classList.add(isDark ? "fa-sun" : "fa-moon");

            // Add rotate animation
            toggleBtn.classList.add("active");
            setTimeout(() => toggleBtn.classList.remove("active"), 500);
        });
    }

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
          3. Fade In Animation
 ========================== */

    const fadeInSections = document.querySelectorAll('.fade-in, .box, .service-card, .value-box, .section-description');

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
    4. Active Nav Highlight
    ========================= */

    let currentPage = window.location.pathname.split("/").pop();

    // If URL ends with "/", treat it as index.html
    if (currentPage === "") {
        currentPage = "index.html";
    }

    document.querySelectorAll(".nav-links a").forEach(link => {
        let linkPage = link.getAttribute("href").split("/").pop();

        if (linkPage === currentPage) {
            link.classList.add("active");
        }
    });


    /* =========================
       5. Contact Form Validation
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

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.match(emailPattern)) {
                e.preventDefault();
                alert("Please enter a valid email address.");
                return;
            }

            alert("Thank you! Your message has been submitted.");
        });
    }


    // /* =========================
    //    5. Scroll Fade Animation
    // ========================== */
    // const fadeElements = document.querySelectorAll(".box, .service-card, .value-box, .section-title, .section-description");

    // function fadeInOnScroll() {
    //     fadeElements.forEach(el => {
    //         const elementTop = el.getBoundingClientRect().top;
    //         const windowHeight = window.innerHeight;

    //         if (elementTop < windowHeight - 50) {
    //             el.classList.add("fade-in");
    //         }
    //     });
    // }

    // window.addEventListener("scroll", fadeInOnScroll);
    // fadeInOnScroll();

});