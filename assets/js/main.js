// Inicialização da biblioteca AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: false,
    mirror: true
});

// Efeito de digitação para o slogan
const typewriter = document.querySelector('.typewriter-text');
const mainSlogan = "Vista-se com paixão, torça com estilo!";
const phrases = [
    mainSlogan,
    "Qualidade que você merece!",
    "O melhor do esporte está aqui!",
    mainSlogan // Repetimos o slogan principal para que ele apareça mais vezes
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isEnd = false;

function typeWriter() {
    const currentPhrase = phrases[phraseIndex];
    
    if (!isDeleting && charIndex <= currentPhrase.length) {
        typewriter.textContent = currentPhrase.substring(0, charIndex);
        charIndex++;
        if (charIndex > currentPhrase.length) {
            isEnd = true;
            setTimeout(() => {
                isDeleting = true;
                typeWriter();
            }, currentPhrase === mainSlogan ? 4000 : 2000);
        } else {
            setTimeout(typeWriter, 75); // Velocidade de digitação mais suave
        }
    } else if (isDeleting && charIndex >= 0) {
        typewriter.textContent = currentPhrase.substring(0, charIndex);
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
            phraseIndex++;
            if (phraseIndex === phrases.length) {
                phraseIndex = 0;
            }
            setTimeout(typeWriter, 500); // Pausa antes de começar nova frase
        } else {
            setTimeout(typeWriter, 40); // Velocidade de apagar mais rápida
        }
    }
}

// Inicia o efeito após a animação da logo
setTimeout(typeWriter, 2000);

// Efeito de Parallax
document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero');
    const layers = document.querySelectorAll('.parallax-layer');

    // Função para atualizar o parallax
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const limit = hero.offsetTop + hero.offsetHeight;

        if (scrolled <= limit) {
            layers.forEach(layer => {
                const speed = layer.getAttribute('data-speed');
                const yPos = -(scrolled * speed);
                layer.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });
        }
    }

    // Atualiza o parallax no scroll
    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateParallax);
    });

    // Atualiza o parallax no movimento do mouse
    hero.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        layers.forEach(layer => {
            const speed = layer.getAttribute('data-speed');
            const xPos = (mouseX - 0.5) * 50 * speed;
            const yPos = (mouseY - 0.5) * 50 * speed;
            
            layer.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
        });
    });

    // Reset quando o mouse sai da área
    hero.addEventListener('mouseleave', () => {
        layers.forEach(layer => {
            layer.style.transform = 'translate3d(0, 0, 0)';
        });
    });
});

// Loading suave de imagens
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
        
        if (img.complete) {
            img.classList.add('loaded');
        }
    });
});

// Efeito de Scroll suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Manipulação do formulário de contato
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formMessage = this.querySelector('.form-message');
    
    // Simula envio do formulário
    formMessage.style.display = 'block';
    formMessage.className = 'form-message success';
    formMessage.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
    
    // Limpa o formulário
    this.reset();
    
    // Remove a mensagem após 5 segundos
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
});

// Inicializar efeito tilt nos cards de lendas
VanillaTilt.init(document.querySelectorAll(".legend-card"), {
    max: 5,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
    scale: 1.02
});

// Desativar tilt em dispositivos móveis
if (window.innerWidth <= 768) {
    const cards = document.querySelectorAll(".legend-card");
    cards.forEach(card => {
        card.vanillaTilt.destroy();
    });
}

// Botão Voltar ao Topo
const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Função para atualizar o menu de navegação com base no scroll
function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + window.innerHeight / 3;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const menuItem = document.querySelector(`.floating-nav a[href="#${sectionId}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active de todos os links
            document.querySelectorAll('.floating-nav a').forEach(item => {
                item.classList.remove('active');
            });
            // Adiciona active ao link atual
            if (menuItem) {
                menuItem.classList.add('active');
            }
        }
    });
}

// Adiciona o listener de scroll
window.addEventListener('scroll', updateActiveSection);

// Chama a função uma vez quando a página carrega
document.addEventListener('DOMContentLoaded', updateActiveSection);

// Scroll suave ao clicar nos links do menu
document.querySelectorAll('.floating-nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});