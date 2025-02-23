/**
 * @license
 * Copyright 2017 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Search developers.google.com/web for articles tagged
 * "Headless Chrome" and scrape results from the results page.
 */

'use strict';

const puppeteer = require('puppeteer');

(async () => {
  const args = process.argv.slice(1); 
  const browser = await puppeteer.launch({ slowMo: 50 });
  const page = await browser.newPage();
  const prefixo = args[1] || 'PU2';

  console.log(`Buscando combinacoes de Indicativo a partir do prefixo: "${prefixo}"`);

  await page.goto('https://sistemas.anatel.gov.br/easp/Novo/ConsultaIndicativo/Tela.asp');

  const combinacoes = gerarCombinacoes(6 - prefixo.length); 

  for (const sufixo of combinacoes) {
    await page.waitForSelector('#pIndicativo');

    let textBoxIndicativo = await page.$('#pIndicativo');

    // Workaround para permitir a seleção do campo de texto do indicativo, e a limpeza do mesmo, antes de digitar um novo indicativo.
    await textBoxIndicativo.click({ clickCount: 3 });
    await textBoxIndicativo.press('Backspace');

    await textBoxIndicativo.type(prefixo + sufixo);

    await page.click('#botaoFlatConfirmar');
    await page.waitForSelector('#botaoFlatTelaInicial');

    const valorCampoTabelaIndicativo = await page.evaluate(() => {
      //new Promise(r => setTimeout(r, 1000)); // Caso não esteja conseguindo obter o valor do campo centro, este workaround pode resolver.
      let campoTabelaIndicativo = document.querySelectorAll('.CampoCentro');
      if (campoTabelaIndicativo.length === 0) {
        return 'Indicativo disponível';
      }
      return campoTabelaIndicativo[0].innerText;
    });

    if (valorCampoTabelaIndicativo === '302 - Radioamador') {
      console.log('Radioamador já cadastrado: ' + prefixo + sufixo);
      await page.click('#botaoFlatTelaInicial');
    }
    else {
      console.log('Indicativo disponível ou inválido: ' + prefixo + sufixo);
      await page.click('#botaoFlatTelaInicial');
    }
  };
})();

function gerarCombinacoes(qtdCaracteres) {
  const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const combinacoes = [];

  // Função recursiva para gerar combinações
  function gerar(prefixo, tamanhoRestante) {
      if (tamanhoRestante === 0) {
          combinacoes.push(prefixo); // Adiciona a combinação ao array
          return;
      }

      for (let i = 0; i < letras.length; i++) {
          gerar(prefixo + letras[i], tamanhoRestante - 1); // Adiciona uma letra e chama recursivamente
      }
  }

  gerar('', qtdCaracteres); // Inicia a geração com um prefixo vazio
  return combinacoes;
}
