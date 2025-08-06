window.onload = function() {
    
    const canvas = document.getElementById("financial-icons");
    const g = canvas.getContext("2d");
    
    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const iconImagePaths = [
        //Bitcoin
        'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M18.763 10.236c.28-1.895-1.155-2.905-3.131-3.591l.64-2.553-1.56-.389-.623 2.49-1.245-.297.631-2.508L11.915 3l-.641 2.562-.992-.234v-.01l-2.157-.54-.415 1.668s1.155.272 1.137.28c.631.163.74.578.722.903l-.722 2.923.162.054-.171-.036-1.02 4.087c-.072.19-.27.478-.712.36.018.028-1.128-.27-1.128-.27l-.776 1.778 2.03.505 1.11.289-.65 2.59 1.56.387.632-2.562 1.254.324-.64 2.554 1.56.388.641-2.59c2.662.505 4.665.308 5.505-2.102.676-1.94-.037-3.05-1.435-3.79 1.02-.225 1.786-.902 1.985-2.282zm-3.564 4.999c-.479 1.94-3.745.884-4.8.63l.857-3.436c1.055.27 4.448.784 3.943 2.796zm.478-5.026c-.433 1.76-3.158.866-4.033.65l.775-3.113c.885.217 3.718.632 3.258 2.463"/></svg>'),
        
        //XRP
        'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M18.36 4.125h2.605l-5.42 5.781A4.92 4.92 0 0 1 12 11.443a4.9 4.9 0 0 1-3.546-1.537L3.026 4.125H5.64l4.112 4.429c1.204 1.277 3.291 1.277 4.496 0zM5.604 19.865H3l5.453-5.763a4.93 4.93 0 0 1 3.55-1.537 4.92 4.92 0 0 1 3.552 1.538L21 19.875h-2.605l-4.138-4.411c-1.205-1.277-3.291-1.277-4.496 0z"/></svg>'),
        
        //Ethereum
        'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M12 3v6.65l5.625 2.516zm0 0-5.625 9.166L12 9.651zm0 13.477v4.522l5.625-7.784zM12 21v-4.523l-5.625-3.262z"/><path fill="#fff" d="m12 15.43 5.625-3.263L12 9.65zm-5.625-3.263L12 15.429V9.651z"/><path fill="#fff" fill-rule="evenodd" d="m12 15.429-5.625-3.263L12 3l5.625 9.166zM6.749 11.9l5.161-8.41v6.115zm-.077.23 5.238-2.327v5.364zm5.418-2.327v5.364l5.233-3.038zm0-.198 5.16 2.295-5.16-8.41z" clip-rule="evenodd"/><path fill="#fff" fill-rule="evenodd" d="M12 16.406 6.375 13.21 12 21l5.625-7.79zm-4.995-2.633 4.905 2.79v4.005zm5.085 2.79v4.005l4.905-6.795z" clip-rule="evenodd"/></svg>'),
        
        //Solana
        'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M18.413 7.901a.62.62 0 0 1-.411.164H3.58c-.512 0-.77-.585-.416-.928l2.368-2.284a.6.6 0 0 1 .41-.169h14.479c.517 0 .77.59.41.934zm0 11.257a.6.6 0 0 1-.411.158H3.58c-.512 0-.77-.58-.416-.923l2.368-2.289a.6.6 0 0 1 .41-.163h14.479c.517 0 .77.585.41.928zm0-8.685a.6.6 0 0 0-.411-.157H3.58c-.512 0-.77.58-.416.922l2.368 2.29a.62.62 0 0 0 .41.163h14.479c.517 0 .77-.585.41-.928z"/></svg>'),
        
        //Litecoin
        'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="m5.734 15.611-1.609.63.776-3.116 1.62-.652L8.86 3h5.772l-1.71 6.975 1.586-.642-.765 3.083-1.598.653-.956 4.074h8.685L18.895 21H4.406z"/></svg>'),
        
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