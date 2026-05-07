// js/triage.js - SAFE-QUAKE, Dialysis, Priority Score
export const triage = {
    calculateSafeQuake(patient) {
        let score = 0;
        if (patient.entrapmentHours >= 4) score++;
        if (patient.ph < 6.5) score++;
        if (patient.creatinine > 2) score++;
        if (patient.ldh > 600) score++;
        if (patient.astAltRatio > 2) score++;
        return score;
    },
    
    calculateDialysisScore(patient) {
        let score = 0;
        score += patient.injuredExtremities || 0;
        if (patient.albumin <= 3.0) score += 2;
        if (patient.ck > 3000) score += 1;
        return score;
    },
    
    calculatePriority(patient) {
        return (patient.dialysisScore * 10) +
               (patient.safeQuakeScore * 5) +
               (patient.potassiumUrgency * 20) +
               (patient.daysSinceLastDialysis * 15);
    },
    
    processPatient(patientData) {
        const safeQuakeScore = this.calculateSafeQuake(patientData);
        const dialysisScore = this.calculateDialysisScore(patientData);
        const priority = this.calculatePriority({
            ...patientData,
            safeQuakeScore,
            dialysisScore
        });
        
        return {
            ...patientData,
            safeQuakeScore,
            dialysisScore,
            priority
        };
    },
    
    getRiskLabel(priority) {
        if (priority >= 150) return 'Critical';
        if (priority >= 80) return 'High';
        if (priority >= 40) return 'Moderate';
        return 'Low';
    },
    
    init() {
        this.loadSamplePatients();
        this.setupFormListener();
    },
    
    loadSamplePatients() {
        const samplePatients = [
            { name: 'John Rivera', entrapmentHours: 5, ph: 6.1, creatinine: 2.8, ldh: 800, astAltRatio: 2.5, injuredExtremities: 3, albumin: 2.5, ck: 5000, potassiumUrgency: 4, daysSinceLastDialysis: 6 },
            { name: 'Elena Cruz', entrapmentHours: 2, ph: 7.2, creatinine: 1.2, ldh: 400, astAltRatio: 1.2, injuredExtremities: 1, albumin: 3.5, ck: 2000, potassiumUrgency: 1, daysSinceLastDialysis: 2 },
            { name: 'Ahmed Khan', entrapmentHours: 6, ph: 6.3, creatinine: 3.0, ldh: 950, astAltRatio: 3.1, injuredExtremities: 4, albumin: 2.2, ck: 6200, potassiumUrgency: 5, daysSinceLastDialysis: 8 }
        ];
        
        const processed = samplePatients.map(p => this.processPatient(p));
        processed.sort((a, b) => b.priority - a.priority);
        this.renderQueue(processed);
        window.esds.patients = processed;
    },
    
    renderQueue(patients) {
        const tbody = document.getElementById('queueTbody');
        if (!tbody) return;
        
        tbody.innerHTML = patients.map((p, idx) => `
            <tr class="${p.priority >= 80 ? 'patient-row-high' : ''} ${p.priority >= 150 ? 'patient-row-critical' : ''}">
                <td>${idx + 1}</td>
                <td><strong>${p.name}</strong><br><small>SQ:${p.safeQuakeScore} | D:${p.dialysisScore}</small></td>
                <td>${Math.round(p.priority)}</td>
                <td><span class="status-badge ${this.getRiskLabel(p.priority) === 'Critical' ? 'status-critical' : 'status-warning'}">${this.getRiskLabel(p.priority)}</span></td>
                <td><span class="status-badge">Pending</span></td>
            </tr>
        `).join('');
    },
    
    setupFormListener() {
        const addBtn = document.getElementById('addPatientBtn');
        if (addBtn) {
            addBtn.addEventListener('click', () => {
                const patient = {
                    name: document.getElementById('patientName')?.value || 'Unknown',
                    entrapmentHours: parseFloat(document.getElementById('entrapmentHours')?.value || 0),
                    ph: parseFloat(document.getElementById('ph')?.value || 7.4),
                    creatinine: parseFloat(document.getElementById('creatinine')?.value || 1),
                    ldh: parseFloat(document.getElementById('ldh')?.value || 400),
                    astAltRatio: parseFloat(document.getElementById('astAltRatio')?.value || 1),
                    injuredExtremities: parseInt(document.getElementById('injuredExtremities')?.value || 0),
                    albumin: parseFloat(document.getElementById('albumin')?.value || 4),
                    ck: parseFloat(document.getElementById('ck')?.value || 500),
                    potassiumUrgency: parseFloat(document.getElementById('potassiumUrgency')?.value || 0),
                    daysSinceLastDialysis: parseFloat(document.getElementById('daysSinceLastDialysis')?.value || 0)
                };
                
                const processed = this.processPatient(patient);
                window.esds.patients.push(processed);
                window.esds.patients.sort((a, b) => b.priority - a.priority);
                this.renderQueue(window.esds.patients);
                alerts.add(`Patient ${processed.name} added with priority ${Math.round(processed.priority)}`, 'info');
            });
        }
    }
};