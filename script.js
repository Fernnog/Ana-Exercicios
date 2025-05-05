document.addEventListener('DOMContentLoaded', () => {
    const checkAllButton = document.getElementById('check-all-btn');
    const exercises = document.querySelectorAll('.exercise');
    const finalResultDiv = document.getElementById('final-result');

    checkAllButton.addEventListener('click', () => {
        let correctCount = 0;
        const totalExercises = exercises.length;

        // Limpa resultados anteriores
        finalResultDiv.textContent = '';
        finalResultDiv.style.backgroundColor = '#e6e6fa'; // Reseta cor de fundo
        finalResultDiv.style.color = '#333'; // Reseta cor do texto
        exercises.forEach(exerciseDiv => {
            exerciseDiv.classList.remove('correct', 'incorrect');
            const indicator = exerciseDiv.querySelector('.result-indicator');
            indicator.textContent = '';
            indicator.className = 'result-indicator';
        });

        // Itera sobre cada exercício para verificar a resposta selecionada
        exercises.forEach((exerciseDiv, index) => {
            const correctAnswer = exerciseDiv.getAttribute('data-answer');
            const indicator = exerciseDiv.querySelector('.result-indicator');
            const options = exerciseDiv.querySelectorAll('.options input[type="radio"]'); // Pega todos os radios da questão

            // Encontra a opção selecionada
            let selectedOption = null;
            options.forEach(radio => {
                if (radio.checked) {
                    selectedOption = radio;
                }
            });

            // Verifica se alguma opção foi selecionada e se está correta
            if (selectedOption) {
                const userAnswer = selectedOption.value;
                if (userAnswer === correctAnswer) {
                    correctCount++;
                    exerciseDiv.classList.add('correct');
                    indicator.textContent = '✔️ Certo!';
                    indicator.classList.add('correct');
                } else {
                    exerciseDiv.classList.add('incorrect');
                    const formattedCorrectAnswer = `R$ ${correctAnswer}`;
                    indicator.textContent = `❌ Errado! Era ${formattedCorrectAnswer}`;
                    indicator.classList.add('incorrect');
                }
            } else {
                // Nenhuma opção selecionada para esta questão
                exerciseDiv.classList.add('incorrect'); // Marca como incorreto se não respondeu
                indicator.textContent = ' Pulei...'; // Ou 'Sem resposta'
                 indicator.classList.add('incorrect'); // Estilo de erro
            }
        });

        // Exibe o resultado final (lógica idêntica à anterior)
        let message = `Você acertou ${correctCount} de ${totalExercises} exercícios! `;
        if (correctCount === totalExercises) {
            message += '🎉 Parabéns, você acertou tudo!';
            finalResultDiv.style.backgroundColor = '#d4edda'; // Verde
            finalResultDiv.style.color = '#155724';
        } else if (correctCount >= totalExercises * 0.7) { // Acertou 70% ou mais
             message += '👍 Ótimo trabalho!';
             finalResultDiv.style.backgroundColor = '#cfe2ff'; // Azul claro
             finalResultDiv.style.color = '#0a58ca';
        } else if (correctCount >= totalExercises / 2) { // Acertou metade ou mais
            message += '😃 Bom esforço, continue praticando!';
             finalResultDiv.style.backgroundColor = '#fff3cd'; // Amarelo
             finalResultDiv.style.color = '#856404';
        } else { // Acertou menos da metade
            message += '🤔 Continue tentando, você vai conseguir!';
            finalResultDiv.style.backgroundColor = '#f8d7da'; // Vermelho
             finalResultDiv.style.color = '#721c24';
        }
        finalResultDiv.textContent = message;
    });

    // Não precisa mais do listener de 'Enter' no input, pois não há mais inputs de texto.
});
