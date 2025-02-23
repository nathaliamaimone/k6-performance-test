import http from 'k6/http';
import { check, sleep } from 'k6';
import faker from "k6/x/faker";

export const options = {
    stages: [
        { duration: '10s', target: 2 },
        { duration: '10s', target: 3 },
        { duration: '10s', target: 0 }

    ],
    thresholds: {
        checks: ['rate > 0.95'],
        http_req_failed: ['rate < 0.01'],
    }
};

const BASE_URL = 'https://test-api.k6.io';

// Função para criar um usuário e retornar seus dados
function createUser() {
    const firstName = faker.person.firstName().toLowerCase();
    const lastName = faker.person.lastName().toLowerCase();
    const password = faker.internet.password();
    const username = `${firstName}_${lastName}`;
    const email = `${username}_test@mail.com`;

    console.log(`Criando usuário: ${username}`);

    const res = http.post(`${BASE_URL}/user/register/`, {
        username: username,
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password
    });

    check(res, { 'Usuário criado com sucesso': (r) => r.status === 201 });

    if (res.status !== 201) {
        console.error(`Erro ao criar usuário: ${res.body}`);
        return null;
    }

    sleep(1);

    return { username, password };
}

// Função para realizar login com um usuário existente
function loginUser(username, password) {
    console.log(`Realizando login com: ${username}`);

    const res = http.post(`${BASE_URL}/auth/token/login/`, {
        username: username,
        password: password
    });

    check(res, { 
        'Login realizado com sucesso': (r) => r.status === 200,
        'Token de autenticação presente': (r) => r.json('token') != ''
    });

    if (res.status !== 200) {
        console.error(`Erro ao realizar login: ${res.body}`);
    }

    sleep(1);
}

// Fluxo principal do teste
export default function () {
    const user = createUser();

    if (user) {
        loginUser(user.username, user.password);
    }
}
