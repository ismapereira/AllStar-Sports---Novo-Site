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
    let ticking = false;
    let lastScrollY = window.pageYOffset;
    let rafId = null;

    // Função para suavizar o movimento
    function lerp(start, end, factor) {
        return start + (end - start) * factor;
    }

    // Função para atualizar o parallax
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const limit = hero.offsetTop + hero.offsetHeight;

        if (scrolled <= limit) {
            layers.forEach(layer => {
                const speed = parseFloat(layer.getAttribute('data-speed'));
                const yPos = -(scrolled * speed);
                
                // Aplicar transformação com suavização
                const currentTransform = layer.style.transform;
                const currentY = currentTransform ? parseFloat(currentTransform.match(/-?\d+\.?\d*/)) || 0 : 0;
                const targetY = yPos;
                const smoothY = lerp(currentY, targetY, 0.1);
                
                layer.style.transform = `translate3d(0, ${smoothY}px, 0)`;
            });
        }

        ticking = false;
    }

    // Otimizar o scroll com requestAnimationFrame
    function onScroll() {
        lastScrollY = window.pageYOffset;
        if (!ticking) {
            rafId = requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    }

    // Atualizar parallax no scroll com throttling
    window.addEventListener('scroll', onScroll, { passive: true });

    // Movimento suave no mouse
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    hero.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
    });

    function updateMouseParallax() {
        // Suavizar movimento do mouse
        currentX = lerp(currentX, mouseX, 0.05);
        currentY = lerp(currentY, mouseY, 0.05);

        layers.forEach(layer => {
            const speed = parseFloat(layer.getAttribute('data-speed'));
            const xPos = currentX * speed;
            const yPos = currentY * speed;
            
            layer.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
        });

        requestAnimationFrame(updateMouseParallax);
    }

    updateMouseParallax();

    // Limpar animation frame quando o mouse sai
    hero.addEventListener('mouseleave', () => {
        mouseX = 0;
        mouseY = 0;
    });
});

