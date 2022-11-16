export const localsMiddle = (req, res, next) => {
  res.locals.user = req.session.user;
  next();
};

export const deleteProtect = (req, res, next) => {
  // Вопрос нужен чтобы убедиться, что это свойство не undefined
  if (req.session?.user) {
    return next();
  }
  return res.status(401).json({ message: 'Пользователь не авторизирован' });
};
