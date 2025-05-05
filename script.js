document.addEventListener('DOMContentLoaded', () => {
    const checkAllButton = document.getElementById('check-all-btn');
    const exercises = document.querySelectorAll('.exercise');
    const finalResultDiv = document.getElementById('final-result');

    checkAllButton.addEventListener('click', () => {
        let correctCount = 0;
        const totalExercises = exercises.length;

        // Limpa resultados anteriores antes de verificar novamente
        finalResultDiv.textContent = '';
        finalResultDiv.className = ''; // Limpa classes de estilo anteriores do resultado final
         exercises.forEach(exerciseDiv => {
            exerciseDiv.classList.remove('correct', 'incorrect');
            const indicator = exerciseDiv.querySelector('.result-indicator');
            indicator.textContent = '';
            indicator.className = 'result-indicator'; // Reseta classe do indicador
        });

        // Itera sobre cada exercício para verificar a resposta
        exercises.forEach((exerciseDiv, index) => {
            const input = exerciseDiv.querySelector('.answer-input');
            const correctAnswer = exerciseDiv.getAttribute('data-answer');
            const indicator = exerciseDiv.querySelector('.result-indicator');

            // Limpa e padroniza a resposta do usuário (remove R$, espaços, usa vírgula)
            let userAnswer = input.value.trim().replace('R$', '').replace(/\s/g, '');
            userAnswer = userAnswer.replace('.', ',');

            // Verifica se a resposta está correta
            if (userAnswer === correctAnswer) {
                correctCount++;
                exerciseDiv.classList.add('correct');
                indicator.textContent = '✔️ Certo!';
                indicator.classList.add('correct');
            } else {
                exerciseDiv.classList.add('incorrect');
                // Mostra a resposta correta se estiver errado
                const formattedCorrectAnswer = `R$ ${correctAnswer}`;
                indicator.textContent = `❌ Errado! Era ${formattedCorrectAnswer}`;
                indicator.classList.add('incorrect');
            }
        });

        // Exibe o resultado final
        let message = `Você acertou ${correctCount} de ${totalExercises} exercícios! `;
        if (correctCount === totalExercises) {
            message += '🎉 Parabéns, você acertou tudo!';
            finalResultDiv.style.backgroundColor = '#d4edda'; // Fundo verde
            finalResultDiv.style.color = '#155724'; // Texto verde escuro
        } else if (correctCount >= totalExercises / 2) {
            message += '👍 Muito bem, continue praticando!';
             finalResultDiv.style.backgroundColor = '#fff3cd'; // Fundo amarelo
             finalResultDiv.style.color = '#856404'; // Texto amarelo escuro
        } else {
            message += '🤔 Continue tentando, você vai conseguir!';
            finalResultDiv.style.backgroundColor = '#f8d7da'; // Fundo vermelho
             finalResultDiv.style.color = '#721c24'; // Texto vermelho escuro
        }
        finalResultDiv.textContent = message;
    });

     // Opcional: Permitir pressionar Enter no último campo para verificar
     const lastInput = exercises[exercises.length - 1].querySelector('.answer-input');
     if(lastInput) {
        lastInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                checkAllButton.click(); // Simula o clique no botão
            }
        });
     }
});
