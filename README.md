
---

# 🎟 Sistema de Vendas Online de Ingressos para Eventos Culturais

Este projeto foi desenvolvido como parte da disciplina de **Algoritmos e Estruturas de Dados** e tem como objetivo implementar um sistema de vendas online de ingressos para eventos culturais, como shows, peças de teatro e apresentações artísticas. O projeto utiliza listas encadeadas para o armazenamento e gerenciamento dos dados principais e foi desenvolvido aplicando princípios de orientação a objetos.

## 🎯 Objetivo

Criar um sistema que:
1. **Gerencie eventos culturais**: Cadastro completo dos eventos com informações como tipo, artistas, datas, sessões, etc.
2. **Gerencie clientes**: Cadastro de clientes com informações detalhadas, como nome, CPF, endereço, data de nascimento e informações de faturamento.
3. **Implemente filas virtuais**: Organize os interessados em adquirir ingressos para eventos disputados, permitindo tratamento prioritário para clientes de cartões conveniados.
4. **Venda e associa ingressos aos clientes**: Gerencie a emissão de ingressos detalhando informações do evento, assentos, datas e horários das sessões.

---

## 🛠️ Funcionalidades

1. **Módulo de Cadastro de Eventos**:
   - Permite criar e gerenciar eventos com informações detalhadas.
   - Visualiza a quantidade de pessoas nas filas de cada evento.

2. **Módulo de Cadastro de Clientes**:
   - Permite o registro de clientes com dados completos e únicos.

3. **Módulo de Compra e Fila Virtual**:
   - Mostra a lista de eventos disponíveis.
   - Permite ao cliente entrar na fila de um evento, respeitando as prioridades definidas.
   - Exibe a posição do cliente nas filas em que está cadastrado.
   - Associa ingressos ao cliente conforme a fila “anda”.

4. **Painel de Controle Geral**:
   - Permite visualizar o status dos eventos, incluindo as filas e seus respectivos tamanhos.

---

## 🏗️ Estrutura Técnica

### Listas Encadeadas
As listas encadeadas são utilizadas para gerenciar os dados principais do sistema, como:
- **Clientes**: Inclusão, remoção e busca de clientes.
- **Eventos**: Cadastro, edição e exclusão de eventos.
- **Fila Virtual**: Organização dos clientes em filas com regras de prioridade baseadas em convênios.

### Interface Gráfica
O sistema apresenta interfaces distintas para:
1. Cadastro e controle de eventos.
2. Cadastro de clientes.
3. Escolha de eventos e gerenciamento de filas.
4. Painel de controle geral.

### Princípios de Orientação a Objetos
O projeto é implementado em **linguagem orientada a objetos**, utilizando:
- **Encapsulamento**: Atributos e métodos bem definidos para cada classe.
- **Herança e Polimorfismo**: Estruturas flexíveis para gerenciar diferentes tipos de eventos, clientes e ingressos.

---

## 🚀 Como Executar o Projeto

1. **Clone o Repositório:**
   ```bash
   git clone https://github.com/seu_usuario/sistema-vendas-ingressos.git
   cd sistema-vendas-ingressos
   ```

2. **Configure o Ambiente de Desenvolvimento:**
   - Certifique-se de ter o ambiente Java configurado.
   - Compile os arquivos `.java`.

3. **Execute o Sistema:**
   - Inicie o projeto através do console ou de uma IDE.
   - Navegue pelas opções disponíveis nos módulos do sistema.

---

## 📜 Observações Importantes

- O projeto foi implementado sem o uso de bibliotecas avançadas para gerenciamento de listas. Todas as operações de inclusão, exclusão, ordenação e busca foram implementadas manualmente.
- A interface gráfica deve ser simples, mas funcional, permitindo a navegação intuitiva entre os módulos.

---

## 👥 Autores

Este projeto foi desenvolvido por:
- **Emanoel Carvalho**  
- **Cleiton Lucas**  
- **Gean Lima**

Caso tenha dúvidas ou sugestões, entre em contato pelo email: [hemanoel718@gmail.com](mailto:hemanoel718@gmail.com).

--- 