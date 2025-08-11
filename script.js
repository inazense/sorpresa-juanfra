// Datos del juego
const questions = [
    {
        question: "¿Quién chasquea los dedos en Avengers: Endgame para vencer a Thanos?",
        options: ["Hulk", "Gamora", "Capitán América", "Iron Man"],
        correct: 3
    },
    {
        question: "¿En qué año se fundó la Comic-Con?",
        options: ["1970", "1975", "1980", "1985"],
        correct: 0
    },
    {
        question: "¿Cuál es el color principal de Spider-Man?",
        options: ["Negro y blanco", "Verde y amarillo", "Azul y rojo", "Rojo y amarillo"],
        correct: 2
    },
    {
        question: "¿Cuántos actores han interpretado a Batman en el cine?",
        options: ["6", "7", "9", "8"],
        correct: 1
    },
    {
        question: "¿Qué personaje de Naruto es el mejor portalápiceros?",
        options: ["Asuma", "Kakashi", "Jiraiya", "Iruka"],
        correct: 2
    }
];

// Variables del juego
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

// Elementos del DOM
const welcomeScreen = document.getElementById('welcome-screen');
const gameScreen = document.getElementById('game-screen');
const finalScreen = document.getElementById('final-screen');
const startButton = document.getElementById('start-button');
const questionTitle = document.getElementById('question-title');
const questionText = document.getElementById('question-text');
const optionButtons = document.querySelectorAll('.option-button');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');

// Elementos del modal
const resultModal = document.getElementById('result-modal');
const modalMessage = document.getElementById('modal-message');
const modalCloseButton = document.getElementById('modal-close-button');

// Event listeners
startButton.addEventListener('click', startGame);

optionButtons.forEach(button => {
    button.addEventListener('click', () => selectOption(button));
});

modalCloseButton.addEventListener('click', closeModal);

// Funciones del juego
function startGame() {
    welcomeScreen.classList.remove('active');
    gameScreen.classList.add('active');
    loadQuestion();
}

function loadQuestion() {
    const question = questions[currentQuestion];
    
    questionTitle.textContent = `Pregunta ${currentQuestion + 1} de 5`;
    questionText.textContent = question.question;
    
    optionButtons.forEach((button, index) => {
        button.textContent = question.options[index];
        button.className = 'option-button';
        button.disabled = false;
    });
    
    selectedAnswer = null;
    updateProgress();
}

function selectOption(button) {
    if (selectedAnswer !== null) return; // Evitar múltiples selecciones
    
    const selectedIndex = parseInt(button.dataset.index);
    selectedAnswer = selectedIndex;
    
    // Marcar la opción seleccionada
    optionButtons.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
    
    // Verificar respuesta después de un breve delay
    setTimeout(() => {
        checkAnswer(selectedIndex);
    }, 500);
}

function checkAnswer(selectedIndex) {
    const question = questions[currentQuestion];
    const isCorrect = selectedIndex === question.correct;
    
    if (isCorrect) {
        score++;
        optionButtons[selectedIndex].classList.add('correct');
    } else {
        optionButtons[selectedIndex].classList.add('incorrect');
        optionButtons[question.correct].classList.add('correct');
    }
    
    // Deshabilitar todos los botones
    optionButtons.forEach(button => {
        button.disabled = true;
    });
    
    // Pasar a la siguiente pregunta después de un delay
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showFinalScreen();
        }
    }, 1500);
}

function updateProgress() {
    const progress = (currentQuestion / questions.length) * 100;
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `${currentQuestion}/${questions.length}`;
}

function showModal(message) {
    modalMessage.textContent = message;
    resultModal.classList.add('active');
}

function closeModal() {
    resultModal.classList.remove('active');
    resetGame();
}

function showFinalScreen() {
    if (score === questions.length) {
        // Todas las respuestas correctas
        gameScreen.classList.remove('active');
        finalScreen.classList.add('active');
    } else {
        // No todas las respuestas correctas - mostrar modal
        const message = `Has acertado ${score} de ${questions.length} preguntas. ¡Inténtalo de nuevo!`;
        showModal(message);
    }
}

function resetGame() {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    
    gameScreen.classList.remove('active');
    welcomeScreen.classList.add('active');
    
    updateProgress();
}

// Inicialización
updateProgress();
