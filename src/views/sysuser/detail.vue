<template>
  <div class="app-container">
    <h4 class="title">人员信息详情</h4>
    <div style="color: #606266;font-size:14px;width:960px;overflow:auto;border:#E6E6E6 solid 1px;">
      <el-row :gutter="6" style="margin-left:0px;margin-right:0px;margin-top:20px;">
        <el-col :span="4" style="text-align:right">
          <span>
            账号：
          </span>
        </el-col>
        <el-col :span="8">
          <span>
            {{ userForm.loginName }}
          </span>
        </el-col>
        <el-col :span="4" style="text-align:right">
          <span>
            姓名：
          </span>
        </el-col>
        <el-col :span="8">
          <span>
            {{ userForm.name }}
          </span>
        </el-col>
      </el-row>
      <el-row :gutter="6" style="margin-left:0px;margin-right:0px;margin-top:12px;">
        <el-col :span="4" style="text-align:right">
          <span>
            手机：
          </span>
        </el-col>
        <el-col :span="8">
          <span>
            {{ userForm.phone }}
          </span>
        </el-col>
        <el-col :span="4" style="text-align:right">
          <span>
            邮件：
          </span>
        </el-col>
        <el-col :span="8">
          <span>
            {{ userForm.email }}
          </span>
        </el-col>
      </el-row>
      <el-row :gutter="6" style="margin-left:0px;margin-right:0px;margin-top:12px;margin-bottom:20px">
        <el-col :span="4" style="text-align:right">
          <span>
            工号：
          </span>
        </el-col>
        <el-col :span="8">
          <span>
            {{ userForm.jobno ? userForm.jobno : '&nbsp;' }}
          </span>
        </el-col>
        <el-col :span="4" style="text-align:right">
          <span>
            最近登录时间：
          </span>
        </el-col>
        <el-col :span="8">
          <span>
            {{ userForm.logintime ? userForm.logintime : '&nbsp;' }}
          </span>
        </el-col>
      </el-row>
    </div>
    <br>
    <div style="text-align: center">
      <el-button type="primary" @click="onCancel">返回</el-button>
    </div>
  </div>
</template>

<script>
import { detail } from '@/api/sysuser'

export default {
  data() {
    return {
      userForm: {
        loginName: '',
        phone: '',
        name: '',
        email: '',
        jobno: ''
      }
    }
  },
  created() {
    var params = { 'id': this.$route.query.id }
    detail(params).then(response => {
      if (response.code === '0') {
        this.userForm = response.data
      } else {
        this.$message.error(response.message)
      }
    }).catch(error => {
      this.$message.error(error.msg)
    })
  },
  methods: {
    onCancel() {
      this.$router.push({
        path: '/sysuser/list'
      })
    }
  }
}
</script>

<style scoped>
  .line {
    text-align: center;
  }

</style>
