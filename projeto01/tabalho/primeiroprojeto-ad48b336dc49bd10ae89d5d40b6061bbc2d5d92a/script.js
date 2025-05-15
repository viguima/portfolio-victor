// Comentário: Início do arquivo JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile
    const mobileMenu = document.querySelector('.mobile-menu');
    const menu = document.querySelector('.menu');
    
    mobileMenu.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        menu.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menu.classList.remove('active');
            mobileMenu.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Header Scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Botão Voltar ao Topo
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Filtro do Portfólio
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove a classe active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adiciona a classe active ao botão clicado
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'todos' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Animação ao rolar a página
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.servico-card, .sobre-item, .info-item, .destaque-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Configura a opacidade inicial e posição dos elementos
    window.addEventListener('load', function() {
        const elements = document.querySelectorAll('.servico-card, .sobre-item, .info-item, .destaque-card');
        
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        });
        
        animateOnScroll();
    });
    
    window.addEventListener('scroll', animateOnScroll);
    
   // Formulário de Contato com FormSubmit
const contactForm = document.getElementById('form-contato');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Feedback visual
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        
        // Configuração do FormSubmit
        const formAction = 'https://formsubmit.co/guimaraes36123@gmail.com';
        const formData = new FormData(this);
        
        // Envio real com Fetch API
        fetch(formAction, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                // Sucesso no envio
                submitButton.textContent = 'Enviado com sucesso!';
                submitButton.style.backgroundColor = 'var(--success-color)';
                this.reset();
                
                // Redirecionamento (opcional)
                const nextPage = this.querySelector('input[name="_next"]')?.value;
                if (nextPage) {
                    setTimeout(() => {
                        window.location.href = nextPage;
                    }, 2000);
                }
            } else {
                throw new Error('Falha no envio');
            }
        })
        .catch(error => {
            // Erro no envio
            submitButton.textContent = 'Erro ao enviar';
            submitButton.style.backgroundColor = 'var(--danger-color)';
            console.error('Erro:', error);
        })
        .finally(() => {
            // Reset do botão após 3 segundos
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.backgroundColor = '';
            }, 3000);
        });
    });
}
    
    // Efeito de digitação no hero (opcional)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typingEffect = setInterval(() => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typingEffect);
            }
        }, 100);
    }
});
// Comentário: Fim do arquivo JavaScript