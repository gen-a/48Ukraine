const path = require('path');
const fs = require('fs');
const config = require('./config.json');
const props = {};

// extract args form command line
process.argv.forEach((value) => {
  const matches = value.match(/--([^=]+)=([^\s]+)/);
  if (matches !== null) {
    const [, a, b] = matches;
    props[a] = b;
  }
});

if (!props.dir) {
  console.log('Component name argument as --dir=DirectoryNameOfTheComponents is required');
  process.exit();
}


// collect files

const dir = path.resolve(__dirname, `../${config.path}/${props.dir}`);
const files = fs.readdirSync(dir);
const jsImport = [];
const jsObject = [];

// handle filed
files.forEach((file) => {
  if (fs.lstatSync(`${dir}/${file}`).isFile()) {
    const [name, ext] = file.split('.');
    if (ext === 'js' && name !== 'index') {
      // buils exports array
      jsImport.push(`import ${name} from './${name}';`);
      jsObject.push(name);
    }
  }
});


if (jsImport.length > 0) {
  fs.writeFileSync(
    `${dir}/index.js`,
    `${jsImport.join('\n')}\n\nconst data = {${jsObject.join(',\n  ')}\n};\n\nexport default data;\n`,

    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`The file ${props.dir}/index.js has been created`);
      }
    }
  );
} else {
  console.log('Nothing to export in give directory');
}
