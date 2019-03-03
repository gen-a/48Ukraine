const path = require('path');
const fs = require('fs');
const config = require('./config.json');
const { replacements } = config;
const props = {};

// extract args form command line
process.argv.forEach((value) => {
  const matches = value.match(/--([^=]+)=([^\s]+)/);
  if (matches !== null) {
    const [, a, b] = matches;
    props[a] = b;
  }
});

if(process.argv.includes('--help')){

  console.log(' - for the functional component');
  console.log('node create --name=YourNewComponentName');

  console.log(' - for the stateful class component');
  console.log('node create --name=YourNewComponentName --type=class');

  console.log(' - for the container component');
  console.log('node create --name=YourNewComponentName --type=cont --wrap=WrappedComponent');

  console.log(' - for converting svg to component');
  console.log('node create/svg');

  console.log(' - for building export index.js for all components in dir');
  console.log('node create/index-js --dir=SvgDepartments');

  console.log(' - for building import to object with default export index.js for all components in dir');
  console.log('node create/index-to-object --dir=SvgDepartments');

  process.exit();
}


if(!props.name){
  console.log( 'Run with --help for commands list');
  process.exit();
}
if(props.name){
  if(props.name.match(/^[a-z]{1}[/a-z]*$/i) === null){
    console.log( 'Component name has to begin with letter and conatin only letters and / ');
    process.exit();
  }
}



const parts = props.name.split('/');
let dir = config.path;
if (parts.length) {
  parts.forEach((value) => {
    dir += `/${value}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  });
}

function className(name, caseType){
  return caseType === 'camel' ? name.slice(0, 1).toLowerCase() + name.slice(1) : name;
}

const type = props.type || config.default;

replacements.__pathToRoot__= `${'../'.repeat(parts.length)}`;

if(props.wrap && type === 'cont'){

  if(props.wrap.match(/^[a-z]{1}[/a-z]*$/i) === null){
    console.log( 'Component wrap has to begin with letter and conatin only letters and / ');
    process.exit();
  }

  replacements.__wrapComponentName__= props.wrap.split('/').pop();
  replacements.__wrapComponentPath__= `${replacements.__pathToRoot__}${props.wrap}`;

}

replacements.__componentName__ = parts.pop();
replacements.__className__ = className(replacements.__componentName__, config.conventions.classNameCase);

const files = [{ src: 'package.json', to: 'package.json' }];

if (type !== 'form' && type !== 'cont') {
  files.push({
    src: '__componentName__.scss', to: `${replacements.__componentName__}.scss`
  });
  files.push({
    src: '__componentName__.spec.js', to: `${replacements.__componentName__}.spec.js`
  });
}

files.push({
  src: config.templates[type], to: `${replacements.__componentName__}.js`
});

files.forEach((data)=>{
  const dest = `${dir}/${data.to}`;
  if (!fs.existsSync(dest)) {
    let templ = fs.readFileSync(path.resolve(__dirname, `./templates/${data.src}`), 'utf8');
    //console.log(templ);

    Object.keys(replacements).forEach((k) => {
      templ = templ.replace( new RegExp(k, 'gi'), replacements[k]);
    });

    fs.writeFileSync(dest, templ, (err) => {
      if (err) {
        console.log(err);
      }else{
        console.log(`The file ${dest} has been created`);
      }
    });

  } else {
    console.log(`The file ${dest} already exists`);
  }
});
process.exit();
