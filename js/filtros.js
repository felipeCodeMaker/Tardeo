// filtros.js - Lógica unificada para filtros.html
let eventosData = [];
let actividadesUnicas = [];
let ciudadesUnicas = [];

// Cargar eventos al iniciar
async function cargarEventos() {
    try {
        const response = await fetch('../data/eventos.json');
        const data = await response.json();
        eventosData = data.eventos;
        
        console.log('Eventos cargados:', eventosData.length);
        console.log(getComputedStyle(document.body).fontFamily);
        
        // Extraer valores únicos
        actividadesUnicas = [...new Set(eventosData.map(e => e.actividad))].sort();
        ciudadesUnicas = [...new Set(eventosData.map(e => e.ciudad))].sort();
        
        // Llenar los selects
        llenarSelectActividades();
        llenarSelectCiudades();
        
        // Mostrar mensaje inicial
        mostrarMensajeInicial();
        
    } catch (error) {
        console.error('X Error:', error);
        mostrarError('Error al cargar los eventos');
    }
}

// Llenar select de actividades
function llenarSelectActividades() {
    const select = document.getElementById('desplegable-actividad');
    if (!select) return;
    
    select.innerHTML = '<option value="" disabled selected>Selecciona actividad</option>';
    actividadesUnicas.forEach(act => {
        select.innerHTML += `<option value="${act}">${act}</option>`;
    });
    
    select.addEventListener('change', function() {
        if (this.value) {
            filtrarPorActividad(this.value);
        }
    });
}

// Llenar select de ciudades
function llenarSelectCiudades() {
    const select = document.getElementById('desplegable-ciudad');
    if (!select) return;
    
    select.innerHTML = '<option value="" disabled selected>Selecciona ciudad</option>';
    ciudadesUnicas.forEach(ciudad => {
        select.innerHTML += `<option value="${ciudad}">${ciudad}</option>`;
    });
    
    select.addEventListener('change', function() {
        if (this.value) {
            filtrarPorCiudad(this.value);
        }
    });
}

// Filtrar por actividad
function filtrarPorActividad(actividad) {
    const filtrados = eventosData.filter(e => 
        e.actividad.toLowerCase() === actividad.toLowerCase()
    );
    actualizarInterfaz(filtrados, `Eventos de ${actividad}`);
}

// Filtrar por ciudad
function filtrarPorCiudad(ciudad) {
    const filtrados = eventosData.filter(e => 
        e.ciudad.toLowerCase() === ciudad.toLowerCase()
    );
    actualizarInterfaz(filtrados, `Eventos en ${ciudad}`);
}

// Buscar por texto
function buscarEventos(texto) {
    if (!texto) {
        mostrarMensajeInicial();
        return;
    }
    
    const textoLower = texto.toLowerCase();
    const filtrados = eventosData.filter(e => 
        e.nombre.toLowerCase().includes(textoLower) ||
        e.descripcion.toLowerCase().includes(textoLower) ||
        e.actividad.toLowerCase().includes(textoLower)
    );
    
    actualizarInterfaz(filtrados, `Resultados para "${texto}"`);
}

// Actualizar interfaz con eventos filtrados
function actualizarInterfaz(eventos, titulo) {
    const container = document.getElementById('cards-container');
    const mensajeInicial = document.getElementById('mensaje-inicial');
    const tituloResultados = document.getElementById('titulo-resultados');
    const mensajeSinResultados = document.getElementById('mensaje-sin-resultados');
    
    if (!container) return;
    
    // Ocultar mensaje inicial
    if (mensajeInicial) mensajeInicial.classList.add('hidden');
    
    // Mostrar título de resultados
    if (tituloResultados) {
        tituloResultados.classList.remove('hidden');
        const h2 = tituloResultados.querySelector('h2');
        if (h2) h2.textContent = titulo;
    }
    
    // Limpiar container
    container.innerHTML = '';
    
    if (eventos.length === 0) {
        if (mensajeSinResultados) {
            mensajeSinResultados.classList.remove('hidden');
            const h3 = mensajeSinResultados.querySelector('h3');
            if (h3) h3.textContent = 'No se encontraron eventos';
        }
        return;
    }
    
    if (mensajeSinResultados) mensajeSinResultados.classList.add('hidden');
    
    // Mostrar eventos
    eventos.forEach(evento => {
        container.appendChild(crearCartaEvento(evento));
    });
}

