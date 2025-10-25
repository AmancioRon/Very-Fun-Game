// Game state
const gameState = {
    currentScreen: 'welcome-screen',
    buttonClicks: 0,
    checkedBoxes: 0,
    memoryLevel: 1,
    memorySequence: [],
    playerSequence: [],
    memoryTimer: 30,
    totalGames: 18,
    completedGames: 0
};

// DOM Elements
const screens = document.querySelectorAll('.screen');
const startBtn = document.getElementById('start-btn');
const runawayBtn = document.getElementById('runaway-btn');
const checkboxContainer = document.getElementById('checkbox-container');
const memoryGrid = document.getElementById('memory-grid');
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
const finalMessage = "SURPRISE! You just got rage baited! 😂<br><br>This \"easy game\" was designed to be frustrating! How long did it take you to realize it wasn't actually easy?<br><br>Share this with friends to see how they handle the \"simple tasks\"!";

// Customizable final image - CHANGE THIS URL!
const finalImageUrl = "https://i.imgur.com/6GqS6yO.png"; // Replace with your image URL

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    createFloatingElements();
    initButtonGame();
    initCheckboxGame();
    initMemoryGame();
    initProgressBarGame();
    initCaptchaGame();
    initDownloadGame();
    initTargetGame();
    initTermsGame();
    initPasswordGame();
    initErrorGame();
    initColorGame();
    initMazeGame();
    initSimonGame();
    initSocialGame();
    initCookieGame();
    initAIGame();
    initUpdateGame();
    initDifferenceGame();
    setupEventListeners();
    document.getElementById('final-image').src = finalImageUrl;
});

