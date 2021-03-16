const router = require('express').Router();
const { Category, Product } = require('../../models');
const sequelize = require('../../config/connection');
// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    attributes: [
      'id',
      'category_name'
    ],
    include: [
      {
        model: Product,
        attributes: ['id', 'Product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  .then(dbPostData => res.json(dbPostData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.get('/:id', (req, res) => {
 Category.findOne({
   where: {
     id: req.params.id
   },
   attributes: [
     'id',
     'category_name'
   ],
   include: [
     {
       model: Product,
       attributes: ['id', 'Product_name', 'price', 'stock', 'category_id']
     }
   ]
 })
 .then(dbPostData => {
   if (dbPostData) {
     res.status(404).json({message: 'No post found with this id'});
     return;
   }
   res.json(dbPostData);
 })
 .catch(err => {
   console.log(err);
   res.status(500).json(err)
 });
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
  .then(dbcommentData => res.json(dbcommentData))
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.put('/:id', (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  ).then(dbPostData => {
    if(!dbPostData) {
      res.status(404).json({message: 'No poist found with this id'});
      return;
    }
    res.json(dbPostData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
 Category.destroy({
   where: {
     id: req.params.id
   }
 })
 .then(dbPostData => {
   if (!dbPostData) {
     res.status(404).json({message: 'No post found with this id'});
     return;
   }
   res.json(dbPostData);
 })
 .catch(err => {
   console.log(err);
 });
});

module.exports = router;
