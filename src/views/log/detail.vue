<template>
  <el-container style="width:1000px;margin:0 auto 20px">
    <el-main>
      <h4>基本信息</h4>
      <div style="color: #606266;font-size:14px;width:960px;height:180px;overflow:auto;border:#E6E6E6 solid 1px;">
        <el-row :gutter="6" style="margin-left:0px;margin-right:0px;margin-top:20px;">
          <el-col :span="4" style="text-align:right">
            <span>
              序号：
            </span>
          </el-col>
          <el-col :span="8">
            <span>
              {{ logDetail.id }}
            </span>
          </el-col>
          <el-col :span="4" style="text-align:right">
            <span>
              执行时间：
            </span>
          </el-col>
          <el-col :span="8">
            <span>
              {{ logDetail.execdatetime }}
            </span>
          </el-col>
        </el-row>
        <el-row :gutter="6" style="margin-left:0px;margin-right:0px;margin-top:12px;">
          <el-col :span="4" style="text-align:right">
            <span>
              xtlb：
            </span>
          </el-col>
          <el-col :span="8">
            <span>
              {{ logDetail.xtlb }}
            </span>
          </el-col>
          <el-col :span="4" style="text-align:right">
            <span>
              jkxlh：
            </span>
          </el-col>
          <el-col :span="8">
            <span>
              {{ logDetail.jkxlh }}
            </span>
          </el-col>
        </el-row>
        <el-row :gutter="6" style="margin-left:0px;margin-right:0px;margin-top:12px;">
          <el-col :span="4" style="text-align:right">
            <span>
              jkid：
            </span>
          </el-col>
          <el-col :span="8">
            <span>
              {{ logDetail.jkid }}
            </span>
          </el-col>
          <el-col :span="4" style="text-align:right">
            <span>
              cjsqbh：
            </span>
          </el-col>
          <el-col :span="8">
            <span>
              {{ logDetail.cjsqbh }}
            </span>
          </el-col>
        </el-row>
        <el-row :gutter="6" style="margin-left:0px;margin-right:0px;margin-top:12px;">
          <el-col :span="4" style="text-align:right">
            <span>
              dwjgdm：
            </span>
          </el-col>
          <el-col :span="8">
            <span>
              {{ logDetail.dwjgdm }}
            </span>
          </el-col>
          <el-col :span="4" style="text-align:right">
            <span>
              dwmc：
            </span>
          </el-col>
          <el-col :span="8">
            <span>
              {{ logDetail.dwmc }}
            </span>
          </el-col>
        </el-row>
        <el-row :gutter="6" style="margin-left:0px;margin-right:0px;margin-top:12px;">
          <el-col :span="4" style="text-align:right">
            <span>
              yhxm：
            </span>
          </el-col>
          <el-col :span="8">
            <span>
              {{ logDetail.yhxm }}
            </span>
          </el-col>
          <el-col :span="4" style="text-align:right">
            <span>
              zdbs：
            </span>
          </el-col>
          <el-col :span="8">
            <span>
              {{ logDetail.zdbs }}
            </span>
          </el-col>
        </el-row>
      </div>
      <h4>请求报文</h4>
      <div style="color: #606266;font-size:14px;width:960px;height:200px;overflow-x:hidden;border:#E6E6E6 solid 1px;padding:15px 20px;line-height:30px;word-wrap:break-word;word-break:break-all;">
        <span>
          {{ logDetail.utf8xmldoc }}
        </span>
      </div>
      <h4>响应报文</h4>
      <div style="color: #606266;font-size:14px;width:960px;height:300px;overflow-x:hidden;border:#E6E6E6 solid 1px;padding:15px 20px;line-height:30px;word-wrap:break-word;word-break:break-all;">
        <span>
          {{ logDetail.responsestr }}
        </span>
      </div>
      <div style="margin-top: 20px; text-align: center;">
        <el-button type="primary" @click="goBack">返 回</el-button>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import {
  getDetail
} from '@/api/log'
export default {
  data() {
    return {
      logDetail: {
        execTime: ['', ''],
        xtlb: '',
        jkxlh: '',
        jkid: '',
        cjsqbh: '',
        dwjgdm: '',
        dwmc: '',
        yhxm: '',
        zdbs: '',
        utf8xmldoc: '',
        responsestr: ''
      }
    }
  },
  created() {
    this.getLogInfo()
  },
  methods: {
    getLogInfo() {
      var params = {
        'id': this.$route.query.id
      }
      getDetail(params).then(response => {
        if (response.code === '0') {
          this.logDetail = response.data
        } else {
          this.$message.error(response.message)
        }
      }).catch(error => {
        this.$message.error(error.msg)
      })
    },
    goBack() {
      this.$router.push({
        path: '/log/list'
      })
    }
  }
}
</script>
