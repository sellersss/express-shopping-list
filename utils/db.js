class Items {
  constructor() {
    this.items = []
  }
  add(name, price) {
    let newItem = {
      'name': name,
      'price': price,
    }
    this.items.push(newItem)
    return newItem
  }
  all() {
    if (this.items === undefined || this.items.length == 0) {
      throw { message: 'Not Found', status: 404 }
    }
    return this.items
  }
  remove(name) {
    let response = false
    this.items.forEach((item, index) => {
      if (item.name === name) {
        this.items.splice(index, 1)
        response = true
      } else if (name === undefined) {
        throw { message: 'Not Found', status: 404 }
      }
    })
    return response
  }
  get(name) {
    let foundItem = null
    this.items.forEach((item) => {
      if (item.name === name) {
        foundItem = item
      } else if (name === undefined) {
        throw { message: 'Not Found', status: 404 }
      }
    })
    return foundItem
  }
  update(name, newName, newPrice) {
    let updatedItem = null

    this.items.forEach(item => {
      if (item.name === name) {
        item.name = newName || item.name
        item.price = newPrice || item.price
        updatedItem = item
      } else if (name === undefined) {
        throw { message: 'Not Found', status: 404 }
      }
    })
    return updatedItem
  }
  convertStringToNumber(string) {
    let valToNum = Number(string)

    if (Number.isNaN(valToNum)) {
      return null
    } else {
      return valToNum
    }
  }
  reset() {
    this.items.length = 0
  }
}

const items = new Items()
const testItems = new Items()
items.add('Avocado', 2.15)
items.add('Cherries', 5.59)
items.add('Tobasco', 4.59)
items.add('Baguette', 1.50)

module.exports = items, testItems
