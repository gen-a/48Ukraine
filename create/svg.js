const svgr = require('@svgr/core').default;
const path = require('path');
const fs = require('fs');
const config = require('./config.json').svg;

const placeholderForRemovingProp = '------';
// build object for removing props
const svgProps = {};
config.svgPropsToRemove.forEach((key) => {
  svgProps[key] = placeholderForRemovingProp;
});
// collect files
const files = fs.readdirSync(config.sourceDir);
// handle filed
files.forEach((file) => {
  const [name, ext] = file.split('.');

  if (ext === 'svg') {
    // generate name
    const camelCased = name.replace(/-([a-z])/g, g => g[1].toUpperCase());
    const compName = camelCased.substr(0, 1).toUpperCase() + camelCased.substr(1);
    const svgFile = path.resolve(config.sourceDir, `./${file}`);
    // create js code from svg
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

      Object.keys(svgProps).forEach((prop) => {
        jsCode = jsCode.replace(new RegExp(` ${prop}="${svgProps[prop]}"`, 'gi'), '');
      });

      jsCode = jsCode
        .replace(new RegExp('\\sfill="[^"]+"', 'gi'), '')
        .replace(new RegExp('"react"', 'gi'), '\'react\'');

      fs.writeFileSync(path.resolve(config.destDir, `./${compName}.js`), `${jsCode}\n`, (err) => {
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
