const path = require('path');
const fs = require('fs');
const { toCamel } = require(path.resolve(__dirname, '../lib/string'));

const products = JSON.parse(fs.readFileSync(path.resolve(__dirname, './products.json'), 'utf8'));

const fileName = ( src ) => {
  const parts = src.split('/');
  return `${parts[3]}-${parts[4]}`;
};

const converted = products.map((record) => {
  const result = {};
  Object.keys(record).forEach((key) => {
    result[toCamel(key)] = record[key];
  });
  return { ...result, image: fileName(record['image:src']) };
});

converted.forEach((p)=>{
  const src = path.resolve(__dirname, `../../../48Ukraine-tmp/${p['image:src']}`);
  const dst = path.resolve(__dirname, `../../public/images/products/${p.image}`);
  fs.createReadStream(src).pipe( fs.createWriteStream(dst) );
});

fs.writeFile(path.resolve(__dirname, './products.json'), JSON.stringify(converted), (err) => {
  if (err) throw err;
  console.log('Data written to file');
});




