<template>
<div> 
  <div class="icon">
    
  </div>
  <div class="searchForm" id="search">
    <el-input class="searchText" v-model="model.searchText" placeholder="请输入要检索的商品名称"></el-input>
    <el-button class="searchButton" type="primary" icon="el-icon-search" @click.prevent="DoSearch"></el-button>
  </div>
</div>
</template>

<script>
export default {
  name: "search",
  data: function () {
    return {
      model: {
        searchText:"",
      },
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

<style lang="css">
.searchForm{
  display:grid;
  grid-template-columns: 1fr 80px;
  margin: 0 200px;
}

.searchForm .searchText{
  grid-column-start: 1;
}

.searchForm .searchButton{
  grid-column-start: 2;
}
</style>