import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    rampingLoadTest: {
      executor: 'ramping-vus',
      startVUs: 1, // Começa com 1 usuário virtual
      stages: [
        { duration: '5s', target: 5 }, // Em 5s, sobe para 5 VUs
        { duration: '10s', target: 10 }, // Em 10s, sobe para 10 VUs
        { duration: '5s', target: 0 }, // Em 5s, reduz para 0 VUs
      ],
    },
  },
};

export default function () {
  let res = http.get('https://test.k6.io');

  check(res, {
    'status é 200': (r) => r.status === 200,
  });

  sleep(0.5);
}

// Começa com 1 VU, sobe para 5 em 5 segundos, depois para 10 em mais 10 segundos e, no final, reduz para 0.
// Isso simula um cenário real de crescimento e redução da carga no sistema.
// A pausa de sleep(0.5) mantém um intervalo entre as requisições.