import http from 'k6/http';
import { check } from 'k6';

export const options = {
  scenarios: {
    perVuTest: {
      executor: 'per-vu-iterations',
      vus: 3,
      iterations: 10, // Cada VU executará exatamente 10 vezes
      maxDuration: '25s', // Tempo máximo de execução
    },
  },
};

export default function () {
  let res = http.get('https://test.k6.io');
  
  check(res, {
    'status é 200': (r) => r.status === 200,
  });
}

// Temos 3 VUs, e cada um faz 10 iterações, totalizando 30 requisições.
// Cada usuário roda seu número exato de iterações, sem dividir com os outros.
// O tempo máximo para tudo terminar é 25 segundos.
