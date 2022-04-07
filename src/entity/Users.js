import User from './User.js';

// TODO: Criar um Symbol para a propriedade privada 'kUsers'
const kUsers = Symbol('kUsers');
class Users {
  constructor() {
    // TODO: inicializar a propriedade privada 'kUsers' como uma estrutura importante vista no curso
    this[kUsers] = new Set();
    /*
      (Desafio opcional): Compensaria usar um WeakSet nesse caso?
      Resposta: não, nesse caso mesmo que o fato do WeakSet lidar apenas com coleções de objetos e não valores arbitrários de qualquer tipo não seja um 
      problema para a nossa implementação, o fato dos objetos nas coleções serem mantidos "fracamente" pode trazer efeitos colaterais inesperados, já que 
      quando não há outra referência para um objeto mantido no WeakSet, ele pode ser coletado pelo Garbage collector (gerenciador de memória).
      */
  }

  add(userRaw) {
    const user = new User(userRaw);
    // TODO: inserir valor na estrutura escolhida.
    this[kUsers].add(new User(user));
  }

  hasUsers() {
    // TODO: Como saber se tem informação dentro da estrutura escolhida?
    return this[kUsers].size > 0;
  }

  // TODO: Me parece que o objeto gerado precisa ser iterável 🤔
  *[Symbol.iterator]() {
    for (const user of this[kUsers]) {
      yield user;
    }
  }
}

export default Users;
