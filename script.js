document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os botões de verificar
    const checkButtons = document.querySelectorAll('.check-btn');

    // Adiciona um ouvinte de evento para cada botão
    checkButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Encontra o elemento pai do exercício
            const exerciseDiv = button.closest('.exercise');
            // Pega o input da resposta dentro desse exercício
            const input = exerciseDiv.querySelector('.answer-input');
            // Pega o parágrafo de feedback
            const feedbackP = exerciseDiv.querySelector('.feedback');
            // Pega a resposta correta do atributo data-answer
            const correctAnswer = exerciseDiv.getAttribute('data-answer');

            // Pega a resposta do usuário e limpa (remove espaços, R$)
            let userAnswer = input.value.trim().replace('R$', '').replace(' ', '');
            // Substitui ponto por vírgula, se houver, para padronizar
             userAnswer = userAnswer.replace('.', ',');

            // Verifica se a resposta do usuário é igual à resposta correta
            if (userAnswer === correctAnswer) {
                feedbackP.textContent = 'Correto! 🎉 Muito bem!';
                feedbackP.className = 'feedback correct'; // Adiciona classe para estilizar verde
            } else {
                // Formata a resposta correta para exibição
                const formattedCorrectAnswer = `R$ ${correctAnswer.replace(',', '.')}`; // Usa ponto para clareza na mensagem
                 feedbackP.textContent = `Hmm, tente de novo! 🤔 A resposta certa é R$ ${correctAnswer}.`;
                feedbackP.className = 'feedback incorrect'; // Adiciona classe para estilizar vermelho
            }
        });
    });
});