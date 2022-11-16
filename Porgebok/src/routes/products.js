import { Router } from 'express';
import { Category, Product, User } from '../../db/models';

const router = Router();

router.get('/', async (req, res) => {
  const allProducts = await Product.findAll({
    include: [Category, User],
    order: [
      ['id', 'ASC'],
    ],
  });
  const allCats = await Category.findAll({
    order: [
      ['id', 'ASC'],
    ],
  });
  res.render('Layout', { allCats, allProducts });
});

router.route('/cats/:id')
  .get(async (req, res) => {
    const oneCat = await Category.findOne({ where: { id: req.params.id } });
    res.render('Layout', { oneCat });
  });

router.route('/prods/:id')
  .get(async (req, res) => {
    const oneProd = await Product.findOne({
      include: [Category, User],
      where: { id: req.params.id },
    });
    res.render('Layout', { oneProd });
  });

export default router;
