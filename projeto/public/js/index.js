
const form = document.querySelector('#informacoes');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = form.querySelector('#email').value;
  const senha = form.querySelector('#senha').value;
  

  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
    });

    const data = await response.json();

    if (response.ok) {
      window.location.href = 'html/perfis.html';
    } else {
      alert('Erro: ' + data.message);
    }
  } catch (error) {
    alert('Erro na conexão com o servidor');
    console.error(error);
  }
});
