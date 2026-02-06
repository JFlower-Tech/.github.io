// Update last modified date
document.addEventListener('DOMContentLoaded', function() {
    const lastUpdated = document.getElementById('last-updated');
    if (lastUpdated) {
        lastUpdated.textContent = new Date().toLocaleDateString();
    }
    
    // Typewriter effect for home page
    const typewriterText = document.getElementById('typewriter-text');
    if (typewriterText) {
        const text = '> JFlower-Tech.exe';
        let index = 0;
        
        function type() {
            if (index < text.length) {
                typewriterText.textContent += text.charAt(index);
                index++;
                setTimeout(type, 150);
            }
        }
        
        type();
    }
    
    // Create Matrix-style code rain
    createCodeRain();
});

// Matrix/Code Rain Effect
function createCodeRain() {
    const codeRainContainer = document.createElement('div');
    codeRainContainer.className = 'code-rain';
    document.body.appendChild(codeRainContainer);
    
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>{}[]();=+-*/%$#@!&|';
    const codeSnippets = [
        'function()',
        'const x =',
        'if(true)',
        'return 0;',
        'for(i=0)',
        'while(1)',
        '{ code }',
        'let data',
        'async =>',
        'import *',
        'class {}',
        'new Date',
        '=> void',
        'try{}',
        'catch(e)',
        'console.',
        'var foo',
        'null;',
        'true &&',
        'false ||'
    ];
    
    // Create 15 columns of falling code
    for (let i = 0; i < 15; i++) {
        createColumn(i);
    }
    
    function createColumn(index) {
        const column = document.createElement('div');
        column.className = 'code-column';
        column.style.left = `${index * 7}%`;
        
        // Random code snippet or characters
        let text = '';
        const useSnippet = Math.random() > 0.5;
        
        if (useSnippet) {
            // Use actual code snippets
            for (let i = 0; i < 10; i++) {
                text += codeSnippets[Math.floor(Math.random() * codeSnippets.length)] + '\n';
            }
        } else {
            // Use random characters
            for (let i = 0; i < 30; i++) {
                text += characters.charAt(Math.floor(Math.random() * characters.length));
            }
        }
        
        column.textContent = text;
        
        // Random animation duration (15-30 seconds)
        const duration = 15 + Math.random() * 15;
        column.style.animationDuration = `${duration}s`;
        
        // Random delay
        column.style.animationDelay = `${Math.random() * 5}s`;
        
        // Random colors (green, cyan, or pink with low opacity)
        const colors = [
            'rgba(0, 255, 0, 0.3)',
            'rgba(0, 255, 255, 0.3)',
            'rgba(255, 0, 255, 0.3)'
        ];
        column.style.color = colors[Math.floor(Math.random() * colors.length)];
        
        codeRainContainer.appendChild(column);
        
        // Recreate column after animation ends
        setTimeout(() => {
            column.remove();
            createColumn(index);
        }, duration * 1000);
    }
}

// Smooth scroll to top on page load
window.scrollTo({ top: 0, behavior: 'smooth' });

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all elements with slide-up classes
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.slide-up, .slide-up-delay, .slide-up-delay-2');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });
});

// Add some retro cursor effects
document.addEventListener('mousemove', function(e) {
    // Create occasional sparkle effect (not too much, to keep it professional)
    if (Math.random() > 0.97) {
        createSparkle(e.pageX, e.pageY);
    }
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'absolute';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.width = '4px';
    sparkle.style.height = '4px';
    sparkle.style.background = ['#ff00ff', '#00ffff', '#ffff00'][Math.floor(Math.random() * 3)];
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '9999';
    sparkle.style.animation = 'sparkleAnim 0.6s ease-out';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 600);
}

// Add sparkle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleAnim {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(3);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
