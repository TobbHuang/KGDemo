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

    <el-row >
      <el-col :span="18"> </el-col>
      <el-col :span='10'>
        <el-input v-model="id" placeholder="请输入公司id"></el-input>
      </el-col>
      <el-col :span='2'>
        <el-input v-model="depth" placeholder="请输入查询深度(default: 2)"></el-input>
      </el-col>
      <el-col :span='2'>
        <el-button plain @click="$getInfo">检视</el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span ='4'>
        <!--<el-card v-if="visible">该企业权重 ：{{companyWeight.toFixed(2)}}</el-card>-->
      </el-col>
    </el-row>

    <el-row>
      <div id="myChart" :style="{width: '100%', height: '800px'}"/>
    </el-row>

    <!--单击节点显示公司信息-->
    <el-dialog  title="公司信息" :visible.sync="dialogFormVisible" style="width:800px">
      <el-row><el-col :span=8>公司名</el-col><el-col :span=16>{{companyInfo.companyName}}</el-col></el-row>
      <el-row><el-col :span=8>注册资本</el-col><el-col :span=16>{{companyInfo.capital}}万元</el-col></el-row>
      <el-row><el-col :span=8>核心企业</el-col><el-col :span=16 v-if="companyInfo.core===1">是</el-col><el-col :span=16 v-if="companyInfo.core===0">否</el-col></el-row>
      <el-row><el-button style="float:right" type="error" plain @click="refreshGraph">查看子图</el-button></el-row>
    </el-dialog>

  </div>
</template>

<script>
import echarts from 'echarts'
import {mapState} from 'vuex'

require('echarts/theme/macarons')

export default {
  data () {
    console.log(this.$route.params)
    return {
      activePage: '/forceGraph',
      companyName: this.$route.params.companyName,
      id: this.$route.params.id,
      depth: 2,
      visible: false,
      computedWeight: 0,
      dialogFormVisible: false
    }
  },
  computed: mapState({
    nodes: state => state.graphData.subGraphNodes,
    links: state => state.graphData.subGraphLinks,
    companyInfo: state => state.graphData.companyInfo,
    companyWeight: state => state.graphData.companyWeight
  }),
  mounted () {
    // console.log(this.depth)
  },
  methods: {
    $getInfo () {
      this.initChart()
      // this.$store.dispatch('GetCompanyWeight', this.input).then(data => {
      //   this.visible = true
      // })
    },
    initChart () {
      let p = {}
      p.companyName = this.companyName
      p.depth = this.depth
      this.$store.dispatch('GetSubGraphByName', p).then(data => {
        // this.visible = true
        console.log(this.nodes)
        console.log(this.links)
        this.chart = echarts.init(document.getElementById('myChart'), 'macarons')
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
          tooltip: {
            formatter:"{b0} <br> 权重: {c0}"
          },
          animationDuration: 3000,
          animationEasingUpdate: 'quinticInOut',
          series: [{
            name: '关联企业',
            type: 'graph',
            layout: 'force',
            height: 700,
            hoverAnimation:true,
            force: {
              repulsion: 1000,
              edgeLength: 100
            },
            categories: [
              {
                name: '0层',
                itemStyle: {
                  normal: {
                    color: '#ff3333',
                    borderColor: '#fff',
                    borderWidth: 1,
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.3)'
                  }
                }
              },
              {
                name: '1层',
                itemStyle: {
                  normal: {
                    color: '#1f2d3d',
                    opacity:1,
                    borderColor: '#fff',
                    borderWidth: 1,
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.3)'
                  }
                }
              },
              {
                name: '2层',
                itemStyle: {
                  normal: {
                    color: '#1f2d3d',
                    opacity:0.6,
                    borderColor: '#fff',
                    borderWidth: 1,
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.3)'
                  }
                }
              },
              {
                name: '3层',
                itemStyle: {
                  normal: {
                    color: '#1f2d3d',
                    opacity:0.4,
                    borderColor: '#fff',
                    borderWidth: 1,
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.3)'
                  }
                }
              }
            ],
            data: this.nodes,
            links: this.links,
            focusNodeAdjacency: true,
            roam: true,
            label: {
              normal: {
                show: true,
                position: 'top',
                textStyle: {
                  fontSize: 16
                }
              }
            },
            lineStyle: {
              normal: {
                curveness: 0,
                type: 'solid'
              },
              formatter: '{b}'
            },
            emphasis: {
              lineStyle: {
                width: 10
              }
            }
          }]
        })
        let that = this
        this.chart.on('click', function (params) {
          that.$store.dispatch('GetCompanyInfoById', params.data.companyId).then(data => {
            that.dialogFormVisible = true
          })
        })
      }).catch(error => {
        console.log(error)
      })
    },
    refreshGraph () {
      console.log(this.companyInfo)
      this.dialogFormVisible = false
      this.companyName = this.companyInfo.companyName
      this.$getInfo()
    }
  }
}

</script>
