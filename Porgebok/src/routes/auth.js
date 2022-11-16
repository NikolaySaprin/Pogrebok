import { Router } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../../db/models';

const router = Router();

router.route('/registration')
  .get((req, res) => {
    res.render('Layout', {});
  })
  .post(async (req, res) => {
    const { name, password, email } = req.body;
    if (name && password && email) {
      try {
        const user = await User.create({
          ...req.body, password: await bcrypt.hash(password, 10),
        });
        const currUser = { id: user.id, name: user.name };
        req.session.user = currUser;
        return res.json(currUser);
      } catch {
        return res.status(500).json({ message: 'Ошибка сервера' });
      }
    } else {
      return res.status(401).json({ message: 'Заполните все поля: имя, email и пароль' });
    }
  });

router.route('/authorization')
  .get((req, res) => {
    res.render('Layout', {});
  })
  .post(async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      try {
        const user = await User.findOne({ where: { email } });
        if (user && await bcrypt.compare(password, user.password)) {
          const currUser = { id: user.id, name: user.name };
          req.session.user = currUser;
          return res.json(currUser);
        }
        return res.status(400).json({ message: 'Неверный email или пароль' });
      } catch {
        return res.status(500).json({ message: 'Ошибка сервера' });
      }
    }
    return res.status(401).json({ message: 'Введите email и пароль' });
  });

router.get('/logout', (req, res) => {
  res.clearCookie('sid'); // Удалить куку
  req.session.destroy(); // Завершить сессию
  res.sendStatus(200);
});

export default router;
