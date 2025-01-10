
---

# 🎟 Sistema de Vendas Online de Ingressos para Eventos Culturais  

Este projeto foi desenvolvido como parte da disciplina de **Algoritmos e Estruturas de Dados** e tem como objetivo implementar um sistema de vendas online de ingressos para eventos culturais, como shows, peças de teatro e apresentações artísticas. O projeto utiliza **Vue.js** e **TypeScript**, e todas as estruturas de dados principais são implementadas manualmente com **listas encadeadas** (simples, duplas ou circulares) para gerenciar informações essenciais como eventos, filas de espera e ingressos.  

---

## 🛠️ Funcionalidades  

### Cadastro de Eventos  
- Registro de eventos com informações detalhadas:  
  - Tipo do evento (show, teatro, etc.).  
  - Nome do artista/grupo.  
  - Data(s) e sessões disponíveis.  

### Cadastro de Clientes  
- Criação de perfis de clientes com dados como:  
  - Nome, endereço e CPF.  
  - Data de nascimento e informações de faturamento.  

### Sistema de Fila Virtual  
- Organização dos clientes em filas de espera para eventos concorridos.  
- Regras personalizadas para priorização de clientes, como convênios com cartões de crédito que permitem avançar na fila.  
- Visualização da posição na fila e tempo estimado de atendimento.  

### Venda de Ingressos  
- Geração de ingressos detalhados com informações como:  
  - Evento, lugar (se aplicável), data e horário da sessão.  
- Associação dos ingressos aos clientes conforme a fila avança.  

### Interfaces Modulares  
- Painel para cadastro e gerenciamento de eventos.  
- Interface para registro de clientes e visualização das filas e ingressos adquiridos.  
- Painel de controle geral para monitorar eventos, filas e vendas.  

---

## 🚀 Tecnologias Utilizadas  

- **Vue.js**: Framework JavaScript para construção do front-end.  
- **TypeScript**: Para tipagem estática e maior robustez no código.  
- **CSS/SCSS**: Para estilização das interfaces.  
- **Listas Encadeadas**: Implementadas manualmente para todas as funcionalidades principais do sistema, sem uso de bibliotecas externas.  

---

## ⚙️ Como Executar  

1. **Pré-requisitos**:  
   - Node.js instalado na máquina.  
   - Gerenciador de pacotes npm ou yarn.  

2. **Clonando o repositório**:  
   ```bash  
   git clone https://github.com/emanoelCarvalho/buyingAndSellingTickets.git  
   cd buyingAndSellingTickets  
   ```  

3. **Instalando as dependências**:  
   ```bash  
   npm install  
   ```  

4. **Iniciando o servidor de desenvolvimento**:  
   ```bash  
   npm run dev  
   ```  

5. **Acessando a aplicação**:  
   - Acesse [http://localhost:5173](http://localhost:5173) no navegador.  

---

## 🧑‍💻 Autores  

- **Emanoel Carvalho**  
- **Cleiton Lucas**  
- **Gean Lima**  

📧 Para dúvidas ou sugestões, entre em contato:  
- **Emanoel Carvalho**: [hemanoel718@gmail.com](mailto:hemanoel718@gmail.com)  
- **Cleiton Lucas**: [email a ser inserido]  
- **Gean Lima**: [email a ser inserido]  

---
