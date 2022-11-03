<!-- Improved compatibility of volver al inicio link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://www.innovaweb.cl/wp-content/uploads/2018/10/logo-1.png">
    <img src="https://www.innovaweb.cl/wp-content/uploads/2018/10/logo-1.png" alt="Logo" width="120" height="80">
  </a>

  <h3 align="center">API LET NODEJS-GRAPHQL</h3>

  <p align="center">
    Completa el paso a paso para subir a los diferentes ambientes!
    <br />
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Tabla de contenidos</summary>
  <ol>
    <li>
      <a href="#requerimientos">Requerimientos</a>
    </li>
    <li>
      <a href="#uso">Uso</a>
    </li>
      <li>
      <a href="#arquitectura">Arquitectura</a>
    </li>
    <li>
      <a href="#guia-de-ambiente-local">Guía Ambiente Localhost</a>
      <ul>
        <li><a href="#migraciones-local">Migraciones</a></li>
        <li><a href="#seeders-local">Seeders</a></li>
        <li><a href="#crons-local">Crons</a></li>
      </ul>
    </li>
    <li>
      <a href="#guia-de-ambiente-dev">Guía Ambiente DEV</a>
      <ul>
        <li><a href="#migraciones-dev">Migraciones</a></li>
        <li><a href="#seeders-dev">Seeders</a></li>
        <li><a href="#crons-dev">Crons</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contacto</a></li>
  </ol>
</details>

<!-- GETTING STARTED -->

## Requerimientos

Antes de comenzar, debes asegurarte que estás dentro del pod de backend, con el siguiente comando puedes entrar:

```sh
  docker exec -it [id container] sh
```

Ejemplo:

```sh
  docker exec -it xxx sh
```

## Uso

Este repositorio tiene la base de arquitectura y dependencias de proyectos creados por innovaweb software factory:

```
Puedes escalar el proyecto a librerias como socket.io, graphql, trpc, etc...
```

```
Puedes utilzar este proyecto como pod de un cluster para arquitectura de micro servicios
o como server side para arquitectura monolitica agregando las configuraciones correspondientes.
```

## Arquitectura

```
API REST configurada para las necesidades de los clientes
(app web, app mobile) implementando definciones por acción [POST - GET - PATH - PUT - DELETE].
```

```
Escalabilidad, Organización y asignación de responsabilidades distribuidas
basadas en modelo hexagonal.
```

<div align="center">
  <a href="https://github.com/innnovamoran/ARinw/blob/master/img/%5BGekko%5D%20hexaagonal%20arquitecture%20api%20inw.jpg">
    <img src="https://github.com/innnovamoran/ARinw/blob/master/img/%5BGekko%5D%20hexaagonal%20arquitecture%20api%20inw.jpg" alt="Logo" width="350" height="350">
  </a>
  <p>Cada color indica la temperatura (responsabilidad) de cada capa </p>
</div>

## Guia Ambiente Local

Deberás ejecutar los comandos agrupados en migraciones, seeders y crons.

### Migraciones Local

_Para correr todas las migraciones pendientes, deberás ejecutar:_

```sh
npm run migration:run
```

### Seeders Local

_Para poblar la BD con data relevante, deberás ejecutar:_

1. ```sh
   npx sequelize db:seed:all --config ./src/Server/Config/Sequelize/config.js --seeders-path ./src/Core/Seeder/20220617194751-insertUsers
   ```

### Crons Local

_Para iniciar las tareas programadas, deberás ejecutar:_

1. ```sh
   crond start /etc/crontabs/root
   ```

## Guia ambiente dev

_Deberás ejecutar los comandos agrupados en migraciones, seeders y crons._

### Migraciones Dev

_Para correr todas las migraciones pendientes, deberás ejecutar:_

```sh
npm run migration:dev:run
```

### Seeders Dev

_Para poblar la BD con data relevante, deberás ejecutar:_

1. ```sh
   npx sequelize db:seed:all --config ./Config/config.js --seeders-path ./Seeder/20220617194751-insertUsers
   ```

### Crons Dev

_Para iniciar las tareas programadas, deberás ejecutar:_

1. ```sh
   crond start /etc/crontabs/root
   ```

<p align="right">(<a href="#readme-top">volver al inicio</a>)</p>

<!-- CONTACT -->

## Contact

Link del proyecto: [https://github.com/innovawebcl/inw_default_api_nodejs](https://github.com/innovawebcl/inw_default_api_nodejs)

<p align="right">(<a href="#readme-top">volver al inicio</a>)</p>
