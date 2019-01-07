<template>
<div class="viewport">
  <md-toolbar :md-elevation="1">
       <span class="md-title">Ajout</span>
     </md-toolbar>
      <md-field>
        <label>Name</label>
        <md-input v-model="$parent.name" ></md-input>
        <md-icon>description</md-icon>
    </md-field>
    <md-field>
      <label>Cuisine</label>
      <md-input v-model="$parent.cuisine" ></md-input>
      <md-icon>description</md-icon>
    </md-field>
    <md-button class="md-raised md-primary" v-on:click="ajouterRestaurant">Ajouter</md-button>
  </div>
</template>

<script lang="js">
  export default  {
    name: 'ajout-restaurant',
    props: [],
    mounted: function() {

  },
    data : function(){
    return {}

    },
    methods: {

    ajouterRestaurant: function () {
          // let nouveauRestaurant = {
          //     name:this.name,
          //     cuisine:this.cuisine
          // }
          let url = "http://localhost:8080/api/restaurants";
          let that = this;
          // console.log(nouveauRestaurant)
          fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify({nom : that.$parent.name,cuisine: that.$parent.cuisine})
          })
          .then(function(responseJSON) {
              responseJSON.json()
                  .then(function(res) {
                      // Maintenant res est un vrai objet JavaScript
                      that.$parent.getDataFromServer(false)
                      console.log("data send successfuly")
                  });
              })
              .catch(function (err) {
                  console.log(err);
          });

          this.$parent.getDataFromServer(true)
          // on remet à zéro les champs
          this.$parent.name = "";
          this.$parent.cuisine = "";


      }

    },
    computed: {

    }
}
</script>
