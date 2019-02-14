<template>
  <div>
    <el-row>
      <el-col :span=18>
        <div style="background:#1f2d3d;height:60px">合同</div>
      </el-col>
      <el-col :span=6>
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
      <el-col :span=3>
        <el-input placeholder="需要随机生成的合同数量" v-model="amount"></el-input>
      </el-col>

      <el-col :span=2>
        <el-button @click="$randomizeContract()">一键生成</el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-table :data="tableData" style="width:100%;margin-top: 20px;margin-left:50px" >
        <el-table-column prop="partyAName" label="甲方" width="380"></el-table-column>
        <el-table-column prop="partyBName" label="乙方" width="380"></el-table-column>
        <el-table-column prop="amount" label="合同金额" width="180"></el-table-column>
        <el-table-column prop="startTime" label="开始时间" width="280"></el-table-column>
        <el-table-column prop="endTime" label="结束时间" width="280"></el-table-column>
        <el-table-column prop="location" label="执行地点" width="180"></el-table-column>
      </el-table>
    </el-row>

  </div>
</template>

<script>
import {randomizeContract, getAllContracts} from '../api/api'

export default {
  data () {
    return {
      amount: null,
      tableData: null
    }
  },
  methods: {
    $randomizeContract () {
      // randomizeContract(this.amount)
      // randomizeContract()
      getAllContracts().then(response => {
        this.tableData = response.data.obj
      })
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 4 === 1) {
        return 'warning-row'
      } else if (rowIndex % 4 === 3) {
        return 'success-row'
      }
      return ''
    },
  }
}
</script>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
