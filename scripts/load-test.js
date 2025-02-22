import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';

// Carrega os dados do JSON
const crocodiles = new SharedArray('crocodiles', function () {
    return JSON.parse(open('../data/crocodiles.json')); // Lê o arquivo JSON
});
let index = 0;

export const options = {
    stages: [
        { duration: '10s', target: 10 }, // Ramp-up: sobe de 1 para 10 VUs em 10 segundos
        { duration: '10s', target: 10 }, // Mantém 10 VUs por 10 segundos
        { duration: '10s', target: 0 },  // Ramp-down: reduz de 10 para 0 VUs em 10 segundos
    ],
    thresholds: {
        checks: ['rate > 0.99'],
        http_req_duration: ['p(99) < 400'],
    }
};

export default function () {
  const id = crocodiles[index].id; // Pega o próximo ID da lista
  const url = `https://test-api.k6.io/public/crocodiles/${id}`;

  console.log(`Fazendo requisição para: ${url}`);

  const res = http.get(url);
  check(res, {
      'is status 200': (r) => r.status === 200,
  });

  sleep(1);

  // Atualiza o índice para o próximo ID (e reinicia se chegar ao final)
  index = (index + 1) % crocodiles.length;
}
