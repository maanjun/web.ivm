<template>
  <div class="app-container">
    <h4 class="title">新增人员</h4>
    <el-form ref="userForm" :model="userForm" :rules="rules" label-width="120px">
      <el-form-item label="账号：" prop="loginName">
        <el-input v-model="userForm.loginName" maxlength="16" style="width: 220px;" placeholder="请输入账号" clearable/>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="手机：" prop="phone">
            <el-input v-model="userForm.phone" maxlength="11" style="width: 220px;" placeholder="请输入手机" clearable/>
          </el-form-item>
        </el-col>
        <el-col :span="16" style="padding-top:8px">
          <span style="font-family: 宋体, Arial, sans-serif;font-size: 12px;color: #999;">手机必须为11位号码</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="密码：" prop="password">
            <el-input v-model="userForm.password" type="password" maxlength="20" minlength="8" style="width: 220px;" placeholder="请输入密码" clearable/>
            <PasswordStrength :password="userForm.password" @pwdInfo="getPwdInfo" />
          </el-form-item>
        </el-col>
        <el-col :span="16" style="padding-top:8px">
          <span style="font-family: 宋体, Arial, sans-serif;font-size: 12px;color: #999;">请输入8-20位由英文大写、英文小写、数字、特殊字符中任意至少三种类型构成的密码信息</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="确认密码：" prop="repassword">
            <el-input v-model="userForm.repassword" type="password" maxlength="20" minlength="8" style="width: 220px;" placeholder="请再次输入密码" clearable/>
          </el-form-item>
        </el-col>
        <el-col :span="16" style="padding-top:8px">
          <span style="font-family: 宋体, Arial, sans-serif;font-size: 12px;color: #999;">请输入8-20位由英文大写、英文小写、数字、特殊字符中任意至少三种类型构成的密码信息</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="userForm.name" maxlength="20" style="width: 220px;" placeholder="请输入姓名" clearable/>
          </el-form-item>
        </el-col>
        <el-col :span="16" style="padding-top:8px">
          <span style="font-family: 宋体, Arial, sans-serif;font-size: 12px;color: #999;">姓名必须为1-20位，可以是字母或中文</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="邮件：" prop="email">
            <el-input v-model="userForm.email" style="width: 220px;" placeholder="请输入邮件" clearable/>
          </el-form-item>
        </el-col>
        <el-col :span="16" style="padding-top:8px">
          <span style="font-family: 宋体, Arial, sans-serif;font-size: 12px;color: #999;">请输入有效电子邮箱，如：linux@139.com</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="工号：" prop="jobno">
            <el-input v-model="userForm.jobno" clearable style="width: 220px;" placeholder="请输入工号" />
          </el-form-item>
        </el-col>
      </el-row>
      <br>
      <div style="text-align: center">
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button type="primary" @click="onCancel">返回</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { addUser } from '@/api/sysuser'
import PasswordStrength from '@/components/PasswordStrength/index'
import {
  validateCMMobilePhone,
  containSymbol,
  validateEmail
} from '@/utils/validate'

export default {
  components: {
    PasswordStrength
  },
  data() {
    // 必填
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入姓名'))
      } else {
        if (value.indexOf(' ') >= 0) {
          callback(new Error('不能包含空格'))
        } else if (containSymbol(value.trim())) {
          callback(new Error('不能包含特殊字符'))
        } else {
          callback()
        }
      }
    }
    var validateCellphone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号码'))
      } else {
        if (!validateCMMobilePhone(value.trim())) {
          callback(new Error('请输入有效的中国移动手机号码'))
        }
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.userForm.password.length < 8) {
          callback(new Error('请密码长度不足8位'))
        } else if (this.pwdInfo.score < 4) {
          callback(new Error('密码强度不够'))
        } else if (this.userForm.repassword !== '') {
          this.$refs.userForm.validateField('repassword')
          callback()
        }
      }
    }
    var validateRepass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.userForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var validateMail = (rule, value, callback) => {
      if (value !== null && value !== '') {
        if (!validateEmail(value.trim())) {
          callback(new Error('请输入有效的邮箱工号'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      userForm: {
        loginName: '',
        password: '',
        repassword: '',
        phone: '',
        name: '',
        email: '',
        jobno: ''
      },
      rules: {
        phone: [{
          required: true,
          trigger: 'blur',
          validator: validateCellphone
        }],
        loginName: [{
          required: true,
          trigger: 'change',
          validator: validateName
        }],
        password: [{
          required: true,
          validator: validatePass,
          trigger: 'blur'
        }],
        repassword: [{
          required: true,
          validator: validateRepass,
          trigger: 'blur'
        }],
        name: [{
          required: true,
          trigger: 'change',
          validator: validateName
        }],
        email: [{
          required: false,
          validator: validateMail,
          trigger: 'blur'
        }],
        jobno: [{
          required: false,
          message: '请输入工号',
          trigger: 'blur'
        }]
      },
      pwdInfo: {}
    }
  },
  methods: {
    getPwdInfo(data) {
      this.pwdInfo = data
    },
    onSubmit() {
      this.$refs.userForm.validate(valid => {
        if (valid) {
          var params = {
            'loginName': `${this.userForm.loginName}`,
            'password': this.userForm.password,
            'name': `${this.userForm.name}`,
            'phone': `${this.userForm.phone}`,
            'email': `${this.userForm.email}`,
            'jobno': `${this.userForm.jobno}`
          }
          addUser(params).then(response => {
            if (response.code === '0') {
              this.$message.success('新增人员成功')
              this.$router.push({
                path: '/sysuser/list'
              })
            } else {
              this.$message.error(response.message)
            }
          }).catch(error => {
            this.$message.error(error.msg)
          })
        } else {
          this.$message.error('填写内容不规范，提交失败！')
        }
      })
    },
    onCancel() {
      this.$router.push({
        path: '/user/blist'
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
