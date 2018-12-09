restaurantComponent = Vue.component('restaurant', {
props: ['restaurant'],
data: function() {
  return {
  }
},
template:  `
  <md-table-row >
    <md-table-cell>{{restaurant.name}}</md-table-cell>
    <md-table-cell>{{restaurant.cuisine}}</md-table-cell>
      <md-table-cell>
        <md-button class="md-dense md-raised md-accent" v-on:click="supprimerRestaurant(restaurant._id)" >supprimer</md-button>
        <md-button class=" md-dense  md-raised md-primary" v-on:click="modifierRestaurant(restaurant._id)" v-if="name.trim() != '' && cuisine.trim() != '' ">modifier</md-button>
        <md-button class=" md-dense  md-raised md-primary" v-on:click="selectRestaurant(restaurant._id)">copy</md-button>
      </md-table-cell>
  </md-table-row>
`
,
methods: {
  supprimerRestaurant: function (index) {

    let url = "http://localhost:8080/api/restaurants/"+index;
    that = this;
    // console.log(nouveauRestaurant)
    fetch(url, {
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "DELETE"
    })
    .then(function(responseJSON) {
        responseJSON.json()
            .then(function(res) {
                // Maintenant res est un vrai objet JavaScript
                that.$root.getDataFromServer(false)
            });
        })
        .catch(function (err) {
            console.log(err);
    });
    this.$root.getDataFromServer(true)
  },
  selectRestaurant: function (id) {
      // let nouveauRestaurant = {
      //     name:this.name,
      //     cuisine:this.cuisine
      // }
      let url = "http://localhost:8080/api/restaurants/"+id;
      that = this;
      // console.log(nouveauRestaurant)
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
                  // Maintenant res est un vrai objet JavaScript
                  that.$root.name = res.restaurant.name
                  that.$root.cuisine = res.restaurant.cuisine
                  console.log("data send successfuly")
              });
          })
          .catch(function (err) {
              console.log(err);
      });



  }


}
});