// Criar partículas de fundo
document.addEventListener('DOMContentLoaded', () => {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.querySelector('.hero-background').appendChild(particlesContainer);

    // Criar partículas com posições aleatórias
    const numberOfParticles = 30;
    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Posição inicial aleatória
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Atraso aleatório na animação
        particle.style.animationDelay = `${Math.random() * 20}s`;
        
        particlesContainer.appendChild(particle);
    }
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
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const inputs = form.querySelectorAll('.form-control');

    // Adiciona feedback visual enquanto o usuário digita
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.value.trim() !== '') {
                input.classList.add('has-content');
            } else {
                input.classList.remove('has-content');
            }
        });
    });

    // Validação do formulário
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        let isValid = true;
        const formData = new FormData(form);
        
        // Validação básica
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                isValid = false;
                input.classList.add('invalid');
            } else {
                input.classList.remove('invalid');
            }
        });

        if (!isValid) {
            showMessage('Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }

        // Simulação de envio
        const submitBtn = form.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';

        try {
            // Aqui você adicionaria a lógica real de envio do formulário
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulação
            
            showMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            form.reset();
            inputs.forEach(input => input.classList.remove('has-content'));
        } catch (error) {
            showMessage('Erro ao enviar mensagem. Por favor, tente novamente.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Enviar Mensagem';
        }
    });

    function showMessage(text, type) {
        const messageDiv = form.querySelector('.form-message') || document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = text;
        messageDiv.style.display = 'block';
        
        if (!form.querySelector('.form-message')) {
            form.appendChild(messageDiv);
        }

        // Remove a mensagem após 5 segundos
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }
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

// Dados das medidas para cada tipo de produto e tamanho
const medidasProdutos = {
    'camisas-masculinas': {
        'P': {
            'Comprimento (cm)': '69-71',
            'Largura (cm)': '53-55',
            'Altura (cm)': '162-170',
            'Peso (kg)': '50-62'
        },
        'M': {
            'Comprimento (cm)': '71-73',
            'Largura (cm)': '55-57',
            'Altura (cm)': '170-175',
            'Peso (kg)': '62-75'
        },
        'G': {
            'Comprimento (cm)': '73-75',
            'Largura (cm)': '57-58',
            'Altura (cm)': '175-180',
            'Peso (kg)': '75-80'
        },
        'GG': {
            'Comprimento (cm)': '75-78',
            'Largura (cm)': '58-60',
            'Altura (cm)': '180-185',
            'Peso (kg)': '80-85'
        },
        '2XL': {
            'Comprimento (cm)': '78-81',
            'Largura (cm)': '60-62',
            'Altura (cm)': '185-190',
            'Peso (kg)': '85-90'
        },
        '3XL': {
            'Comprimento (cm)': '81-83',
            'Largura (cm)': '62-64',
            'Altura (cm)': '190-195',
            'Peso (kg)': '90-95'
        }
    },
    'camisas-femininas': {
        'P': {
            'Comprimento (cm)': '61-63',
            'Largura (cm)': '40-41',
            'Altura (cm)': '150-160'
        },
        'M': {
            'Comprimento (cm)': '63-66',
            'Largura (cm)': '41-44',
            'Altura (cm)': '160-165'
        },
        'G': {
            'Comprimento (cm)': '66-69',
            'Largura (cm)': '44-47',
            'Altura (cm)': '165-170'
        },
        'GG': {
            'Comprimento (cm)': '69-71',
            'Largura (cm)': '47-50',
            'Altura (cm)': '170-175'
        }
    },
    'jerseys-nba': {
        'P': {
            'Tórax (cm)': '94-99',
            'Cintura (cm)': '79-84',
            'Quadril (cm)': '94-99'
        },
        'M': {
            'Tórax (cm)': '99-104',
            'Cintura (cm)': '84-89',
            'Quadril (cm)': '99-104'
        },
        'G': {
            'Tórax (cm)': '104-109',
            'Cintura (cm)': '89-94',
            'Quadril (cm)': '104-109'
        },
        'GG': {
            'Tórax (cm)': '109-117',
            'Cintura (cm)': '94-102',
            'Quadril (cm)': '109-117'
        },
        '2XL': {
            'Tórax (cm)': '117-134',
            'Cintura (cm)': '102-109',
            'Quadril (cm)': '117-134'
        }
    },
    'versao-player': {
        'P': {
            'Comprimento (cm)': '67-69',
            'Largura (cm)': '49-51',
            'Altura (cm)': '162-170',
            'Peso (kg)': '50-62'
        },
        'M': {
            'Comprimento (cm)': '69-71',
            'Largura (cm)': '51-53',
            'Altura (cm)': '170-175',
            'Peso (kg)': '62-75'
        },
        'G': {
            'Comprimento (cm)': '71-73',
            'Largura (cm)': '53-55',
            'Altura (cm)': '175-180',
            'Peso (kg)': '75-80'
        },
        'GG': {
            'Comprimento (cm)': '73-76',
            'Largura (cm)': '55-57',
            'Altura (cm)': '180-185',
            'Peso (kg)': '80-85'
        },
        '2XL': {
            'Comprimento (cm)': '76-78',
            'Largura (cm)': '57-60',
            'Altura (cm)': '185-190',
            'Peso (kg)': '85-90'
        },
        '3XL': {
            'Comprimento (cm)': '78-79',
            'Largura (cm)': '60-63',
            'Altura (cm)': '190-195',
            'Peso (kg)': '90-95'
        }
    },
    'camisas-retro': {
        'P': {
            'Largura (cm)': '48',
            'Comprimento (cm)': '67',
            'Altura (cm)': '160-165'
        },
        'M': {
            'Largura (cm)': '50',
            'Comprimento (cm)': '70',
            'Altura (cm)': '165-170'
        },
        'G': {
            'Largura (cm)': '52.5',
            'Comprimento (cm)': '73.5',
            'Altura (cm)': '170-175'
        },
        'GG': {
            'Largura (cm)': '55',
            'Comprimento (cm)': '77',
            'Altura (cm)': '175-178'
        },
        '2XL': {
            'Largura (cm)': '57',
            'Comprimento (cm)': '80',
            'Altura (cm)': '179-184'
        }
    },
    'kit-infantil': {
        '14': {
            'Idade': '2-3',
            'Altura (cm)': '85-95',
            'Comprimento (cm)': '41-44',
            'Largura (cm)': '33-35',
            'Cintura (cm)': '19-36'
        },
        '16': {
            'Idade': '3-4',
            'Altura (cm)': '95-105',
            'Comprimento (cm)': '44-47',
            'Largura (cm)': '35-37',
            'Cintura (cm)': '20-37'
        },
        '18': {
            'Idade': '4-5',
            'Altura (cm)': '105-115',
            'Comprimento (cm)': '47-50',
            'Largura (cm)': '37-39',
            'Cintura (cm)': '21-39'
        },
        '20': {
            'Idade': '5-6',
            'Altura (cm)': '115-125',
            'Comprimento (cm)': '50-53',
            'Largura (cm)': '39-41',
            'Cintura (cm)': '22-41'
        },
        '22': {
            'Idade': '6-7',
            'Altura (cm)': '125-135',
            'Comprimento (cm)': '53-56',
            'Largura (cm)': '41-43',
            'Cintura (cm)': '23-42'
        },
        '24': {
            'Idade': '8-9',
            'Altura (cm)': '135-145',
            'Comprimento (cm)': '56-59',
            'Largura (cm)': '43-45',
            'Cintura (cm)': '24-44'
        },
        '26': {
            'Idade': '10-11',
            'Altura (cm)': '145-155',
            'Comprimento (cm)': '59-62',
            'Largura (cm)': '45-47',
            'Cintura (cm)': '25-47'
        },
        '28': {
            'Idade': '12-13',
            'Altura (cm)': '155-165',
            'Comprimento (cm)': '62-65',
            'Largura (cm)': '47-49',
            'Cintura (cm)': '26-50'
        }
    }
};

// Função para mostrar as medidas específicas
function mostrarMedidasEspecificas(tipoProduto, tamanho) {
    const modal = document.getElementById('medidasEspecificasModal');
    const spanTamanho = document.getElementById('tamanhoSelecionado');
    const tabela = document.getElementById('tabelaMedidasEspecificas');
    
    // Verifica se o tipo de produto e tamanho existem
    if (!medidasProdutos[tipoProduto] || !medidasProdutos[tipoProduto][tamanho]) {
        console.error('Medidas não encontradas para:', tipoProduto, tamanho);
        return;
    }
    
    // Atualiza o título com o tamanho selecionado
    spanTamanho.textContent = tamanho;
    
    // Obtém as medidas específicas
    const medidas = medidasProdutos[tipoProduto][tamanho];
    
    // Cria o cabeçalho da tabela
    let html = '<thead><tr><th>Medida</th><th>Valor</th></tr></thead><tbody>';
    
    // Adiciona cada medida à tabela
    for (const [medida, valor] of Object.entries(medidas)) {
        html += `
            <tr>
                <td>${medida}</td>
                <td>${valor}</td>
            </tr>
        `;
    }
    
    html += '</tbody>';
    tabela.innerHTML = html;
    
    // Mostra o modal com uma classe de fade
    modal.style.display = 'block';
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

// Adiciona os eventos de clique nos tamanhos
document.addEventListener('DOMContentLoaded', function() {
    // Adiciona o evento de clique em todos os tamanhos disponíveis
    const tamanhos = document.querySelectorAll('.product-sizes .size-tag');
    tamanhos.forEach(tamanho => {
        tamanho.addEventListener('click', function() {
            const tipoProduto = this.closest('.product-card').dataset.productType;
            const tamanhoSelecionado = this.textContent.trim();
            mostrarMedidasEspecificas(tipoProduto, tamanhoSelecionado);
        });
    });

    // Fecha o modal quando clicar no X
    const closeButtons = document.querySelectorAll('.modal-close');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        });
    });

    // Fecha o modal quando clicar fora dele
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.classList.remove('active');
            setTimeout(() => {
                event.target.style.display = 'none';
            }, 300);
        }
    });
});