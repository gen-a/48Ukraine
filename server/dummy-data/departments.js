const path = require('path');
const fs = require('fs');
const { toCamel } = require(path.resolve(__dirname, '../lib/string'));

const departments = JSON.parse(fs.readFileSync(path.resolve(__dirname, './departments.json'), 'utf8'));

const existing = [];

const converted = departments.map((record) => {
  const result = {};
  existing.push(record.id);

  Object.keys(record).forEach((key) => {
    result[toCamel(key)] = record[key];
  });
  return result;
});

fs.writeFile(path.resolve(__dirname, './departments.json'), JSON.stringify(converted), (err) => {
  if (err) throw err;
  console.log('Data written to file');
});

