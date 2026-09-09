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

const PROJECTS = {


    /* =====================================================
       PROJECT 1
    ===================================================== */

    "grand-duplex": {

        title: "Grand Duplex Residence",

        category: "RESIDENTIAL",

        shortDescription:
            "A modern duplex residence designed with efficient space planning, natural lighting and contemporary architectural elements.",

        location:
            "Dhanmondi, Dhaka",

        type:
            "Duplex Residence",

        area:
            "3,800 sq.ft.",

        floors:
            "2 Floors",


        mainImage:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=90",


        overview:
            "Grand Duplex Residence is a contemporary family home designed to provide a balance between privacy, comfort and modern aesthetics. The planning focuses on efficient circulation, natural light, ventilation and practical family living.",


        designStyle:
            "Modern Contemporary",

        concept:
            "Open and functional spaces with clean architectural lines, large windows and carefully planned private and social zones.",

        sustainability:
            "Natural daylight, cross ventilation and energy-conscious lighting design.",


        image2D:
            "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=90",


        image3D_1:
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=90",

        image3D_2:
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=90",


        buildingStructure:
            "Reinforced Concrete Frame",

        foundation:
            "RCC Footing",

        flooring:
            "Porcelain Tiles",

        wallFinish:
            "Premium Interior Paint",

        ceiling:
            "Gypsum False Ceiling",

        lighting:
            "LED Ambient & Accent Lighting",


        materials: [

            "Reinforced Concrete",

            "Premium Porcelain Tiles",

            "Aluminium Glass Windows",

            "Engineered Wooden Doors",

            "Gypsum Board",

            "LED Lighting Fixtures"

        ],


        billing: {

            architecture: 85000,

            structural: 120000,

            interior: 280000,

            construction: 1850000,

            total: 2335000

        },


        features: [

            "Double-height living space",

            "Modern staircase design",

            "Large natural-light windows",

            "Spacious master bedroom",

            "Functional kitchen layout",

            "Private family zone",

            "Contemporary exterior facade",

            "Energy-efficient lighting"

        ]

    },

    /* =====================================================
       PROJECT 2
    ===================================================== */

    "minimalist-penthouse": {

        title: "Modern Minimalist Penthouse",

        category: "INTERIOR",

        shortDescription:
            "A refined minimalist penthouse interior focused on simplicity, functionality and premium material selection.",

        location:
            "Uttara, Dhaka",

        type:
            "Penthouse Interior",

        area:
            "2,600 sq.ft.",

        floors:
            "1 Floor",


        mainImage:
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=90",


        overview:
            "This penthouse interior project combines minimalism with a warm and comfortable residential environment. Neutral tones, carefully selected furniture and layered lighting create a clean yet luxurious atmosphere.",


        designStyle:
            "Modern Minimalist",

        concept:
            "Less visual clutter, more functionality. Every furniture piece and lighting element was selected to maintain balance and simplicity.",

        sustainability:
            "LED lighting, natural daylight optimization and durable low-maintenance materials.",


        image2D:
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=90",


        image3D_1:
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=90",

        image3D_2:
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=90",


        buildingStructure:
            "Existing RCC Structure",

        foundation:
            "Existing Foundation",

        flooring:
            "Large Format Porcelain",

        wallFinish:
            "Matte Premium Paint",

        ceiling:
            "Gypsum False Ceiling",

        lighting:
            "Layered LED Lighting",


        materials: [

            "Porcelain Flooring",

            "Engineered Wood",

            "Tempered Glass",

            "Gypsum Board",

            "Premium Fabric",

            "Decorative Lighting"

        ],


        billing: {

            architecture: 60000,

            structural: 30000,

            interior: 220000,

            construction: 750000,

            total: 1060000

        },


        features: [

            "Minimalist living room",

            "Custom TV wall",

            "Modern dining area",

            "Luxury bedroom",

            "Walk-in wardrobe",

            "Designer lighting",

            "Premium kitchen",

            "Smart space utilization"

        ]

    },

    /* =====================================================
       PROJECT 3
    ===================================================== */

    "commercial-plaza": {

        title: "Commercial Plaza Complex",

        category: "COMMERCIAL",

        shortDescription:
            "A multi-purpose commercial development designed for efficient business operations and modern urban requirements.",

        location:
            "Gulshan, Dhaka",

        type:
            "Commercial Building",

        area:
            "18,500 sq.ft.",

        floors:
            "6 Floors",


        mainImage:
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=90",


        overview:
            "The Commercial Plaza Complex was planned as a modern multi-purpose commercial building. The design prioritizes efficient circulation, usable floor area, natural lighting and a professional facade.",


        designStyle:
            "Modern Commercial",

        concept:
            "A clean professional facade combined with flexible internal floor layouts suitable for different commercial functions.",

        sustainability:
            "Energy-efficient lighting, daylight optimization and ventilation-focused planning.",


        image2D:
            "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=90",


        image3D_1:
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=90",

        image3D_2:
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=90",


        buildingStructure:
            "Reinforced Concrete Frame",

        foundation:
            "RCC Pile Foundation",

        flooring:
            "Commercial Grade Tiles",

        wallFinish:
            "Exterior Weather Coat",

        ceiling:
            "Grid & Gypsum Ceiling",

        lighting:
            "Commercial LED System",


        materials: [

            "Reinforced Concrete",

            "Structural Steel",

            "Curtain Wall Glass",

            "Granite",

            "Aluminium Composite Panel",

            "Commercial LED Fixtures"

        ],


        billing: {

            architecture: 250000,

            structural: 420000,

            interior: 650000,

            construction: 5800000,

            total: 7120000

        },


        features: [

            "Modern commercial facade",

            "Dedicated parking",

            "Passenger circulation",

            "Flexible office spaces",

            "Modern lobby",

            "Emergency staircase",

            "Commercial electrical planning",

            "Efficient floor utilization"

        ]

    },

    /* =====================================================
       PROJECT 4
    ===================================================== */

    "modern-family-house": {

        title: "Modern Family House",

        category: "RESIDENTIAL",

        shortDescription:
            "A comfortable modern family residence designed around natural lighting, ventilation and practical family spaces.",

        location:
            "Bashundhara, Dhaka",

        type:
            "Family Residence",

        area:
            "2,900 sq.ft.",

        floors:
            "3 Floors",


        mainImage:
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=90",


        overview:
            "The Modern Family House focuses on creating a comfortable residential environment with well-defined living, dining, sleeping and service areas. Natural light and ventilation were important parts of the planning.",


        designStyle:
            "Contemporary",

        concept:
            "A practical family-oriented layout with modern exterior treatment and comfortable indoor spaces.",

        sustainability:
            "Natural ventilation, daylight and energy-efficient lighting.",


        image2D:
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=90",


        image3D_1:
            "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=90",

        image3D_2:
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=90",


        buildingStructure:
            "RCC Frame Structure",

        foundation:
            "Isolated RCC Footing",

        flooring:
            "Ceramic & Porcelain Tiles",

        wallFinish:
            "Interior Emulsion Paint",

        ceiling:
            "Gypsum Ceiling",

        lighting:
            "LED Lighting",


        materials: [

            "RCC",

            "Ceramic Tiles",

            "Aluminium Windows",

            "Wooden Doors",

            "Gypsum",

            "LED Fixtures"

        ],


        billing: {

            architecture: 70000,

            structural: 100000,

            interior: 180000,

            construction: 1400000,

            total: 1750000

        },


        features: [

            "Family living area",

            "Spacious bedrooms",

            "Natural ventilation",

            "Modern balcony",

            "Functional kitchen",

            "Private family spaces",

            "Contemporary facade",

            "Efficient floor planning"

        ]

    },

    /* =====================================================
       PROJECT 5
    ===================================================== */

    "luxury-living": {

        title: "Luxury Living Interior",

        category: "INTERIOR",

        shortDescription:
            "Premium residential interior featuring elegant furniture, layered lighting and sophisticated finishing.",

        location:
            "Banani, Dhaka",

        type:
            "Luxury Interior",

        area:
            "2,200 sq.ft.",

        floors:
            "1 Floor",


        mainImage:
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=90",


        overview:
            "The Luxury Living Interior project was developed around a premium residential aesthetic. The design combines elegant furniture, warm lighting, refined finishes and functional space planning.",


        designStyle:
            "Luxury Contemporary",

        concept:
            "A sophisticated combination of premium textures, warm lighting and carefully balanced furniture arrangements.",

        sustainability:
            "LED lighting and durable low-maintenance interior finishes.",


        image2D:
            "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1600&q=90",


        image3D_1:
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=90",

        image3D_2:
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=90",


        buildingStructure:
            "Existing RCC Structure",

        foundation:
            "Existing Foundation",

        flooring:
            "Premium Marble Finish",

        wallFinish:
            "Decorative Wall Finish",

        ceiling:
            "Designer Gypsum Ceiling",

        lighting:
            "Ambient & Decorative LED",


        materials: [

            "Marble",

            "Engineered Wood",

            "Tempered Glass",

            "Decorative Panels",

            "Premium Fabric",

            "Designer Lighting"

        ],


        billing: {

            architecture: 50000,

            structural: 25000,

            interior: 300000,

            construction: 950000,

            total: 1325000

        },


        features: [

            "Luxury living room",

            "Designer TV wall",

            "Premium dining space",

            "Decorative wall panels",

            "Modern bedroom",

            "Custom furniture",

            "Ambient lighting",

            "Premium finishing"

        ]

    },

    /* =====================================================
       PROJECT 6
    ===================================================== */

    "corporate-office": {

        title: "Corporate Office Interior",

        category: "COMMERCIAL",

        shortDescription:
            "A professional office environment designed around productivity, collaboration and modern business requirements.",

        location:
            "Motijheel, Dhaka",

        type:
            "Corporate Office",

        area:
            "5,500 sq.ft.",

        floors:
            "2 Floors",


        mainImage:
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=90",


        overview:
            "This corporate office project provides a modern professional working environment. The planning includes workstations, meeting areas, executive rooms, reception and employee support spaces.",


        designStyle:
            "Modern Corporate",

        concept:
            "Productivity-focused planning with clear circulation, collaborative zones and professional visual identity.",

        sustainability:
            "Daylight utilization, efficient LED lighting and optimized HVAC planning.",


        image2D:
            "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=90",


        image3D_1:
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=90",

        image3D_2:
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=90",


        buildingStructure:
            "Existing Commercial Structure",

        foundation:
            "Existing Foundation",

        flooring:
            "Commercial Vinyl & Tiles",

        wallFinish:
            "Professional Paint Finish",

        ceiling:
            "Acoustic Gypsum Ceiling",

        lighting:
            "Office LED Lighting",


        materials: [

            "Commercial Vinyl",

            "Acoustic Panels",

            "Glass Partitions",

            "Aluminium Frames",

            "Gypsum Board",

            "LED Office Fixtures"

        ],


        billing: {

            architecture: 90000,

            structural: 45000,

            interior: 420000,

            construction: 1250000,

            total: 1805000

        },


        features: [

            "Reception area",

            "Open workstation",

            "Executive cabin",

            "Conference room",

            "Employee lounge",

            "Modern pantry",

            "Professional lighting",

            "Acoustic treatment"

        ]

    }

};

