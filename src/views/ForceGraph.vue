<template>
  <div>
    <el-row>
      <el-col :span="18">
        <div style="background:#1f2d3d;height:60px">合同</div>
      </el-col>
      <el-col span="6">
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

    <el-row>
      <div id="forceChart" :style="{width: '100%', height: '700px'}"></div>
    </el-row>

    <!--单击节点显示公司信息-->
    <el-dialog  title="公司信息" :visible.sync="dialogFormVisible" style="width:800px">
      <el-row><el-col :span=8>公司名</el-col><el-col :span=16>{{companyInfo.companyName}}</el-col></el-row>
      <el-row><el-col :span=8>注册资本</el-col><el-col :span=16>{{companyInfo.capital}}万元</el-col></el-row>
      <el-row><el-col :span=8>核心企业</el-col><el-col :span=16 v-if="companyInfo.core===1">是</el-col><el-col :span=16 v-if="companyInfo.core===0">否</el-col></el-row>
      <el-row><el-button style="float:right" type="error" plain @click="getSubGraph">查看子图</el-button></el-row>
    </el-dialog>

  </div>

</template>

<script>
import echarts from 'echarts'
import { mapState } from 'vuex'
require('echarts/theme/macarons')

export default {
  data () {
    return {
      chart: null,
      dialogFormVisible: false
    }
  },
  computed: mapState({
    nodes: state => state.graphData.nodes,
    links: state => state.graphData.links,
    companyInfo: state => state.graphData.companyInfo
  }),
  mounted () {
    this.initChart()
  },
  methods: {
    initChart () {
      // this.$store.dispatch('GetAllLinks').then(data => {
      this.$store.dispatch('GetAllCompanies').then(data => {
        this.chart = echarts.init(document.getElementById('forceChart'), 'macarons')
        this.chart.setOption({
          toolbox: {
            show: true,
            feature: {
              dataView: {
                show: true,
                readOnly: true
              },
              restore: {
                show: true
              },
              saveAsImage: {
                show: true
              }
            }
          },
          animationDuration: 300,
          animationEasingUpdate: 'quinticInOut',
          series: [{
            name: '企业关系',
            type: 'graph',
            layout: 'force',
            height: 700,
            force: {
              repulsion: 30
            },
            categories: [
              {
                name: '普通企业',
                itemStyle: {
                  normal: {
                    color: '#1f2d3d'
                  }
                }
              },
              {
                name: '核心企业',
                itemStyle: {
                  normal: {
                    color: '#f9a11b'
                  }
                }
              }
            ],
            data: this.nodes,
            // links: this.links,
            focusNodeAdjacency: true,
            roam: true,
            label: {
              normal: {
                show: false,
                position: 'top'

              }
            },
            lineStyle: {
              normal: {
                curveness: 0,
                type: 'solid'
              },
              formatter: '{b}'
            },
            edgeLabel: {
              normal: {
                show: false,
                textStyle: {
                  fontSize: 10
                }
              },
              formatter: '{c}'
            }
          }]
        })
        let that = this
        this.chart.on('click', function (params) {
          that.$store.dispatch('GetCompanyInfo', params.name).then(data => {
            that.dialogFormVisible = true
            console.log(that.dialogFormVisible)
          })
        })
      }).catch(error => {
        console.log(error)
      })
      // }).catch(error => {
      //   console.log(error)
      // })
    },
    getSubGraph () {
      this.$router.push({
        name: 'subGraph',
        params: {
          companyName: this.companyInfo.companyName
        }
      })
    }

  }
}

</script>
