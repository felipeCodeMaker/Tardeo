// script.js - Para index.html - Muestra solo eventos seleccionados por ID
// Lista de IDs de los eventos que quieres mostrar en destacados
const EVENTOS_DESTACADOS = [1, 4, 6]; // ← CAMBIA ESTOS IDs por los que quieras mostrar

async function cargarEventos() {
    try {
        console.log('Iniciando carga de eventos destacados...');
        
        const respuesta = await fetch('./data/eventos.json');
        
        if (!respuesta.ok) {
            throw new Error(`Error HTTP ${respuesta.status}: ${respuesta.statusText}`);
        }
        
        const datos = await respuesta.json();
        console.log('Datos JSON cargados:', datos);
        
        if (!datos.eventos || !Array.isArray(datos.eventos)) {
            throw new Error('El JSON no tiene la estructura esperada');
        }
        
        // Filtrar SOLO los eventos que están en EVENTOS_DESTACADOS
        const eventosDestacados = datos.eventos.filter(evento => 
            EVENTOS_DESTACADOS.includes(evento.id)
        );
        
        console.log('Eventos destacados seleccionados:', eventosDestacados);
        
        if (eventosDestacados.length === 0) {
            throw new Error('No se encontraron eventos con los IDs especificados');
        }
        
        // Obtener el contenedor y el template
        const contenedor = document.getElementById('cards-container');
        const template = document.getElementById('card-template');
        
        if (!contenedor) {
            throw new Error('No se encontró el elemento con id "cards-container"');
        }
        
        if (!template) {
            throw new Error('No se encontró el template con id "card-template"');
        }
        
        // Limpiar el contenedor
        contenedor.innerHTML = '';
        
        // Crear una carta para cada evento destacado
        eventosDestacados.forEach((evento, index) => {
            console.log(`Procesando evento destacado ${index + 1}: ${evento.nombre} (ID: ${evento.id})`);
            
            // Clonar el template
            const carta = template.content.cloneNode(true);
            
            // Obtener referencias a los elementos dentro de la carta
            const img = carta.querySelector('img');
            const title = carta.querySelector('.event-title');
            const categoria = carta.querySelector('.event-categoria');
            const descripcion = carta.querySelector('.event-descripcion');
            const lugar = carta.querySelector('.event-lugar');
            const fecha = carta.querySelector('.event-fecha');
            const hora = carta.querySelector('.event-hora');
            const precio = carta.querySelector('.event-precio');
            const disponibilidad = carta.querySelector('.event-disponibilidad');
            
            // Asignar los valores del evento
            if (img) {
                img.src = evento.imagen || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                img.alt = evento.nombre || 'Imagen del evento';
            }
            
            if (title) title.textContent = evento.nombre || 'Sin nombre';
            if (categoria) categoria.textContent = evento.actividad || 'General';
            if (descripcion) descripcion.textContent = evento.descripcion || 'Descripción no disponible';
            if (lugar) lugar.textContent = evento.lugar || 'Lugar por definir';
            if (fecha) fecha.textContent = evento.fecha || 'Fecha por confirmar';
            if (hora) hora.textContent = evento.hora || 'Horario por confirmar';
            if (precio) precio.textContent = `${evento.precio || '0'}€`;
            if (disponibilidad) disponibilidad.textContent = `${evento.disponibles || '0'} plazas disponibles`;
            
            // Agregar la carta al contenedor
            contenedor.appendChild(carta);
        });
        
        console.log('Eventos destacados mostrados correctamente');
        
        // Si hay menos de 3 eventos destacados, mostrar mensaje
        if (eventosDestacados.length < 3) {
            console.warn(`Solo se encontraron ${eventosDestacados.length} de los 3 eventos solicitados`);
        }
        
    } catch (error) {
        console.error('Error al cargar los eventos:', error);
        
        const contenedor = document.getElementById('cards-container');
        if (contenedor) {
            contenedor.innerHTML = `
                <div class="col-span-full text-center py-10">
                    <p class="text-red-500 text-lg font-semibold mb-2">Error al cargar los eventos destacados</p>
                    <p class="text-gray-600 mb-4">Por favor, intente nuevamente más tarde</p>
                    <p class="text-gray-500 text-sm">${error.message}</p>
                    <button onclick="cargarEventos()" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                        Reintentar
                    </button>
                </div>
            `;
        }
    }
}

// Ejecutar cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', cargarEventos);