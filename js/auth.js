class Auth {
    constructor() {
        this.currentUser = null;
        this.loadFromStorage();
    }
    
    loadFromStorage() {
        const saved = localStorage.getItem('esds_user');
        if(saved) this.currentUser = JSON.parse(saved);
    }
    
    login(email, password, role) {
        // Demo mode - accept any credentials
        this.currentUser = { email, name: email.split('@')[0], role, id: Date.now() };
        localStorage.setItem('esds_user', JSON.stringify(this.currentUser));
        window.ESDS.currentUser = this.currentUser;
        window.addAlert?.('Login successful! Welcome ' + this.currentUser.name, 'success');
        return true;
    }
    
    register(name, email, password, role) {
        this.currentUser = { name, email, role, id: Date.now() };
        localStorage.setItem('esds_user', JSON.stringify(this.currentUser));
        window.addAlert?.('Registration successful!', 'success');
        return true;
    }
    
    logout() {
        this.currentUser = null;
        localStorage.removeItem('esds_user');
        window.addAlert?.('Logged out', 'info');
        window.location.href = 'login.html';
    }
}

window.auth = new Auth();

// Setup login form if on login page
if(document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const role = document.getElementById('loginRole').value;
        if(window.auth.login(email, password, role)) {
            window.location.href = 'index.html';
        }
    });
}