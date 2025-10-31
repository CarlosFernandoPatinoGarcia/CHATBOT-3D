# Dashboard de Monitoreo Ambiental

## Descripción
Dashboard web profesional para monitoreo ambiental con visualización 3D/AR, indicadores dinámicos en tiempo real y asistente virtual integrado.

## Características

### 🎨 Diseño
- **Modo oscuro** con paleta de colores institucional (azul tecnológico)
- **Diseño responsivo** con Bootstrap 5
- **Interfaz moderna** con animaciones suaves
- **Tipografía Inter** para mejor legibilidad

### 📊 Panel de Indicadores Dinámicos
- **Temperatura ambiente** con indicadores visuales de estado
- **Humedad relativa** con variaciones simuladas
- **Calidad del aire** con clasificación automática
- **Gráficos en tiempo real** con Chart.js
- **Actualización automática** cada 5 segundos

### 🔮 Visualización 3D/AR
- **Model-viewer** integrado para visualización 3D
- **Soporte WebXR** para experiencias AR
- **Modelo 3D interactivo** (Astronauta de ejemplo)
- **Botón de lanzamiento AR** con detección de compatibilidad
- **Controles de cámara** y rotación automática

### 🤖 Asistente Virtual
- **Panel flotante** en esquina inferior derecha
- **Integración preparada** para Dialogflow
- **Interfaz colapsable** para mejor experiencia de usuario
- **Placeholder** para iframe o script de integración

## Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **Bootstrap 5** - Framework CSS responsivo
- **Tailwind CSS** - Utilidades de estilo (integrado)
- **Chart.js** - Gráficos interactivos
- **Model-viewer** - Visualización 3D/AR
- **JavaScript ES6+** - Lógica de aplicación

## Estructura de Archivos

```
/
├── index.html          # Página principal del dashboard
├── dashboard.js        # Lógica JavaScript
├── README.md          # Documentación
└── resources/         # Carpeta para recursos adicionales
```

## Instalación y Uso

1. **Clonar o descargar** los archivos
2. **Abrir** `index.html` en un navegador moderno
3. **No requiere servidor** local (aunque se recomienda para funciones avanzadas)

### Requisitos del Navegador
- Chrome 80+ o Firefox 75+
- Safari 14+ (algunas funciones AR limitadas)
- Soporte para WebXR (para funciones AR)

## Funcionalidades Detalladas

### Simulación de Datos
El dashboard incluye un sistema de simulación que:
- Genera datos realistas de temperatura y humedad
- Simula variaciones naturales a lo largo del tiempo
- Clasifica automáticamente la calidad del aire
- Actualiza gráficos en tiempo real

### Indicadores Visuales
- **Verde**: Condiciones óptimas
- **Amarillo**: Condiciones aceptables con precaución
- **Rojo**: Condiciones que requieren atención

### Controles 3D/AR
- **Rotación automática** del modelo
- **Controles de cámara** con mouse/touch
- **Detección de AR** compatible
- **Fallback** para dispositivos no compatibles

## Personalización

### Colores
Los colores se definen en variables CSS:
```css
:root {
    --primary-bg: #0f172a;      /* Fondo principal */
    --secondary-bg: #1e293b;    /* Fondo secundario */
    --primary-color: #0ea5e9;   /* Color principal */
    --secondary-color: #38bdf8; /* Color secundario */
}
```

### Integración con Dialogflow
Para integrar el chatbot:
1. Reemplazar el div placeholder en el panel de chatbot
2. Agregar el iframe o script de Dialogflow
3. Configurar las dimensiones según sea necesario

### Modelos 3D
El modelo puede ser reemplazado cambiando la URL en el atributo `src`:
```html
<model-viewer src="ruta/al/modelo.glb"></model-viewer>
```

## Solución de Problemas

### El modelo 3D no carga
- Verificar la conexión a internet
- Comprobar que la URL del modelo sea válida
- Asegurar que el formato sea .glb

### Los gráficos no se muestran
- Verificar que Chart.js esté cargado
- Comprobar la consola de errores del navegador
- Asegurar que el canvas tenga dimensiones válidas

### AR no funciona
- Verificar compatibilidad del dispositivo
- Comprobar que WebXR esté habilitado
- Usar HTTPS para funciones AR

## Mejoras Futuras

- [ ] Integración con sensores reales vía API
- [ ] Sistema de alertas y notificaciones
- [ ] Exportación de datos e informes
- [ ] Panel de configuración de umbrales
- [ ] Modo claro/oscuro alternable
- [ ] Soporte para múltiples ubicaciones

## Licencia

Este proyecto es de código abierto y está disponible para uso educativo y comercial.

## Autor

Dashboard de Monitoreo Ambiental - Desarrollado con tecnologías web modernas.