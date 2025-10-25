// Game state
const gameState = {
    currentScreen: 'welcome-screen',
    buttonClicks: 0,
    checkedBoxes: 0,
    memoryLevel: 1,
    memorySequence: [],
    playerSequence: [],
    memoryTimer: 30
};

// DOM Elements
const screens = document.querySelectorAll('.screen');
const startBtn = document.getElementById('start-btn');
const runawayBtn = document.getElementById('runaway-btn');
const checkboxContainer = document.getElementById('checkbox-container');
const memoryGrid = document.getElementById('memory-grid');
const finalMessage = document.getElementById('final-message');
const restartBtn = document.getElementById('restart-btn');

// Progress elements
const buttonProgress = document.getElementById('button-progress');
const checkboxProgress = document.getElementById('checkbox-progress');
const memoryProgress = document.getElementById('memory-progress');
const clickCount = document.getElementById('click-count');
const checkedCount = document.getElementById('checked-count');
const memoryLevel = document.getElementById('memory-level');
const memoryTimerElement = document.getElementById('memory-timer');

// Customizable final message - CHANGE THIS!
const birthdayMessage = "SURPRISE! You just got rage baited! 😂<br><br>This \"easy game\" was designed to be frustrating! How long did it take you to realize it wasn't actually easy?<br><br>Share this with friends to see how they handle the \"simple tasks\"!";

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    createFloatingElements();
    initButtonGame();
    initCheckboxGame();
    initMemoryGame();
    setupEventListeners();
    finalMessage.innerHTML = birthdayMessage;
});

// Create floating elements
function createFloatingElements() {
    const container = document.getElementById('floating-elements');
    const elements = ['❤️', '⭐', '😊', '🎈', '🎮', '🎯', '🎨'];
    
    for (let i = 0; i < 20; i++) {
        const element = document.createElement('div');
        element.className = 'floating';
        
        // Random properties
        const type = Math.floor(Math.random() * 3);
        const emoji = elements[Math.floor(Math.random() * elements.length)];
        const left = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = Math.random() * 10 + 15;
        
        // Apply styles
        element.textContent = emoji;
        element.style.left = `${left}vw`;
        element.style.animationDelay = `${delay}s`;
        element.style.animationDuration = `${duration}s`;
        element.style.setProperty('--random-x', Math.random());
        
        container.appendChild(element);
    }
}

// Event Listeners
function setupEventListeners() {
    startBtn.addEventListener('click', () => showScreen('button-game-screen'));
    restartBtn.addEventListener('click', resetGame);
}

// Button Game
function initButtonGame() {
    runawayBtn.addEventListener('mouseover', moveButton);
    runawayBtn.addEventListener('click', handleButtonClick);
}

function moveButton() {
    const container = document.querySelector('.container');
    const containerRect = container.getBoundingClientRect();
    const buttonRect = runawayBtn.getBoundingClientRect();
    
    const maxX = containerRect.width - buttonRect.width - 20;
    const maxY = containerRect.height - buttonRect.height - 20;
    
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    
    runawayBtn.style.position = 'absolute';
    runawayBtn.style.left = `${randomX}px`;
    runawayBtn.style.top = `${randomY}px`;
}

function handleButtonClick() {
    gameState.buttonClicks++;
    clickCount.textContent = gameState.buttonClicks;
    buttonProgress.style.width = `${(gameState.buttonClicks / 10) * 100}%`;
    
    if (gameState.buttonClicks >= 10) {
        showScreen('checkbox-screen');
    }
}

// Checkbox Game
function initCheckboxGame() {
    for (let i = 0; i < 20; i++) {
        const checkboxItem = document.createElement('div');
        checkboxItem.className = 'checkbox-item';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `checkbox-${i}`;
        
        const label = document.createElement('label');
        label.htmlFor = `checkbox-${i}`;
        label.textContent = `Item ${i+1}`;
        
        checkbox.addEventListener('change', handleCheckboxChange);
        
        checkboxItem.appendChild(checkbox);
        checkboxItem.appendChild(label);
        checkboxContainer.appendChild(checkboxItem);
    }
}

function handleCheckboxChange(e) {
    if (e.target.checked) {
        gameState.checkedBoxes++;
    } else {
        gameState.checkedBoxes--;
    }
    
    checkedCount.textContent = gameState.checkedBoxes;
    checkboxProgress.style.width = `${(gameState.checkedBoxes / 20) * 100}%`;
    
    if (gameState.checkedBoxes >= 20) {
        showScreen('memory-screen');
        startMemoryGame();
    }
}

