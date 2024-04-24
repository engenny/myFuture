// levando em consideração que não possuo o back coloquei um url qualquer...
const BASE_URL = 'http://mercadoBitcoin.com';

// utilizaria se já houvesse os dados e eu precisasse apenas bater para renderizar em tela.
export async function getRegistrationUser() {
  const response = await fetch(`${BASE_URL}/registration`);
  if (!response.ok) {
    throw new Error('Não foi possível obter os dados de registro');
  }
  return response.json();
}

// Registro do formulário enviando para o back com as informações
export async function postRegistrationUser(data) {
  const response = await fetch(`${BASE_URL}/registration`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Não foi possível enviar o formulário de registro');
  }
  return response.json();
}
