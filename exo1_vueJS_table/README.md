# Mini projet Hamza Hbiyel

> A Vue.js project

## Build Setup

``` bash
# get in exo1-vueJS_table
cd exo1-vueJS_table
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev -- --port 3000

```

## to know

the server has not been modified
the project contains two routes one for the Home and the other one for restaurant details

``` js

const routes = [
  {path: '/',name: 'home', component: Home},
  {path: '/resto/:id', name : 'detail', component: AppRestoDetail} ];

```

I used vueMaterial but it seems that is not working as expected and it was working in the project previous version.

I wanted to use vuematerial pagination but it's not yet implemented.

per every restaurant you will find 4 buttons :
  COPY : this is used to copy information of current restaurant in the name and cuisine global inputs.
  DELETE : used to delete restaurant.
  UPDATE : update name and cuisine using global inputs.
  DETAILS : call the details page of current restaurant.

for the details page, you will notice that I inserted the bill at the end of the page.
