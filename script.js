// Update last modified date
document.addEventListener('DOMContentLoaded', function() {
    const lastUpdated = document.getElementById('last-updated');
    if (lastUpdated) {
        lastUpdated.textContent = new Date().toLocaleDateString();
    }
    
    // Typewriter effect with varied fonts
    const typewriterText = document.getElementById('typewriter-text');
    if (typewriterText) {
        const text = '> JFlower-Tech';
        const fonts = ['Bungee', 'Righteous', 'Audiowide', 'Orbitron', 'Iceland'];
        let index = 0;
        
        function type() {
            if (index < text.length) {
                const span = document.createElement('span');
                span.textContent = text.charAt(index);
                span.style.fontFamily = fonts[index % fonts.length] + ', cursive';
                typewriterText.appendChild(span);
                index++;
                setTimeout(type, 150);
            }
        }
        
        type();
    }
    
    // Create bouncing 3D shapes (like DVD logo screensaver!)
    createBouncingShapes();
    
    // Create cursor trail effect
    createCursorTrail();
    
    // Create digital rain for contact page
    if (document.body.classList.contains('contact-page')) {
        createDigitalRain();
    }
});

// BOUNCING 3D SHAPES (DVD Logo Style!)
function createBouncingShapes() {
    const container = document.createElement('div');
    container.className = 'bouncing-shapes';
    document.body.appendChild(container);
    
    const shapeTypes = ['cube', 'sphere', 'pyramid', 'diamond', 'disc'];
    const numberOfShapes = 5;
    
    for (let i = 0; i < numberOfShapes; i++) {
        createBouncingShape(container, shapeTypes[i]);
    }
}

function createBouncingShape(container, type) {
    const shape = document.createElement('div');
    shape.className = `bouncing-shape ${type}`;
    container.appendChild(shape);
    
    // Random starting position
    let x = Math.random() * (window.innerWidth - 100);
    let y = Math.random() * (window.innerHeight - 100);
    
    // Random velocity
    let velocityX = (Math.random() - 0.5) * 4;
    let velocityY = (Math.random() - 0.5) * 4;
    
    // Make sure velocity isn't too slow
    if (Math.abs(velocityX) < 2) velocityX = velocityX < 0 ? -2 : 2;
    if (Math.abs(velocityY) < 2) velocityY = velocityY < 0 ? -2 : 2;
    
    // Colors to cycle through when hitting edges (like DVD logo!)
    const colors = [
        ['#ff00ff', '#ff66ff', '#cc00cc'],
        ['#00ffff', '#66ffff', '#00cccc'],
        ['#ffff00', '#ffff66', '#cccc00'],
        ['#ff99cc', '#ffccdd', '#ff6699'],
        ['#99ff99', '#ccffcc', '#66cc66']
    ];
    let colorIndex = Math.floor(Math.random() * colors.length);
    
    function animate() {
        // Update position
        x += velocityX;
        y += velocityY;
        
        // Bounce off edges and change color!
        if (x <= 0 || x >= window.innerWidth - 100) {
            velocityX *= -1;
            colorIndex = (colorIndex + 1) % colors.length;
            changeShapeColor(shape, type, colors[colorIndex]);
            
            // Clamp position
            x = x <= 0 ? 0 : window.innerWidth - 100;
        }
        
        if (y <= 0 || y >= window.innerHeight - 100) {
            velocityY *= -1;
            colorIndex = (colorIndex + 1) % colors.length;
            changeShapeColor(shape, type, colors[colorIndex]);
            
            // Clamp position
            y = y <= 0 ? 0 : window.innerHeight - 100;
        }
        
        // Apply position
        shape.style.left = x + 'px';
        shape.style.top = y + 'px';
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

function changeShapeColor(shape, type, colors) {
    if (type === 'cube' || type === 'diamond') {
        shape.style.background = `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%)`;
    } else if (type === 'sphere') {
        shape.style.background = `radial-gradient(circle at 30% 30%, ${colors[0]}, ${colors[2]})`;
    } else if (type === 'pyramid') {
        shape.style.borderBottomColor = colors[0];
    } else if (type === 'disc') {
        shape.style.background = `radial-gradient(circle, ${colors[0]} 0%, ${colors[1]} 25%, ${colors[2]} 50%, ${colors[0]} 75%, ${colors[1]} 100%)`;
    }
}

// CURSOR TRAIL EFFECT (Y2K nostalgia!)
function createCursorTrail() {
    let lastTime = 0;
    const throttleDelay = 50; // ms between trails
    
    document.addEventListener('mousemove', function(e) {
        const currentTime = Date.now();
        if (currentTime - lastTime < throttleDelay) return;
        lastTime = currentTime;
        
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = e.pageX + 'px';
        trail.style.top = e.pageY + 'px';
        
        document.body.appendChild(trail);
        
        setTimeout(() => {
            trail.remove();
        }, 500);
    });
}

// DIGITAL RAIN FOR CONTACT PAGE
function createDigitalRain() {
    const rainContainer = document.createElement('div');
    rainContainer.className = 'digital-rain';
    document.body.appendChild(rainContainer);
    
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ';
    const columns = Math.floor(window.innerWidth / 20);
    
    for (let i = 0; i < columns; i++) {
        createRainColumn(rainContainer, i, characters);
    }
}

function createRainColumn(container, index, characters) {
    const column = document.createElement('div');
    column.className = 'rain-column';
    column.style.left = `${index * 20}px`;
    
    // Random text
    let text = '';
    for (let i = 0; i < 20; i++) {
        text += characters.charAt(Math.floor(Math.random() * characters.length)) + '\n';
    }
    column.textContent = text;
    
    // Random duration (10-25 seconds)
    const duration = 10 + Math.random() * 15;
    column.style.animationDuration = `${duration}s`;
    
    // Random delay
    column.style.animationDelay = `${Math.random() * 5}s`;
    
    container.appendChild(column);
    
    // Recreate after animation
    setTimeout(() => {
        column.remove();
        createRainColumn(container, index, characters);
    }, (duration + 5) * 1000);
}

// Smooth scroll to top
window.scrollTo({ top: 0, behavior: 'smooth' });

// Animation on scroll
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

// Observe animated elements
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.slide-up, .slide-up-delay, .slide-up-delay-2');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });
});

// Handle window resize for bouncing shapes
window.addEventListener('resize', function() {
    // Shapes will automatically adjust based on new window size
});
