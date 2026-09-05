/* =========================================
   APEX ENGINEERING
   MAIN JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =========================================
       MOBILE MENU
    ========================================= */

    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", function () {

            navLinks.classList.toggle("show");

            const icon = menuBtn.querySelector("i");

            if (navLinks.classList.contains("show")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        });


        /* Close menu after clicking a link */

        const navItems = navLinks.querySelectorAll("a");

        navItems.forEach(function (item) {

            item.addEventListener("click", function () {

                navLinks.classList.remove("show");

                const icon = menuBtn.querySelector("i");

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            });

        });

    }


    /* =========================================
       PORTFOLIO FILTER
    ========================================= */

    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    if (filterButtons.length > 0 && projectCards.length > 0) {

        filterButtons.forEach(function (button) {

            button.addEventListener("click", function () {

                const filter = button.getAttribute("data-filter");


                /* Active button */

                filterButtons.forEach(function (btn) {
                    btn.classList.remove("active");
                });

                button.classList.add("active");


                /* Filter projects */

                projectCards.forEach(function (card) {

                    const category = card.getAttribute("data-category");

                    if (filter === "all" || category === filter) {

                        card.style.display = "block";

                        setTimeout(function () {
                            card.style.opacity = "1";
                            card.style.transform = "translateY(0)";
                        }, 10);

                    } else {

                        card.style.opacity = "0";
                        card.style.transform = "translateY(10px)";

                        setTimeout(function () {
                            card.style.display = "none";
                        }, 200);

                    }

                });

            });

        });

    }


    /* =========================================
       PRICE CALCULATOR
    ========================================= */

    const serviceType = document.getElementById("serviceType");
    const areaInput = document.getElementById("area");
    const calculateBtn = document.getElementById("calculateBtn");
    const totalCost = document.getElementById("totalCost");
    const calculatorResult = document.getElementById("calculatorResult");


    if (
        serviceType &&
        areaInput &&
        calculateBtn &&
        totalCost
    ) {

        calculateBtn.addEventListener("click", function () {

            const rate = parseFloat(serviceType.value);
            const area = parseFloat(areaInput.value);


            /* Validation */

            if (!rate || rate <= 0) {

                alert("Please select a service first.");

                serviceType.focus();

                return;
            }


            if (!area || area <= 0) {

                alert("Please enter a valid project area.");

                areaInput.focus();

                return;
            }


            /* Calculate */

            const result = rate * area;


            /* Format Bangladeshi Taka */

            const formattedResult = result.toLocaleString("en-BD");


            totalCost.textContent = "৳ " + formattedResult;


            if (calculatorResult) {
                calculatorResult.classList.add("calculated");
            }

        });


        /* Calculate when pressing Enter */

        areaInput.addEventListener("keydown", function (event) {

            if (event.key === "Enter") {
                calculateBtn.click();
            }

        });

    }


    /* =========================================
       ORDER FORM → WHATSAPP
    ========================================= */

    const orderForm = document.getElementById("orderForm");


    if (orderForm) {

        orderForm.addEventListener("submit", function (event) {

            event.preventDefault();


            /* Get values */

            const fullName =
                document.getElementById("fullName")?.value.trim();

            const phone =
                document.getElementById("phone")?.value.trim();

            const service =
                document.getElementById("service")?.value.trim();

            const projectArea =
                document.getElementById("projectArea")?.value.trim();

            const projectLocation =
                document.getElementById("projectLocation")?.value.trim();

            const projectDetails =
                document.getElementById("projectDetails")?.value.trim();


            /* Validation */

            if (!fullName) {

                alert("Please enter your full name.");

                document.getElementById("fullName").focus();

                return;
            }


            if (!phone) {

                alert("Please enter your phone number.");

                document.getElementById("phone").focus();

                return;
            }


            if (!service) {

                alert("Please select a service.");

                document.getElementById("service").focus();

                return;
            }


            if (!projectDetails) {

                alert("Please describe your project.");

                document.getElementById("projectDetails").focus();

                return;
            }


            /* =========================================
               WHATSAPP MESSAGE
            ========================================= */

            let message =
                "Hello APEX Engineering,%0A%0A" +

                "*New Project Request*%0A%0A" +

                "*Name:* " +
                encodeURIComponent(fullName) +

                "%0A" +

                "*Phone:* " +
                encodeURIComponent(phone) +

                "%0A" +

                "*Service:* " +
                encodeURIComponent(service);


            if (projectArea) {

                message +=
                    "%0A" +
                    "*Project Area:* " +
                    encodeURIComponent(projectArea) +
                    " sq.ft.";

            }


            if (projectLocation) {

                message +=
                    "%0A" +
                    "*Project Location:* " +
                    encodeURIComponent(projectLocation);

            }


            message +=
                "%0A%0A" +

                "*Project Details:*%0A" +

                encodeURIComponent(projectDetails) +

                "%0A%0A" +

                "Thank you.";


            /* =========================================
               WHATSAPP NUMBER
               (pulled from config.js so it only
               needs to be changed in one place)
            ========================================= */

            const whatsappNumber = CONFIG.whatsappNumber;


            const whatsappURL =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                message;


            /* Open WhatsApp */

            window.open(whatsappURL, "_blank");

        });

    }


    /* =========================================
       SMOOTH PAGE TRANSITION
    ========================================= */

    const internalLinks = document.querySelectorAll(
        'a[href$=".html"]'
    );


    internalLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const target = link.getAttribute("href");


            /* Ignore special links */

            if (
                !target ||
                target.startsWith("#") ||
                target.startsWith("http")
            ) {
                return;
            }


            event.preventDefault();


            document.body.classList.add("fade-out");


            setTimeout(function () {

                window.location.href = target;

            }, 180);

        });

    });


    /* =========================================
       SCROLL REVEAL EFFECT
    ========================================= */

    const revealElements = document.querySelectorAll(
        ".service-card, .project-card, .expertise-card, .stat-box"
    );


    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


        revealElements.forEach(function (element) {

            observer.observe(element);

        });

    }


    /* =========================================
       PHONE NUMBER BASIC VALIDATION
    ========================================= */

    const phoneInput = document.getElementById("phone");


    if (phoneInput) {

        phoneInput.addEventListener("input", function () {

            this.value = this.value.replace(/[^0-9+ -]/g, "");

        });

    }


    /* =========================================
       PREVENT NEGATIVE AREA
    ========================================= */

    const numericInputs = document.querySelectorAll(
        'input[type="number"]'
    );


    numericInputs.forEach(function (input) {

        input.addEventListener("input", function () {

            if (this.value < 0) {
                this.value = 0;
            }

        });

    });


    /* =========================================
       CURRENT YEAR
    ========================================= */

    const footerYear = document.querySelector(".footer-bottom p");

    if (footerYear) {

        footerYear.innerHTML =
            footerYear.innerHTML.replace(
                /©\s*\d{4}/,
                "© " + new Date().getFullYear()
            );

    }

});