// Crear carta de evento
function crearCartaEvento(evento) {
    const template = document.getElementById('card-template');
    if (!template) return document.createElement('div');
    
    const carta = template.content.cloneNode(true);
    
    // Rellenar datos
    carta.querySelector('.event-title').textContent = evento.nombre;
    carta.querySelector('.event-categoria').textContent = evento.actividad;
    carta.querySelector('.event-descripcion').textContent = evento.descripcion;
    carta.querySelector('.event-lugar').textContent = evento.lugar;
    carta.querySelector('.event-ciudad').textContent = evento.ciudad;
    carta.querySelector('.event-fecha').textContent = evento.fecha;
    carta.querySelector('.event-hora').textContent = evento.hora;
    carta.querySelector('.event-precio').textContent = `${evento.precio}€`;
    carta.querySelector('.event-disponibilidad').textContent = `${evento.disponibles} plazas`;
    
    const img = carta.querySelector('img');
    img.src = evento.imagen || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f';
    img.alt = evento.nombre;
    
    return carta;
}

// Mostrar mensaje inicial
function mostrarMensajeInicial() {
    const container = document.getElementById('cards-container');
    const mensajeInicial = document.getElementById('mensaje-inicial');
    const tituloResultados = document.getElementById('titulo-resultados');
    const mensajeSinResultados = document.getElementById('mensaje-sin-resultados');
    
    if (container) container.innerHTML = '';
    if (mensajeInicial) mensajeInicial.classList.remove('hidden');
    if (tituloResultados) tituloResultados.classList.add('hidden');
    if (mensajeSinResultados) mensajeSinResultados.classList.add('hidden');
}

// Mostrar error
function mostrarError(msg) {
    const container = document.getElementById('cards-container');
    if (container) {
        container.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i class="fas fa-exclamation-triangle text-5xl text-yellow-500 mb-4"></i>
                <h3 class="text-xl font-semibold text-gray-700 mb-2">${msg}</h3>
            </div>
        `;
    }
}

// Configurar buscador
function configurarBuscador() {
    const input = document.getElementById('buscador');
    const limpiar = document.getElementById('limpiar-busqueda');
    const sugerencias = document.querySelectorAll('.sugerencia-busqueda');
    
    if (input) {
        input.addEventListener('input', function() {
            if (limpiar) {
                limpiar.classList.toggle('hidden', !this.value);
            }
            buscarEventos(this.value);
        });
    }
    
    if (limpiar) {
        limpiar.addEventListener('click', function() {
            if (input) {
                input.value = '';
                this.classList.add('hidden');
                mostrarMensajeInicial();
            }
        });
    }
    
    // Configurar botones de sugerencia
    sugerencias.forEach(btn => {
        btn.addEventListener('click', function() {
            const texto = this.textContent.trim();
            if (input) {
                input.value = texto;
                if (limpiar) limpiar.classList.remove('hidden');
                buscarEventos(texto);
            }
        });
    });
}

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando filtros...');
    cargarEventos();
    configurarBuscador();
    
    // Configurar menú lateral si existe
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
        
        closeSidebar.addEventListener('click', cerrarMenu);
        overlay.addEventListener('click', cerrarMenu);
        
        function cerrarMenu() {
            sidebar.classList.remove('right-0');
            sidebar.classList.add('-right-80');
            overlay.classList.remove('opacity-100', 'visible');
            overlay.classList.add('opacity-0', 'invisible');
        }
    }
});