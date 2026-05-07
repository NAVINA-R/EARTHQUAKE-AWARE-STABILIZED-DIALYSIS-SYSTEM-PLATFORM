// js/alerts.js
export const alerts = {
    history: [],
    
    add(message, type = 'info') {
        const alert = {
            id: Date.now(),
            message,
            type,
            time: new Date().toLocaleTimeString()
        };
        this.history.unshift(alert);
        if (this.history.length > 20) this.history.pop();
        this.render();
        
        // Auto-dismiss after 5 seconds for non-critical
        if (type !== 'critical') {
            setTimeout(() => this.remove(alert.id), 5000);
        }
    },
    
    remove(id) {
        this.history = this.history.filter(a => a.id !== id);
        this.render();
    },
    
    render() {
        const container = document.getElementById('alertsContainer');
        if (!container) return;
        
        container.innerHTML = this.history.map(alert => `
            <div class="alert-item" style="border-left-color: ${alert.type === 'critical' ? '#d32f2f' : alert.type === 'warning' ? '#ffb347' : '#2e7d32'}">
                <strong>${alert.type === 'critical' ? '🚨' : alert.type === 'warning' ? '⚠️' : 'ℹ️'}</strong>
                ${alert.message}
                <div class="alert-time">${alert.time}</div>
            </div>
        `).join('');
    },
    
    clear() {
        this.history = [];
        this.render();
    }
};