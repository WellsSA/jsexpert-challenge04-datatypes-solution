class User {
  constructor({ id }) {
    this.id = id;
  }
  // TODO: Alguma manipulação a fazer considerando que o objeto gerado será constantemente escrito em tela?
  // Não chega a ser usado na aplicação, mas está aqui para fins didáticos :)
  get [Symbol.toStringTag]() {
    return 'USER';
  }

  // TODO: Alguma manipulação a fazer considerando que o objeto gerado será constantemente escrito em tela?
  [Symbol.toPrimitive](coercionType) {
    if (coercionType !== 'string') throw new TypeError();

    return `[id=${this.id}]`;
  }
}

export default User;