// Create floating elements
function createFloatingElements() {
    const container = document.getElementById('floating-elements');
    const elements = ['❤️', '⭐', '😊', '🎈', '🎮', '🎯', '🎨'];
    
    for (let i = 0; i < 20; i++) {
        const element = document.createElement('div');
        element.className = 'floating';
        
        // Random properties
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

// Utility Functions
function showScreen(screenId) {
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    gameState.currentScreen = screenId;
}

function nextGame() {
    gameState.completedGames++;
    
    const gameScreens = [
        'button-game-screen',
        'checkbox-screen',
        'memory-screen',
        'progress-bar-screen',
        'captcha-screen',
        'download-screen',
        'target-screen',
        'terms-screen',
        'password-screen',
        'error-screen',
        'color-screen',
        'maze-screen',
        'simon-screen',
        'social-screen',
        'cookie-screen',
        'ai-screen',
        'update-screen',
        'difference-screen'
    ];
    
    if (gameState.completedGames >= gameState.totalGames) {
        showScreen('final-image-screen');
        createConfetti();
    } else {
        showScreen(gameScreens[gameState.completedGames]);
    }
}

function resetGame() {
    gameState.buttonClicks = 0;
    gameState.checkedBoxes = 0;
    gameState.memoryLevel = 1;
    gameState.completedGames = 0;
    
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

// Game 1: Button Game - 20 clicks
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
    buttonProgress.style.width = `${(gameState.buttonClicks / 20) * 100}%`;
    
    if (gameState.buttonClicks >= 20) {
        nextGame();
    }
}

// Game 2: Checkbox Game - 50 boxes
function initCheckboxGame() {
    for (let i = 0; i < 50; i++) {
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
    checkboxProgress.style.width = `${(gameState.checkedBoxes / 50) * 100}%`;
    
    if (gameState.checkedBoxes >= 50) {
        nextGame();
    }
}

// Game 3: Memory Game - 7 levels
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
        
        if (gameState.memoryLevel > 7) {
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
        memoryProgress.style.width = `${(gameState.memoryLevel - 1) * 14.28}%`;
        
        if (gameState.memoryLevel > 7) {
            // Game completed
            setTimeout(() => {
                nextGame();
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

// Game 4: Never-Ending Progress Bar
function initProgressBarGame() {
    const fakeProgress = document.getElementById('fake-progress');
    const progressText = document.getElementById('progress-text');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 5;
        if (progress > 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                nextGame();
            }, 1000);
        }
        fakeProgress.style.width = `${progress}%`;
        progressText.textContent = `Loading... ${Math.floor(progress)}%`;
        
        // Randomly reset progress to make it frustrating
        if (progress > 80 && Math.random() > 0.7) {
            progress = 0;
            progressText.textContent = "Connection lost. Restarting...";
        }
    }, 200);
}

// Game 5: Impossible Captcha
function initCaptchaGame() {
    const captchaContainer = document.getElementById('captcha-container');
    const verifyBtn = document.getElementById('verify-captcha');
    const captchaMessage = document.getElementById('captcha-message');
    
    // Generate random captcha images
    for (let i = 0; i < 9; i++) {
        const image = document.createElement('div');
        image.className = 'captcha-image';
        image.style.background = `hsl(${Math.random() * 360}, 70%, 80%)`;
        image.addEventListener('click', () => {
            image.classList.toggle('selected');
        });
        captchaContainer.appendChild(image);
    }
    
    verifyBtn.addEventListener('click', () => {
        // Always fail the first few attempts
        if (Math.random() > 0.3) {
            captchaMessage.textContent = "Verification failed. Please try again.";
            // Shuffle images
            Array.from(captchaContainer.children).forEach(child => {
                child.style.background = `hsl(${Math.random() * 360}, 70%, 80%)`;
                child.classList.remove('selected');
            });
        } else {
            captchaMessage.textContent = "Verification successful!";
            setTimeout(() => {
                nextGame();
            }, 1000);
        }
    });
}

// Game 6: Fake Download
function initDownloadGame() {
    const downloadBtn = document.getElementById('download-btn');
    const virusScan = document.getElementById('virus-scan');
    
    downloadBtn.addEventListener('click', () => {
        downloadBtn.disabled = true;
        virusScan.style.display = 'block';
        
        setTimeout(() => {
            virusScan.querySelector('p').textContent = "Scan complete! No threats found.";
            setTimeout(() => {
                nextGame();
            }, 1000);
        }, 5000);
    });
}

// Game 7: Moving Target Game
function initTargetGame() {
    const targetContainer = document.getElementById('target-container');
    const targetTimer = document.getElementById('target-timer');
    const targetProgress = document.getElementById('target-progress');
    const targetCount = document.getElementById('target-count');
    
    let targetsClicked = 0;
    let timeLeft = 10;
    
    // Create targets
    for (let i = 0; i < 15; i++) {
        createTarget();
    }
    
    const timer = setInterval(() => {
        timeLeft--;
        targetTimer.textContent = `Time: ${timeLeft}s`;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Time's up! The targets have reset.");
            resetTargetGame();
        }
        
        if (targetsClicked >= 15) {
            clearInterval(timer);
            setTimeout(() => {
                nextGame();
            }, 1000);
        }
    }, 1000);
    
    function createTarget() {
        const target = document.createElement('div');
        target.className = 'target';
        target.style.left = `${Math.random() * 90}%`;
        target.style.top = `${Math.random() * 90}%`;
        
        target.addEventListener('click', () => {
            targetsClicked++;
            targetCount.textContent = targetsClicked;
            targetProgress.style.width = `${(targetsClicked / 15) * 100}%`;
            target.remove();
            createTarget(); // Create new target
        });
        
        targetContainer.appendChild(target);
        
        // Move target randomly
        setInterval(() => {
            target.style.left = `${Math.random() * 90}%`;
            target.style.top = `${Math.random() * 90}%`;
        }, 800);
    }
    
    function resetTargetGame() {
        targetsClicked = 0;
        timeLeft = 10;
        targetCount.textContent = '0';
        targetProgress.style.width = '0%';
        targetContainer.innerHTML = '';
        
        for (let i = 0; i < 15; i++) {
            createTarget();
        }
    }
}

// Game 8: Agree to Terms
function initTermsGame() {
    const termsContent = document.getElementById('terms-content');
    const agreeCheckbox = document.getElementById('agree-checkbox');
    const agreeBtn = document.getElementById('agree-btn');
    
    // Generate ridiculously long terms
    for (let i = 0; i < 100; i++) {
        const p = document.createElement('p');
        p.textContent = `Term ${i+1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`;
        termsContent.appendChild(p);
    }
    
    agreeCheckbox.addEventListener('change', () => {
        agreeBtn.disabled = !agreeCheckbox.checked;
    });
    
    agreeBtn.addEventListener('click', () => {
        // Scroll to bottom to make sure they actually read it
        if (termsContent.scrollTop < termsContent.scrollHeight - termsContent.clientHeight - 100) {
            alert("Please read all terms before agreeing.");
            termsContent.scrollTop = termsContent.scrollHeight;
            return;
        }
        
        nextGame();
    });
}

// Game 9: Password Creation Hell
function initPasswordGame() {
    const passwordRules = document.getElementById('password-rules');
    const passwordField = document.getElementById('password-field');
    const submitBtn = document.getElementById('submit-password');
    const passwordMessage = document.getElementById('password-message');
    
    const rules = [
        "At least 8 characters",
        "At least one uppercase letter",
        "At least one lowercase letter",
        "At least one number",
        "At least one special character",
        "No repeating characters",
        "No common words",
        "Must contain your birth year",
        "Must contain a prime number"
    ];
    
    rules.forEach(rule => {
        const p = document.createElement('p');
        p.textContent = `• ${rule}`;
        passwordRules.appendChild(p);
    });
    
    submitBtn.addEventListener('click', () => {
        const password = passwordField.value;
        
        // Always find something wrong with the password
        if (password.length < 12) {
            passwordMessage.textContent = "Password must be at least 12 characters long.";
        } else if (!/(?=.*[A-Z])/.test(password)) {
            passwordMessage.textContent = "Password must contain at least one uppercase letter.";
        } else if (!/(?=.*[a-z])/.test(password)) {
            passwordMessage.textContent = "Password must contain at least one lowercase letter.";
        } else if (!/(?=.*\d)/.test(password)) {
            passwordMessage.textContent = "Password must contain at least one number.";
        } else if (!/(?=.*[!@#$%^&*])/.test(password)) {
            passwordMessage.textContent = "Password must contain at least one special character.";
        } else if (/(.)\1/.test(password)) {
            passwordMessage.textMessage.textContent = "Password cannot contain repeating characters.";
        } else if (password.includes("password") || password.includes("123")) {
            passwordMessage.textContent = "Password contains common words or patterns.";
        } else {
            passwordMessage.textContent = "Password accepted!";
            setTimeout(() => {
                nextGame();
            }, 1000);
        }
        
        // Clear the field for next attempt
        passwordField.value = "";
    });
}

// Game 10: Fake Error Pop-up
function initErrorGame() {
    const errorContainer = document.getElementById('error-container');
    const errorCount = document.getElementById('error-count');
    
    let errorsRemaining = 5;
    
    // Create error windows
    for (let i = 0; i < 5; i++) {
        createErrorWindow();
    }
    
    function createErrorWindow() {
        const error = document.createElement('div');
        error.className = 'error-window';
        error.style.left = `${Math.random() * 70}%`;
        error.style.top = `${Math.random() * 70}%`;
        
        error.innerHTML = `
            <div class="error-title">Error</div>
            <p>An unexpected error has occurred.</p>
            <button class="error-close">×</button>
        `;
        
        const closeBtn = error.querySelector('.error-close');
        closeBtn.addEventListener('click', () => {
            error.remove();
            errorsRemaining--;
            errorCount.textContent = errorsRemaining;
            
            if (errorsRemaining <= 0) {
                setTimeout(() => {
                    nextGame();
                }, 1000);
            } else {
                // Create new error when one is closed
                setTimeout(createErrorWindow, 500);
            }
        });
        
        errorContainer.appendChild(error);
    }
}

// Game 11: Color Matching Madness
function initColorGame() {
    const colorTarget = document.getElementById('color-target');
    const colorResult = document.getElementById('color-result');
    const redSlider = document.getElementById('red-slider');
    const greenSlider = document.getElementById('green-slider');
    const blueSlider = document.getElementById('blue-slider');
    const redValue = document.getElementById('red-value');
    const greenValue = document.getElementById('green-value');
    const blueValue = document.getElementById('blue-value');
    const checkBtn = document.getElementById('check-color');
    const colorMessage = document.getElementById('color-message');
    
    // Generate random target color
    const targetRed = Math.floor(Math.random() * 256);
    const targetGreen = Math.floor(Math.random() * 256);
    const targetBlue = Math.floor(Math.random() * 256);
    
    colorTarget.style.background = `rgb(${targetRed}, ${targetGreen}, ${targetBlue})`;
    
    function updateColor() {
        const red = redSlider.value;
        const green = greenSlider.value;
        const blue = blueSlider.value;
        
        redValue.textContent = red;
        greenValue.textContent = green;
        blueValue.textContent = blue;
        
        colorResult.style.background = `rgb(${red}, ${green}, ${blue})`;
    }
    
    redSlider.addEventListener('input', updateColor);
    greenSlider.addEventListener('input', updateColor);
    blueSlider.addEventListener('input', updateColor);
    
    checkBtn.addEventListener('click', () => {
        const red = parseInt(redSlider.value);
        const green = parseInt(greenSlider.value);
        const blue = parseInt(blueSlider.value);
        
        const difference = Math.abs(red - targetRed) + Math.abs(green - targetGreen) + Math.abs(blue - targetBlue);
        
        if (difference < 10) {
            colorMessage.textContent = "Perfect match!";
            setTimeout(() => {
                nextGame();
            }, 1000);
        } else {
            colorMessage.textContent = `Not close enough! Difference: ${difference}`;
            // Change target color slightly to make it harder
            colorTarget.style.background = `rgb(${targetRed + 5}, ${targetGreen + 5}, ${targetBlue + 5})`;
        }
    });
    
    updateColor();
}

// Game 12: Maze of Doom
function initMazeGame() {
    const mazeContainer = document.getElementById('maze-container');
    const mazeUp = document.getElementById('maze-up');
    const mazeDown = document.getElementById('maze-down');
    const mazeLeft = document.getElementById('maze-left');
    const mazeRight = document.getElementById('maze-right');
    
    // Simple maze layout (0 = path, 1 = wall)
    const maze = [
        [1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,1,0,0,0,0,1],
        [1,1,1,0,1,0,1,1,0,1],
        [1,0,0,0,0,0,1,0,0,1],
        [1,0,1,1,1,1,1,0,1,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,0,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,1,1,1,1,1,1,0,1],
        [1,1,1,1,1,1,1,1,1,1]
    ];
    
    let playerX = 1;
    let playerY = 1;
    
    // Render maze
    function renderMaze() {
        mazeContainer.innerHTML = '';
        for (let y = 0; y < maze.length; y++) {
            const row = document.createElement('div');
            row.className = 'maze-row';
            for (let x = 0; x < maze[y].length; x++) {
                const cell = document.createElement('div');
                cell.className = 'maze-cell';
                
                if (maze[y][x] === 1) {
                    cell.classList.add('maze-wall');
                } else if (x === playerX && y === playerY) {
                    cell.classList.add('maze-player');
                } else if (x === 8 && y === 8) {
                    cell.classList.add('maze-exit');
                }
                
                row.appendChild(cell);
            }
            mazeContainer.appendChild(row);
        }
    }
    
    // Move player
    function movePlayer(dx, dy) {
        const newX = playerX + dx;
        const newY = playerY + dy;
        
        if (newX >= 0 && newX < maze[0].length && newY >= 0 && newY < maze.length) {
            if (maze[newY][newX] === 0) {
                playerX = newX;
                playerY = newY;
                renderMaze();
                
                // Check if player reached exit
                if (playerX === 8 && playerY === 8) {
                    setTimeout(() => {
                        nextGame();
                    }, 1000);
                }
            }
        }
    }
    
    mazeUp.addEventListener('click', () => movePlayer(0, -1));
    mazeDown.addEventListener('click', () => movePlayer(0, 1));
    mazeLeft.addEventListener('click', () => movePlayer(-1, 0));
    mazeRight.addEventListener('click', () => movePlayer(1, 0));
    
    // Also allow keyboard controls
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowUp': movePlayer(0, -1); break;
            case 'ArrowDown': movePlayer(0, 1); break;
            case 'ArrowLeft': movePlayer(-1, 0); break;
            case 'ArrowRight': movePlayer(1, 0); break;
        }
    });
    
    renderMaze();
}

// Game 13: Simon Says Chaos
function initSimonGame() {
    const simonContainer = document.getElementById('simon-container');
    const simonProgress = document.getElementById('simon-progress');
    const simonRound = document.getElementById('simon-round');
    
    const buttons = Array.from(simonContainer.children);
    let sequence = [];
    let playerSequence = [];
    let round = 1;
    
    // Start the game
    nextRound();
    
    function nextRound() {
        playerSequence = [];
        simonRound.textContent = round;
        simonProgress.style.width = `${((round - 1) / 5) * 100}%`;
        
        // Add one more color to sequence
        const randomColor = ['red', 'blue', 'green', 'yellow'][Math.floor(Math.random() * 4)];
        sequence.push(randomColor);
        
        // Show sequence
        showSequence();
    }
    
    function showSequence() {
        let i = 0;
        const interval = setInterval(() => {
            if (i >= sequence.length) {
                clearInterval(interval);
                enablePlayerInput();
                return;
            }
            
            const color = sequence[i];
            const button = buttons.find(btn => btn.dataset.color === color);
            button.classList.add('active');
            
            setTimeout(() => {
                button.classList.remove('active');
            }, 500);
            
            i++;
        }, 800);
    }
    
    function enablePlayerInput() {
        buttons.forEach(button => {
            button.style.pointerEvents = 'auto';
            button.addEventListener('click', handlePlayerClick);
        });
    }
    
    function disablePlayerInput() {
        buttons.forEach(button => {
            button.style.pointerEvents = 'none';
            button.removeEventListener('click', handlePlayerClick);
        });
    }
    
    function handlePlayerClick(e) {
        const color = e.target.dataset.color;
        playerSequence.push(color);
        
        e.target.classList.add('active');
        setTimeout(() => {
            e.target.classList.remove('active');
        }, 300);
        
        // Check if sequence is correct
        for (let i = 0; i < playerSequence.length; i++) {
            if (playerSequence[i] !== sequence[i]) {
                // Wrong sequence
                disablePlayerInput();
                alert("Wrong sequence! Starting over.");
                sequence = [];
                round = 1;
                setTimeout(nextRound, 1000);
                return;
            }
        }
        
        // Check if round is complete
        if (playerSequence.length === sequence.length) {
            disablePlayerInput();
            round++;
            
            if (round > 5) {
                // Game completed
                setTimeout(() => {
                    nextGame();
                }, 1000);
            } else {
                setTimeout(nextRound, 1000);
            }
        }
    }
}

// Game 14: Fake Social Media
function initSocialGame() {
    const socialBtns = document.querySelectorAll('.social-btn');
    const fakeLoginBtn = document.getElementById('fake-login-btn');
    const skipBtn = document.getElementById('skip-social');
    
    socialBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            alert("This would normally share to social media, but we'll skip it for now.");
        });
    });
    
    fakeLoginBtn.addEventListener('click', () => {
        alert("This would normally log you in, but we'll skip it for now.");
    });
    
    skipBtn.addEventListener('click', () => {
        // Make them click multiple times
        if (Math.random() > 0.5) {
            alert("Are you sure? Sharing helps support the developers!");
            return;
        }
        nextGame();
    });
}

