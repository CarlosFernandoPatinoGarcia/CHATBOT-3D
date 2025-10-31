// Dashboard de Monitoreo Ambiental - JavaScript

class EnvironmentalDashboard {
    constructor() {
        this.charts = {};
        this.data = {
            temperature: [],
            humidity: [],
            airQuality: [],
            timestamps: []
        };
        this.isChatbotOpen = false;

        this.init();
    }

    init() {
        this.initializeCharts();
        this.startDataSimulation();
        this.setupEventListeners();
        this.loadInitialData();
    }

    // Inicializar gráficos
    initializeCharts() {
        const ctx = document.getElementById('environmentChart');
        if (ctx) {
            this.charts.environment = new Chart(ctx.getContext('2d'), {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [
                        {
                            label: 'Temperatura (°C)',
                            data: [],
                            borderColor: '#0ea5e9',
                            backgroundColor: 'rgba(14, 165, 233, 0.1)',
                            borderWidth: 3,
                            fill: true,
                            tension: 0.4
                        },
                        {
                            label: 'Humedad (%)',
                            data: [],
                            borderColor: '#10b981',
                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                            borderWidth: 3,
                            fill: true,
                            tension: 0.4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            labels: {
                                color: '#cbd5e1',
                                font: {
                                    family: 'Inter'
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                color: 'rgba(148, 163, 184, 0.1)'
                            },
                            ticks: {
                                color: '#94a3b8'
                            }
                        },
                        y: {
                            grid: {
                                color: 'rgba(148, 163, 184, 0.1)'
                            },
                            ticks: {
                                color: '#94a3b8'
                            }
                        }
                    },
                    interaction: {
                        intersect: false,
                        mode: 'index'
                    }
                }
            });
        }
    }

