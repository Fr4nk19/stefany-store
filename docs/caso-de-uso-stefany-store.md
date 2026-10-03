# Caso de uso: STEFANY Moda — una tienda Shopify a la medida para una marca de moda mayorista y minorista

## Resumen

STEFANY Moda es una marca de ropa con más de 20 años en la industria que opera varias líneas de producto (STEFANY, STEFANY Basic, STEFANY Jeans, STEFANY Los Ángeles). Necesitaba una tienda en línea que fuera más que un catálogo: que presentara sus marcas, atendiera a los clientes de forma personalizada, diera a conocer sus catálogos y también sirviera para reclutar personal.

Se desarrolló un **tema de Shopify personalizado** (basado en la arquitectura moderna de temas por secciones y bloques, con Liquid, JavaScript nativo y plantillas JSON) que cubre todo eso sin depender de decenas de apps de terceros.

## El reto

- **Varias marcas, una sola tienda.** Cada línea tiene identidad propia, y el cliente debe poder llegar a cada una fácilmente.
- **Venta con acompañamiento.** Gran parte de la clientela de moda prefiere consultar por WhatsApp antes de comprar.
- **Catálogos descargables o consultables** para clientes que compran por volumen.
- **Reclutamiento de personal** sin montar un sistema aparte.
- **Rendimiento y SEO.** Una tienda rápida en móvil, que es donde ocurre la mayor parte del tráfico.
- **Mercado hispanohablante.** Contenido y experiencia en español.

## La solución

### 1. Página de inicio orientada a la conversión
Hero y slider principal, barra de beneficios (experiencia, atención personalizada, envíos rápidos), listas de productos "Novedades" y "Más vendidos", categorías y acceso directo a cada marca, bloque de Instagram y ventana de suscripción al boletín.

### 2. Páginas por marca y colecciones
Plantillas propias para **"Nuestras marcas"** y colecciones específicas (por ejemplo, jeans de mujer), con tarjetas de colección y estilos de botón configurables por marca desde el editor, sin tocar código.

### 3. Asesoría por WhatsApp integrada
Un bloque reutilizable de botón de WhatsApp que genera el enlace con un mensaje precargado ("Asesoría personalizada"). Se puede colocar en producto, colección o cualquier página desde el personalizador del tema.

### 4. Sección de catálogos
Una sección dedicada (`catalogs`) que muestra los catálogos de temporada en una cuadrícula configurable: columnas en escritorio y móvil, proporción de imagen, espaciados y apertura en pestaña nueva.

### 5. Bolsa de trabajo
Listado de vacantes basado en **metaobjetos de Shopify** (plantilla `metaobject/job`) y formulario de postulación enviado de forma asíncrona (sin recargar la página), con validación y formato automático del teléfono. El equipo de recursos humanos publica vacantes desde el admin, sin desarrolladores.

### 6. Contenido de confianza
Páginas de "Quiénes somos" (misión, visión, evolución y valores), preguntas frecuentes con acordeón, contacto, y footer con redes sociales (Instagram, Facebook, TikTok).

### 7. Experiencia de compra moderna
Carrito en panel lateral (drawer), compra rápida desde la tarjeta de producto, selector de variantes, búsqueda predictiva, filtros de colección, productos vistos recientemente, barra de "agregar al carrito" fija y precios por volumen.

### 8. Rendimiento y multilenguaje
Optimizaciones iterativas guiadas por Lighthouse (carga de recursos, estilos críticos, JavaScript modular por componente) y soporte de más de 30 idiomas gracias a la estructura de traducciones del tema.

## Tecnología

| Capa | Herramientas |
|---|---|
| Plataforma | Shopify (tema Online Store 2.0) |
| Plantillas | Liquid, plantillas y grupos de secciones en JSON |
| Frontend | JavaScript nativo con componentes web, CSS propio |
| Contenido dinámico | Metaobjetos de Shopify (vacantes) |
| Formularios | Web3Forms (postulaciones) |
| Mensajería | WhatsApp (enlaces directos) |
| Flujo de trabajo | Git/GitHub con ramas y *pull requests*; desarrollo asistido por IA (Claude Code) |

## Desarrollo acelerado con IA

El proyecto se construyó de forma iterativa con **Claude Code**: cada mejora (página de marcas, FAQ, bolsa de trabajo, ajustes de rendimiento, correcciones de sintaxis Liquid) se resolvió en una rama propia y entró mediante *pull request*. Más de 90 *commits* en pocos meses muestran el ritmo: una funcionalidad completa por sesión en lugar de días de trabajo. La IA se usó para generar secciones y bloques, corregir errores de Liquid y optimizar el rendimiento, mientras la revisión y las decisiones de negocio se mantuvieron en manos humanas.

## Resultados

- Una sola tienda que **organiza varias marcas** con navegación clara.
- **Canal directo de venta asistida** vía WhatsApp en toda la tienda.
- **Catálogos y reclutamiento** gestionables por el equipo desde el admin de Shopify.
- Menor dependencia de apps de pago: funciones clave viven en el propio tema.
- Base mantenible: secciones y bloques reutilizables que el equipo puede reordenar desde el editor.

## Qué se puede reutilizar

El enfoque aplica a cualquier negocio con **varias líneas de producto, venta consultiva y necesidad de gestionar contenido propio** (catálogos, vacantes) sin programar cada cambio: tiendas de moda, calzado, mobiliario o distribuidores con venta mayorista.
