/*const readline = require("readline");
const leitor = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

leitor.question("Qual módulo pra ler dados no node.js? ", function (resposta) {
    console.log("\nSua resposta '" + resposta );
    leitor.close();
});*/

/*const fs = require("fs");

fs.readFile("nums.txt", "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return
    }
    console.log(data);
});*/

const readline = require("readline");
const fs = require("fs");

const leitor = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

leitor.question("Digite um número: ", (numeroEscolhido) => {

  fs.readFile("nums.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Erro ao ler o arquivo:", err);
      leitor.close();
      return;

    }

    
    const numeros = data.trim().split("\n").map(Number);
    const resultado = numeros.reduce((acc, num) => acc + num, Number(numeroEscolhido));

    console.log("Meu resultado foi: ", resultado);

    leitor.close();

  });
});