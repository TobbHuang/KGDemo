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
          <el-menu-item index="/preprocess">合约管理</el-menu-item>
          <el-menu-item index="/metaModel">元模型</el-menu-item>
          <el-menu-item index="/kg1">知识图谱检索</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>

    <el-row>
      <div
        style="margin:0px 0px 20px 110px;padding:0;width:820px;height:0px;background-color:lightGrey;overflow:hidden;"></div>
    </el-row>

    <el-row >
      <el-col :span="18"> </el-col>
      <el-col :span='5'>
        <el-input v-model="companyName" placeholder="请输入公司名"></el-input>
      </el-col>
      <el-col :span='4'>
        <el-input v-model="depth" placeholder="请输入查询深度(default: 2)"></el-input>
      </el-col>
      <el-col :span='2'>
        <el-button plain @click="$getInfo">查询</el-button>
      </el-col>
      <el-col :span='2'>
        <el-button type="primary" icon="el-icon-refresh" circle @click="$dialog"></el-button>
      </el-col>
    </el-row>

    <el-row>
      <div id="myChart" :style="{width: '80%', height: '800px', marginTop: '50px'}"/>
    </el-row>

    <el-dialog
      title="云链电子供应链管理有限公司(虚拟)"
      :visible.sync="dialogVisible"
      width="30%">
      <div>融合实体：</div>
      <div>云链电子供应链管理（深圳）有限公司</div>
      <div>云链电子供应链管理有限公司</div>
      <div>相似度：</div>
      <div>0.75</div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>

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
                companyName: '云链电子供应链管理（深圳）有限公司',
                depth: 4,
                dialogVisible: false
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
            $dialog() {
                this.dialogVisible = true
            },
            $getInfo() {
                this.initChart()
            },
            initChart() {
                this.chart = echarts.init(document.getElementById('myChart'), 'macarons')
                this.chart.setOption({
                    title: {
                        text: '贸易金融知识图谱'
                    },
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
                        name: '知识图谱',
                        type: 'graph',
                        layout: 'force',
                        height: 1000,
                        hoverAnimation: true,
                        edgeSymbol: ['', 'arrow'],
                        edgeLabel: {
                            normal: {
                                textStyle: {
                                    fontSize: 16
                                }
                            }
                        },
                        force: {
                            repulsion: 1000,
                            edgeLength: 100
                        },
                        categories: [
                            {
                                name: '企业',
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
                                name: '合同',
                                itemStyle: {
                                    normal: {
                                        color: '#1f2d3d',
                                        opacity: 1,
                                        borderColor: '#fff',
                                        borderWidth: 1,
                                        shadowBlur: 10,
                                        shadowColor: 'rgba(0, 0, 0, 0.3)'
                                    }
                                }
                            },
                            {
                                name: '属性',
                                itemStyle: {
                                    normal: {
                                        color: '#1f2d3d',
                                        opacity: 0.6,
                                        borderColor: '#fff',
                                        borderWidth: 1,
                                        shadowBlur: 10,
                                        shadowColor: 'rgba(0, 0, 0, 0.3)'
                                    }
                                }
                            },
                            {
                                name: '虚拟融合实体',
                                itemStyle: {
                                    normal: {
                                        color: '#000000aa',
                                        borderColor: '#000000',
                                        borderWidth: 5,
                                        shadowBlur: 10,
                                        shadowColor: 'rgba(0, 0, 0, 0.3)'
                                    }
                                }
                            }
                        ], data: [
                            {
                                name: '中建钢构天津有限公司',
                                symbolSize: 30,
                                category: 0,
                                draggable: true
                            },
                            {
                                name: '云链电子供应链管理（深圳）有限公司',
                                symbolSize: 30,
                                category: 0,
                                draggable: true
                            },
                            {
                                name: '云链电子供应链管理有限公司',
                                symbolSize: 30,
                                category: 0,
                                draggable: true
                            },
                            {
                                name: '云链电子供应链管理有限公司(虚拟)',
                                symbolSize: 30,
                                category: 3,
                                draggable: true
                            },
                            {
                                name: '钢材采购合同',
                                symbolSize: 30,
                                category: 1,
                                draggable: true
                            },
                            {
                                name: '天津西青区王稳庄镇高端金属制品工业区盛达五支路18号',
                                symbolSize: 20,
                                category: 2,
                                draggable: true
                            },
                            {
                                name: '2017-06-22',
                                symbolSize: 20,
                                category: 2,
                                draggable: true
                            },
                            {
                                name: '西青区王稳庄镇高端金属制品工业区盛达五支路18号',
                                symbolSize: 20,
                                category: 2,
                                draggable: true
                            },
                            {
                                name: '黑色金属冶炼和压延加工业',
                                symbolSize: 20,
                                category: 2,
                                draggable: true
                            },
                            {
                                name: '中建钢构',
                                symbolSize: 20,
                                category: 2,
                                draggable: true
                            },
                            {
                                name: '严仍景',
                                symbolSize: 20,
                                category: 2,
                                draggable: true
                            },
                            {
                                name: '50000万人民币',
                                symbolSize: 20,
                                category: 2,
                                draggable: true
                            },
                            {
                                name: '120111000119777',
                                symbolSize: 20,
                                category: 2,
                                draggable: true
                            },
                            {
                                name: '91120111058719333R',
                                symbolSize: 20,
                                category: 2,
                                draggable: true
                            },
                            {
                                name: '广东省深圳市福田区梅林街道梅林路与凯丰路交汇处理想时代大厦',
                                symbolSize: 20,
                                category: 2,
                                draggable: true
                            },
                            {
                                name: '郑新类',
                                symbolSize: 20,
                                category: 2,
                                draggable: true
                            },
                            {
                                name: '5000万人民币',
                                symbolSize: 20,
                                category: 2,
                                draggable: true
                            },
                            {
                                name: '1000万人民币',
                                symbolSize: 20,
                                category: 2,
                                draggable: true
                            },
                            {
                                name: '440301107972290',
                                symbolSize: 20,
                                category: 2,
                                draggable: true
                            },
                            {
                                name: '91440300078960108J',
                                symbolSize: 20,
                                category: 2,
                                draggable: true
                            },
                            {
                                name: '云链电子',
                                symbolSize: 20,
                                category: 2,
                                draggable: true
                            }
                        ],
                        links: [
                            {
                                source: '中建钢构天津有限公司',
                                target: '钢材采购合同'
                            }, {
                                source: '云链电子供应链管理有限公司(虚拟)',
                                target: '钢材采购合同'
                            }, {
                                source: '钢材采购合同',
                                target: '天津西青区王稳庄镇高端金属制品工业区盛达五支路18号'
                            }, {
                                source: '钢材采购合同',
                                target: '2017-06-22'
                            }, {
                                source: '中建钢构天津有限公司',
                                target: '西青区王稳庄镇高端金属制品工业区盛达五支路18号'
                            }, {
                                source: '中建钢构天津有限公司',
                                target: '黑色金属冶炼和压延加工业'
                            }, {
                                source: '中建钢构天津有限公司',
                                target: '中建钢构'
                            }, {
                                source: '中建钢构天津有限公司',
                                target: '严仍景'
                            }, {
                                source: '中建钢构天津有限公司',
                                target: '50000万人民币'
                            }, {
                                source: '中建钢构天津有限公司',
                                target: '120111000119777'
                            }, {
                                source: '中建钢构天津有限公司',
                                target: '91120111058719333R'
                            }, {
                                source: '云链电子供应链管理有限公司(虚拟)',
                                target: '广东省深圳市福田区梅林街道梅林路与凯丰路交汇处理想时代大厦'
                            }, {
                                source: '云链电子供应链管理有限公司(虚拟)',
                                target: '郑新类'
                            }, {
                                source: '云链电子供应链管理有限公司(虚拟)',
                                target: '440301107972290'
                            }, {
                                source: '云链电子供应链管理有限公司(虚拟)',
                                target: '91440300078960108J'
                            }, {
                                source: '云链电子供应链管理有限公司(虚拟)',
                                target: '云链电子'
                            }, {
                                source: '云链电子供应链管理（深圳）有限公司',
                                target: '5000万人民币'
                            }, {
                                source: '云链电子供应链管理有限公司',
                                target: '1000万人民币'
                            }, {
                                source: '云链电子供应链管理（深圳）有限公司',
                                target: '云链电子供应链管理有限公司(虚拟)'
                            }, {
                                source: '云链电子供应链管理有限公司',
                                target: '云链电子供应链管理有限公司(虚拟)'
                            }
                        ],
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
            }
        }
    }

</script>
