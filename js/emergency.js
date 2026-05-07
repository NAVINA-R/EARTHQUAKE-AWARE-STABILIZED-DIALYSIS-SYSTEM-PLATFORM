window.emergencyState = { active: false, respondersDeployed: [] };

function toggleEmergency() {
    window.emergencyState.active = !window.emergencyState.active;
    const banner = document.getElementById('emergencyBanner');
    
    if(window.emergencyState.active) {
        banner.innerHTML = '🚨🚨 EMERGENCY MODE ACTIVE - ALL RESOURCES DEPLOYED 🚨🚨';
        banner.classList.add('active');
        window.addAlert('EMERGENCY TRIGGERED! Response teams dispatched.', 'critical');
        dispatchAllResponders();
        updateResponderList();
    } else {
        banner.innerHTML = '⚠️ EMERGENCY MODE INACTIVE - CLICK TO ACTIVATE ⚠️';
        banner.classList.remove('active');
        window.addAlert('Emergency mode deactivated.', 'info');
        window.emergencyState.respondersDeployed = [];
        updateResponderList();
    }
    
    // Update global state
    window.ESDS.emerg