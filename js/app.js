// Global state
window.ESDS = {
    currentUser: null,
    emergencyActive: false,
    patients: [],
    alerts: [],
    facilities: [
        { name: "ESDS Central Hospital", lat: 14.6052, lng: 120.9822, type: "Tertiary Care", beds: 45 },
        { name: "North Triage Center", lat: 14.625, lng: 120.991, type: "Field Hospital", beds: 20 },
        { name: "East Dialysis Hub", lat: 14.59, lng: 121.0, type: "Dialysis Center", beds: 30 },
        { name: "South Emergency Base", lat: 14.572, lng: 120.9675, type: "Disaster Response", beds: 15 },
        { name: "West Quake Rescue", lat: 14.618, lng: 120.95, type: "Mobile Triage", beds: 10 }
    ],
    responders: ["Ambulance Unit A-102", "Rescue Team Alpha", "Medical Tent Delta", "Helicopter EVAC-1"]
};

// Load components
async function loadComponents() {
    const navbar = await fetch('components/navbar.html').then(r => r.text());
    const banner = await fetch('components/emergency-banner.html').then(r => r.text());
    const footer = await fetch('components/footer.html').then(r => r.text());
    document.getElementById('navbar-container').innerHTML = navbar;
    document.getElementById('emergency-banner-container').innerHTML = banner;
    document.getElementById('footer-container').innerHTML = footer;
    
    // Setup emergency banner click
    const bannerEl = document.getElementById('emergencyBanner');
    if(bannerEl) bannerEl.onclick = () => window.emergencyToggle?.();
}

// Page routing
window.loadPage = async function(page) {
    const response = await fetch(page);
    const html = await response.text();
    const mainContent = document.querySelector('.container') || document.body;
    if(page.includes('dashboard')) {
        window.location.href = page;
    } else {
        document.querySelector('.container').innerHTML = html;
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadComponents();
    // Load sample patients
    if(window.triageInit) setTimeout(window.triageInit, 500);
});