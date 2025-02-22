import http from 'k6/http';
import { check, sleep } from 'k6';
import faker from "k6/x/faker";

export const options = {
  stages: [{ duration: '10s', target: 2 }],
  thresholds: {
      checks: ['rate > 0.95'],
      http_req_failed: ['rate < 0.01'],
      http_req_duration: ['p(80) < 3000']
  }
}

export default function () {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const password = faker.internet.password();
  const email = `${firstName.toLowerCase()}${lastName.toLowerCase()}_test@mail.com`;
  const BASE_URL = 'https://test-api.k6.io';

  console.log(firstName);
  console.log(lastName);
  console.log(email);
  console.log(password);

  const res = http.post(`${BASE_URL}/user/register/`, {
      username: firstName,
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password
  });

  check(res, {
      'sucesso ao registar': (r) => r.status === 201
  });

  sleep(1)
}