// Memory Game
function initMemoryGame() {
    for (let i = 0; i < 16; i++) {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.index = i;
        card.textContent = '?';
        card.addEventListener('click', handleMemoryCardClick);
        memoryGrid.appendChild(card);
    }
}

function startMemoryGame() {
    gameState.memoryLevel = 1;
    gameState.memorySequence = [];
    gameState.playerSequence = [];
    memoryLevel.textContent = gameState.memoryLevel;
    memoryProgress.style.width = '0%';
    
    generateMemorySequence();
    showMemorySequence();
    
    // Start timer
    gameState.memoryTimer = 30;
    memoryTimerElement.textContent = `Time: ${gameState.memoryTimer}s`;
    
    const timerInterval = setInterval(() => {
        gameState.memoryTimer--;
        memoryTimerElement.textContent = `Time: ${gameState.memoryTimer}s`;
        
        if (gameState.memoryTimer <= 0) {
            clearInterval(timerInterval);
            alert('Time\'s up! The pattern has changed. Try again!');
            resetMemoryGame();
        }
        
        if (gameState.memoryLevel > 3) {
            clearInterval(timerInterval);
        }
    }, 1000);
}

function generateMemorySequence() {
    gameState.memorySequence = [];
    const sequenceLength = gameState.memoryLevel + 2;
    
    for (let i = 0; i < sequenceLength; i++) {
        gameState.memorySequence.push(Math.floor(Math.random() * 16));
    }
}

function showMemorySequence() {
    const cards = document.querySelectorAll('.memory-card');
    
    // Reset all cards
    cards.forEach(card => {
        card.style.pointerEvents = 'none';
        card.classList.remove('flipped');
        card.textContent = '?';
        card.style.background = '#a1c4fd';
    });
    
    // Show sequence
    let delay = 0;
    gameState.memorySequence.forEach(index => {
        setTimeout(() => {
            const card = cards[index];
            card.classList.add('flipped');
            card.textContent = '⭐';
            card.style.background = '#ffe66d';
            
            setTimeout(() => {
                card.classList.remove('flipped');
                card.textContent = '?';
                card.style.background = '#a1c4fd';
            }, 800);
        }, delay);
        
        delay += 1000;
    });
    
    // Enable player input after sequence is shown
    setTimeout(() => {
        cards.forEach(card => {
            card.style.pointerEvents = 'auto';
        });
        gameState.playerSequence = [];
    }, delay);
}

function handleMemoryCardClick(e) {
    const clickedIndex = parseInt(e.target.dataset.index);
    gameState.playerSequence.push(clickedIndex);
    
    // Show the clicked card
    e.target.classList.add('flipped');
    e.target.textContent = '⭐';
    e.target.style.background = '#ffe66d';
    
    // Check if sequence is correct
    const currentIndex = gameState.playerSequence.length - 1;
    
    if (gameState.playerSequence[currentIndex] !== gameState.memorySequence[currentIndex]) {
        // Wrong sequence
        setTimeout(() => {
            alert('Wrong pattern! Starting over...');
            resetMemoryGame();
        }, 500);
        return;
    }
    
    // Check if sequence is complete
    if (gameState.playerSequence.length === gameState.memorySequence.length) {
        // Level completed
        gameState.memoryLevel++;
        memoryLevel.textContent = gameState.memoryLevel;
        memoryProgress.style.width = `${(gameState.memoryLevel - 1) * 33}%`;
        
        if (gameState.memoryLevel > 3) {
            // Game completed
            setTimeout(() => {
                showScreen('final-screen');
                createConfetti();
            }, 1000);
        } else {
            // Next level
            setTimeout(() => {
                generateMemorySequence();
                showMemorySequence();
            }, 1000);
        }
    }
}

function resetMemoryGame() {
    gameState.memoryLevel = 1;
    gameState.memorySequence = [];
    gameState.playerSequence = [];
    memoryLevel.textContent = gameState.memoryLevel;
    memoryProgress.style.width = '0%';
    
    generateMemorySequence();
    showMemorySequence();
}

// Utility Functions
function showScreen(screenId) {
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    gameState.currentScreen = screenId;
}

function resetGame() {
    gameState.buttonClicks = 0;
    gameState.checkedBoxes = 0;
    gameState.memoryLevel = 1;
    
    clickCount.textContent = '0';
    checkedCount.textContent = '0';
    memoryLevel.textContent = '1';
    
    buttonProgress.style.width = '0%';
    checkboxProgress.style.width = '0%';
    memoryProgress.style.width = '0%';
    
    // Reset checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    
    showScreen('welcome-screen');
}

function createConfetti() {
    const container = document.querySelector('.container');
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
        container.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}