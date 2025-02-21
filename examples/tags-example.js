import { group, check } from 'k6';
import http from 'k6/http';

export const options = {
    vus: 1,
    duration: '3s',
    tags:{
        name: 'my-test'
    },
    thresholds:{
        'http_req_duration{tipo:search-all}': ['p(95) < 500']
    }
}

const id = 7;

export default function () {
    group('exemple post', function () {
        const res = http.get(`https://test-api.k6.io/public/crocodiles/`, {
            tags:{
                tipo: "search-all"
            }
        });
        check(res, {
          'is status 200': (r) => r.status === 200,
        });
    });
    group('exemple post id', function () {
        const res2 =http.get(`https://test-api.k6.io/public/crocodiles/${id}`);
        check(res2, {
            'is status 200': (r) => r.status === 200,
          });
    });
}

