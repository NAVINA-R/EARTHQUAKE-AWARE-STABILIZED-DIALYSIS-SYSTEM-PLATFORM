// js/mqtt-sensor.js - Simulated IoT sensor data
export const mqttSensor = {
    connected: false,
    
    connect() {
        this.connected = true;
        alerts.add('MQTT Sensor Gateway Connected', 'success');
        this.startSimulation();
    },
    
    startSimulation() {
        setInterval(() => {
            if (this.connected) {
                const seismic = Math.random() * 2;
                if (seismic > 1.5) {
                    alerts.add('⚠️ Seismic activity detected near Region 4', 'warning');
                }
            }
        }, 15000);
    }
};