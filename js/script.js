/* =========================================================
   APEX ENGINEERING
   MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       01. PAGE LOADING
       ===================================================== */

    document.body.classList.remove("page-loading");


    /* =====================================================
       02. MOBILE MENU
       ===================================================== */

    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", function () {

            navLinks.classList.toggle("active");

            const icon = menuBtn.querySelector("i");

            if (icon) {
                if (navLinks.classList.contains("active")) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");
                } else {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            }
        });


        /* Close mobile menu after clicking a link */

        const navItems = navLinks.querySelectorAll("a");

        navItems.forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("active");

                const icon = menuBtn.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

            });

        });

    }


    /* =====================================================
       03. ACTIVE NAVIGATION
       ===================================================== */

    const currentPage = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    const navigationLinks = document.querySelectorAll(".nav-links a");

    navigationLinks.forEach(function (link) {

        const linkPage = link.getAttribute("href");

        if (!linkPage) {
            return;
        }

        const cleanLinkPage = linkPage
            .split("/")
            .pop()
            .split("#")[0]
            .toLowerCase();

        if (
            cleanLinkPage === currentPage ||
            (currentPage === "" && cleanLinkPage === "index.html")
        ) {
            link.classList.add("active");
        }

    });


    /* =====================================================
       04. PORTFOLIO FILTER
       ===================================================== */

    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    if (filterButtons.length > 0 && projectCards.length > 0) {

        filterButtons.forEach(function (button) {

            button.addEventListener("click", function () {

                const filterValue = button.getAttribute("data-filter");

                filterButtons.forEach(function (btn) {
                    btn.classList.remove("active");
                });

                button.classList.add("active");

                projectCards.forEach(function (card) {

                    const category = card.getAttribute("data-category");

                    if (
                        filterValue === "all" ||
                        filterValue === category
                    ) {
                        card.classList.remove("hidden");
                    } else {
                        card.classList.add("hidden");
                    }

                });

            });

        });

    }


    /* =====================================================
       05. COST CALCULATOR
       ===================================================== */

    const calculateBtn = document.getElementById("calculateBtn");
    const serviceType = document.getElementById("serviceType");
    const areaInput = document.getElementById("area");
    const totalCost = document.getElementById("totalCost");
    const calculatorResult = document.getElementById("calculatorResult");

    if (
        calculateBtn &&
        serviceType &&
        areaInput &&
        totalCost
    ) {

        calculateBtn.addEventListener("click", function () {

            const area = parseFloat(areaInput.value);
            const service = serviceType.value;

            if (!service) {
                alert("Please select a service.");
                serviceType.focus();
                return;
            }

            if (isNaN(area) || area <= 0) {
                alert("Please enter a valid project area.");
                areaInput.focus();
                return;
            }


            /* ---------------------------------------------
               Estimated rates per square feet
               --------------------------------------------- */

            const rates = {

                civil: 180,

                structural: 120,

                architectural: 100,

                interior: 900,

                estimation: 50,

                consultation: 30

            };


            const rate = rates[service] || 0;

            const estimatedCost = area * rate;


            /* ---------------------------------------------
               Format amount
               --------------------------------------------- */

            const formattedCost = estimatedCost.toLocaleString(
                "en-BD"
            );


            totalCost.textContent =
                "৳ " + formattedCost;


            if (calculatorResult) {
                calculatorResult.classList.add("show");
            }

        });

    }


    /* =====================================================
       06. ORDER FORM → WHATSAPP
       ===================================================== */

    const orderForm = document.getElementById("orderForm");

    if (orderForm) {

        orderForm.addEventListener("submit", function (event) {

            event.preventDefault();


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


            /* ---------------------------------------------
               Validation
               --------------------------------------------- */

            if (!fullName) {
                alert("Please enter your full name.");
                document.getElementById("fullName")?.focus();
                return;
            }

            if (!phone) {
                alert("Please enter your phone number.");
                document.getElementById("phone")?.focus();
                return;
            }

            if (!service) {
                alert("Please select a service.");
                document.getElementById("service")?.focus();
                return;
            }


            /* ---------------------------------------------
               WhatsApp number
               --------------------------------------------- */

            const whatsappNumber =
                typeof CONFIG !== "undefined" &&
                CONFIG.whatsappNumber
                    ? CONFIG.whatsappNumber
                    : "8801876910424";


            /* ---------------------------------------------
               Create WhatsApp message
               --------------------------------------------- */

            let message =
                "Hello APEX Engineering,%0A%0A" +
                "I would like to discuss a project.%0A%0A" +

                "Name: " +
                encodeURIComponent(fullName) +
                "%0A" +

                "Phone: " +
                encodeURIComponent(phone) +
                "%0A" +

                "Service: " +
                encodeURIComponent(service) +
                "%0A";


            if (projectArea) {
                message +=
                    "Project Area: " +
                    encodeURIComponent(projectArea) +
                    "%0A";
            }

            if (projectLocation) {
                message +=
                    "Project Location: " +
                    encodeURIComponent(projectLocation) +
                    "%0A";
            }

            if (projectDetails) {
                message +=
                    "Project Details: " +
                    encodeURIComponent(projectDetails) +
                    "%0A";
            }


            message +=
                "%0AThank you.";


            const whatsappURL =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                message;


            window.open(
                whatsappURL,
                "_blank",
                "noopener,noreferrer"
            );

        });

    }


    /* =====================================================
       07. PROJECT DETAILS
       ===================================================== */

    const projectTitle =
        document.getElementById("projectTitle");

    if (projectTitle) {

        const urlParams =
            new URLSearchParams(window.location.search);

        const projectId =
            urlParams.get("id");


        /* ---------------------------------------------
           Project Database
           --------------------------------------------- */

        const projects = {

            "grand-duplex": {

                category: "RESIDENTIAL PROJECT",

                title: "Grand Duplex Residence",

                shortDescription:
                    "A modern duplex residence designed with a balanced combination of functionality, comfort and contemporary architecture.",

                location: "Dhanmondi, Dhaka",

                type: "Residential",

                area: "3,200 sq ft",

                floors: "2 Floors",

                mainImage:
                    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85",

                overview:
                    "The Grand Duplex Residence was planned as a comfortable modern family home with efficient space planning, natural light and a clean architectural identity.",

                designStyle:
                    "Modern Contemporary",

                concept:
                    "The design focuses on simple forms, functional spaces, natural lighting and a comfortable family environment.",

                sustainability:
                    "Natural ventilation, efficient lighting and practical material selection were considered during the design process.",

                buildingStructure:
                    "Reinforced Concrete Frame",

                foundationType:
                    "RCC Foundation",

                flooringType:
                    "Tiles and Selected Flooring",

                wallFinish:
                    "Interior Paint Finish",

                ceilingType:
                    "Gypsum / False Ceiling",

                lightingType:
                    "LED and Decorative Lighting",

                materials:
                    "RCC, Bricks, Cement, Steel, Tiles, Glass and Selected Interior Materials",

                billingArchitecture:
                    "Included",

                billingStructural:
                    "Included",

                billingInterior:
                    "As Required",

                billingConstruction:
                    "Project Based",

                billingTotal:
                    "According to Final Scope",

                features: [
                    "Modern duplex planning",
                    "Functional family spaces",
                    "Natural light and ventilation",
                    "Contemporary exterior appearance",
                    "Efficient room arrangement",
                    "Practical material selection"
                ],

                drawing:
                    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80",

                image3d1:
                    "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=85",

                image3d2:
                    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85"

            },


            "minimalist-penthouse": {

                category: "INTERIOR PROJECT",

                title: "Modern Minimalist Penthouse",

                shortDescription:
                    "A minimalist penthouse interior focused on clean lines, elegant materials and a comfortable modern lifestyle.",

                location: "Uttara, Dhaka",

                type: "Interior Design",

                area: "2,400 sq ft",

                floors: "Single Level",

                mainImage:
                    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85",

                overview:
                    "The penthouse interior uses a minimalist design language to create an open, comfortable and visually balanced living environment.",

                designStyle:
                    "Minimalist Modern",

                concept:
                    "Open spaces, neutral materials, functional furniture and controlled lighting form the main design concept.",

                sustainability:
                    "The design prioritizes efficient lighting, natural daylight and durable interior materials.",

                buildingStructure:
                    "Existing RCC Structure",

                foundationType:
                    "Existing Foundation",

                flooringType:
                    "Premium Tiles / Wood Finish",

                wallFinish:
                    "Premium Interior Finish",

                ceilingType:
                    "Gypsum False Ceiling",

                lightingType:
                    "Ambient and Decorative LED",

                materials:
                    "Tiles, Wood Finish, Glass, Gypsum, Paint and Interior Fixtures",

                billingArchitecture:
                    "Included",

                billingStructural:
                    "Existing Structure",

                billingInterior:
                    "Included",

                billingConstruction:
                    "According to Scope",

                billingTotal:
                    "According to Final Scope",

                features: [
                    "Minimalist interior concept",
                    "Open living arrangement",
                    "Modern lighting system",
                    "Functional furniture planning",
                    "Elegant material combination",
                    "Comfort-focused design"
                ],

                drawing:
                    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1400&q=80",

                image3d1:
                    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",

                image3d2:
                    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85"

            },


            "commercial-plaza": {

                category: "COMMERCIAL PROJECT",

                title: "Commercial Plaza Complex",

                shortDescription:
                    "A contemporary commercial complex planned for efficient business use, accessibility and modern architectural presentation.",

                location: "Gulshan, Dhaka",

                type: "Commercial",

                area: "8,500 sq ft",

                floors: "Multiple Floors",

                mainImage:
                    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",

                overview:
                    "The Commercial Plaza Complex was designed around efficient commercial spaces, circulation and a professional exterior appearance.",

                designStyle:
                    "Contemporary Commercial",

                concept:
                    "The concept combines functional commercial planning with a modern and professional architectural identity.",

                sustainability:
                    "Daylight, ventilation and efficient building services were considered for improved operational performance.",

                buildingStructure:
                    "Reinforced Concrete Frame",

                foundationType:
                    "Designed RCC Foundation",

                flooringType:
                    "Commercial Grade Flooring",

                wallFinish:
                    "Exterior and Interior Paint Finish",

                ceilingType:
                    "Suspended / False Ceiling",

                lightingType:
                    "Commercial LED Lighting",

                materials:
                    "RCC, Steel, Glass, Tiles, Cement and Commercial Finishing Materials",

                billingArchitecture:
                    "Included",

                billingStructural:
                    "Included",

                billingInterior:
                    "Optional",

                billingConstruction:
                    "Project Based",

                billingTotal:
                    "According to Final Scope",

                features: [
                    "Commercial space planning",
                    "Modern facade concept",
                    "Efficient circulation",
                    "Functional floor arrangement",
                    "Professional appearance",
                    "Practical construction planning"
                ],

                drawing:
                    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80",

                image3d1:
                    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85",

                image3d2:
                    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85"

            },


            "modern-family-house": {

                category: "RESIDENTIAL PROJECT",

                title: "Modern Family House",

                shortDescription:
                    "A practical modern family house designed around comfortable living, natural light and efficient space utilization.",

                location: "Bashundhara, Dhaka",

                type: "Residential",

                area: "2,800 sq ft",

                floors: "2 Floors",

                mainImage:
                    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",

                overview:
                    "The Modern Family House focuses on practical family living with comfortable spaces, good circulation and a contemporary exterior.",

                designStyle:
                    "Modern Residential",

                concept:
                    "The planning emphasizes privacy, functionality, daylight and easy movement between family spaces.",

                sustainability:
                    "Natural daylight, cross ventilation and energy-efficient lighting were considered.",

                buildingStructure:
                    "RCC Frame Structure",

                foundationType:
                    "RCC Foundation",

                flooringType:
                    "Ceramic / Porcelain Tiles",

                wallFinish:
                    "Interior and Exterior Paint",

                ceilingType:
                    "Gypsum / RCC Ceiling",

                lightingType:
                    "LED Lighting",

                materials:
                    "RCC, Bricks, Steel, Tiles, Glass and Paint",

                billingArchitecture:
                    "Included",

                billingStructural:
                    "Included",

                billingInterior:
                    "As Required",

                billingConstruction:
                    "Project Based",

                billingTotal:
                    "According to Final Scope",

                features: [
                    "Family-oriented planning",
                    "Modern facade",
                    "Natural daylight",
                    "Cross ventilation",
                    "Efficient room layout",
                    "Comfortable living spaces"
                ],

                drawing:
                    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80",

                image3d1:
                    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",

                image3d2:
                    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85"

            },


            "luxury-living": {

                category: "INTERIOR PROJECT",

                title: "Luxury Living Interior",

                shortDescription:
                    "A premium residential interior concept combining elegant materials, modern furniture and sophisticated lighting.",

                location: "Banani, Dhaka",

                type: "Interior Design",

                area: "2,100 sq ft",

                floors: "Single Level",

                mainImage:
                    "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1600&q=85",

                overview:
                    "The Luxury Living Interior project creates a sophisticated residential environment through balanced furniture planning, lighting and material selection.",

                designStyle:
                    "Luxury Contemporary",

                concept:
                    "The design combines elegance and functionality through premium finishes, controlled lighting and comfortable furniture arrangements.",

                sustainability:
                    "Efficient LED lighting and durable materials are incorporated into the interior planning.",

                buildingStructure:
                    "Existing RCC Structure",

                foundationType:
                    "Existing Foundation",

                flooringType:
                    "Premium Tiles / Wooden Finish",

                wallFinish:
                    "Decorative Interior Finish",

                ceilingType:
                    "Gypsum False Ceiling",

                lightingType:
                    "Layered LED Lighting",

                materials:
                    "Wood Finish, Glass, Tiles, Gypsum, Paint and Decorative Materials",

                billingArchitecture:
                    "Included",

                billingStructural:
                    "Existing Structure",

                billingInterior:
                    "Included",

                billingConstruction:
                    "According to Scope",

                billingTotal:
                    "According to Final Scope",

                features: [
                    "Luxury living room design",
                    "Premium material selection",
                    "Layered lighting",
                    "Modern furniture planning",
                    "Elegant color balance",
                    "Functional space utilization"
                ],

                drawing:
                    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1400&q=80",

                image3d1:
                    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",

                image3d2:
                    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85"

            },


            "corporate-office": {

                category: "COMMERCIAL PROJECT",

                title: "Corporate Office Interior",

                shortDescription:
                    "A professional office interior designed to improve productivity, collaboration and corporate identity.",

                location: "Motijheel, Dhaka",

                type: "Commercial Interior",

                area: "4,000 sq ft",

                floors: "Single Level",

                mainImage:
                    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85",

                overview:
                    "The Corporate Office Interior was planned to create a professional workplace with efficient workstations, meeting areas and comfortable circulation.",

                designStyle:
                    "Modern Corporate",

                concept:
                    "The concept focuses on productivity, collaboration, professional branding and efficient workplace planning.",

                sustainability:
                    "Energy-efficient lighting and practical space planning were considered to reduce unnecessary energy use.",

                buildingStructure:
                    "Existing Commercial Structure",

                foundationType:
                    "Existing Foundation",

                flooringType:
                    "Commercial Flooring",

                wallFinish:
                    "Corporate Interior Finish",

                ceilingType:
                    "Suspended Ceiling",

                lightingType:
                    "Office LED Lighting",

                materials:
                    "Glass, Gypsum, Carpet/Tiles, Wood Finish, Paint and Office Fixtures",

                billingArchitecture:
                    "Included",

                billingStructural:
                    "Existing Structure",

                billingInterior:
                    "Included",

                billingConstruction:
                    "According to Scope",

                billingTotal:
                    "According to Final Scope",

                features: [
                    "Professional workspace planning",
                    "Efficient workstation layout",
                    "Meeting room planning",
                    "Modern reception area",
                    "Functional lighting",
                    "Corporate visual identity"
                ],

                drawing:
                    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80",

                image3d1:
                    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85",

                image3d2:
                    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85"

            }

        };


        /* ---------------------------------------------
           Find selected project
           --------------------------------------------- */

        const project = projects[projectId];


        if (project) {

            setProjectText(
                "projectCategory",
                project.category
            );

            setProjectText(
                "projectTitle",
                project.title
            );

            setProjectText(
                "projectShortDescription",
                project.shortDescription
            );

            setProjectText(
                "projectLocation",
                project.location
            );

            setProjectText(
                "projectType",
                project.type
            );

            setProjectText(
                "projectArea",
                project.area
            );

            setProjectText(
                "projectFloors",
                project.floors
            );

            setProjectText(
                "projectOverview",
                project.overview
            );

            setProjectText(
                "projectDesignStyle",
                project.designStyle
            );

            setProjectText(
                "projectConcept",
                project.concept
            );

            setProjectText(
                "projectSustainability",
                project.sustainability
            );

            setProjectText(
                "buildingStructure",
                project.buildingStructure
            );

            setProjectText(
                "foundationType",
                project.foundationType
            );

            setProjectText(
                "flooringType",
                project.flooringType
            );

            setProjectText(
                "wallFinish",
                project.wallFinish
            );

            setProjectText(
                "ceilingType",
                project.ceilingType
            );

            setProjectText(
                "lightingType",
                project.lightingType
            );

            setProjectText(
                "materialsList",
                project.materials
            );

            setProjectText(
                "billingArchitecture",
                project.billingArchitecture
            );

            setProjectText(
                "billingStructural",
                project.billingStructural
            );

            setProjectText(
                "billingInterior",
                project.billingInterior
            );

            setProjectText(
                "billingConstruction",
                project.billingConstruction
            );

            setProjectText(
                "billingTotal",
                project.billingTotal
            );


            /* ---------------------------------------------
               Images
               --------------------------------------------- */

            setProjectImage(
                "projectMainImage",
                project.mainImage,
                project.title
            );

            setProjectImage(
                "project2DImage",
                project.drawing,
                project.title + " Floor Plan"
            );

            setProjectImage(
                "project3DImage1",
                project.image3d1,
                project.title + " 3D View"
            );

            setProjectImage(
                "project3DImage2",
                project.image3d2,
                project.title + " 3D View"
            );


            /* ---------------------------------------------
               Project features
               --------------------------------------------- */

            const featureContainer =
                document.getElementById("projectFeatures");

            if (featureContainer) {

                featureContainer.innerHTML = "";

                project.features.forEach(function (feature) {

                    const featureCard =
                        document.createElement("div");

                    featureCard.className = "feature-card";

                    featureCard.innerHTML = `
                        <i class="fa-solid fa-circle-check"></i>
                        <p>${escapeHTML(feature)}</p>
                    `;

                    featureContainer.appendChild(featureCard);

                });

            }


            /* ---------------------------------------------
               Change page title
               --------------------------------------------- */

            document.title =
                project.title +
                " | APEX Engineering";


        } else {

            /* Project not found */

            setProjectText(
                "projectTitle",
                "Project Not Found"
            );

            setProjectText(
                "projectShortDescription",
                "The requested project could not be found."
            );

        }

    }


    /* =====================================================
       08. SMOOTH SCROLL
       ===================================================== */

    const smoothLinks =
        document.querySelectorAll('a[href^="#"]');

    smoothLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =====================================================
       09. SCROLL REVEAL
       ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    if (revealElements.length > 0) {

        const revealObserver =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("active");

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(function (element) {

            revealObserver.observe(element);

        });

    }


    /* =====================================================
       10. PAGE TRANSITION
       ===================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href]:not([target="_blank"])'
        );

    internalLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const href =
                link.getAttribute("href");

            if (
                !href ||
                href.startsWith("#") ||
                href.startsWith("mailto:") ||
                href.startsWith("tel:") ||
                href.startsWith("https://wa.me/")
            ) {
                return;
            }


            /* Do not animate external links */

            if (
                href.startsWith("http://") ||
                href.startsWith("https://")
            ) {
                return;
            }


            event.preventDefault();

            document.body.classList.add("page-loading");

            setTimeout(function () {

                window.location.href = href;

            }, 180);

        });

    });


    /* =====================================================
       11. WHATSAPP BUTTON
       ===================================================== */

    const whatsappButtons =
        document.querySelectorAll(
            ".whatsapp-btn"
        );

    whatsappButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const number =
                typeof CONFIG !== "undefined" &&
                CONFIG.whatsappNumber
                    ? CONFIG.whatsappNumber
                    : "8801876910424";

            const message =
                "Hello APEX Engineering, I would like to know more about your services.";

            const url =
                "https://wa.me/" +
                number +
                "?text=" +
                encodeURIComponent(message);

            window.open(
                url,
                "_blank",
                "noopener,noreferrer"
            );

        });

    });

    /* =====================================================
       12. HEADER SCROLL SHADOW
       ===================================================== */

    const siteHeader = document.querySelector(".header");

    if (siteHeader) {

        const toggleHeaderShadow = function () {

            if (window.scrollY > 30) {
                siteHeader.classList.add("scrolled");
            } else {
                siteHeader.classList.remove("scrolled");
            }

        };

        toggleHeaderShadow();

        window.addEventListener("scroll", toggleHeaderShadow);

    }


    /* =====================================================
       13. ANIMATED STAT COUNTERS
       ===================================================== */

    const statNumbers =
        document.querySelectorAll(".stat-box h2");

    if (statNumbers.length > 0) {

        const animateCount = function (element) {

            const rawText = element.textContent.trim();

            const numericPart = parseInt(
                rawText.replace(/[^0-9]/g, ""),
                10
            );

            const suffix = rawText.replace(/[0-9]/g, "");

            if (isNaN(numericPart)) {
                return;
            }

            const duration = 1400;
            const startTime = performance.now();

            const step = function (now) {

                const progress = Math.min(
                    (now - startTime) / duration,
                    1
                );

                const eased = 1 - Math.pow(1 - progress, 3);

                const currentValue = Math.floor(
                    eased * numericPart
                );

                element.textContent = currentValue + suffix;

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    element.textContent = numericPart + suffix;
                }

            };

            requestAnimationFrame(step);

        };

        const counterObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        animateCount(entry.target);

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.5
            }
        );

        statNumbers.forEach(function (element) {
            counterObserver.observe(element);
        });

    }

});


/* =========================================================
   HELPER FUNCTIONS
   ========================================================= */


/* =========================================================
   SET TEXT
   ========================================================= */

function setProjectText(id, value) {

    const element =
        document.getElementById(id);

    if (element && value !== undefined) {
        element.textContent = value;
    }

}


/* =========================================================
   SET IMAGE
   ========================================================= */

function setProjectImage(id, source, altText) {

    const image =
        document.getElementById(id);

    if (!image || !source) {
        return;
    }

    image.src = source;

    if (altText) {
        image.alt = altText;
    }

}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(value) {

    if (typeof value !== "string") {
        return "";
    }

    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}