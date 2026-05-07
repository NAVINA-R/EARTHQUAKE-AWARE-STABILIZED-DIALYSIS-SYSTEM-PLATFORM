// js/dashboard.js
export function init() {
    // Populate dashboard stats
    const stats = {
        totalPatients: window.esds?.patients?.length || 24,
        activeEmergencies: window.esds?.emergencyActive ? 1 : 0,
        availableBeds: 18,
        respondersOnDuty: 12
    };
    
    Object.keys(stats).forEach(key => {
        const el = document.getElementById(`stat-${key}`);
        if (el) el.textContent = stats[key];
    });
    
    // Setup role switching
    const roleBtns = document.querySelectorAll('.role-btn');
    roleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            roleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            alerts.add(`Switched to ${btn.dataset.role} dashboard view`, 'info');
        });
    });
}