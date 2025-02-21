import http from 'k6/http';
import { check } from 'k6';

export const options = {
  scenarios: {
    sharedTest: {
      executor: 'shared-iterations',
      vus: 5,
      iterations: 20, // Total de iterações compartilhadas entre os VUs
      maxDuration: '10s', // Tempo máximo de execução
    },
  },
};

export default function () {
  let res = http.get('https://test.k6.io');
  
  check(res, {
    'status é 200': (r) => r.status === 200,
  });
}

// Temos 5 VUs executando um total de 20 iterações, que são distribuídas entre eles.
// Pode não ser dividido igualmente, uma VU pode executar mais ou menos iterações.
// O teste pode encerrar antes se todas as iterações forem concluídas.
// O tempo máximo para rodar tudo é 10 segundos.
