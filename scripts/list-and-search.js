import http from 'k6/http';

export const options = {
    scenarios:{
        listCrocodiles: {
            executor: 'constant-arrival-rate',
            exec: 'listCrocodiles',
            duration: '30s',
            rate: 200,
            timeUnit: '1s',
            preAllocatedVUs: 150,
            gracefulStop: '5s',
            tags: { test_type: 'list_crocodiles' },

        },
        searchByID: {
            executor: 'per-vu-iterations',
            exec: 'searchByID',
            vus: 50,
            iterations: 20,
            maxDuration: '1m',
            tags: { test_type: 'search_by_id' },
            gracefulStop: '5s'
        }
    },
    discardResponseBodies: true
}

const BASE_URL = 'https://test-api.k6.io';

export function listCrocodiles(){
    http.get(`${BASE_URL}/public/crocodiles/`);
};

export function searchByID(){
    if(__VU % 2 === 0){
        http.get(`${BASE_URL}/public/crocodiles/2`);
    }else{
        http.get(`${BASE_URL}/public/crocodiles/1`);
    }
};