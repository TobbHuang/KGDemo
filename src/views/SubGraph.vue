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
      <el-col :span='2'>
        <el-input v-model="id" placeholder="请输入id"></el-input>
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
        <el-card v-if="visible">该企业权重 ：{{companyWeight.toFixed(2)}}</el-card>
      </el-col>
    </el-row>

    <el-row>
      <div id="myChart" :style="{width: '100%', height: '700px'}"/>
    </el-row>

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
      // input: this.$route.params.companyName,
      id: 1307,
      depth: 2,
      visible: false,
      computedWeight: 0
    }
  },
  computed: mapState({
    nodes: state => state.graphData.subGraphNodes,
    links: state => state.graphData.subGraphLinks,
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
      p.id = this.id
      p.depth = this.depth
      this.$store.dispatch('GetSubGraphById', p).then(data => {
        // this.visible = true
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
          animationDuration: 3000,
          animationEasingUpdate: 'quinticInOut',
          series: [{
            name: '关联企业',
            type: 'graph',
            layout: 'force',
            height: 700,
            force: {
              repulsion: 3000,
              edgeLength: 100
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
      }).catch(error => {
        console.log(error)
      })
    }
  }
}

</script>
