// Inicialização do EmailJS
(function() {
    emailjs.init("D3z464uqFSlGnan63"); // Substitua pelo seu User ID do EmailJS
})();

// Função para enviar e-mail
function sendEmail(event) {
    event.preventDefault();

    // Coletar dados do formulário
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const city = document.getElementById('city').value;
    const message = document.getElementById('message').value;

    // Validação básica
    if (!name || !email || !phone || !city) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    // Parâmetros para o template de e-mail
    const templateParams = {
        from_name: name,
        from_email: email,
        phone: phone,
        city: city,
        message: message || 'Sem mensagem adicional'
    };

    // Desabilitar botão durante o envio
    const submitButton = document.querySelector('#contactForm button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';

    // Enviar e-mail usando EmailJS
    emailjs.send('service_uycdg4y', 'template_84dxhm9', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            document.getElementById('contactForm').reset();
        }, function(error) {
            console.log('FAILED...', error);
            alert('Erro ao enviar mensagem. Por favor, tente novamente.');
        })
        .finally(function() {
            // Reabilitar botão
            submitButton.disabled = false;
            submitButton.textContent = 'Enviar Mensagem';
        });
}

// Adicionar event listener quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', sendEmail);
    }
});
