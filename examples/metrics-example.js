import http from 'k6/http';
import { Counter, Gauge, Rate, Trend } from 'k6/metrics';

export const requests = new Counter('number_of_requests');
export const myGauge = new Gauge('time_blocked');
export const myRate = new Rate('request_rate_200');
export const myTrend = new Trend('response_time');

export const options = {
    vus: 1,
    duration: '3s'
};

export default function() {
    const res = http.get('http://test.k6.io');
    requests.add(1);
    myGauge.add(res.timings.blocked);
    myRate.add(res.status === 200);
    myTrend.add(res.timings.duration);
}
