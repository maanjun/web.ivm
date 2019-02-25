<template>
  <div class="app-container">
    <h4>人员查询条件</h4>
    <el-form ref="searchForm" :model="searchForm" label-width="100px" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-form-item label="登录名：">
            <el-input v-model="searchForm.loginName" clearable style="width: 220px;" placeholder="请输入登录名"/>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="手机号码：">
            <el-input v-model="searchForm.phone" clearable style="width: 220px;" placeholder="请输入手机号码"/>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="状态：">
            <el-select v-model="searchForm.loginFlag" clearable style="width: 220px;" placeholder="请选择状态">
              <el-option label="禁用" value="0"/>
              <el-option label="启用" value="1"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-form-item label="姓名：">
            <el-input v-model="searchForm.name" clearable style="width: 220px;" placeholder="请输入姓名"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2" :offset="14">
          <el-button type="primary" @click.native.prevent="queryUserList">查询</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="resetForm('searchForm')">重置</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click.native.prevent="addUser">新增</el-button>
        </el-col>
      </el-row>
    </el-form>
    <br>
    <div class="list">人员列表</div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column label="登录名" width="220" align="center">
        <template slot-scope="scope">
          {{ scope.row.loginName }}
        </template>
      </el-table-column>
      <el-table-column label="名字" width="220" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工号" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.jobno }}
        </template>
      </el-table-column>
      <el-table-column label="手机" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column label="邮件" width="210" align="center">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="255" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="updateUser(scope.row)">修改</el-button>
          <el-button v-if="scope.row.id !== 1" type="text" size="small" @click="deleteUser(scope.row)">删除</el-button>
          <el-button type="text" size="small" @click="resetPassword(scope.row)">重置密码</el-button>
          <el-button v-if="scope.row.login_flag !== '1'" v-show="scope.row.id === 1" type="text" size="small" @click="opLock(scope.row, '1')">启用</el-button>
          <el-button v-if="scope.row.login_flag === '1'" v-show="scope.row.id === 1" type="text" size="small" @click="opLock(scope.row, '0')">禁用</el-button>
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
import { getList, deleteSysuser, resetUserPassword } from '@/api/sysuser'

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
      listLoading: true,
      searchForm: { loginName: '', phone: '', name: '', loginFlag: '' },
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
    queryUserList() {
      this.listLoading = true
      var params = {
        'loginName': this.searchForm.loginName,
        'phone': this.searchForm.phone,
        'name': this.searchForm.name,
        'loginFlag': this.searchForm.loginFlag
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
      this.queryUserList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.queryUserList()
    },
    resetForm(formname) {
      this.searchForm.loginName = ''
      this.searchForm.phone = ''
      this.searchForm.name = ''
      this.searchForm.loginFlag = ''
    },
    addUser() {
      this.$router.push({
        path: '/sysuser/add'
      })
    },
    detail(user) {
      this.$router.push({
        path: '/sysuser/detail',
        query: {
          id: user.id
        }
      })
    },
    updateUser(user) {
      this.$router.push({
        path: '/sysuser/update',
        query: {
          id: user.id
        }
      })
    },
    resetPassword(user) {
      this.$confirm(`您确定重置[${user.loginName}]的密码吗, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        resetUserPassword(user).then(response => {
          if (response.status === 200) {
            this.$message.success('重置成功!')
          } else {
            this.$message.error(response.msg)
          }
        })
      }).catch(() => {
        this.$message.info('已取消重置')
      })
    },
    deleteUser(user) {
      this.$confirm(`您确定删除[${user.loginName}]用户吗, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var params = { id: user.id }
        deleteSysuser(params).then(response => {
          if (response.code === '0') {
            this.$message.success('删除成功!')
          } else {
            this.$message.error(response.message)
          }
        })
      }).catch(() => {
        this.$message.info('已取消删除')
      })
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
