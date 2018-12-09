Vue.component('ajoutrestaurant', {
props: [],
data: function() {
  return {
  }
},
template:  `

<div class="viewport">
  <md-toolbar :md-elevation="1">
       <span class="md-title">Ajout</span>
     </md-toolbar>
      <md-field>
        <label>Name</label>
        <md-input v-model="$root.name" ></md-input>
        <md-icon>description</md-icon>
    </md-field>
    <md-field>
      <label>Cuisine</label>
      <md-input v-model="$root.cuisine" ></md-input>
      <md-icon>description</md-icon>
    </md-field>
    <md-button class="md-raised md-primary" v-on:click="ajouterRestaurant">Ajouter</md-button>
  </div>
`

,
methods: {
  ajouterRestaurant: function () {
      // let nouveauRestaurant = {
      //     name:this.name,
      //     cuisine:this.cuisine
      // }
      let url = "http://localhost:8080/api/restaurants";
      that = this;
      // console.log(nouveauRestaurant)
      fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({nom : that.$root.name,cuisine: that.$root.cuisine})
      })
      .then(function(responseJSON) {
          responseJSON.json()
              .then(function(res) {
                  // Maintenant res est un vrai objet JavaScript
                  that.$root.getDataFromServer(false)
                  console.log("data send successfuly")
              });
          })
          .catch(function (err) {
              console.log(err);
      });

      this.$root.getDataFromServer(true)
      // on remet à zéro les champs
      this.$root.name = "";
      this.$root.cuisine = "";


  }

}
});