// Game 15: Cookie Clicker Troll
function initCookieGame() {
    const cookie = document.getElementById('cookie');
    const cookieTimer = document.getElementById('cookie-timer');
    const cookieCount = document.getElementById('cookie-count');
    const upgradeBtns = document.querySelectorAll('.upgrade-btn');
    
    let cookies = 0;
    let timeLeft = 10;
    
    cookie.addEventListener('click', () => {
        cookies++;
        cookieCount.textContent = cookies;
        
        // Move cookie randomly sometimes
        if (Math.random() > 0.7) {
            cookie.style.transform = `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`;
        }
    });
    
    const timer = setInterval(() => {
        timeLeft--;
        cookieTimer.textContent = `Time: ${timeLeft}s`;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            // Require a certain number of cookies
            if (cookies >= 30) {
                setTimeout(() => {
                    nextGame();
                }, 1000);
            } else {
                alert(`You only got ${cookies} cookies! You need at least 30. Try again!`);
                resetCookieGame();
            }
        }
    }, 1000);
    
    upgradeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (!btn.disabled) {
                alert("Upgrade purchased! (Just kidding, this is a rage bait game)");
            }
        });
    });
    
    function resetCookieGame() {
        cookies = 0;
        timeLeft = 10;
        cookieCount.textContent = '0';
        cookie.style.transform = 'translate(0, 0)';
    }
}

