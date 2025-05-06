document.addEventListener('DOMContentLoaded', () => {
    const checkAllButton = document.getElementById('check-all-btn');
    const exercises = document.querySelectorAll('.exercise');
    const finalResultDiv = document.getElementById('final-result');

    checkAllButton.addEventListener('click', () => {
        let correctCount = 0;
        const totalExercises = exercises.length; // Isso já se ajusta automaticamente para 20

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
            const options = exerciseDiv.querySelectorAll('.options input[type="radio"]'); 

            let selectedOption = null;
            options.forEach(radio => {
                if (radio.checked) {
                    selectedOption = radio;
                }
            });

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
                exerciseDiv.classList.add('incorrect'); 
                indicator.textContent = ' Pulei...'; 
                indicator.classList.add('incorrect'); 
            }
        });

        // Exibe o resultado final
        let message = `Você acertou ${correctCount} de ${totalExercises} exercícios! `;
        if (correctCount === totalExercises) {
            message += '🎉 Parabéns, você acertou tudo!';
            finalResultDiv.style.backgroundColor = '#d4edda'; // Verde
            finalResultDiv.style.color = '#155724';
        } else if (correctCount >= totalExercises * 0.8) { // Acertou 80% ou mais (16/20)
             message += '🏆 Excelente! Quase perfeito!';
             finalResultDiv.style.backgroundColor = '#d1ecf1'; // Azul bem claro
             finalResultDiv.style.color = '#0c5460';
        } else if (correctCount >= totalExercises * 0.6) { // Acertou 60% ou mais (12/20)
            message += '👍 Muito bem! Continue praticando!';
             finalResultDiv.style.backgroundColor = '#cfe2ff'; // Azul claro
             finalResultDiv.style.color = '#0a58ca';
        } else if (correctCount >= totalExercises * 0.4) { // Acertou 40% ou mais (8/20)
            message += '😃 Bom esforço! Não desista!';
             finalResultDiv.style.backgroundColor = '#fff3cd'; // Amarelo
             finalResultDiv.style.color = '#856404';
        } else { // Acertou menos de 40%
            message += '🤔 Continue tentando, a prática leva à perfeição!';
            finalResultDiv.style.backgroundColor = '#f8d7da'; // Vermelho
             finalResultDiv.style.color = '#721c24';
        }
        finalResultDiv.textContent = message;
    });
});
