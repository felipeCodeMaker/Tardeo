#  TARDEO - Descubre eventos y actividades en tu ciudad



TARDEO es una plataforma web diseñada para ayudar a las personas a descubrir eventos y actividades de ocio en su ciudad. Con un diseño moderno y funcional, permite filtrar eventos por tipo de actividad, ciudad o buscar por nombre, todo en tiempo real.

**Autor:** Felipe García Ledrado  
**Proyecto:** 2º DAW - Desarrollo de Aplicaciones Web  
**Fecha:** Marzo 2026

---

## Tabla de Contenidos
- [TARDEO - Descubre eventos y actividades en tu ciudad](#tardeo---descubre-eventos-y-actividades-en-tu-ciudad)
  - [Tabla de Contenidos](#tabla-de-contenidos)
  - [Ver Demo](#ver-demo)
  - [Características Principales](#características-principales)
  - [Tecnologías Utilizadas](#tecnologías-utilizadas)
  - [Guia de usuario](#guia-de-usuario)
  - [Guia de usuario](#guia-de-usuario-1)
  - [Guía de Instalación](#guía-de-instalación)
    - [Requisitos previos](#requisitos-previos)
    - [Pasos para ejecutar en local](#pasos-para-ejecutar-en-local)

---

##  Ver Demo

El proyecto está publicado en GitHub Pages:
 [https://github.com/felipeCodeMaker/Tardeo.git](https://github.com/felipeCodeMaker/Tardeo.git)

Prototipo en Figma:
 [https://www.figma.com/...](https://www.figma.com/design/btzLaxTDdoMgmtMYFMnGlH/TrabajoFinalTARDEO?m=auto&t=z80fkKGUdPlbeqxr-1) *(añade tu enlace)*

---

##  Características Principales

 **Página de inicio** con eventos destacados seleccionados manualmente  
 **Buscador en tiempo real** - Escribe y filtra eventos al instante  
 **Filtros por actividad** - Selecciona el tipo de evento que te interesa  
 **Filtros por ciudad** - Encuentra eventos cerca de ti  
 **Botones de sugerencia** - Búsquedas rápidas por categorías populares  
 **Diseño responsive** - Se ve perfecto en móvil, tablet y escritorio  
 **Menú lateral desplegable** - Navegación cómoda y limpia  
 **Sistema de login/registro** (simulado con JSON)  
 **Página de información del creador** con perfil y habilidades  
 **Sprite SVG** - Iconos vectoriales optimizados  

---

##  Tecnologías Utilizadas

| Tecnología | Versión | Uso |
|------------|---------|-----|
| HTML5 | - | Estructura de las páginas |
| Tailwind CSS | v4.2.1 | Estilos y diseño responsive |
| JavaScript | ES6+ | Lógica de filtros, búsqueda, interactividad |
| Figma | - | Diseño y prototipado |
| Git / GitHub | - | Control de versiones y publicación |
| GitHub Pages | - | Hosting gratuito |
| Font Awesome | v6.4.0 | Iconos adicionales |
| Unsplash | - | Imágenes de ejemplo |

---

##  Guia de usuario

Enlace a la guia del usuario:
 [Guia de usuario](https://github.com/felipeCodeMaker/Tardeo/blob/fb6afa5ea04d8f4cffcb8d776cb493c14c92b89c/GuiaUsuario.md)
---

##  Guía de Instalación

### Requisitos previos
- Tener instalado [Node.js](https://nodejs.org/) (v18 o superior)
- Tener instalado [Git](https://git-scm.com/) (opcional, para clonar)

### Pasos para ejecutar en local

1. **Clona el repositorio** (o descarga el ZIP)
```bash
git clone https://github.com/felipeCodeMaker/Tardeo.git
cd tardeo

```

2. **Instala las dependencias**.
```bash
npm install
```

3. **Compila los estilos de Tailwind**
 ```bash
npm run build:css
```