// Game 16: Unbeatable AI
function initAIGame() {
    const rpsBtns = document.querySelectorAll('.rps-btn');
    const playerChoice = document.getElementById('player-choice');
    const aiChoice = document.getElementById('ai-choice');
    const rpsMessage = document.getElementById('rps-message');
    const rpsProgress = document.getElementById('rps-progress');
    const rpsWins = document.getElementById('rps-wins');
    
    let wins = 0;
    const choices = ['rock', 'paper', 'scissors'];
    
    rpsBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const player = btn.dataset.choice;
            // AI always chooses to beat the player
            let ai;
            if (player === 'rock') ai = 'paper';
            else if (player === 'paper') ai = 'scissors';
            else ai = 'rock';
            
            playerChoice.textContent = getEmoji(player);
            aiChoice.textContent = getEmoji(ai);
            
            // Sometimes let the player win to give false hope
            if (Math.random() > 0.8) {
                rpsMessage.textContent = "You win this round!";
                wins++;
                rpsWins.textContent = wins;
                rpsProgress.style.width = `${(wins / 3) * 100}%`;
                
                if (wins >= 3) {
                    setTimeout(() => {
                        nextGame();
                    }, 1000);
                }
            } else {
                rpsMessage.textContent = "AI wins this round!";
            }
        });
    });
    
    function getEmoji(choice) {
        if (choice === 'rock') return '✊';
        if (choice === 'paper') return '✋';
        if (choice === 'scissors') return '✌️';
    }
}

