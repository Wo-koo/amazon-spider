<template>
  <div>
    <div class="horiablePanel">
       <el-input class="searchText" v-model="model.searchText" placeholder="请输入要查询的商品名称"></el-input>
       <el-button type="primary" icon="el-icon-refresh" @click="Refresh">Refresh</el-button>
    </div>
    <div class="HistoryForm">
    <el-table class="historyTable" :data="model.tableData" stripe height="600">
      <el-table-column prop="GoodsName" label="Name" width="180"></el-table-column>
      <el-table-column prop="Tag" label="Tag" width="180"></el-table-column>
      <el-table-column prop="Counts" label="Counts"></el-table-column>
    </el-table>
    <el-button-group class="PagetionGroup">
      <el-button type="primary" icon="el-icon-arrow-left">Pre</el-button>
      <el-button type="primary">
        Next
        <i class="el-icon-arrow-right el-icon--right"></i>
      </el-button>
    </el-button-group>
    </div>
  </div>
</template>

<script>
export default {
    data() {
    return {
        model:{
        tableData: [],
        searchText:"",
        }
    };
  },
  methods: {
    async Refresh() {
      let res = await this.$http.get(`history/${this.model.searchText}`);
      this.model.tableData = res.data;
    },
  },
  created() {
  },
};
</script>

<style lang="css">
.horiablePanel{
    display: inline;
}

.horiablePanel .searchText{
    width: 300px;
    margin: 0 10px;
}

.HistoryForm{
    display: grid;
    grid-template-rows: 100% 36px;
}

.HistoryForm .historyTbale{
    grid-row: 1;
}

.HistoryForm .pagetionGroup{
    grid-row: 2;
}

button{
    margin: 5px;
    width: 130px;
}
</style>