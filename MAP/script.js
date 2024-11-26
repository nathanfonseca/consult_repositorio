document.getElementById('searchbtn').addEventListener('click', function() {
    const usuario = document.getElementById('usuario').value.trim();
    const resultado = document.getElementById('resultado');
    const loadingMessage = document.getElementById('loadingMessage');
    const errorMessage = document.getElementById('errorMessage');
    const resultList = document.getElementById('resultList');

    // Limpar resultados anteriores e mensagens de erro
    resultList.innerHTML = '';
    errorMessage.innerHTML = '';
    resultado.style.display = 'none'; 
    loadingMessage.style.display = 'block'; 

    if (usuario === '') {
        loadingMessage.style.display = 'none';
        errorMessage.innerHTML = 'Por favor, insira um nome de usuário.';
        errorMessage.style.display = 'block';
        return;
    }

    // Faz a requisição para a API do GitHub
    fetch(`https://api.github.com/users/${usuario}/repos`)
        .then(response => {
            if (!response.ok) {
                // Se não houver reposta, exibe erro
                throw new Error('Usuário não encontrado ou sem repositórios.');
            }
            return response.json();
        })
        .then(data => {
            loadingMessage.style.display = 'none';
            resultado.style.display = 'block'; 

            if (data.length === 0) {
                // Se não houver repositórios
                errorMessage.innerHTML = 'Este usuário não tem repositórios públicos.';
                errorMessage.style.display = 'block';
                return;
            }

            // Cria a lista de repositórios
            data.forEach(repo => {
                const li = document.createElement('li');
                li.classList.add('repo-item');
                li.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a> - ${repo.description || 'Sem descrição'}`;
                resultList.appendChild(li);
            });
        })
        .catch(error => {
            // Em caso de erro
            loadingMessage.style.display = 'none';
            errorMessage.innerHTML = error.message;
            errorMessage.style.display = 'block';
        });
});
