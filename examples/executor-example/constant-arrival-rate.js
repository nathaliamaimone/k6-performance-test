import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    constantRateTest: {
      executor: 'constant-arrival-rate',
      rate: 10, // Envia 10 requisições por segundo
      timeUnit: '1s', // Base de tempo para a taxa de chegada
      duration: '10s', // Tempo total do teste
      preAllocatedVUs: 5, // Aloca 5 VUs inicialmente
      maxVUs: 10, // Pode usar até 10 VUs se necessário
    },
  },
};

export default function () {
  let res = http.get('https://test.k6.io');

  check(res, {
    'status é 200': (r) => r.status === 200,
  });
}

// Garante que sempre serão feitas 10 requisições por segundo, independente do número de VUs.
// O K6 aloca usuários conforme necessário para manter essa taxa.
// O preAllocatedVUs: 5 inicia com 5 VUs, mas pode subir para 10 VUs se precisar.
// Útil para simular sistemas com uma taxa de requisições previsível, como APIs que recebem um volume fixo de chamadas.