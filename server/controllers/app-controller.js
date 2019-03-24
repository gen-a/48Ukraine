const path = require('path');
const fs = require('fs');
const axios = require('axios');
const { response } = require('../lib/response');
const { arrayToTree } = require('../lib/data-tree');


const mapListedSections = (data) => {
  const icons = {
    'myasna-produkciya': 'IconMeats',
    'molochna-produkciya': 'IconCheese',
    'ovochi-ta-frukty': 'IconVegetables',
    'bakaliya': 'IconGrocery',
    'konservaciya': 'IconCannedFood',
    'ryba-moreprodukty': 'IconFish',
    'kondyterski-vyroby': 'IconSweets',
    'kava-chaj': 'IconCoffee',
    'sneki': 'IconSnacks',
    'bezalhoholni-napoyi': 'IconSoftDrinks',
    'dytyache-xarchuvannya': 'IconBabyFood',
    'vitaminy': 'IconVitamins',
    'lystivky': 'IconCards',
    'tovary-dlya-ditej': 'IconGoodsForKids',
    'kolhoty-shkarpetky': 'IconSocks',
    'tovary-dlya-kuxni': 'IconGoodsForKitchen',
    'zasoby-hihiyeny': 'IconHygiene',
    'pobutova-ximiya': 'IconHouseholdChemicals',
    'korm-dlya-domashnix-tvaryn': 'IconPetFood',
    'kancelyarski-tovary': 'IconStationery',
    'alkohol': 'IconAlcohol'
  };

  return data.map(s => ({
    id: s.id,
    position: parseInt(s.position, 10),
    parent: s.parent,
    nameInUrl: s.name_in_url,
    icon: icons[s.name_in_url] || '',
    isPrimary: s.is_primary === '1',
    name: s.name,
    productsQuantity: parseInt(s.products_quantity, 10),
  }));
};

/**
 * Collect and send initial state data
 * @param req {object}
 * @param res {object}
 * @param next {Function}
 */
exports.initialState = (req, res, next) => {
  axios({
    url: 'http://48ukraine.co/data/sections',
    method: 'get',
    data: {}
  })
    .then(result => result.data)
    .then(({data, message, error}) => {
      res.status(200).json(response({
        user: req.user,
        departments: arrayToTree(mapListedSections(data))
      }, message, error));
      return next();
    })
    .catch((err) => {
      res.status(500).json({ error: err });
      next();
    });
};
