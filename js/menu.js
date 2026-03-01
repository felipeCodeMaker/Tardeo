// Funcionalidad del menú desplegable
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const closeSidebar = document.getElementById('closeSidebar');
    const overlay = document.getElementById('overlay');
    
    if (menuToggle && sidebar && closeSidebar && overlay) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.remove('-right-80');
            sidebar.classList.add('right-0');
            overlay.classList.remove('opacity-0', 'invisible');
            overlay.classList.add('opacity-100', 'visible');
        });
        
        closeSidebar.addEventListener('click', () => {
            sidebar.classList.remove('right-0');
            sidebar.classList.add('-right-80');
            overlay.classList.remove('opacity-100', 'visible');
            overlay.classList.add('opacity-0', 'invisible');
        });
        
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('right-0');
            sidebar.classList.add('-right-80');
            overlay.classList.remove('opacity-100', 'visible');
            overlay.classList.add('opacity-0', 'invisible');
        });
    }
    
    // Funcionalidad de los botones de categoría
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-gradient-to-r', 'from-black-600', 'to-blue-500', 'text-white', 'border-transparent');
            });
            button.classList.add('active', 'bg-gradient-to-r', 'from-black-600', 'to-blue-500', 'text-white', 'border-transparent');
        });
    });
});