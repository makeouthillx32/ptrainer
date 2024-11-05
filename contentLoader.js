document.addEventListener("DOMContentLoaded", async function() {
    console.log("Starting content loading...");

    // Default language
    let currentLanguage = 'en';

    // Function to fetch and load content based on selected language
    async function loadContent(language) {
        try {
            const response = await fetch(`./${language}.json`);
            if (!response.ok) throw new Error(`Failed to fetch ${language}.json`);
            const content = await response.json();
            console.log(`${language}.json loaded successfully`, content);

            // Populate all sections with the new content
            populateContent(content);
        } catch (error) {
            console.error("Error loading JSON:", error);
        }
    }

    // Helper function to retrieve a key's value from the content
    function t(content, key) {
        return key.split('.').reduce((obj, k) => (obj || {})[k], content) || `Missing content for "${key}"`;
    }

    // Define populateContent function here to populate sections
    function populateContent(content) {
        // Populate Home Section
        const homeSubtitle = document.getElementById("home-subtitle");
        if (homeSubtitle) homeSubtitle.innerText = t(content, "home.subtitle");
    
        const homeTitleLine1 = document.getElementById("home-title-line1");
        if (homeTitleLine1) homeTitleLine1.innerText = t(content, "home.title_line1");
    
        const homeTitleLine2 = document.getElementById("home-title-line2");
        if (homeTitleLine2) homeTitleLine2.innerText = t(content, "home.title_line2");
    
        const homeTitleLine3 = document.getElementById("home-title-line3");
        if (homeTitleLine3) homeTitleLine3.innerText = t(content, "home.title_line3");
    
        const homeButton = document.getElementById("home-button");
        if (homeButton) homeButton.innerText = t(content, "home.button");
    
        // Populate About Section
        const aboutTitle = document.getElementById("about-title");
        if (aboutTitle) aboutTitle.innerText = t(content, "about.title");
    
        const aboutParagraph = document.getElementById("about-paragraph");
        if (aboutParagraph) aboutParagraph.innerText = t(content, "about.paragraph");
    
        const aboutAdditionalParagraph = document.getElementById("about-additional-paragraph");
        if (aboutAdditionalParagraph) aboutAdditionalParagraph.innerText = t(content, "about.additionalParagraph");
    
        // Populate Services Section
        const servicesTitle = document.getElementById("services-title");
        if (servicesTitle) servicesTitle.innerText = t(content, "services.title");
    
        const servicesItems = t(content, "services.items");
        if (Array.isArray(servicesItems)) {
            servicesItems.forEach((service, index) => {
                const serviceTitle = document.getElementById(`service-${index + 1}-title`);
                if (serviceTitle) serviceTitle.innerText = service.title;
    
                const serviceDescription = document.getElementById(`service-${index + 1}-description`);
                if (serviceDescription) serviceDescription.innerText = service.description;
            });
        }
    
        // Populate Pricing Section
        const pricingTitle = document.getElementById("pricing-title");
        if (pricingTitle) pricingTitle.innerText = t(content, "pricing.title");
    
        const pricingPlans = t(content, "pricing.plans");
        if (Array.isArray(pricingPlans)) {
            pricingPlans.forEach((plan, index) => {
                const planTitle = document.getElementById(`plan-${index + 1}-title`);
                if (planTitle) planTitle.innerText = plan.title;
    
                const planPrice = document.getElementById(`plan-${index + 1}-price`);
                if (planPrice) planPrice.innerText = plan.price;
    
                const planDescription = document.getElementById(`plan-${index + 1}-description`);
                if (planDescription) {
                    planDescription.innerHTML = (plan.description || []).map(item => `<li>${item}</li>`).join("");
                }
            });
        }
    
        // Populate Contact Section
        const contactAddress = document.getElementById("contact-address");
        if (contactAddress) contactAddress.innerText = t(content, "contact.address");
    
        const contactPhone = document.getElementById("contact-phone");
        if (contactPhone) contactPhone.innerText = t(content, "contact.phone");
    
        const contactEmail = document.getElementById("contact-email");
        if (contactEmail) contactEmail.innerText = t(content, "contact.email");
    
        // Populate Maps Section
        const mapsHeadingElement = document.getElementById("maps-heading");
        if (mapsHeadingElement) mapsHeadingElement.innerText = t(content, "maps.heading");
    
        const mapsIframeElement = document.getElementById("maps-iframe");
        if (mapsIframeElement) mapsIframeElement.src = t(content, "maps.iframeSrc");
    
        // Populate Footer Section
        const footerLeftDescription = document.querySelector(".footer-left p");
        if (footerLeftDescription) footerLeftDescription.innerText = t(content, "footer.left.description");
    
        const footerCenterHeading = document.querySelector(".footer-center .footer-heading");
        if (footerCenterHeading) footerCenterHeading.innerText = t(content, "footer.center.heading");
    
        const footerQuickLinksContainer = document.querySelector(".footer-quick-links");
        const footerQuickLinks = t(content, "footer.center.links");
        if (Array.isArray(footerQuickLinks) && footerQuickLinksContainer) {
            footerQuickLinksContainer.innerHTML = footerQuickLinks.map(link => 
                `<li><a href="${link.href}" class="footer-links">${link.text}</a></li>`
            ).join("");
        }
    
        const footerRightHeading = document.querySelector(".footer-right .footer-heading");
        if (footerRightHeading) footerRightHeading.innerText = t(content, "footer.right.contactHeading");
    
        const footerAddressContainer = document.querySelector(".footer-address");
        const contactInfo = t(content, "footer.right.contactInfo");
        if (Array.isArray(contactInfo) && footerAddressContainer) {
            footerAddressContainer.innerHTML = contactInfo.map(info => `<li><i class="${info.icon}"></i>${info.text}</li>`).join("");
        }
    
        const copyrightText = document.querySelector(".copyright p");
        if (copyrightText) copyrightText.innerText = t(content, "footer.copyright");
    }
    
    // Initial load in default language
    await loadContent(currentLanguage);

    // Event listener for language selection
    document.querySelectorAll(".lang-list .lang").forEach(langItem => {
        langItem.addEventListener("click", function () {
            const selectedLanguage = langItem.classList.contains("lang-en") ? "en" : langItem.classList.contains("lang-pt") ? "pt" : "es";
            if (currentLanguage !== selectedLanguage) {
                currentLanguage = selectedLanguage;
                loadContent(currentLanguage);
            }
        });
    });
});
