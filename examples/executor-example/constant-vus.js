import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    constantLoadTest: {
      executor: 'constant-vus',
      vus: 5, 
      duration: '10s', 
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

// Mantém 5 VUs ativos durante 10 segundos, sem variação.
// Cada VU faz requisições continuamente dentro desse período.
// O sleep(0.5) adiciona uma pequena pausa entre as iterações, simulando um usuário real.