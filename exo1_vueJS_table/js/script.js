window.onload = init;


function init() {
  Vue.use(VueMaterial.default)
  new Vue({
        el: "#app",
        data: {
            restaurants: [],
            name: "",
            nameSearch: "",
            cuisine:"",
            counter:0,
            page : 1,
            pagesize : 20,
            nbrPages : 0
        },
        mounted() {
          console.log("loading data from server");
          this.getDataFromServer(false);
          this.getDataFromServer(true);
        },
        methods: {
          // if all is true it will simply initialise the number of pages
          getDataFromServer(all){
            let url = "http://localhost:8080/api/restaurants";
            if (!all) {
              url += "?page=" + this.page + "&pagesize=" + this.pagesize;
            } else {
              url += "?page=1&pagesize="+Number.MAX_VALUE;

            }


          that = this;
          fetch(url)
            .then(function(responseJSON) {
                responseJSON.json()
                .then(function(res) {
                  if (!all) {
                    that.restaurants = [];
                    that.restaurants= res.data ;
                  }
                  if (all) {
                    that.nbrPages = parseInt(res.count/that.pagesize);
                  }
                });
              })
              .catch(function (err) {
                console.log(err);
              });
            },
            chercherRestaurant : _.debounce(function() {
                    let url = "http://localhost:8080/api/restaurants?name="+that.nameSearch;
                    console.log(that.nameSearch)
                    fetch(url)
                      .then(function(responseJSON) {
                          responseJSON.json()
                          .then(function(res) {
                            that.restaurants = [];
                            that.restaurants= res.data ;
                            console.log('hello')
                          });
                        })
                        .catch(function (err) {
                          console.log(err);
                        });
                   }, 300),

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
                          that.getDataFromServer(false)
                      });
                  })
                  .catch(function (err) {
                      console.log(err);
              });
              this.getDataFromServer(true)
            },
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
                    body: JSON.stringify({nom : that.name,cuisine: that.cuisine})
                })
                .then(function(responseJSON) {
                    responseJSON.json()
                        .then(function(res) {
                            // Maintenant res est un vrai objet JavaScript
                            that.getDataFromServer(false)
                            console.log("data send successfuly")
                        });
                    })
                    .catch(function (err) {
                        console.log(err);
                });

                this.getDataFromServer(true)
                // on remet à zéro les champs
                this.name = "";
                this.cuisine = "";


            },
            modifierRestaurant: function (id) {
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
                    method: "PUT",
                    body: JSON.stringify({nom : that.name,cuisine: that.cuisine})
                })
                .then(function(responseJSON) {
                    responseJSON.json()
                        .then(function(res) {
                            // Maintenant res est un vrai objet JavaScript
                            that.getDataFromServer(false)
                            console.log("data send successfuly")
                        });
                    })
                    .catch(function (err) {
                        console.log(err);
                });

                // on remet à zéro les champs
                this.name = "";
                this.cuisine = "";


            }
            ,
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
                            that.name = res.restaurant.name
                            that.cuisine = res.restaurant.cuisine
                            console.log("data send successfuly")
                        });
                    })
                    .catch(function (err) {
                        console.log(err);
                });

                // on remet à zéro les champs
                this.name = "";
                this.cuisine = "";


            },
            pageSuivante: function () {
              if (this.nbrPages > this.page) {
                this.page++;
                this.getDataFromServer(false);
              }

            },
            firstPage: function () {

                this.page = 1;
                this.getDataFromServer(false);


            },
            lastPage: function () {

                this.page = this.nbrPages;
                this.getDataFromServer(false);


            },
            pagePrecedente: function () {
              if (this.page > 1) {
                this.page--;
                this.getDataFromServer(false);
              }
            },
            getPage : function(n) {
              if (this.nbrPages >= n && n > 0) {
                this.page=n;
                this.getDataFromServer(false);
              }
            },
            getColor: function(index) {
              if (index%2==0) return "#f2f2f2";
              return "white";
            }
        }
    });


}


//debools3
