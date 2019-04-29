<template>
  <div>
    <el-row>
      <el-col :span="18">
        <div style="background:#1f2d3d;height:60px">合同</div>
      </el-col>
      <el-col :span="6">
        <el-menu :default-active="$route.path"
                 mode="horizontal"
                 background-color="#1f2d3d"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 router>
          <el-menu-item index="/forceGraph">系统所有企业</el-menu-item>
          <el-menu-item index="/subGraph">小图</el-menu-item>
          <el-menu-item index="/contractUpload">合同批量导入</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>

    <el-row>
      <div style="margin:0px 0px 20px 110px;padding:0;width:820px;height:0px;background-color:lightGrey;overflow:hidden;"></div>
    </el-row>

    <div>
      <h1>{{this.source}} <-> {{this.target}}</h1>
    </div>

    <el-row>
      <el-col :span="12">
        <div>
          <el-table
            v-loading.fullscreen.lock="loading"
            :data="relationDetail.contracts"
            style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="合约ID">
                    <span>{{ props.row.contractId }}</span>
                  </el-form-item>
                  <el-form-item label="开始时间">
                    <span>{{ props.row.startTime }}</span>
                  </el-form-item>
                  <el-form-item label="结束时间">
                    <span>{{ props.row.endTime }}</span>
                  </el-form-item>
                  <el-form-item label="地点">
                    <span>{{ props.row.location }}</span>
                  </el-form-item>
                  <el-form-item label="金额">
                    <span>{{ props.row.amount }}</span>
                  </el-form-item>
                  <el-form-item label="合约名">
                    <span>{{ props.row.contractName }}</span>
                  </el-form-item>
                  <el-form-item label="合约类型">
                    <span>{{ props.row.contractType }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              label="合约ID"
              prop="contractId">
            </el-table-column>
            <el-table-column
              label="开始时间"
              prop="startTime">
            </el-table-column>
            <el-table-column
              label="金额"
              prop="amount">
            </el-table-column>
            <el-table-column
              label="类型"
              prop="contractType">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="12">
        <div>
          <div id="container" style="height: 600px"></div>
        </div>
      </el-col>
    </el-row>


  </div>
</template>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

<script>
import echarts from 'echarts'
import {mapState} from 'vuex'

require('echarts/theme/macarons')

export default {
  data () {
    return {
      activePage: '/tradeRelation',
      source: this.$route.params.source,
      target: this.$route.params.target,
      loading: true
    }
  },
  computed: mapState({
    relationDetail: state => state.graphData.relationDetail
  }),
  mounted () {
    this.init()
  },
  methods: {
    initChart() {
      var dom = document.getElementById("container");
      var myChart = echarts.init(dom);
      var app = {};
      myChart.setOption({
        xAxis: {
          type: 'category',
          data: this.relationDetail.frequencyX
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.relationDetail.frequencyValue,
          type: 'line'
        }],
        title: {
          text: "近三年贸易频率",
          top: 'bottom',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        }
      });
    },
    init() {
      let p = []
      p.source = this.source
      p.target = this.target
      p.monthNum = 36
      let that = this
      this.$store.dispatch('GetRelationDetailByCompanyName', p).then(data => {
        that.loading = false
        this.initChart()
      }).catch(error => {
        console.log(error)
        that.loading = false
      })
    }
  }
}


</script>
