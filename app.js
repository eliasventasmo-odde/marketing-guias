document.addEventListener('DOMContentLoaded', () => {
    
    // --- Lógica de Login ---
    const PASSWORD = 'marketing2026'; // Contraseña simple
    
    const loginScreen = document.getElementById('login-screen');
    const passwordInput = document.getElementById('password-input');
    const loginBtn = document.getElementById('login-btn');
    const errorMsg = document.getElementById('error-msg');
    
    // Checkear si ya está logueado en esta sesión
    if(sessionStorage.getItem('auth') === 'true') {
        loginScreen.classList.remove('active');
    }

    function attemptLogin() {
        if(passwordInput.value === PASSWORD) {
            sessionStorage.setItem('auth', 'true');
            loginScreen.classList.remove('active');
        } else {
            errorMsg.classList.add('show');
            passwordInput.value = '';
            passwordInput.focus();
            setTimeout(() => {
                errorMsg.classList.remove('show');
            }, 3000);
        }
    }

    loginBtn.addEventListener('click', attemptLogin);
    passwordInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') attemptLogin();
    });

    // --- Lógica de Navegación del Panel ---
    const navItems = document.querySelectorAll('.nav-item:not(.pdf)');
    const iframe = document.getElementById('content-frame');
    const topbarTitle = document.getElementById('current-title');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remover clase activa de todos
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Añadir activa al clickeado
            item.classList.add('active');
            
            // Obtener el archivo objetivo
            const targetUrl = item.getAttribute('data-target');
            
            // Cambiar la fuente del iframe
            iframe.src = targetUrl;
            
            // Actualizar título en la barra superior
            // Extraer el texto limpiando el número
            const titleText = item.textContent.replace(/^\s*\d+\s*/, '').trim();
            topbarTitle.textContent = titleText;
            
            // Si estamos en móvil, cerrar el menú lateral tras hacer clic
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('open');
            }
        });
    });

    // --- Lógica del Menú Móvil ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }

});
