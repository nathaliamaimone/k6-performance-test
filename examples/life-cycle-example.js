// Inicialização
import sleep from 'k6';

// Configuração 
export const options = {
    vus: 10,
    duration: '1m'
};

// Execução / Código VU
export default function() {
    console.log('Executando...');
    sleep(1);
}

// Finalização / Desmontagem
export function teardown(data) {
    console.log('Finalizando...');
    console.log(data);
}