    // Simulación de datos ambientales
    generateEnvironmentalData() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
        });

        // Generar datos realistas
        const baseTemp = 24;
        const tempVariation = (Math.sin(now.getTime() / 100000) * 3);
        const temperature = baseTemp + tempVariation + (Math.random() - 0.5) * 2;

        const baseHumidity = 65;
        const humidityVariation = (Math.cos(now.getTime() / 150000) * 10);
        const humidity = Math.max(30, Math.min(90, baseHumidity + humidityVariation + (Math.random() - 0.5) * 5));

        // Determinar calidad del aire basada en los valores
        let airQuality = 'Excelente';
        let airQualityStatus = 'status-good';

        if (temperature > 28 || humidity > 80) {
            airQuality = 'Moderada';
            airQualityStatus = 'status-warning';
        }
        if (temperature > 30 || humidity > 85) {
            airQuality = 'Baja';
            airQualityStatus = 'status-danger';
        }

        return {
            temperature: parseFloat(temperature.toFixed(1)),
            humidity: parseFloat(humidity.toFixed(1)),
            airQuality,
            airQualityStatus,
            timestamp: timeString
        };
    }

    // Actualizar interfaz con nuevos datos
    updateInterface(data) {
        // Actualizar valores en tiempo real
        document.getElementById('temperature-value').textContent = `${data.temperature}°C`;
        document.getElementById('humidity-value').textContent = `${data.humidity}%`;
        document.getElementById('air-quality-value').textContent = data.airQuality;

        // Actualizar indicadores de estado
        const tempStatus = document.querySelector('#temperature-value').parentElement.querySelector('.status-indicator');
        const humidityStatus = document.querySelector('#humidity-value').parentElement.querySelector('.status-indicator');
        const airStatus = document.querySelector('#air-quality-value').parentElement.querySelector('.status-indicator');

        // Limpiar clases de estado
        [tempStatus, humidityStatus, airStatus].forEach(indicator => {
            indicator.className = 'status-indicator';
        });

        // Asignar nuevos estados
        if (data.temperature > 28) {
            tempStatus.classList.add('status-warning');
        } else if (data.temperature > 32) {
            tempStatus.classList.add('status-danger');
        } else {
            tempStatus.classList.add('status-good');
        }

        if (data.humidity > 80) {
            humidityStatus.classList.add('status-warning');
        } else if (data.humidity > 85) {
            humidityStatus.classList.add('status-danger');
        } else {
            humidityStatus.classList.add('status-good');
        }

        airStatus.classList.add(data.airQualityStatus);

        // Actualizar gráfico
        this.updateChart(data);
    }

    // Actualizar gráfico con nuevos datos
    updateChart(data) {
        if (this.charts.environment) {
            const chart = this.charts.environment;

            // Limitar a los últimos 10 puntos de datos
            if (chart.data.labels.length >= 10) {
                chart.data.labels.shift();
                chart.data.datasets[0].data.shift();
                chart.data.datasets[1].data.shift();
            }

            // Agregar nuevos datos
            chart.data.labels.push(data.timestamp);
            chart.data.datasets[0].data.push(data.temperature);
            chart.data.datasets[1].data.push(data.humidity);

            // Animar la actualización
            chart.update('active');
        }
    }

    // Cargar datos iniciales
    loadInitialData() {
        // Generar datos históricos para los últimos 5 minutos
        for (let i = 5; i >= 0; i--) {
            const pastTime = new Date(Date.now() - (i * 60000));
            const data = this.generateEnvironmentalData();

            if (this.charts.environment) {
                this.charts.environment.data.labels.push(data.timestamp);
                this.charts.environment.data.datasets[0].data.push(data.temperature);
                this.charts.environment.data.datasets[1].data.push(data.humidity);
            }
        }

        if (this.charts.environment) {
            this.charts.environment.update();
        }

        // Actualizar interfaz con datos actuales
        const currentData = this.generateEnvironmentalData();
        this.updateInterface(currentData);
    }

    // Iniciar simulación de datos en tiempo real
    startDataSimulation() {
        setInterval(() => {
            const data = this.generateEnvironmentalData();
            this.updateInterface(data);
        }, 5000); // Actualizar cada 5 segundos
    }

    // Configurar event listeners
    setupEventListeners() {
        // Navegación suave
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                // Actualizar clase active
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                // Animar scroll a sección
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId) || document.querySelector('.dashboard-card');

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Animaciones al hacer scroll
        window.addEventListener('scroll', () => {
            const cards = document.querySelectorAll('.dashboard-card');
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }
            });
        });

        // Detectar cambios de tamaño de ventana para gráficos
        window.addEventListener('resize', () => {
            if (this.charts.environment) {
                this.charts.environment.resize();
            }
        });
    }
}


// Agrega esta clase al final de tu archivo dashboard.js

class VoiceAnimationController {
    constructor() {
        this.isRecording = false;
        this.isSpeaking = false;
        this.modelViewer = null;
        this.chatbotWindow = null;

        this.init();
    }

    init() {
        this.setupVoiceRecognition();
        this.setupVoiceSynthesis();
        this.findChatbotElements();
        this.setupVoiceButton();
        this.interceptDialogflowMessages();
    }

    findChatbotElements() {
        // Esperar a que el iframe de Dialogflow se cargue
        setTimeout(() => {
            const dfMessenger = document.querySelector('df-messenger');
            if (dfMessenger) {
                this.chatbotWindow = dfMessenger;
                console.log('Dialogflow messenger encontrado');
            }
        }, 2000);
    }

    setupVoiceRecognition() {
        if (annyang) {
            // Configurar comandos de voz
            const commands = {
                'hola': () => this.sendMessageToDialogflow('hola'),
                '¿cómo estás?': () => this.sendMessageToDialogflow('¿cómo estás?'),
                'ayuda': () => this.sendMessageToDialogflow('ayuda'),
                'información': () => this.sendMessageToDialogflow('información'),
                // Agrega más comandos según necesites
            };

            annyang.addCommands(commands);
            annyang.setLanguage('es-ES'); // Configurar idioma español

            // Configurar callback para cuando se detecta voz
            annyang.addCallback('result', (phrases) => {
                console.log('Voz detectada:', phrases[0]);
                this.sendMessageToDialogflow(phrases[0]);
                this.stopRecording();
            });
        }
    }

