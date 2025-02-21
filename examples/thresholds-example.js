import http from 'k6/http';
import { check } from 'k6';

export const options = {
    vus: 3,
    duration: '30s', 
    thresholds: {
        http_req_failed: ['rate < 0.01'],
        http_req_duration: [ { threshold: 'p(95) < 500', abortOnFail: true, delayAbortEval: '7s' } ],
        checks: ['rate < 0.99']
    }
};

export default function() {
    const res = http.get('http://test.k6.io');

    check(res, {
        'status was 200': r => r.status === 200
    });
}