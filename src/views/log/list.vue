<template>
  <div class="app-container">
    <h4>日志查询条件</h4>
    <el-form ref="searchForm" :model="searchForm" label-width="100px" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="14">
          <el-form-item label="执行时间：">
            <el-date-picker
              v-model="searchForm.execBeginTime"
              type="datetime"
              range-separator="至"
              placeholder="开始时间"/> -
            <el-date-picker
              v-model="searchForm.execEndTime"
              type="datetime"
              range-separator="至"
              placeholder="结束时间"/>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="xtlb：">
            <el-input v-model="searchForm.xtlb" clearable style="width: 200px;" placeholder="请输入xtlb"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-form-item label="jkxlh：">
            <el-input v-model="searchForm.jkxlh" clearable style="width: 200px;" placeholder="请输入jkxlh"/>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="jkid：">
            <el-input v-model="searchForm.jkid" clearable style="width: 200px;" placeholder="请输入jkid"/>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="cjsqbh：">
            <el-input v-model="searchForm.cjsqbh" clearable style="width: 200px;" placeholder="请输入cjsqbh"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-form-item label="dwjgdm：">
            <el-input v-model="searchForm.dwjgdm" clearable style="width: 200px;" placeholder="请输入dwjgdm"/>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="dwmc：">
            <el-input v-model="searchForm.dwmc" clearable style="width: 200px;" placeholder="请输入dwmc"/>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="yhxm：">
            <el-input v-model="searchForm.yhxm" clearable style="width: 200px;" placeholder="请输入yhxm"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2" :offset="16">
          <el-button type="primary" @click.native.prevent="queryLogList">查询</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="resetForm('searchForm')">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <br>
    <div class="list">日志列表</div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column label="序号" width="50" align="center">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="执行时间" width="160" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.execdatetime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="xtlb" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.xtlb }}
        </template>
      </el-table-column>
      <el-table-column label="jkxlh" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.jkxlh }}
        </template>
      </el-table-column>
      <el-table-column label="jkid" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.jkid }}
        </template>
      </el-table-column>
      <el-table-column label="cjsqbh" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.cjsqbh }}
        </template>
      </el-table-column>
      <el-table-column label="dwjgdm" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.dwjgdm }}
        </template>
      </el-table-column>
      <el-table-column label="dwmc" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.dwmc }}
        </template>
      </el-table-column>
      <el-table-column label="yhxm" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.yhxm }}
        </template>
      </el-table-column>
      <el-table-column label="zdbs" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.zdbs }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="60" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="detail(scope.row)">详细</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" align="right" style="padding-right:20px">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="pagesizes"
        :page-size="pagesize"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/log'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      searchForm: {
        execBeginTime: '',
        execEndTime: '',
        xtlb: '',
        jkxlh: '',
        jkid: '',
        cjsqbh: '',
        dwjgdm: '',
        dwmc: '',
        yhxm: '',
        zdbs: ''
      },
      pagesizes: [10, 20, 30, 50],
      pagesize: 10,
      currentPage: 1,
      total: 0
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      var params = {}
      getList(params, this.currentPage, this.pagesize).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.currentPage = response.data.currentPage
        this.pagesize = response.data.pagesize
        this.listLoading = false
      })
    },
    queryLogList() {
      this.listLoading = true
      var params = {
        execBeginTime: this.searchForm.execBeginTime,
        execEndTime: this.searchForm.execEndTime,
        xtlb: this.searchForm.xtlb,
        jkxlh: this.searchForm.jkxlh,
        jkid: this.searchForm.jkid,
        cjsqbh: this.searchForm.cjsqbh,
        dwjgdm: this.searchForm.dwjgdm,
        dwmc: this.searchForm.dwmc,
        yhxm: this.searchForm.yhxm,
        zdbs: this.searchForm.zdbs
      }
      getList(params, this.currentPage, this.pagesize).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.currentPage = response.data.currentPage
        this.pagesize = response.data.pagesize
        this.listLoading = false
      }).catch(error => {
        this.loading = false
        this.$message.error(error.msg)
      })
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.queryLogList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.queryLogList()
    },
    detail(log) {
      this.$router.push({
        path: '/log/detail',
        query: {
          id: log.id
        }
      })
    },
    resetForm(formname) {
      this.searchForm.execBeginTime = ''
      this.searchForm.execEndTime = ''
      this.searchForm.xtlb = ''
      this.searchForm.jkxlh = ''
      this.searchForm.jkid = ''
      this.searchForm.cjsqbh = ''
      this.searchForm.dwjgdm = ''
      this.searchForm.dwmc = ''
      this.searchForm.yhxm = ''
      this.searchForm.zdbs = ''
    }
  }
}
</script>

<style scoped>
  .list {
    height: 30px;
    line-height: 30px;
    background: #6ebfec;
    font-size: 14px;
    color: #fff;
    padding-left: 20px;
    font-weight: bold;
  }
</style>