// Game 17: Fake System Update
function initUpdateGame() {
    const updateBar = document.getElementById('update-bar');
    const updatePercent = document.getElementById('update-percent');
    
    let progress = 0;
    
    const interval = setInterval(() => {
        progress += Math.random() * 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                nextGame();
            }, 1000);
        }
        updateBar.style.width = `${progress}%`;
        updatePercent.textContent = `${Math.floor(progress)}%`;
        
        // Randomly get stuck
        if (progress > 80 && Math.random() > 0.9) {
            clearInterval(interval);
            setTimeout(() => {
                // Restart progress
                progress = 0;
                updateBar.style.width = '0%';
                updatePercent.textContent = '0%';
                initUpdateGame();
            }, 3000);
        }
    }, 500);
}

// Game 18: Find the Difference
function initDifferenceGame() {
    const imageLeft = document.getElementById('image-left');
    const imageRight = document.getElementById('image-right');
    const differenceProgress = document.getElementById('difference-progress');
    const differenceCount = document.getElementById('difference-count');
    
    let differencesFound = 0;
    
    // Create 5 random difference points
    for (let i = 0; i < 5; i++) {
        const x = Math.random() * 80 + 10;
        const y = Math.random() * 80 + 10;
        
        const dotLeft = document.createElement('div');
        dotLeft.className = 'difference-dot';
        dotLeft.style.left = `${x}%`;
        dotLeft.style.top = `${y}%`;
        dotLeft.style.display = 'none'; // Hidden until found
        
        const dotRight = document.createElement('div');
        dotRight.className = 'difference-dot';
        dotRight.style.left = `${x}%`;
        dotRight.style.top = `${y}%`;
        
        dotRight.addEventListener('click', () => {
            differencesFound++;
            differenceCount.textContent = differencesFound;
            differenceProgress.style.width = `${(differencesFound / 5) * 100}%`;
            dotRight.style.display = 'none';
            dotLeft.style.display = 'block';
            
            if (differencesFound >= 5) {
                setTimeout(() => {
                    nextGame();
                }, 1000);
            }
        });
        
        imageLeft.appendChild(dotLeft);
        imageRight.appendChild(dotRight);
    }
}