    setupVoiceSynthesis() {
        // Configurar ResponsiveVoice para texto a voz
        if (window.responsiveVoice) {
            responsiveVoice.setDefaultVoice("Spanish Female");
            responsiveVoice.setDefaultRate(0.8);
        }
    }

    setupVoiceButton() {
        const voiceBtn = document.getElementById('voiceBtn');
        if (voiceBtn) {
            voiceBtn.addEventListener('click', () => {
                if (this.isRecording) {
                    this.stopRecording();
                } else {
                    this.startRecording();
                }
            });
        }
    }

    startRecording() {
        if (annyang) {
            this.isRecording = true;
            const voiceBtn = document.getElementById('voiceBtn');
            voiceBtn.classList.add('recording');
            voiceBtn.innerHTML = '<i class="bi bi-stop-fill"></i>';

            annyang.start({
                continuous: false,
                autoRestart: false
            });

            console.log('Grabación de voz iniciada');
        }
    }

    stopRecording() {
        if (annyang) {
            this.isRecording = false;
            const voiceBtn = document.getElementById('voiceBtn');
            voiceBtn.classList.remove('recording');
            voiceBtn.innerHTML = '<i class="bi bi-mic-fill"></i>';

            annyang.abort();

            console.log('Grabación de voz detenida');
        }
    }

    sendMessageToDialogflow(message) {
        // Enviar mensaje al chatbot de Dialogflow
        const dfMessenger = document.querySelector('df-messenger');
        if (dfMessenger) {
            // Método para enviar mensaje al iframe de Dialogflow
            dfMessenger.sendTextQuery = function (query) {
                const iframe = dfMessenger.shadowRoot.querySelector('iframe');
                if (iframe && iframe.contentWindow) {
                    iframe.contentWindow.postMessage({
                        type: 'df-messenger-send-query',
                        query: query
                    }, '*');
                }
            };

            dfMessenger.sendTextQuery(message);
            console.log('Mensaje enviado a Dialogflow:', message);
        }
    }

    interceptDialogflowMessages() {
        // Escuchar mensajes del iframe de Dialogflow
        window.addEventListener('message', (event) => {
            if (event.origin.includes('dialogflow.cloud.google.com')) {
                const data = event.data;

                // Manejar diferentes tipos de mensajes
                if (data.type === 'df-messenger-response') {
                    this.handleDialogflowResponse(data.response);
                }
            }
        });
    }

    handleDialogflowResponse(response) {
        // Obtener el texto de respuesta de Dialogflow
        let responseText = '';

        if (response.queryResult && response.queryResult.fulfillmentText) {
            responseText = response.queryResult.fulfillmentText;
        } else if (response.queryResult && response.queryResult.fulfillmentMessages) {
            const messages = response.queryResult.fulfillmentMessages;
            for (let msg of messages) {
                if (msg.text && msg.text.text) {
                    responseText = msg.text.text[0];
                    break;
                }
            }
        }

        if (responseText) {
            console.log('Respuesta de Dialogflow:', responseText);
            this.speakResponse(responseText);
            this.animateAvatarSpeaking(responseText);
        }
    }

    speakResponse(text) {
        if (window.responsiveVoice && !this.isSpeaking) {
            this.isSpeaking = true;

            // Configurar callback para cuando termina de hablar
            responsiveVoice.speak(text, "Spanish Female", {
                rate: 0.8,
                onend: () => {
                    this.isSpeaking = false;
                    this.stopAvatarAnimation();
                }
            });

            console.log('Hablando texto:', text);
        }
    }

    animateAvatarSpeaking(text) {
        const modelViewer = document.querySelector('model-viewer');
        if (modelViewer && text.length > 0) {
            // Calcular duración estimada basada en longitud del texto
            const estimatedDuration = text.length * 0.1; // Aproximadamente 0.1 segundos por carácter

            // Agregar clase de animación
            modelViewer.classList.add('avatar-speaking');

            console.log('Animación de avatar activada por:', estimatedDuration, 'segundos');
        }
    }

