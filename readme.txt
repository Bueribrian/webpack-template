# Template para Webpack con soporte ES6, (CSS|SCSS|SASS) y Typescript. 
Este es un template simple creado para SPA (Simple page application) o MPA (Multiple Page application).
Es compatible con javascript moderno, typescript. Soporta tambien SCSS y SASS y cuenta con soporte para multiples archivos `.html` con solo editar una simple variable del `webpack.config.js`.
 
## Comandos escenciales
```
npm run build:prod 
npm run build:dev
npm run dev
```
 
 
&nbsp; 
#### `npm run build:prod`
###### Crea un build en la carpeta `dist` preparado para produccion, minifica, declara los archivos con `contenthash` y transpila codigo moderno en uno que puedan correrlo todos los navegadores declarados en el `webpack.config.js`,  a diferencia del build de desarrollo, este separa el css del archivo `main.js` en un nuevo archivo de estilos `main.css`.
&nbsp;
#### `npm run build:dev`
###### Crea un build en la carpeta `dist` preparado para desarrollo, transpila codigo moderno en uno que puedan correrlo todos los navegadores declarados en el webpack.config.js.
&nbsp;
#### `npm run dev`
###### inicializa un servidor local con webpack y la configuracion de desarrollo declarada en el archivo `webpack.config.js`
&nbsp;&nbsp;
# Para tener en cuenta
Para crear multiples archivos `.html`, es necesario crear el archivo propiamente dicho en la carpeta `src` y declarlo en el archivo de configuracion `webpack.config.js` en la constante `pages`
   
    ├── src            
    │   ├── fonts
    │   ├── images    
    │   └── js
    │   └── scss
    └── index.html
    └── otros archivos .html...

```
const scripts = ['main', 'about', 'admin'];

const pages = [
	{
		name: 'index',
		chunks: [scripts[0]]
	},
	{
		name: 'about',
		chunks: [scripts[0], scripts[1]]
	},
	{
		name: 'admin',
		chunks: [scripts[0], scripts[2]]
	}
];
```

Los valores `scripts[0], scripts[1]...`, que se ven en el atributo `chunks` corresponde a los archivos javascript que se van a insertar en los htmls, es **importante** que se declare el `main.js` en todas las vistas dado que el main.js tiene importados los estilos ya sea el caso CSS, SASS, SCSS