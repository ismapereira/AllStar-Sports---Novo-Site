// Inicialização do EmailJS
(function() {
    emailjs.init("D3z464uqFSlGnan63"); // Substitua pelo seu User ID do EmailJS
})();

// Função para enviar e-mail
function sendEmail(event) {
    event.preventDefault();

    // Coletar dados do formulário
    const contactForm = document.getElementById('contactForm');
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const city = document.getElementById('city').value;
    const message = document.getElementById('message').value;
    const submitButton = document.querySelector('#contactForm button[type="submit"]');

    // Validação básica
    if (!name || !email || !phone || !city) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    // Criar elemento de animação de bola de futebol
    const loadingElement = document.createElement('div');
    loadingElement.classList.add('soccer-ball-loader');
    loadingElement.innerHTML = '⚽';

    // Esconder botão e mostrar animação
    submitButton.style.display = 'none';
    contactForm.appendChild(loadingElement);

    // Parâmetros para o template de e-mail
    const templateParams = {
        from_name: name,
        from_email: email,
        phone: phone,
        city: city,
        message: message || 'Sem mensagem adicional'
    };

    // Enviar e-mail usando EmailJS
    emailjs.send('service_uycdg4y', 'template_84dxhm9', templateParams)
        .then(function(response) {
            // Remover animação de carregamento
            loadingElement.remove();

            // Criar elemento de confirmação
            const confirmationElement = document.createElement('div');
            confirmationElement.classList.add('form-confirmation');
            confirmationElement.textContent = 'Mensagem enviada com sucesso!';
            contactForm.appendChild(confirmationElement);

            // Resetar formulário após 3 segundos
            setTimeout(() => {
                contactForm.reset();
                confirmationElement.remove();
                submitButton.style.display = 'block';
            }, 3000);
        }, function(error) {
            // Remover animação de carregamento
            loadingElement.remove();

            // Criar elemento de erro
            const errorElement = document.createElement('div');
            errorElement.classList.add('form-error');
            errorElement.textContent = 'Erro ao enviar mensagem. Tente novamente.';
            contactForm.appendChild(errorElement);

            // Mostrar botão novamente
            submitButton.style.display = 'block';

            // Remover mensagem de erro após 3 segundos
            setTimeout(() => {
                errorElement.remove();
            }, 3000);
        });
}

// Adicionar event listener quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', sendEmail);
    }
});
