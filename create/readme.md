###Create React Component with command line

extract archive in create.rar in root dir of the client project
you have to get /create directory

- config settings in config.json file 
- edit the templates in directory templates

depending on required type of the component run one of the commands:

- for the functional component
```javascript
node create --name=YourNewComponentName
```
	

- for the stateful class component
```javascript
node create --name=YourNewComponentName --type=class
```
- for the container component
```javascript
node create --name=YourNewComponentName --type=cont --wrap=WrappedComponent
```
_For the names such as DirName/DirName/ComponentName folders will be created_

- for converting svg to component

```javascript
node create/svg
```
_It reads config.json -> svg for source, target dirs and ignore svg prop array_ 

- for building export index.js for all components in dir

```javascript
  node create/index-js --dir=Svg\Departments
```

Enjoy your coding!