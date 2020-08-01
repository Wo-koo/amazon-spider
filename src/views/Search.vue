<template>
  <div class="form" id="search">
    <input type="search" v-model="model.searchText" />
    <button type="submit" @click.prevent="DoSearch">Search</button>
  </div>
</template>

<script>
export default {
  name: "search",
  data: function () {
    return {
      model: {},
    };
  },
  components: {},
  methods: {
    DoSearch() {
      // do search action to pass the search key words to the express serve.

      this.$http
        .get(`search/${this.model.searchText}`)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    },
  },
};
</script>