'use strict';
const { Builder, By, Capabilities, until } = require('selenium-webdriver');
const { requiredParam } = require("./utils");

class ChromeDriver {

    constructor(url) {
        this._url = url;
    }

    get url() {
        return this._url;
    }

    async carrega() {
        const tags = ['INPUT', 'select', 'textArea'];
        //const html = await (async function runWebDriver(url) {
        const retorno = [];
        var chromeCapabilities = Capabilities.chrome();
        //setting chrome options to start the browser fully maximized
        var chromeOptions = {
            'args': ["--no-sandbox", "--disable-dev-shm-usage"]
        };
        chromeCapabilities.set('chromeOptions', chromeOptions);
        let driver = await new Builder().withCapabilities(chromeCapabilities).forBrowser('chrome').build();
        await driver.manage().setTimeouts({ implicit: 10000, pageLoad: 100000 }); //espera 10 segundos para toda chamada
        try {
            await driver.get(this.url);
            await driver.sleep(3000);
            //const elementosBody = await driver.findElements(By.xpath(`.//input[@type != 'hidden']`));
            const elementosBody = await driver.findElements(By.xpath(`.//*[@type = 'text' or @type = 'password' or @class = 'botao_texto']`));
            //const x = await driver.findElement(By.id('x'));
            //x.get
            console.log('Elementos Filhos Body', elementosBody.length)
            const inputs = await this.obtemElementosFilhosPorTag({ elementos: elementosBody, tags: tags });
            for(let i = 0; i < inputs.length;i++){
                const nomeInput = await inputs[i].getAttribute('name');
                const tagInput = await inputs[i].getAttribute('tagName');
                const typeInput = await inputs[i].getAttribute('type');
                console.log(tagInput, typeInput, nomeInput);
            }
        }
        catch (e) {
            console.error(e);
        }
        finally {
            await driver.quit();
        }
        //})(this.url);
        //console.log(html)
    }

    async obtemElementosFilhosPorTag({ elementos = requiredParam('Elementos analisados devem ser informados'), tags = null }) {
        const retorno = [];
        try {
            for (let i = 0; i < elementos.length; i++) {
                const filho = await elementos[i];
                if (tags == null || tags.find(async tagDeInteresse => {
                    const tagDoFilho = await filho.getAttribute('tagName');
                })) {
                    retorno.push(filho);
                    /*const netos = await filho.findElements(By.xpath(`.//*`));
                    const filhoId = await filho.getId();
                    console.log('ID:', filhoId, netos.length);
                    if (netos.length > 0) {
                        const resultFilhos = await this.obtemElementosFilhosPorTag({ elementos: netos, tags: tags });
                        retorno.concat(resultFilhos);
                    }*/
                }
            }
            return retorno;
        } catch (e) {
            console.error(e);
        }
    }
}

module.exports = ChromeDriver;