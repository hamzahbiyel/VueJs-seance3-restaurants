<template>
<div>
<md-button class=" md-dense  md-raised md-primary" v-on:click="gotoHome()" >Home</md-button>
      <div class="item">
<img :src="restoImage" />
</div>
<md-empty-state
      :md-label="restaurant.name"
      md-description="here is the list of our meals">
      </md-empty-state>


      <div class="md-layout">
    <div class="md-layout-item">

    <md-table md-card>
    <md-table-toolbar>
      <h1 class="md-title">Entree</h1>
    </md-table-toolbar>

    <md-table-row>
      <md-table-head>Nom</md-table-head>
      <md-table-head md-numeric>Prix</md-table-head>
      <md-table-head md-numeric>qte</md-table-head>
      <md-table-head>Action</md-table-head>

    </md-table-row>

    <md-table-row v-for="m,index in menu.entree">

      <md-table-cell>{{m.name}}</md-table-cell>
      <md-table-cell md-numeric>{{m.prix}}$</md-table-cell>
      <md-table-cell md-numeric><input type="number" v-model='m.qte' name="quantity" value= "1" min="1" max="10"></md-table-cell>
      <md-table-cell><md-button class="md-primary" v-on:click="addtocart(m)">ajouter</md-button></md-table-cell>
    </md-table-row>


  </md-table>

    </div>
    <div class="md-layout-item">
    <md-table md-card>
    <md-table-toolbar>
      <h1 class="md-title">Plat</h1>
    </md-table-toolbar>

    <md-table-row>
      <md-table-head>Nom</md-table-head>
      <md-table-head md-numeric>Prix</md-table-head>
      <md-table-head md-numeric>qte</md-table-head>
      <md-table-head>Action</md-table-head>

    </md-table-row>

    <md-table-row v-for="m,index in menu.plat">

      <md-table-cell>{{m.name}}</md-table-cell>
      <md-table-cell md-numeric>{{m.prix}}$</md-table-cell>
      <md-table-cell md-numeric><input type="number" v-model='m.qte' name="quantity" value= "1" min="1" max="10"></md-table-cell>
      <md-table-cell><md-button class="md-primary" v-on:click="addtocart(m)">ajouter</md-button></md-table-cell>
    </md-table-row>


    </md-table>


    </div>
    <div class="md-layout-item">


  <md-table md-card>
  <md-table-toolbar>
    <h1 class="md-title">dessert</h1>
  </md-table-toolbar>

  <md-table-row>
    <md-table-head>Nom</md-table-head>
    <md-table-head md-numeric>Prix</md-table-head>
    <md-table-head md-numeric>qte</md-table-head>
    <md-table-head>Action</md-table-head>

  </md-table-row>

  <md-table-row v-for="m,index in menu.dessert">

    <md-table-cell>{{m.name}}</md-table-cell>
    <md-table-cell md-numeric>{{m.prix}}$</md-table-cell>
    <md-table-cell md-numeric><input type="number" v-model='m.qte' name="quantity" value= "1" min="1" max="10"></md-table-cell>
    <md-table-cell><md-button class="md-primary" v-on:click="addtocart(m)">ajouter</md-button></md-table-cell>
  </md-table-row>


</md-table>

    </div>
  </div>



<md-table md-card>
<md-table-toolbar>
  <h1 class="md-title">Panier</h1>
</md-table-toolbar>

<md-table-row>
  <md-table-head>Nom</md-table-head>
  <md-table-head md-numeric>quantity * Prix</md-table-head>
  <md-table-head>Action</md-table-head>

</md-table-row>

<md-table-row v-for="m,index in panier">

  <md-table-cell>{{m.name}}</md-table-cell>
  <md-table-cell md-numeric>{{m.qte}} * {{m.prix}}$ </md-table-cell>
  <md-table-cell><md-button class="md-primary" v-on:click="removefromcart(m)">suprimer</md-button></md-table-cell>
</md-table-row>
<md-table-row>

  <md-table-cell>Total</md-table-cell>
  <md-table-cell md-numeric>{{total}}$</md-table-cell>
</md-table-row>


</md-table>



</div>
</template>

<script lang="js">


  export default  {
    name: "app-restau-detail",
    data : function() {return {
    active: false,
      value: null,
      restaurant : {},
      panier : [],
      total : 0,
      menu : {},
      menuGeneral : {
        entree : [{name : 'entree1',prix:10},{name : 'entree2',prix:7},{name : 'entree3',prix:76},{name : 'entree4',prix:27},{name : 'entree5',prix:27},{name : 'entree6',prix:27}],
        plat : [{name : 'plat1',prix:11},{name:'plat2',prix:5},{name:'plat3',prix:5},{name:'plat4',prix:5},{name:'plat5',prix:6},{name:'plat6',prix:7},{name:'plat7',prix:8},{name:'plat8',prix:18}],
        dessert : [{name : 'dessert1',prix:11},{name:'dessert2',prix:5},{name:'dessert3',prix:150},{name:'dessert4',prix:121},{name:'dessert5',prix:250},{name:'dessert6',prix:125},{name:'dessert7',prix:105}]
      },
      images : ["1.jpg","2.jpg","3.jpg","4.jpg"]

        }

    },
    components: {

  },
  computed:  {
    restoImage () {
      return require('./assets/' + this.getRandom(this.images,1))
    }
  },
    mounted: function() {
    this.menu.entree = this.getRandom(this.menuGeneral.entree, 4)
    this.menu.plat = this.getRandom(this.menuGeneral.plat, 4)
    this.menu.dessert = this.getRandom(this.menuGeneral.dessert, 4)
    let url = "http://localhost:8080/api/restaurants/"+this.$route.params.id;

    let that = this;
    fetch(url, {
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "GET"
    })
    .then(function(responseJSON) {
        responseJSON.json()
            .then(function(res) {

                that.restaurant = res.restaurant

            });
        })
        .catch(function (err) {
            console.log(err);
    });

  },
  methods : {
  gotoHome : function() {
  this.$router.push({name:'home'})
},
  removefromcart(m) {
    let i = this.panier.indexOf(m);
    this.total = this.total - (m.prix * m.qte)
    if (i > -1) {
      this.panier.splice(i, 1);
    }
  },
  addtocart(m) {
    if(m.qte == undefined || m.qte < 1 ){
      alert('qte not valid value')
    } else {
    this.panier.push(m)
    this.total = this.total + (m.prix * m.qte)
    }
  },
  getRandom(arr, n) {
      var result = new Array(n),
          len = arr.length,
          taken = new Array(len);
      if (n > len)
          throw new RangeError("getRandom: more elements taken than available");
      while (n--) {
          var x = Math.floor(Math.random() * len);
          result[n] = arr[x in taken ? taken[x] : x];
          taken[x] = --len in taken ? taken[len] : len;
      }
      return result;
  }
}
}
</script>

<style scoped>

img {
    max-width: auto;
    height: 200px;
}

.item {
margin-left: auto;
margin-right: auto;
width: 30%;
}
</style>
