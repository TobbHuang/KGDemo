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

    <el-row>
      <el-col :span='2'>
<!--        <el-button plain @click="$getInfo">查询元模型</el-button>-->

        <el-button plain @click="dialogFormVisible = true">查询元模型</el-button>

      </el-col>
    </el-row>

    <el-row>
      <el-col :span='4'>
        <!--<el-card v-if="visible">该企业权重 ：{{companyWeight.toFixed(2)}}</el-card>-->
      </el-col>
    </el-row>

    <el-row>
      <div id="myChart" :style="{width: '80%', height: '500px'}"/>
      <div id="myChart2" :style="{width: '80%', height: '500px'}"/>
    </el-row>

    <el-table
      :data="tableData"
      height="250"
      border
      style="width: 100%">
      <el-table-column
        prop="date"
        label="时间"
        width="400">
      </el-table-column>
      <el-table-column
        prop="desc"
        label="演化描述"
        width="400">
      </el-table-column>
      <el-table-column
        prop="origin"
        label="数据来源">
      </el-table-column>
    </el-table>

    <el-dialog title="元模型选择" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="左侧显示" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择版本">
            <el-option label="2019-10-30 12:22:10" value="shanghai"></el-option>
            <el-option label="最新版本" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="右侧显示" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择版本">
            <el-option label="2019-10-30 12:22:10" value="shanghai"></el-option>
            <el-option label="最新版本" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
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
                dialogFormVisible: false,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '120px',
                tableData: [{
                    date: '2019-10-31 10:01:22',
                    desc: '实体"企业"新增属性：industry',
                    origin: '天眼查'
                }, {
                    date: '2019-10-31 10:01:22',
                    desc: '实体"企业"新增属性：alias',
                    origin: '天眼查'
                }, {
                    date: '2019-10-31 10:01:22',
                    desc: '实体"企业"新增属性：businessScope',
                    origin: '天眼查，启信宝'
                }, {
                    date: '2019-10-31 10:01:22',
                    desc: '实体"企业"新增属性：actualCapital',
                    origin: '天眼查'
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
                        text: '上一版本元模型'
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
                        height: 700,
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
                                name: '企业',
                                symbolSize: 30,
                                category: 0
                            },
                            {
                                name: '合约',
                                symbolSize: 30,
                                category: 1
                            },
                            {
                                name: 'location',
                                symbolSize: 20,
                                category: 2
                            },
                            {
                                name: 'date',
                                symbolSize: 20,
                                category: 2
                            },
                            {
                                name: 'regLocation',
                                symbolSize: 20,
                                category: 2
                            },
                            {
                                name: 'creditCode',
                                symbolSize: 20,
                                category: 2
                            },
                            {
                                name: 'regNumber',
                                symbolSize: 20,
                                category: 2
                            },
                            {
                                name: 'legalPersonName',
                                symbolSize: 20,
                                category: 2
                            }
                        ],
                        links: [
                            {
                                source: '企业',
                                target: '合约'
                            }, {
                                source: '合约',
                                target: 'location'
                            }, {
                                source: '合约',
                                target: 'date'
                            }, {
                                source: '企业',
                                target: 'regLocation'
                            }, {
                                source: '企业',
                                target: 'creditCode'
                            }, {
                                source: '企业',
                                target: 'regNumber'
                            }, {
                                source: '企业',
                                target: 'legalPersonName'
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
                        text: '最新元模型'
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
                        height: 700,
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
                                name: '企业',
                                symbolSize: 30,
                                category: 0
                            },
                            {
                                name: '合约',
                                symbolSize: 30,
                                category: 1
                            },
                            {
                                name: 'location',
                                symbolSize: 20,
                                category: 2
                            },
                            {
                                name: 'date',
                                symbolSize: 20,
                                category: 2
                            },
                            {
                                name: 'regLocation',
                                symbolSize: 20,
                                category: 2
                            },
                            {
                                name: 'creditCode',
                                symbolSize: 20,
                                category: 2
                            },
                            {
                                name: 'regNumber',
                                symbolSize: 20,
                                category: 2
                            },
                            {
                                name: 'legalPersonName',
                                symbolSize: 20,
                                category: 2
                            },
                            {
                                name: 'industry',
                                symbolSize: 20,
                                category: 2
                            },
                            {
                                name: 'alias',
                                symbolSize: 20,
                                category: 2
                            },
                            {
                                name: 'businessScope',
                                symbolSize: 20,
                                category: 2
                            },
                            {
                                name: 'actualCapital',
                                symbolSize: 20,
                                category: 2
                            }
                        ],
                        links: [
                            {
                                source: '企业',
                                target: '合约'
                            }, {
                                source: '合约',
                                target: 'location'
                            }, {
                                source: '合约',
                                target: 'date'
                            }, {
                                source: '企业',
                                target: 'regLocation'
                            }, {
                                source: '企业',
                                target: 'creditCode'
                            }, {
                                source: '企业',
                                target: 'regNumber'
                            }, {
                                source: '企业',
                                target: 'legalPersonName'
                            }, {
                                source: '企业',
                                target: 'industry'
                            }, {
                                source: '企业',
                                target: 'alias'
                            }, {
                                source: '企业',
                                target: 'businessScope'
                            }, {
                                source: '企业',
                                target: 'actualCapital'
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
