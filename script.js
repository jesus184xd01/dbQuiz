// script.js

// Datos de ejemplo de respondientes (quien llena la encuesta)
const respondientes = {
    r1: {nombre: "Ana", apellido: "Torres"},
    r2: {nombre: "Luis", apellido: "Martínez"},
    r3: {nombre: "Sofía", apellido: "Ruiz"}
};

// Datos de ejemplo de encuestados (sobre quienes se hace la encuesta)
const encuestados = {
    1: {nombre: "Juan", apellido: "Pérez", email: "juan@example.com"},
    2: {nombre: "María", apellido: "López", email: "maria@example.com"},
    3: {nombre: "Carlos", apellido: "Sánchez", email: "carlos@example.com"}
};

// Competencias y preguntas
const competencias = [
    {id: 1, nombre: "Liderazgo"},
    {id: 2, nombre: "Trabajo en equipo"},
    {id: 3, nombre: "Comunicación"}
];

const preguntas = [
    {id: 1, texto: "¿Cómo manejas a tu equipo en situaciones de presión?", competencia: 1},
    {id: 2, texto: "¿Te comunicas claramente con tu equipo?", competencia: 3},
    {id: 3, texto: "¿Participas activamente en proyectos de equipo?", competencia: 2},
    {id: 4, texto: "¿Cómo resuelves conflictos en tu grupo?", competencia: 1},
    {id: 5, texto: "¿Propones ideas creativas en tu equipo?", competencia: 3}
];

// Definir qué competencias aplican a cada encuestado
const encuestadoCompetencias = {
    1: [1,3], // Juan
    2: [2,3], // María
    3: [1,2]  // Carlos
};

// Respuestas de ejemplo para mostrar en la gráfica
const respuestasEjemplo = {
    1: {1: 4, 2: 5},
    2: {2: 3, 3: 4},
    3: {1: 5, 3: 2}
};

let grafica;

// Función principal que actualiza toda la encuesta cuando se selecciona un encuestado
function actualizarFormulario() {
    const encuestadoId = document.getElementById("encuestado").value;
    mostrarInfoEncuestado(encuestadoId);
    cargarPreguntas(encuestadoId);
    mostrarResultados(encuestadoId);
}

// Mostrar la información del encuestado
function mostrarInfoEncuestado(encuestadoId) {
    const infoDiv = document.getElementById("infoEncuestado");
    infoDiv.innerHTML = "";

    if (!encuestadoId) return;

    const enc = encuestados[encuestadoId];
    infoDiv.innerHTML = `<p><strong>Nombre:</strong> ${enc.nombre} ${enc.apellido}</p>
                         <p><strong>Email:</strong> ${enc.email}</p>`;
}

// Cargar preguntas dinámicamente según competencias aplicables al encuestado
function cargarPreguntas(encuestadoId) {
    const container = document.getElementById("preguntasContainer");
    container.innerHTML = "";
    if (!encuestadoId) return;

    const competenciasAplicables = encuestadoCompetencias[encuestadoId];
    const preguntasFiltradas = preguntas.filter(p => competenciasAplicables.includes(p.competencia));

    preguntasFiltradas.forEach((preg, index) => {
        const fieldset = document.createElement("fieldset");
        const legend = document.createElement("legend");
        legend.innerText = `Pregunta ${index+1}`;
        fieldset.appendChild(legend);

        const p = document.createElement("p");
        p.innerText = preg.texto;
        fieldset.appendChild(p);

        for(let i=1; i<=5; i++) {
            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = `pregunta_${preg.id}`;
            radio.value = i;
            radio.required = true;
            radio.id = `preg_${preg.id}_op_${i}`;

            const label = document.createElement("label");
            label.htmlFor = radio.id;
            label.innerText = `${i} - ${i===1?"Muy Malo":i===5?"Excelente":"Regular"}`;

            fieldset.appendChild(radio);
            fieldset.appendChild(label);
            fieldset.appendChild(document.createElement("br"));
        }

        container.appendChild(fieldset);
        container.appendChild(document.createElement("br"));
    });
}

// Mostrar resultados del encuestado en una gráfica de barras
function mostrarResultados(encuestadoId) {
    if (!encuestadoId) return;

    const respuestas = respuestasEjemplo[encuestadoId] || {};
    const etiquetas = [];
    const valores = [];

    for(const pregId in respuestas) {
        const pregunta = preguntas.find(p => p.id == pregId);
        etiquetas.push(pregunta.texto);
        valores.push(respuestas[pregId]);
    }

    const ctx = document.getElementById('graficaResultados').getContext('2d');
    if(grafica) grafica.destroy();

    grafica = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: etiquetas,
            datasets: [{
                label: 'Calificación',
                data: valores,
                backgroundColor: 'rgba(0,123,255,0.5)',
                borderColor: 'rgba(0,123,255,1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true, max: 5 }
            }
        }
    });
}
