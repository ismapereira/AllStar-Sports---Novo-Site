// Modal Controller
class ModalController {
    constructor() {
        this.init();
    }

    init() {
        // Inicializar listeners para abrir modais
        document.querySelectorAll('[data-modal]').forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const modalId = trigger.getAttribute('data-modal');
                this.openModal(modalId);
            });
        });

        // Inicializar listeners para fechar modais
        document.querySelectorAll('.modal-close').forEach(closeBtn => {
            closeBtn.addEventListener('click', () => {
                const modal = closeBtn.closest('.modal');
                this.closeModal(modal.id);
            });
        });

        // Fechar modal ao clicar fora
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal.id);
                }
            });
        });

        // Inicializar funcionalidades específicas
        this.initFAQ();
        this.initContactForm();
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            setTimeout(() => modal.classList.add('active'), 10);
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
        }
    }

    initFAQ() {
        const searchInput = document.getElementById('faqSearch');
        const categories = document.querySelectorAll('.faq-category');
        const faqItems = document.querySelectorAll('.faq-item');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                faqItems.forEach(item => {
                    const question = item.querySelector('h3').textContent.toLowerCase();
                    const answer = item.querySelector('p').textContent.toLowerCase();
                    const isVisible = question.includes(searchTerm) || answer.includes(searchTerm);
                    item.style.display = isVisible ? 'block' : 'none';
                });
            });
        }

        categories.forEach(category => {
            category.addEventListener('click', () => {
                const selectedCategory = category.getAttribute('data-category');
                
                // Atualizar classes ativas
                categories.forEach(cat => cat.classList.remove('active'));
                category.classList.add('active');

                // Filtrar itens
                faqItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    item.style.display = (selectedCategory === itemCategory) ? 'block' : 'none';
                });
            });
        });
    }

    initContactForm() {
        const contactFormLink = document.querySelector('.contact-form-link');
        if (contactFormLink) {
            contactFormLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeModal('contatoModal');
                setTimeout(() => {
                    const contactSection = document.querySelector('#contact');
                    if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 300);
            });
        }
    }
}

// Inicializar controller quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new ModalController();
});
