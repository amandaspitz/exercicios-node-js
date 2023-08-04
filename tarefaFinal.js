const fs = require('fs');
const readline = require('readline');
const { EventEmitter } = require('events');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ee = new EventEmitter();

function processLines(arquivoTexto) {
  let linhasNumeros = 0;
  let linhasTexto = 0;
  let tempoComeco = process.hrtime();

  const readStream = fs.createReadStream(arquivoTexto, 'utf8');

  readStream.on('data', (texto) => {
    const linhas = texto.split('\n');

    linhas.forEach((linha) => {
      linha = linha.trim();

      if (/^\d+$/.test(linha)) {
        linhasNumeros += parseInt(linha);
      } else if (linha !== '') {
        linhasTexto++;
      }
    });
  });

  readStream.on('end', () => {
    let tempoFim = process.hrtime(tempoComeco);
    let tempoExecucao = (tempoFim[0] + tempoFim[1] / 1e9).toFixed(2);

    ee.emit('resumo', {
      linhasNumeros,
      linhasTexto,
      tempoExecucao,
    });
  });
}

rl.question('Qual é o arquivo de texto que deseja ler?', (arquivoTexto) => {
  processLines(arquivoTexto);
});

ee.on('resumo', (resumo) => {
  console.time();
  console.log(`O arquivo possui ${resumo.linhasTexto} linhas de texto`);
  console.log(`A soma dos números é ${resumo.linhasNumeros}`);
  console.log(`Tempo de execução: ${resumo.tempoExecucao}`);
  console.timeEnd();

  rl.question('Deseja executar novamente? (S/N): ', (resposta) => {
    if (resposta.trim().toLowerCase() === 's') {
      rl.question('Digite o caminho do novo arquivo: ', (arquivoTexto) => {
        processLines(arquivoTexto);
      });
    } else {
      rl.close();
    }
  });
});