/* =========================================================
   LOAD PROJECT DETAILS
========================================================= */

function loadProjectDetails() {


    const params =
        new URLSearchParams(
            window.location.search
        );


    const projectId =
        params.get("id");


    const project =
        PROJECTS[projectId];


    if (!project) {

        const details =
            document.getElementById(
                "projectDetails"
            );


        if (details) {

            details.innerHTML = `

                <section class="project-content-section">

                    <div class="project-details-container">

                        <div class="project-section-heading">

                            <span>
                                PROJECT NOT FOUND
                            </span>

                            <h2>
                                Project could not be found.
                            </h2>

                            <p>
                                Please return to our portfolio
                                and select a valid project.
                            </p>

                            <br>

                            <a href="portfolio.html"
                               class="btn primary-btn">

                                Back to Our Work

                            </a>

                        </div>

                    </div>

                </section>

            `;

        }

        return;

    }



    /* =====================================================
       BASIC INFORMATION
    ===================================================== */

    document.title =
        project.title +
        " | APEX Engineering";


    document.getElementById(
        "projectCategory"
    ).textContent =
        project.category;


    document.getElementById(
        "projectTitle"
    ).textContent =
        project.title;


    document.getElementById(
        "projectShortDescription"
    ).textContent =
        project.shortDescription;


    document.getElementById(
        "projectMainImage"
    ).src =
        project.mainImage;


    document.getElementById(
        "projectMainImage"
    ).alt =
        project.title;

    /* =====================================================
       PROJECT INFO
    ===================================================== */

    document.getElementById(
        "projectLocation"
    ).textContent =
        project.location;


    document.getElementById(
        "projectType"
    ).textContent =
        project.type;


    document.getElementById(
        "projectArea"
    ).textContent =
        project.area;


    document.getElementById(
        "projectFloors"
    ).textContent =
        project.floors;

    /* =====================================================
       OVERVIEW
    ===================================================== */

    document.getElementById(
        "projectOverview"
    ).textContent =
        project.overview;

    /* =====================================================
       DESIGN
    ===================================================== */

    document.getElementById(
        "projectDesignStyle"
    ).textContent =
        project.designStyle;


    document.getElementById(
        "projectConcept"
    ).textContent =
        project.concept;


    document.getElementById(
        "projectSustainability"
    ).textContent =
        project.sustainability;

    /* =====================================================
       2D
    ===================================================== */

    const image2D =
        document.getElementById(
            "project2DImage"
        );


    image2D.src =
        project.image2D;


    image2D.alt =
        project.title +
        " 2D Floor Plan";

    /* =====================================================
       3D
    ===================================================== */

    const image3D1 =
        document.getElementById(
            "project3DImage1"
        );


    const image3D2 =
        document.getElementById(
            "project3DImage2"
        );


    image3D1.src =
        project.image3D_1;


    image3D2.src =
        project.image3D_2;

    /* =====================================================
       TECHNICAL DETAILS
    ===================================================== */

    document.getElementById(
        "buildingStructure"
    ).textContent =
        project.buildingStructure;


    document.getElementById(
        "foundationType"
    ).textContent =
        project.foundation;


    document.getElementById(
        "flooringType"
    ).textContent =
        project.flooring;


    document.getElementById(
        "wallFinish"
    ).textContent =
        project.wallFinish;


    document.getElementById(
        "ceilingType"
    ).textContent =
        project.ceiling;


    document.getElementById(
        "lightingType"
    ).textContent =
        project.lighting;

    /* =====================================================
       MATERIALS
    ===================================================== */

    const materialsContainer =
        document.getElementById(
            "materialsList"
        );


    materialsContainer.innerHTML = "";


    project.materials.forEach(
        function(material) {

            const item =
                document.createElement("div");


            item.className =
                "material-card";


            item.innerHTML = `

                <i class="fa-solid fa-circle-check"></i>

                <span>
                    ${material}
                </span>

            `;


            materialsContainer.appendChild(
                item
            );

        }
    );

    /* =====================================================
       BILLING
    ===================================================== */

    document.getElementById(
        "billingArchitecture"
    ).textContent =
        formatCurrency(
            project.billing.architecture
        );


    document.getElementById(
        "billingStructural"
    ).textContent =
        formatCurrency(
            project.billing.structural
        );


    document.getElementById(
        "billingInterior"
    ).textContent =
        formatCurrency(
            project.billing.interior
        );


    document.getElementById(
        "billingConstruction"
    ).textContent =
        formatCurrency(
            project.billing.construction
        );


    document.getElementById(
        "billingTotal"
    ).textContent =
        formatCurrency(
            project.billing.total
        );

    /* =====================================================
       FEATURES
    ===================================================== */

    const featuresContainer =
        document.getElementById(
            "projectFeatures"
        );


    featuresContainer.innerHTML = "";


    project.features.forEach(
        function(feature) {

            const item =
                document.createElement("div");


            item.className =
                "feature-item";


            item.innerHTML = `

                <i class="fa-solid fa-check"></i>

                <span>
                    ${feature}
                </span>

            `;


            featuresContainer.appendChild(
                item
            );

        }
    );

}

/* =========================================================
   CURRENCY FORMAT
========================================================= */

function formatCurrency(amount) {

    return new Intl.NumberFormat(
        "en-BD"
    ).format(amount)
        .replace(/^/, "৳");

}

/* =========================================================
   RUN PROJECT DETAILS
========================================================= */

if (
    document.getElementById(
        "projectDetails"
    )
) {

    loadProjectDetails();

}