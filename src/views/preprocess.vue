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
          <el-menu-item index="/subGraph">知识图谱检索</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>

    <el-row>
      <div
        style="margin:0px 0px 20px 110px;padding:0;width:820px;height:0px;background-color:lightGrey;overflow:hidden;"></div>
    </el-row>

    <el-table
      :data="tableData"
      border
      style="width: 70%">
      <el-table-column
        prop="date"
        label="上传日期"
        width="250">
      </el-table-column>
      <el-table-column
        prop="name"
        label="合约名"
        width="300">
      </el-table-column>
      <el-table-column
        prop="content"
        label="合约内容"
        width="500">
      </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-row>
      <el-col :span='2'>
        <el-button plain @click="$getInfo">查询</el-button>
      </el-col>
    </el-row>

    <el-row>
      <div id="myChart" :style="{width: '80%', height: '800px'}"/>
      <div id="myChart2" :style="{width: '80%', height: '800px'}"/>
    </el-row>

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
                    date: '2019-10-31 10:01:22',
                    name: '钢材采购合同',
                    content: '"name" : "钢材采购合同",\n' +
                        '    "contract_id" : "ZJGG-TJ-2017-GZ-HT-001",\n' +
                        '    "location" : "天津西青区王稳庄镇高端金属制品工业区盛达五支路18号",\n' +
                        '    "date" : "2017-06-22",\n' +
                        '    "type" : "contract",\n' +
                        '    "participant" : [ \n' +
                        '        {\n' +
                        '            "name" : "中建钢构天津有限公司",\n' +
                        '            "location" : "天津西青区王稳庄镇高端金属制品工业区盛达五支路18号"\n' +
                        '        }, \n' +
                        '        {\n' +
                        '            "name" : "云链电子供应链管理（深圳）有限公司",\n' +
                        '            "location" : "广东省深圳市福田区梅林街道梅林路与凯丰路交汇处理想时代大厦",\n' +
                        '            "legalPersonName" : "郑新类"\n' +
                        '        }\n' +
                        '    ]'
                }, {
                    date: '2019-10-31 10:02:31',
                    name: '融资合同',
                    content: '"name" : "融资合同",\n' +
                        '    "contract_id" : "TXKJ-SH-2017-BJ-TOBB-002",\n' +
                        '    "location" : "天津西青区王稳庄镇高端金属制品工业区盛达五支路18号",\n' +
                        '    "date" : "2017-06-22",\n' +
                        '    "type" : "contract",\n' +
                        '    "participant" : [ \n' +
                        '        {\n' +
                        '            "name" : "中建钢构天津有限公司",\n' +
                        '            "location" : "天津西青区王稳庄镇高端金属制品工业区盛达五支路18号"\n' +
                        '        }, \n' +
                        '        {\n' +
                        '            "name" : "云链电子供应链管理（深圳）有限公司",\n' +
                        '            "location" : "广东省深圳市福田区梅林街道梅林路与凯丰路交汇处理想时代大厦",\n' +
                        '            "legalPersonName" : "郑新类"\n' +
                        '        }\n' +
                        '    ]'
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
            $getInfo() {
                this.initChart()
            },
            initChart() {
                this.chart = echarts.init(document.getElementById('myChart'), 'macarons')
                this.chart.setOption({
                    title: {
                        text: '贸易合约源数据'
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
                        name: '元模型',
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
                            }
                        ],
                        links: [
                            {
                                source: '中建钢构天津有限公司',
                                target: '钢材采购合同'
                            }, {
                                source: '云链电子供应链管理（深圳）有限公司',
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
                                source: '云链电子供应链管理（深圳）有限公司',
                                target: '广东省深圳市福田区梅林街道梅林路与凯丰路交汇处理想时代大厦'
                            }, {
                                source: '云链电子供应链管理（深圳）有限公司',
                                target: '郑新类'
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

                this.chart2 = echarts.init(document.getElementById('myChart2'), 'macarons')
                this.chart2.setOption({
                    title: {
                        text: '外部数据源融合'
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
                        name: '元模型',
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
                                name: '各类钢结构工程（包括桥梁、网架等钢结构工程）的制作、安装；各类钢结构产品的技术开发、设计、试验检测；开发生产大型港口机械；货物及技术进出口。（依法须经批准的项目，经相关部门批准后方可开展经营活动）',
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
                            },
                            {
                                name: '供应链管理及相关配套服务；咨询服务（不含限制项目）；物流服务；数据服务；国内贸易（不含专营、专卖、专控商品）；经营进出口业务（法律、行政法规、国务院决定禁止的项目除外，限制的项目须取得许可后方可经营）；保付代理（非银行融资类）。（以上各项涉及法律、行政法规、国务院决定禁止的项目除外，限制的项目须取得许可后方可经营） ^再生资源收购、销售、分拣整理。',
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
                                source: '云链电子供应链管理（深圳）有限公司',
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
                                target: '各类钢结构工程（包括桥梁、网架等钢结构工程）的制作、安装；各类钢结构产品的技术开发、设计、试验检测；开发生产大型港口机械；货物及技术进出口。（依法须经批准的项目，经相关部门批准后方可开展经营活动）'
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
                                source: '云链电子供应链管理（深圳）有限公司',
                                target: '广东省深圳市福田区梅林街道梅林路与凯丰路交汇处理想时代大厦'
                            }, {
                                source: '云链电子供应链管理（深圳）有限公司',
                                target: '郑新类'
                            }, {
                                source: '云链电子供应链管理（深圳）有限公司',
                                target: '5000万人民币'
                            }, {
                                source: '云链电子供应链管理（深圳）有限公司',
                                target: '440301107972290'
                            }, {
                                source: '云链电子供应链管理（深圳）有限公司',
                                target: '91440300078960108J'
                            }, {
                                source: '云链电子供应链管理（深圳）有限公司',
                                target: '云链电子'
                            }, {
                                source: '云链电子供应链管理（深圳）有限公司',
                                target: '供应链管理及相关配套服务；咨询服务（不含限制项目）；物流服务；数据服务；国内贸易（不含专营、专卖、专控商品）；经营进出口业务（法律、行政法规、国务院决定禁止的项目除外，限制的项目须取得许可后方可经营）；保付代理（非银行融资类）。（以上各项涉及法律、行政法规、国务院决定禁止的项目除外，限制的项目须取得许可后方可经营） ^再生资源收购、销售、分拣整理。'
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
