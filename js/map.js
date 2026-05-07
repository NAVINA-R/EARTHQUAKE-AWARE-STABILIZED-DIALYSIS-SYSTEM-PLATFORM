// js/map.js
export const mapModule = {
    map: null,
    
    init() {
        const container = document.getElementById('map');
        if (!container) return;
        
        this.map = L.map('map').setView([14.5995, 120.9842], 12);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);
        
        this.addFacilities();
    },
    
    addFacilities() {
        const facilities = [
            { name: 'ESDS Central Hospital', lat: 14.6052, lng: 120.9822, type: 'Tertiary Care' },
            { name: 'North Triage Center', lat: 14.625, lng: 120.991, type: 'Field Hospital' },
            { name: 'East Dialysis Hub', lat: 14.59, lng: 121.0, type: 'Dialysis Center' },
            { name: 'South Emergency Base', lat: 14.572, lng: 120.9675, type: 'Disaster Response' },
            { name: 'West Quake Rescue', lat: 14.618, lng: 120.95, type: 'Mobile Triage' }
        ];
        
        facilities.forEach(f => {
            const marker = L.marker([f.lat, f.lng]).addTo(this.map);
            marker.bindPopup(`<b>${f.name}</b><br>${f.type}<br>📞 Emergency: 911`);
        });
    }
};