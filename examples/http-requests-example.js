import http from 'k6/http';

export default function() {
    http.get('https://httpbin.org/get');
    http.post('https://httpbin.org/post');
    http.put('https://httpbin.org/put');
    http.patch('https://httpbin.org/patch');
    http.delete('https://httpbin.org/delete');
}

