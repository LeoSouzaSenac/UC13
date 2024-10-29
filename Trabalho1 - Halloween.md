**Sistema de Jogo com CRUD Completo**

**Objetivo:**  
Você deve desenvolver um sistema de jogo simples utilizando HTML, CSS e JavaScript, implementando um CRUD completo (Create, Read, Update, Delete). 
O jogo deve ser totalmente funcional e possuir uma interface amigável. 
A aplicação precisa incluir todas as operações de CRUD para manipular dados dos jogadores, como cadastro de pontuações, nome de usuários, e registros de histórico. 
O site deve ser organizado e esteticamente agradável.

---

# Projetos de Jogos Simples com CRUD para Halloween

## 1. Quiz Game (Jogo de Perguntas e Respostas)
- **Descrição**: Os jogadores respondem a perguntas e acumulam pontos. Se errar, aparece uma imagem ou vídeo para dar susto.
- **CRUD**: Permitir adicionar, listar, atualizar e remover perguntas do jogo.
- **Complexidade**: Baixa. Simples de implementar com HTML, CSS e JavaScript, utilizando arrays ou objetos para armazenar as perguntas.

---

## 2. Memory Game (Jogo da Memória)
- **Descrição**: Os jogadores precisam encontrar pares de cartas com imagens ou palavras de Halloween.
- **CRUD**: O sistema permite adicionar, editar e remover cartas no conjunto de memória.
- **Complexidade**: Moderada. Exige um pouco mais de lógica para implementar o embaralhamento e o pareamento das cartas, mas ainda é gerenciável com JavaScript.

---

## 3. Jogo da Adivinhação (Number Guessing Game)
- **Descrição**: O jogador tenta adivinhar um número aleatório gerado pelo sistema, recebendo dicas se o número é maior ou menor.
- **CRUD**: Pode ser usado para salvar tentativas, partidas passadas, ou recordes de tentativas.
- **Complexidade**: Muito baixa. A lógica envolve apenas comparações básicas e é fácil de implementar e estilizar.

---

## 4. Clique na Abóbora (Pumpkin Clicker Game)
- **Descrição**: Jogo de clique onde abóboras (ou outros elementos de Halloween) aparecem na tela, e o jogador precisa clicar o máximo possível antes do tempo acabar.
- **CRUD**: Registrar as pontuações e nomes dos jogadores, permitindo listar os recordes e limpar o histórico.
- **Complexidade**: Baixa. Requer apenas eventos de clique e contagem de pontos, com CSS e JavaScript para manipular a aparência e o movimento das abóboras.

---

## 5. Pedra, Papel e Tesoura (Rock, Paper, Scissors)
- **Descrição**: Clássico jogo onde o jogador escolhe entre pedra, papel e tesoura, competindo contra uma escolha aleatória do sistema.
- **CRUD**: Pode registrar o histórico de partidas ou resultados, permitindo adicionar, visualizar e apagar pontuações.
- **Complexidade**: Baixa. A lógica é simples, utilizando condições para comparar as escolhas e determinar o vencedor.

---

## 6. Labirinto Básico (Maze Game)
- **Descrição**: O jogador precisa levar um ícone (ex.: uma abóbora) até o final de um labirinto usando as setas do teclado.
- **CRUD**: Permitir salvar o nível, tentativas e tempo gasto para completar o labirinto.
- **Complexidade**: Moderada. Requer CSS para construir o grid do labirinto e JavaScript para gerenciar o movimento do jogador com eventos de teclado.

---

## 7. Caça-Palavras de Halloween (Halloween Word Search)
- **Descrição**: Jogo onde o jogador precisa encontrar palavras temáticas de Halloween em uma grade de letras.
- **CRUD**: Permitir adicionar, atualizar e excluir palavras da grade.
- **Complexidade**: Moderada. Usa CSS para organizar a grade e JavaScript para validar a seleção das palavras.

---

## 8. Jogo da Forca (Hangman)
- **Descrição**: O jogador tenta adivinhar uma palavra oculta, letra por letra, antes de "enforcar" o personagem.
- **CRUD**: Permite adicionar, atualizar, listar e remover palavras.
- **Complexidade**: Baixa. Envolve controle de fluxo básico e manipulação de arrays para armazenar as letras.

---

**Requisitos do Projeto:**  
Cada equipe deverá implementar as seguintes funcionalidades:

1. **Interface de Usuário**  
   - Design do site utilizando HTML e CSS para uma boa experiência do usuário.
   - Uso de JavaScript para as interações do jogo e operações do CRUD.

2. **Funcionalidades CRUD**  
   - **Create (Criar):** Permitir que o usuário crie registros, como uma nova pergunta no quiz, uma nova carta no jogo da memória, ou um novo registro de pontuação.
   - **Read (Ler):** Exibir todos os registros para os usuários, como perguntas cadastradas, cartas disponíveis ou pontuações mais altas.
   - **Update (Atualizar):** Permitir que o usuário edite perguntas, cartas ou atualize as pontuações e informações de um jogador.
   - **Delete (Deletar):** Permitir que o usuário exclua registros, como remover uma pergunta, carta ou pontuação do histórico.

3. **Estrutura de Dados**  
   - Utilize objetos JavaScript ou JSON para armazenar e manipular dados de forma dinâmica.
   - Armazene localmente os dados no navegador usando Local Storage para simular um banco de dados.

4. **Validação de Dados**  
   - Adicione validação para garantir que todos os campos obrigatórios estejam preenchidos antes de salvar os dados.
   - Exibir mensagens de erro ou de sucesso nas operações CRUD para o usuário.


