const { Router } = require ('express');
const itemService = require('../services/ItemService');

module.exports = Router()

    .post('/', async (req, res, next) => {

        itemService
            .create(req.body)
            .then(item => res.send(item))
            .catch(next);
    })

    .get('/', async (req, res, next) => {
        itemService
          .getAll()
          .then(items => res.send(items))
          .catch(next);
      })

      .get('/:id', async (req, res, next) => {
        itemService
          .getByID(req.params.id)
          .then(item => res.send(item))
          .catch(next);
      })

      .put('/:id', async (req, res, next) => {
        itemService
        .updateById(req.params.id, req.body)
        .then(item => res.send(item))
        .catch(next);
      })

      .delete('/:id', async (req, res, next) => {
        itemService
        .deleteById(req.params.id)
        .then(item => res.send(item))
        .catch(next);
      });