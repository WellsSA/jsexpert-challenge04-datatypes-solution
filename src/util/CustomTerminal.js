import DraftLog from 'draftlog';
import chalkTable from 'chalk-table';
import chalk from 'chalk';
import readline from 'readline';
import asciichart from 'asciichart';
import terminalConfig from '../config/terminal.js';

const TABLE_OPTIONS = terminalConfig.table;

const kPrint = Symbol('kPrint');

// TODO: Criar um Symbol para a propriedade privada 'kData'
const kData = Symbol('kData');

const kTerminal = Symbol('kTerminal');

class CustomTerminal {
  constructor() {
    this[kPrint] = {};

    // TODO: inicializar a propriedade privada 'kData' como uma estrutura importante vista no curso
    this[kData] = new Map();

    /*
    (Desafio opcional): Compensaria usar um WeakMap nesse caso?
    Resposta: não, pois além do WeakMap não ser enumerável (não permite listar as chaves e não implementa um iterator por padrão), 
    ele só aceita objetos como chave, o que influenciaria na busca das informações que precisamos. O que nos faria ter que desenvolver uma série de
    funcionalidades que o Map já traz por padrão.
    E olha que nem precisamos entrar no mérito das chaves serem sempre referências fracas (o Garbage collector considera que pode limpar elas se não 
    tiver ninguém usando - o que causaria alguns efeitos colaterais já que nesse caso esperamos sempre ter a informação lá)
    */

    this[kTerminal] = null;
  }

  initialize() {
    DraftLog(console).addLineListener(process.stdin);
    this[kTerminal] = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  draftTable() {
    // TODO: Parece que a linha a seguir precisa de um array gerado a partir dos valores da estrutura escolhida...🤔
    const data = Array.from(this[kData].values()); // ou [...this[kData].values()]
    const table = chalkTable(TABLE_OPTIONS, data);
    this[kPrint] = console.draft(table);
  }

  hasDataToPrint() {
    // TODO: Como saber se tem informação dentro da estrutura escolhida?
    return this[kData].size > 0;
  }
  /**
   * Dado um array de objetos, adiciona cada registro aos dados a serem impressos.
   * @param {Array<Crypto>} data
   */
  addDataToPrint(data) {
    // TODO: inserir valor na estrutura escolhida. // dica: talvez o data.id seja uma informação importante nesse trecho
    data.forEach(_data => this[kData].set(_data.id, _data));
  }

  getDataById(id) {
    // TODO: Pegar informação da estrutura escolhida.
    return this[kData].get(id);
  }

  removeDataById(id) {
    // TODO: Remove informação da estrutura escolhida.
    return this[kData].delete(id);
  }

  plotQuoteChart(data) {
    if (!data) return;
    const s0 = [
      ...Array.from({ length: 30 }, () => data.percent_change_90d),
      ...Array.from({ length: 30 }, () => data.percent_change_60d),
      ...Array.from({ length: 30 }, () => data.percent_change_30d),
      ...Array.from({ length: 7 }, () => data.percent_change_7d),
      data.percent_change_24h,
    ];
    this.print(asciichart.plot(s0));
  }

  print(message) {
    this[kPrint] = console.log(message);
  }

  printSuccess(message) {
    this.print(chalk.green(message));
  }

  printInfo(message) {
    this.print(chalk.cyan(message));
  }

  printError(message) {
    this.print(chalk.red(message));
  }

  async readLine(label = '') {
    return new Promise(resolve => this[kTerminal].question(label, resolve));
  }

  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  close() {
    this[kTerminal].close();
  }
}

export default CustomTerminal;
