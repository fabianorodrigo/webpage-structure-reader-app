const fs = require("fs");
const path = require("path");
const { exec } = require('child_process');

const { leParametrosEntrada } = require("./utils");
const ChromeDriver = require("./ChromeDriver");

/*
// valida parâmetros de entrada
const params = leParametrosEntrada(process.argv);

const appTecnologia = JSON.parse(fs.readFileSync(params.pathAppTecnologia));

Object.keys(appTecnologia.tecnologias).forEach((gerador) => {
    const indexGerador = path.join("node ./geradores/", gerador, "index.js");

    exec(`${indexGerador} ${params.pathAppTecnologia} ${params.diretorioDestino}`, (err, stdout, stderr) => {
        if (err) {
            console.error(`exec error: ${err}`);
            return;
        }
        if (stdout) {
            console.log(`saída ${stdout}`);
        }
        if (stderr) {
            console.log(`erro ${stderr}`);
        }
    });
})*/

const chrome = new ChromeDriver(`http://sad.ancine.gov.br`);
chrome.carrega().then(html => {
    console.log(html);
});



//const intervalApp = setInterval(() => { }, 10000);