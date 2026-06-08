# Portfólio — Fernando Reis

Portfólio profissional moderno com foco em **Dados, BI, Gestão Estratégica e Automação de Processos**.  
Design responsivo, tema claro/escuro, animações suaves e formulário de contato funcional.

## 🌐 Acesso online

👉 **https://fernandor-reis.github.io/portfolio-fernando-reis/**

## 📁 Estrutura do projeto

```
portfolio-fernando-reis/
├── index.html                    → estrutura da página
├── portfolio-fernando-reis.css   → estilos, animações e responsividade
└── portfolio-fernando-reis.js    → interações, cursor, dark mode, formulário
```

## ✨ Funcionalidades

- Loader animado com ícones de dados e gestão
- Cursor personalizado com efeito de anel
- Menu hambúrguer animado para mobile
- Alternância dark/light mode
- Contadores animados via IntersectionObserver
- Barras de habilidades animadas
- Seções: Hero, Sobre, Skills, Projetos, Experiência, Certificações, Depoimentos, Contato
- Formulário de contato integrado com **EmailJS** (envio real de e-mail)
- WhatsApp direto: **(19) 99998-6024**

## 🛠️ Tecnologias

- HTML5 semântico
- CSS3 (variáveis, keyframes, grid, flexbox)
- JavaScript (ES6+, IntersectionObserver, RAF)
- Google Fonts — Inter + Poppins
- [EmailJS](https://www.emailjs.com/) — envio de e-mails sem backend

## ▶️ Como executar localmente

```bash
# Python 3
python -m http.server 5500
```

Acesse: http://localhost:5500

## 📬 Configurar envio de formulário (EmailJS)

1. Crie conta gratuita em https://www.emailjs.com/
2. Adicione um **Email Service** (Gmail, Outlook, etc.)
3. Crie um **Email Template** com as variáveis `{{from_name}}`, `{{reply_to}}`, `{{message}}`
4. No arquivo `portfolio-fernando-reis.js`, preencha:
   ```js
   const EMAILJS_PUBLIC_KEY  = 'SUA_PUBLIC_KEY';
   const EMAILJS_SERVICE_ID  = 'SUA_SERVICE_ID';
   const EMAILJS_TEMPLATE_ID = 'SEU_TEMPLATE_ID';
   ```

## 📌 Objetivo

Apresentar projetos, competências e trajetória profissional de Fernando Reis de forma clara, moderna e totalmente responsiva.
