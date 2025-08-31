# 📧 Classificador de E-mails - Frontend

Frontend do projeto **Classificador de E-mails**, um site onde você pode enviar um e-mail (em texto ou PDF) e receber:

- Classificação se é **Produtivo** ou **Improdutivo**
- Grau de **confiabilidade** da classificação
- Uma **sugestão de resposta** gerada por IA

👉 Deploy: [email-classificador.netlify.app](https://email-classificador.netlify.app/)  
👉 Backend: [classificador-email-backend](https://github.com/kakiih/classificador-email-backend)

---

## 🚀 Tecnologias
- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Bootstrap](https://getbootstrap.com/)

---

## ⚙️ Como rodar localmente

```bash
# Clonar o repositório
git clone https://github.com/kakiih/classificador-email-frontend.git
cd classificador-email-frontend

# Instalar dependências
npm install

# Rodar o projeto
npm run dev

#Atenção!
no caso de rodar o backend localmente também atualize a linha:
  const API_URL = "https://classificador-email-backend.onrender.com/processar-email";
para
  const API_URL = "(porta-local)/processar-email";
se for utilizar o backend no deploy pode ignorar.

