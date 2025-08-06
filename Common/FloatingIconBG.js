window.onload = function() {
    
    const canvas = document.getElementById("financial-icons");
    const g = canvas.getContext("2d");
    
    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const iconImagePaths = [

    ];

    const iconImages = [];
    let iconsLoaded = 0;
    const baseDensity = 0.00002; // Adjust this value to get more or fewer icons
    let numIcons = Math.floor((W * H) * baseDensity);
    
    const minIcons = 18; 
    numIcons = Math.max(numIcons, minIcons);
    
    iconImagePaths.forEach(path => {
        const img = new Image();
        img.src = path;
        img.onload = () => {
            iconsLoaded++;
            if (iconsLoaded === iconImagePaths.length) {
                initializeParticles();
                setInterval(draw, 30);
            }
        };
        iconImages.push(img);
    });
    let particles = [];
    
    function Particle() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = 20 + Math.random() * 25;
        this.img = iconImages[Math.floor(Math.random() * iconImages.length)];
    }

    function initializeParticles() {
        if (iconImages.length > 0)
            for(let i = 0; i < numIcons; i++)
                particles.push(new Particle());
    }

    function draw() {
        g.fillStyle = '#141414ff';
        g.fillRect(0, 0, W, H);
        g.globalAlpha = 0.4; 

        for(let j = 0; j < particles.length; j++) {
            const p = particles[j];
            
            g.drawImage(p.img, p.x, p.y, p.size, p.size);
            p.x += p.vx;
            p.y += p.vy;
            
            if(p.x < -p.size) p.x = W;
            if(p.y < -p.size) p.y = H;
            if(p.x > W) p.x = -p.size;
            if(p.y > H) p.y = -p.size;
        }
        g.globalAlpha = 1; 
    }

    window.addEventListener('resize', () => {
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = W;
        canvas.height = H;
    });
};