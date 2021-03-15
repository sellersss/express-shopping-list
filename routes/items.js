const express = require('express')
const router = new express.Router()
const items = require('../utils/db')
const ExpressError = require('../utils/expressError')

// GET: /items requests list of all items
router.get('/', (req, res, next) => {
  try {
    const allItems = items.all()
    if (!allItems) {
      throw new ExpressError('No items found.', 204)
    } else {
      return res.status(200).json({
        'status': 200,
        'items': allItems,
      })
    }
  } catch (error) {
    return next(error)
  }
})

// POST: /items create new item from JSON body
router.post('/', (req, res, next) => {
  const newName = req.body.name || null
  const newPrice = req.body.price || null
  const convertedPrice = items.convertStringToNumber(newPrice)
  try {
    if (!newName || !newPrice || !convertedPrice) {
      throw new ExpressError('Item is not valid.', 400)
    } else {
      const newItem = items.add(newName, convertedPrice)
      res.status(201).json({
        'status': 201,
        'item': newItem,
      })
    }
  } catch (error) {
    return next(error)
  }
})

// GET: /items/:item request to get a certain item
router.get('/:item', (req, res, next) => {
  const item = req.params.item
  const getItem = items.get(item)
  try {
    if (!getItem) {
      throw new ExpressError('Item not in list.', 204)
    } else {
      return res.status(200).json({
        'status': 200,
        'item': getItem,
      })
    }
  } catch (error) {
    return next(error)
  }
})

// PATCH: /items/:item request to update item
router.patch('/:item', (req, res, next) => {
  const item = req.params.item
  const updatedName = req.body.name
  const updatedPrice = req.body.price || null
  const convertedPrice = items.convertStringToNumber(updatedPrice)
  try {
    if (convertedPrice) {
      const updatedItem = items.update(item, updatedName, convertedPrice)
      return res.status(200).json({
        'status': 200,
        'updated': updatedItem,
      })
    } else if (!updatedPrice) {
      const updatedItem = items.updateItem(item, updatedName)
      return res.status(200).json({
        'status': 200,
        'update': updatedItem,
      })
    } else if (!convertedPrice) {
      throw new ExpressError(`Price ${updatedPrice} must be a number.`, 400)
    }
  } catch (error) {
    return next(error)
  }
})

// DELETE: /items/:item request to remove item
router.delete('/:item', (req, res, next) => {
  const item = req.params.item
  try {
    if (!items.remove(item)) {
      throw new ExpressError('Item not in list', 204)
    } else {
      return res.status(200).json({
        'status': 200,
        'message': `${item} has been removed.`
      })
    }
  } catch (error) {
    return next(error)
  }
})

module.exports = router;
