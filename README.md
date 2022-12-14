# Fellowship Frontend

![](https://img.shields.io/badge/Java-17-blue)
![](https://img.shields.io/badge/Spring%20Boot-2.6.10-70b34a)
![](https://img.shields.io/badge/Nuxt.js-2.15.8-2ddc87)
![](https://img.shields.io/badge/Vuetify.js-2.6.1-2e95f2)

Backend Repo: [https://github.com/CryptoSingh1337/fellowship-backend](https://github.com/CryptoSingh1337/fellowship-backend)

A Scholarship Aggregator which updates in real time. It has the following functionality:

- Minimalistic UI
- Scrap scholarships from various sources.
- Admin dashboard where admin can update scholarships, user's data and can add scholarships from the portal itself using the JSON file or can directly paste the JSON string.
- Sends notifications to the registered user about the recent scholarship which are added on the portal.
- Auto remove all the expired scholarships.
- Recommend scholarships based on user details (country, degree, field of study, branch, title, family income and category).
- User can search scholarships based on country, degree, field of study, branch, title, family income and category.

**Tech stack**:

- **Front-end -**
  - JavaScript
  - Nuxt.js (SSR and SSG)
  - Vuetify
  - Vercel (Deployment)
- **Back-end -**
  - Java
  - Spring Boot
  - Spring Security
  - Spring Scheduler
  - Spring Data Mongo
  - Java Mail API
  - MongoDB
  - Amazon SQS
  - Heroku (Deployment)

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).


### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).
