const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const Tagmany = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(Tagmany);
  } catch (err) {
    res.status(500).json(err);
  }
  });
  
router.get('/:id', async (req, res) => {
  try {
    const Tagsingle = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!Tagsingle) {
      res.status(404).json({ message: 'No Tag found with that id!' });
      return;
    }

    res.status(200).json(Tagsingle);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const tagNew = await Tag.create({tag_name:req.body.tag_name});
    res.status(201).json(tagNew);
  } catch (err) {
    res.status(400).json(err);
  }
});
  // create a new tag

router.put('/:id', async (req, res) => {
  try {
    const tagUpdate = await Tag.update(
      {tag_name: req.body.tag_name
  },
  {
    where: {
      id: req.params.id,
    }
    })

      res.status(201).json(tagUpdate);
    } catch (err) {
      res.status(400).json(err);
    }
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const tagDestroy = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagDestroy) {
      res.status(404).json({ message: 'No Tag found with that id!' });
      return;
    }
    res.status(200).json(tagDestroy);
  } catch (err) {
    res.status(500).json(err);
  }
  // delete on tag by its `id` value
});

module.exports = router;
