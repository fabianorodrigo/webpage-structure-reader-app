/****
 * Agrega funções utilitárias consumidas ao longo do sistema
 */
const fs = require("fs")

module.exports.leParametrosEntrada = function (linhaComando) {
    if (linhaComando.length < 4) {
        throw new Error(`Alguns parâmetros mínimos são necessários para execução: 
                                1. Path do arquivo JSON de configuração da aplicação e suas tecnologias
                                2. Diretório onde os arquivos fonte gerados devem ser persistidos`);
    }
    const pathAppTecnologia = linhaComando[2];
    if (!fs.existsSync(pathAppTecnologia)) {
        throw new Error(`O arquivo JSON de configuração da aplicação e suas tecnologias não foi encontrado: ${pathAppTecnologia}`);
    }

    return {
        pathAppTecnologia: pathAppTecnologia,
        diretorioDestino: linhaComando[3]
    }
}

/**
 * Utilizando com padrão RORO, determina parâmetros mandatórios 
 * @param {*} param 
 */
module.exports.requiredParam = function requiredParam(param) {
    const requiredParamError = new Error(
        `Parâmetro obrigatório "${param}" não foi informado.`
    )
    // preserve original stack trace
    if (typeof Error.captureStackTrace === 'function') {
        Error.captureStackTrace(
            requiredParamError,
            requiredParam
        )
    }
    throw requiredParamError
}

/**
 * Copia as estrutura de propriedades do objeto {origem} para o objeto {destino}
 * 
 * @param {object} origem Objeto fonte das informações
 * @param {object} destino Objeto que será alterado
 * @param {Boolean} somenteNull Se TRUE (default) não sobrescreve propriedades que já existem
 */
module.exports.copiaPropriedades = function copiaPropriedades(origem, destino, somenteNull = true) {
    let retorno = destino;
    Object.keys(origem).forEach((prop) => {
        //Se o objeto de destino não tem a propriedade, copia
        if (retorno[prop] == null) {
            retorno[prop] = origem[prop];
        } else if (typeof (origem[prop]) == 'object') {
            retorno[prop] = copiaPropriedades(origem[prop], retorno[prop], somenteNull);
        } else if (!somenteNull) {
            retorno[prop] = origem[prop];
        }
    });
    return retorno;
}

