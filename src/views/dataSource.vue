<template>
  <div>
    <el-row>
      <el-col :span="18">
        <div style="background:#1f2d3d;height:60px"></div>
      </el-col>
      <el-col :span="6">
        <el-menu :default-active="$route.path"
                 mode="horizontal"
                 background-color="#1f2d3d"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 router>
          <el-menu-item index="/contractUpload">合同批量导入</el-menu-item>
          <el-menu-item index="/metaModel">元模型</el-menu-item>
          <el-menu-item index="/subGraph">知识图谱检索</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>

    <el-row>
      <div
        style="margin:0px 0px 20px 110px;padding:0;width:820px;height:0px;background-color:lightGrey;overflow:hidden;"></div>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-input v-model="input" placeholder="数据源地址">
            <template slot="prepend">http://</template>
          </el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-input v-model="input" placeholder="数据源描述"></el-input>
        </div>
      </el-col>
      <el-col :span='2'>
        <el-button plain @click="">添加</el-button>
      </el-col>
    </el-row>

    <el-table
      :data="tableData"
      height="250"
      border
      style="width: 100%; margin-top: 20px">
      <el-table-column
        prop="date"
        label="添加时间"
        width="200">
      </el-table-column>
      <el-table-column
        prop="desc"
        label="数据源描述"
        width="400">
      </el-table-column>
      <el-table-column
        prop="ip"
        label="地址"
        width="300">
      </el-table-column>
      <el-table-column
        prop="amount1"
        label="提供数据量"
        width="200">
      </el-table-column>
      <el-table-column
        prop="amount2"
        label="采纳数据量"
        width="200">
      </el-table-column>
      <el-table-column
        prop="accuracy"
        label="准确率"
        width="200">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>



</template>



<script>
    import echarts from 'echarts'
    import {mapState} from 'vuex'

    require('echarts/theme/macarons')

    export default {
        data() {
            console.log(this.$route.params)
            return {
                tableData: [{
                    date: '2019-10-28 15:32:20',
                    desc: '国家企业信用信息公示系统',
                    ip: '127.0.0.1:8081',
                    amount1: 132,
                    amount2: 130,
                    accuracy: 0.985
                }, {
                    date: '2019-10-28 15:33:10',
                    desc: '天眼查',
                    ip: '127.0.0.1:8082',
                    amount1: 1062,
                    amount2: 753,
                    accuracy: 0.709
                }, {
                    date: '2019-10-28 15:35:12',
                    desc: '启信宝',
                    ip: '127.0.0.1:8083',
                    amount1: 754,
                    amount2: 355,
                    accuracy: 0.471
                }]
            }
        },
        computed: mapState({
            nodes: state => state.graphData.subGraphNodes,
            links: state => state.graphData.subGraphLinks,
            companyInfo: state => state.graphData.companyInfo,
            companyWeight: state => state.graphData.companyWeight
        }),
        mounted() {
            // console.log(this.depth)
        },
        methods: {
        }
    }

</script>
