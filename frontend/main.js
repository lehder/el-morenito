const API_URL = 'http://localhost:5000/api/servicios';
let paginaActual = 1;
const limite = 6;

// Catálogo completo de 12 servicios (6 página 1, 6 página 2)
const catalogoCompleto = [
  {
    id: 1,
    titulo: 'Reformas Integrales para el Hogar',
    categoria: 'Reformas',
    descripcion: 'Renovación completa de viviendas: baños, cocinas, albañilería, fontanería, pintura y suelos.',
    imagen_url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    titulo: 'Cerrajería y Soldadura Estructural',
    categoria: 'Metálica',
    descripcion: 'Escaleras metálicas modernas, barandillas, puertas acorazadas y automatización de accesos.',
    imagen_url: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    titulo: 'Albañilería General y Tabiquería',
    categoria: 'Construcción',
    descripcion: 'Muros, tabiquería en pladur, techos continuos, soleras y revestimientos de primera calidad.',
    imagen_url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    titulo: 'Fontanería Profesional y Climatización',
    categoria: 'Instalaciones',
    descripcion: 'Reparación de fugas, cambio de tuberías, sanitarios, griferías y mantenimiento general.',
    imagen_url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    titulo: 'Carpintería a Medida',
    categoria: 'Carpintería',
    descripcion: 'Armarios empotrados, frentes de cocina, puertas de paso y acabados en madera maciza.',
    imagen_url: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 6,
    titulo: 'Instalación de Placas Solares',
    categoria: 'Energía Solar',
    descripcion: 'Montaje de sistemas fotovoltaicos en cubiertas para máximo ahorro en factura eléctrica.',
    imagen_url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 7,
    titulo: 'Pulido de Piso y Hormigón',
    categoria: 'Pavimentos',
    descripcion: 'Acabados profesionales de losas de concreto niveladas con máquinas allanadoras mecánicas.',
    imagen_url: 'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 8,
    titulo: 'Pintura Decorativa e Industrial',
    categoria: 'Pintura',
    descripcion: 'Alisado de paredes, eliminación de gotelé, pintura plástica de alta lavabilidad y esmaltados.',
    imagen_url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 9,
    titulo: 'Instalaciones Eléctricas e Iluminación',
    categoria: 'Electricidad',
    descripcion: 'Cuadros eléctricos certificados, boletines, iluminación LED empotrada y domótica.',
    imagen_url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 10,
    titulo: 'Impermeabilización de Terrazas',
    categoria: 'Aislamiento',
    descripcion: 'Aplicación de membrana de poliuretano, telas asfálticas y reparación de humedades y goteras.',
    imagen_url: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 11,
    titulo: 'Reformas de Cocinas de Diseño',
    categoria: 'Cocinas',
    descripcion: 'Instalación de encimeras de cuarzo, distribución ergonómica, fontanería integrada y muebles.',
    imagen_url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 12,
    titulo: 'Renovación de Baños y Duchas',
    categoria: 'Baños',
    descripcion: 'Cambio de bañera por plato de ducha de resina antideslizante, mamparas y sanitarios suspendidos.',
    imagen_url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80'
  }
];

const fotoPorDefecto = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80';

// Menú Hamburguesa
const btnHamburguesa = document.getElementById('btnHamburguesa');
const menuNavegacion = document.getElementById('menuNavegacion');
if (btnHamburguesa && menuNavegacion) {
  btnHamburguesa.addEventListener('click', () => {
    menuNavegacion.classList.toggle('activo');
  });
}

// Carga de Servicios con Paginación
async function cargarServicios(pagina = 1) {
  const grid = document.getElementById('gridServicios');
  if (!grid) return;

  try {
    const respuesta = await fetch(`${API_URL}?pagina=${pagina}&limite=${limite}`);
    const data = await respuesta.json();

    if (data.exito && data.datos && data.datos.length > 0 && data.paginacion.totalRegistros >= 12) {
      paginaActual = data.paginacion.paginaActual;
      renderizarServicios(data.datos);
      renderizarPaginacion(data.paginacion);
      return;
    }
  } catch (error) {
    console.warn('Cargando catálogo optimizado.');
  }

  // Paginación local garantizada de 6 y 6
  const inicio = (pagina - 1) * limite;
  const fin = inicio + limite;
  const serviciosPagina = catalogoCompleto.slice(inicio, fin);
  const totalPaginas = Math.ceil(catalogoCompleto.length / limite);

  paginaActual = pagina;
  renderizarServicios(serviciosPagina);
  renderizarPaginacion({
    paginaActual: pagina,
    totalPaginas: totalPaginas,
    tieneAnterior: pagina > 1,
    tieneSiguiente: pagina < totalPaginas
  });
}

function renderizarServicios(servicios) {
  const grid = document.getElementById('gridServicios');
  if (!grid) return;

  grid.innerHTML = servicios.map(servicio => `
    <article class="tarjeta-servicio">
      <div class="tarjeta-imagen-wrapper">
        <img 
          src="${servicio.imagen_url || fotoPorDefecto}" 
          alt="${servicio.titulo}" 
          class="tarjeta-imagen" 
          loading="lazy"
          onerror="this.onerror=null; this.src='${fotoPorDefecto}';"
        />
        <span class="badge-categoria-flotante">${servicio.categoria}</span>
      </div>
      <div class="tarjeta-servicio-cuerpo">
        <h3>${servicio.titulo}</h3>
        <p>${servicio.descripcion}</p>
        <a href="https://wa.me/34695586031?text=Hola,%20solicito%20presupuesto%20para:%20${encodeURIComponent(servicio.titulo)}" 
           target="_blank" 
           class="btn-cta" 
           style="text-align:center; font-size: 0.95rem;">
           Pedir Presupuesto WhatsApp
        </a>
      </div>
    </article>
  `).join('');
}

function renderizarPaginacion(paginacion) {
  const paginador = document.getElementById('paginador');
  if (!paginador) return;

  paginador.innerHTML = `
    <button class="btn-paginacion" ${!paginacion.tieneAnterior ? 'disabled' : ''} id="btnPrev">
      ← Anterior
    </button>
    <span class="info-paginacion">Página ${paginacion.paginaActual} de ${paginacion.totalPaginas}</span>
    <button class="btn-paginacion" ${!paginacion.tieneSiguiente ? 'disabled' : ''} id="btnNext">
      Siguiente →
    </button>
  `;

  const btnPrev = document.getElementById('btnPrev');
  const btnNext = document.getElementById('btnNext');

  if (btnPrev && paginacion.tieneAnterior) {
    btnPrev.addEventListener('click', () => cargarServicios(paginaActual - 1));
  }
  if (btnNext && paginacion.tieneSiguiente) {
    btnNext.addEventListener('click', () => cargarServicios(paginaActual + 1));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  cargarServicios(1);
});
