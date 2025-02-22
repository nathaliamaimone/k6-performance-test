import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    rampingRateTest: {
      executor: 'ramping-arrival-rate',
      startRate: 5, // Começa enviando 5 requisições por segundo
      timeUnit: '1s',
      stages: [
        { duration: '5s', target: 10 }, // Em 5s, sobe para 10 req/s
        { duration: '10s', target: 20 }, // Em 10s, sobe para 20 req/s
        { duration: '5s', target: 0 }, // Em 5s, reduz para 0 req/s
      ],
      preAllocatedVUs: 5, // Começa com 5 VUs
      maxVUs: 20, // Pode usar até 20 VUs se precisar
    },
  },
};

export default function () {
  let res = http.get('https://test.k6.io');

  check(res, {
    'status é 200': (r) => r.status === 200,
  });

}

// Começa enviando 5 requisições por segundo e aumenta gradualmente para 10 e depois 20, antes de reduzir a 0.
// O K6 ajusta automaticamente os VUs para manter a taxa de requisições esperada.
// Útil para testar sistemas que recebem tráfego variável, como um e-commerce.