import Crypto from '../entity/Crypto.js';
import CryptoRepository from '../repository/CryptoRepository.js';

class CryptoService {
  constructor({ repository } = {}) {
    this.repository = repository || new CryptoRepository();
  }
  async *list() {
    // TODO: implementar generator que chama a repository fazendo a paginação
    let page = 1;
    const limit = 5;
    while (true) {
      const { data } = await this.repository.listAll(page, limit);
      yield data.map(item => new Crypto(item));

      page += 1;
    }
  }
}

export default CryptoService;
