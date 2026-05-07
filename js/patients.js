// js/patients.js
export const patients = {
    getAll() {
        return window.esds?.patients || [];
    },
    
    getByPriority() {
        return [...this.getAll()].sort((a, b) => b.priority - a.priority);
    },
    
    updateStatus(patientId, status) {
        const patient = this.getAll().find(p => p.id === patientId);
        if (patient) {
            patient.status = status;
            alerts.add(`Patient ${patient.name} status updated to ${status}`, 'info');
        }
    }
};