    stopAvatarAnimation() {
        const modelViewer = document.querySelector('model-viewer');
        if (modelViewer) {
            modelViewer.classList.remove('avatar-speaking');
            console.log('Animación de avatar detenida');
        }
    }
}

// Modifica el DOMContentLoaded para incluir el controlador de voz
document.addEventListener('DOMContentLoaded', () => {
    const dashboard = new EnvironmentalDashboard();
    const voiceController = new VoiceAnimationController();

    // Hacer visible el dashboard después de un breve retraso
    setTimeout(() => {
        document.querySelectorAll('.dashboard-card').forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 200);
        });
    }, 100);

    // Prevenir el comportamiento por defecto de enlaces
    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
        });
    });
});


// Funciones globales
function toggleChatbot() {
    const panel = document.getElementById('chatbotPanel');
    const toggle = document.getElementById('chatbotToggle');

    if (panel.style.display === 'none') {
        panel.style.display = 'block';
        toggle.style.display = 'none';

        // Animar apertura
        panel.style.opacity = '0';
        panel.style.transform = 'translateY(20px)';

        setTimeout(() => {
            panel.style.opacity = '1';
            panel.style.transform = 'translateY(0)';
        }, 10);

    } else {
        panel.style.display = 'none';
        toggle.style.display = 'block';
    }
}

function launchAR() {
    // Verificar si el dispositivo soporta AR
    if ('xr' in navigator) {
        // Intentar iniciar sesión AR
        navigator.xr.isSessionSupported('immersive-ar').then((supported) => {
            if (supported) {
                showNotification('Iniciando experiencia AR...', 'success');
                // Aquí iría la lógica para iniciar la sesión AR
            } else {
                showNotification('AR no soportado en este dispositivo', 'warning');
            }
        });
    } else {
        showNotification('WebXR no soportado en este navegador', 'warning');
    }
}

function showNotification(message, type = 'info') {
    // Crear notificación temporal
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'success' ? 'success' : type === 'warning' ? 'warning' : 'info'} position-fixed`;
    notification.style.cssText = `
        top: 100px;
        right: 20px;
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        background-color: var(--secondary-bg);
        border-color: var(--accent-bg);
        color: var(--text-primary);
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

const commands = {
    'hola': () => this.sendMessageToDialogflow('hola'),
    '¿cómo estás?': () => this.sendMessageToDialogflow('¿cómo estás?'),
    'ayuda': () => this.sendMessageToDialogflow('ayuda'),
    'información': () => this.sendMessageToDialogflow('información'),
    'temperatura': () => this.sendMessageToDialogflow('¿Cuál es la temperatura actual?'),
    'humedad': () => this.sendMessageToDialogflow('¿Cuál es el nivel de humedad?'),
    'gracias': () => this.sendMessageToDialogflow('gracias'),
    'adiós': () => this.sendMessageToDialogflow('adiós')
};

// Animaciones CSS adicionales
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .dashboard-card {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease;
    }
    
    .dashboard-card.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Inicializar dashboard cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const dashboard = new EnvironmentalDashboard();

    // Hacer visible el dashboard después de un breve retraso
    setTimeout(() => {
        document.querySelectorAll('.dashboard-card').forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 200);
        });
    }, 100);

    // Prevenir el comportamiento por defecto de enlaces
    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
        });
    });
});

// Función para simular carga de modelo 3D
function load3DModel() {
    const modelViewer = document.querySelector('model-viewer');
    if (modelViewer) {
        modelViewer.addEventListener('load', () => {
            console.log('Modelo 3D cargado exitosamente');
            showNotification('Modelo 3D cargado correctamente', 'success');
        });

        modelViewer.addEventListener('error', () => {
            console.error('Error al cargar el modelo 3D');
            showNotification('Error al cargar el modelo 3D', 'danger');
        });
    }
}

// Llamar a la función de carga del modelo
document.addEventListener('DOMContentLoaded', load3DModel);