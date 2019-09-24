import * as Yup from 'yup';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

import User from '../models/User';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email(),
      password: Yup.string().required(),
    });

    // # Verifica se os dados passados estão no formato correto
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, password } = req.body;

    // verifica se usuário passado existe
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // verifica a senha
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign(
        // Gera o token
        {
          // inclue mais informações no token
          id,
        },
        // string único
        authConfig.secret,
        {
          // configurações do token
          expiresIn: authConfig.expiresIn,
        }
      ),
    });
  }
}

export default new SessionController();
