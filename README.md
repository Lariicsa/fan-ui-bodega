# Frontend Sistema de bodega de Fantástico-Comicastle

## Table of contents

1.  [Project setup](#project-setup)
1.  [Instalación de ambiente Heroku](#instalación-de-ambiente-heroku)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```
## Instalación de ambiente Heroku

_Esta app está hospedada en Heroku.com_

### Se debe tener instalado Heroku CLI

[https://devcenter.heroku.com/articles/heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)

> En caso de no tener instalada la última versión de Heroku CLI se debe actualizar con ```npm update -g heroku```


### Configuración de repositorio Heroku

```C
heroku git:remote -a oporfin
```

### Configuración para webapp estática

```C
heroku buildpacks:add heroku/nodejs
```

```C
heroku buildpacks:add https://github.com/heroku/heroku-buildpack-static
```

**Es importante verificar que el archivo `static.json` se encuentra en raíz con el siguiente código:**

```json
{
  "root": "dist",
  "clean_urls": true,
  "routes": {
    "/**": "index.html"
  }
}
```

### Deploy

```C
git push heroku master
```

En caso de existir cambios, se hacen _commits_ normales, pero para deploy debe ser push a Heroku.
Para aventar al repositorio de Gitlab, el _push_ es el mismo ```git push origin master/develop```
