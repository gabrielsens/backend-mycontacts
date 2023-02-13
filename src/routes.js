const { Router } = require('express');
const CategoryController = require('./app/controllers/CategoryController');
const ContactController = require('./app/controllers/ContactController');

const router = Router();

// Contacts
router.use((request, response, next) => {
  // Middleware 1
  request.appId = 'meuApp';
  next();
});
router.get(
  '/contacts',
  (request, response, next) => {
    // Middleware 1
    request.appId = 'meuApp2';
    next();
  },
  ContactController.index,
);
router.get('/contacts/:id', ContactController.show);
router.delete('/contacts/:id', ContactController.delete);
router.post('/contacts', ContactController.store);
router.put('/contacts/:id', ContactController.update);

// Category
router.get('/categories', CategoryController.index);

router.post('/categories', CategoryController.store);

module.exports = router;
