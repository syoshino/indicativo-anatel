# indicativo-anatel
Crawler do site consulta de indicativos da Anatel, para ajudar a obter um Indicativo disponível para Rádio amador. 
Com base na dificuldade em obter no site da Anatel um Indicativo válido, resolvi criar este script que retornará a situação de cada indicativo, a partir do prefixo que deseja consultar.


## O que é o Indicativo da Anatel?

O Indicativo da Anatel é um código alfanumérico único atribuído a cada estação de radiocomunicação no Brasil. Ele é utilizado para identificar legalmente equipamentos de radiocomunicação, como rádios amadores, estações de rádio e TV, entre outros.

# Pré-requisitos
 - Node.js instalado (versão 16 ou superior).
 - Puppeteer (para automação de navegador, se necessário).

## Como Usar

### 1. Clone o Repositório

```bash
git clone https://github.com/syoshino/indicativo-anatel.git
cd indicativo-anatel
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Execute o script passando o prefixo que deseja consultar
```bash
node consulta-indicativo-anatel.js PU2S
```
Neste caso, ele irá buscar no site todas as combinações de PU2SAA a PU2SZZ, informando sua disponibilidade, ou que já está reservada a algum radioamador.

## Contribuição

Contribuições são bem-vindas! Siga os passos abaixo:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature (git checkout -b feature/nova-feature).
3. Commit suas mudanças (git commit -m 'Adiciona nova feature').
4. Faça push para a branch (git push origin feature/nova-feature).
5. Abra um Pull Request.
