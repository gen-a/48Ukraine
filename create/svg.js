const svgr = require('@svgr/core').default;
const path = require('path');
const sourceDir = path.resolve(__dirname, '../~source/svg-source');
const destDir = path.resolve(__dirname, '../~source/components');
const fs = require('fs');

const files = fs.readdirSync(sourceDir);

const svgProps = {
  viewBox: '------',
  enableBackground: '------',
  xmlSpace: '------',
  id: '------',
  x: '------',
  y: '------'
};


files.forEach((file) => {
  const [name, ext] = file.split('.');

  if (ext === 'svg') {
    const camelCased = name.replace(/-([a-z])/g, g => g[1].toUpperCase());
    const compName = camelCased.substr(0, 1).toUpperCase() + camelCased.substr(1);
    const svgFile = path.resolve(sourceDir, `./${file}`);

    if (fs.lstatSync(svgFile).isFile()) {
      const svgCode = fs.readFileSync(svgFile, 'utf8');
      let jsCode = svgr.sync(
        svgCode,
        {
          icon: true,
          dimensions: false,
          replaceAttrValues: { fill: 'new' },
          svgProps
        },
        { componentName: compName }
      );

      Object.keys(svgProps).forEach(prop => {
        jsCode = jsCode.replace(new RegExp(` ${prop}="${svgProps[prop]}"`, 'gi'), '');
      });

      jsCode = jsCode
        .replace(new RegExp('\\sfill="[^"]+"', 'gi'), '')
        .replace(new RegExp('"react"', 'gi'), '\'react\'');

      fs.writeFileSync(path.resolve(destDir, `./${compName}.js`), `${jsCode}\n`, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`The file ${compName} has been created`);
        }
      });
    }
  }
});

process.exit();
