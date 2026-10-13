
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const themeToggle = document.getElementById("theme-toggle");
const navItems = document.querySelectorAll(".nav-link");

// Mobile navigation
menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Fermer le menu" : "Ouvrir le menu"
    );
});

// Close menu after clicking a link
navItems.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Ouvrir le menu");
    });
});

// Dark and light themes
function updateThemeButton() {
    const isLight = document.body.classList.contains("light-mode");

    themeToggle.textContent = isLight ? "☾" : "☼";
    themeToggle.setAttribute(
        "aria-label",
        isLight ? "Activer le mode sombre" : "Activer le mode clair"
    );
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    const theme = document.body.classList.contains("light-mode")
        ? "light"
        : "dark";

    try {
        localStorage.setItem("portfolio-theme", theme);
    } catch (error) {
        // The theme still works if localStorage is unavailable.
    }

    updateThemeButton();
});

// Restore the saved theme
try {
    if (localStorage.getItem("portfolio-theme") === "light") {
        document.body.classList.add("light-mode");
    }
} catch (error) {
    // Use the default dark theme.
}

updateThemeButton();

// Current year in the footer
document.getElementById("year").textContent = new Date().getFullYear();

// Highlight the current navigation section
const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    navItems.forEach((link) => {
                        const isActive =
                            link.getAttribute("href") ===
                            `#${entry.target.id}`;

                        link.classList.toggle("active", isActive);
                    });
                }
            });
        },
        {
            rootMargin: "-25% 0px -60% 0px"
        }
    );

    sections.forEach((section) => observer.observe(section));
}
