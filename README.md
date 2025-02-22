
# k6 Performance Test

Este repositório contém scripts de teste de performance utilizando o [k6](https://k6.io/). 
Ele foi configurado para realizar testes de carga e performance com funcionalidades estendidas através do [xk6](https://github.com/grafana/xk6).

## Requisitos

Antes de rodar os testes, certifique-se de ter os seguintes pré-requisitos instalados:

1. **[k6](https://k6.io/docs/getting-started/)**: Ferramenta de código aberto para teste de performance.
   - **Windows**: Você pode instalar o k6 usando o [Chocolatey](https://chocolatey.org):
     ```bash
     choco install k6
     ```
   - **Linux**: Para distribuições baseadas em Debian/Ubuntu, use o `apt`:
     ```bash
     sudo apt install k6
     ```
   - **macOS**: Utilize o [Homebrew](https://brew.sh):
     ```bash
     brew install k6
     ```

2. **Extensões (se necessário)**: Caso você precise rodar testes que envolvam a geração de dados com a extensão `xk6-faker`, será necessário compilar uma versão customizada do `k6` com a extensão. 

   **Instalando o xk6-faker**:
   Para usar a extensão `xk6-faker`, será necessário compilar uma versão do `k6` com a extensão desejada. Aqui estão os passos:

   1. Clone o repositório do `k6`:
      ```bash
      git clone https://github.com/grafana/k6.git
      cd k6
      ```

   2. Compile o `k6` com o `xk6-faker`:
      ```bash
      xk6 build --with github.com/grafana/xk6-faker
      ```

   3. O comando acima irá gerar o binário `k6` com a extensão `xk6-faker` habilitada. Agora, você pode usar este binário para rodar seus testes.

   **Observação**: Se não precisar de nenhuma extensão personalizada, basta instalar a versão padrão do `k6` e você poderá rodar os testes sem problemas.

## Clonando o Repositório

Para começar, clone o repositório do projeto para sua máquina:

```bash
git clone https://github.com/seu-usuario/k6-performance-test.git
```

Acesse o diretório do projeto:

```bash
cd k6-performance-test
```

## Executando os Testes

Os scripts de teste estão localizados na pasta `scripts/` do repositório. Siga os passos abaixo para executar os testes:

1. Navegue até a pasta onde o script de teste está localizado:
   
   ```bash
   cd scripts
   ```

2. Execute o script de teste com o `k6`:

   ```bash
   ./k6 run nome-do-script.js
   ```


