const router = require('express').Router();
const { Category, Product } = require('../../models');


//Api route to get all categories
router.get('/', async (req, res) => {
  try {
    const Categorymany = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(Categorymany);
  } catch (err) {
    res.status(500).json(err);
  }
  });
 
  //Api route to get a single category
router.get('/:id', async (req, res) => {
  try {
    const Categorysingle = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    if (!Categorysingle) {
      res.status(404).json({ message: 'No Category found with that id!' });
      return;
    }

    res.status(200).json(Categorysingle);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Api route to create a category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Api route to update a category
router.put('/:id', async (req, res) => {
  try {
  const categoryUpdate = await Category.update(
    {category_name: req.body.category_name
},
{
  where: {
    id: req.params.id,
  }
  })
    res.status(200).json(categoryUpdate);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Api route to delete a category
router.delete('/:id', async (req, res) => {
  try {
    const Categorydestroy = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!Categorydestroy) {
      res.status(404).json({ message: 'No Category found with that id!' });
      return;
    }
    res.status(200).json(Categorydestroy);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
