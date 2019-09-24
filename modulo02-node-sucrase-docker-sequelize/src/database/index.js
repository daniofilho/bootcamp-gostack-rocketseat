import Sequelize from 'sequelize';

// Models
import User from '../app/models/User';

import databaseConfig from '../config/database';

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    // Percorre cada model instanciado e os inicializa
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
