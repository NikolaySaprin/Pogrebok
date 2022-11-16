import { Router } from 'express';
import { Category, Product, User } from '../../db/models';
import { deleteProtect } from '../middlewares';

const router = Router();

router.route('/cats')
  .get(async (req, res) => {
    const allCats = await Category.findAll({ order: [['id', 'ASC']] });
    res.json(allCats);
  })
  .post(deleteProtect, async (req, res) => {
    const currCat = await Category.create({ ...req.body });
    res.status(200).json(currCat);
  });

// категории
router.route('/cats/:id')
  .get(async (req, res) => {
    const oneCat = await Category.findOne({ where: { id: req.params.id } });
    res.json(oneCat);
  })
  .patch(deleteProtect, async (req, res) => {
    await Category.update({
      ...req.body,
    }, { where: { id: req.params.id } });
    res.sendStatus(200);
  })
  .delete(deleteProtect, async (req, res) => {
    await Category.destroy({ where: { id: req.params.id } });
    res.sendStatus(200);
  });

// продукты
router.route('/prods')
  .get(async (req, res) => {
    const allProducts = await Product.findAll({
      include: [Category, User],
      order: [
        ['id', 'ASC'],
      ],
    });
    res.json(allProducts);
  })
  .post(deleteProtect, async (req, res) => {
    const createdPord = await Product.create({ ...req.body, user_id: res.locals.user.id });
    const currProd = await Product.findOne({
      include: [Category, User],
      where: { id: createdPord.id },
    });
    res.status(200).json(currProd);
  });

router.route('/prods/:id')
  .get(async (req, res) => {
    const oneProd = await Product.findOne({
      include: [Category, User],
      where: { id: req.params.id },
    });
    res.json(oneProd);
  })
  .patch(deleteProtect, async (req, res) => {
    await Product.update({
      include: [Category, User],
      ...req.body,
    }, { where: { id: req.params.id, user_id: req.session.user.id } });
    res.sendStatus(200);
  })
  .delete(deleteProtect, async (req, res) => {
    await Product.destroy({ where: { id: req.params.id, user_id: req.session.user.id } });
    res.sendStatus(200);
  });

router.get('/gagaga/:id', async (req, res) => {
  const filteredProducts = await Product.findAll({
    where: { category_id: req.params.id },
    include: [Category, User],
    order: [
      ['id', 'ASC'],
    ],
  });
  res.json(filteredProducts);
});

export default router;
