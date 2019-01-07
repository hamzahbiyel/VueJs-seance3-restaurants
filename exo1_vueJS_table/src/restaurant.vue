<template>
<md-table-row >
    <md-table-cell>{{restaurant.name}}</md-table-cell>
    <md-table-cell>{{restaurant.cuisine}}</md-table-cell>
      <md-table-cell>
        <md-button class="md-dense md-raised md-accent" v-on:click="supprimerRestaurant(restaurant._id)" >supprimer</md-button>
        <md-button class=" md-dense  md-raised md-primary" v-on:click="modifieRestaurant(restaurant._id)" v-if="restaurant.name != undefined && restaurant.name.trim() != '' && restaurant.cuisine.trim() != '' ">modifier</md-button>
        <md-button class=" md-dense  md-raised md-primary" v-on:click="selectRestaurant(restaurant._id)" >copy</md-button>
        <md-button class=" md-dense  md-raised md-primary" v-on:click="gotoDetail(restaurant._id)" >detail</md-button>



      </md-table-cell>
  </md-table-row>
</template>

<script lang="js">
import detailrestaurant from './appRestoDetail.vue';

  export default  {

    name: 'restaurant',
    props : ['restaurant'],
data: function() {
  return {

  }
},
components: {
  'app-restau-detail' : detailrestaurant
},

    methods: {
    gotoDetail : function(id) {
    this.$router.push({name:'detail', params: {id}})
  },
    modifieRestaurant: function (id) {
      this.$emit('modifRestaurant',id)
    },
    supprimerRestaurant: function (index) {

        let url = "http://localhost:8080/api/restaurants/"+index;
        let that = this;
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
                    that.$emit('getDataFromServer',false)
                });
            })
            .catch(function (err) {
                console.log(err);
        });
        that.$emit('getDataFromServer',true)
      },

      selectRestaurant: function (id) {
          // let nouveauRestaurant = {
          //     name:this.name,
          //     cuisine:this.cuisine
          // }
          let url = "http://localhost:8080/api/restaurants/"+id;
          let that = this;
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
                      // I prevent here the parent to change selected name and cuisine values by emit
                      that.$emit('change-selected-values',res.restaurant)
                      console.log("data send successfuly")
                  });
              })
              .catch(function (err) {
                  console.log(err);
          });



      }


    },
    computed: {

    }
}
</script>

<style scoped>
</style>
