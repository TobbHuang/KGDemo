<template>
  <div>
    <el-row>
      <el-col :span="18">
        <div style="background:#1f2d3d;height:60px">合同</div>
      </el-col>
      <el-col :span="6">
        <el-menu :default-active="$route.parth"
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
      <div id="myChart" :style="{width: '100%', height: '700px'}"></div>
    </el-row>

  </div>
</template>

<script>
import echarts from 'echarts'
import {mapState} from 'vuex'
require('echarts/theme/macarons')

export default {
  data () {
    return {
    }
  },
  computed: mapState({
    nodes: state => state.graphData.supplyChainNodes,
    links: state => state.graphData.supplyChainLinks
  }),
  mounted () {
    this.getSupplyChain()
  },
  methods: {
    getSupplyChain () {
      this.$store.dispatch('GetSupplyChain').then(data => {
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
            formatter: '{b0} <br> 权重: {c0}'
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
            // data: [{name: '应用材料（中国）有限公司', draggable: 'true', symbolSize: 30, value: 0, category: 0}, {name: '安森美半导体（上海）有限公司', draggable: 'true', symbolSize: 30, value: 0, category: 0}],
            // links: [{source: '安森美半导体（上海）有限公司',
            //   target: '应用材料（中国）有限公司',
            //   lineStyle: {
            //     normal: {
            //       width: 20
            //     }}
            // }
            // ],
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
            edgeSymbol: ['circle', 'arrow'],
            lineStyle: {
              normal: {
                curveness: 0,
                type: 'solid'
                // width: 20
              },
              // formatter: '{b}'
              formatter: function (params) {
                return params.data.name
              }
            },
            emphasis: {
              lineStyle: {
                width: 10
              }
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
