<template>
  <div id="reset">
    <el-col type="flex" :span="13" justify="center">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-row>
          <el-form-item label="手机号" prop="number">
            <el-input placeholder="请输入手机号" v-model="ruleForm.number"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="验证码" prop="captcha">
            <el-col>
              <el-row>
                <el-col :span="8">
                  <el-input placeholder="请输入验证码" class="codeNumber" v-model="ruleForm.captcha"></el-input>
                </el-col>
                <el-col :span="8" :offset="8">
                  <el-button style="background: #f0ebf0;" @click.prevent="sendCode"
                             :class="{'right-phone-number':rightPhoneNumber}" v-show="!computedTime">获取验证码
                  </el-button>
                  <el-button @click.prevent v-show="computedTime">已发送({{computedTime}}s)</el-button>
                </el-col>
              </el-row>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item>
            <el-col :offset="6">
              <el-button type="primary" @click="resetPass('ruleForm')" style="margin-top: 10px; ">重置密码
              </el-button>
            </el-col>
          </el-form-item>
        </el-row>
      </el-form>
    </el-col>

  </div>
</template>

<script>
  import Vue from 'vue'
  import {input, form, validateState, icon, formItem, option, messageBox} from 'element-ui'
  import {getSmsCode, resetPassword, isAuthCodeRight} from 'service/getData'

  Vue.use(input)
  Vue.use(form)
  Vue.use(formItem)
  Vue.use(icon)
  Vue.use(option)

  export default {

    mixins: [],     //混合
    components: {},//注册组件
    data(){
      var validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error("请输入手机号"))
        } else if (!/^1\d{10}$/g.test(value)) {
          callback(new Error("手机号格式不正确"))
        } else {
          callback();
        }
      }
      return {
        computedTime: 0, //倒数记时
        ruleForm: {
          number: '',//手机号码
          captcha: '',//验证码
        },
        rules: {
          number: [
            {validator: validatePhone, trigger: 'change'}
          ],
          captcha: [
            {min: 6, max: 6, message: "验证码必须为6位", trigger: 'blur,change'}
          ]
        }
      }
    },
    props: ["parentData"],
    beforeRouteEnter(to, from, next){
      next(vm => {
        vm.parentData.title = "重置密码";
      });
    },
    computed: {
      rightPhoneNumber: function () {
        return /^1\d{10}$/gi.test(this.ruleForm.number);
      }

    },  //计算属性
    created(){
    },   //创建
    mounted(){
    },   //挂载
    methods: {
      sendCode(){
        if (this.rightPhoneNumber) {
          getSmsCode({flag: "change_password", phone_number: this.ruleForm.number})
            .then(response => {
              console.log(response.data.status);
              this.computedTime = 60;
              this.timer = setInterval(() => {
                this.computedTime--;
                if (this.computedTime == 0) {
                  clearInterval(this.timer)
                }
              }, 1000)
            })
            .catch(error => {
              var content = error.response.data.content;
              this.message({
                message: content,
                type: "warning",
                duration: "1500",
              });
            });
        } else {
          this.message({
            message: '手机号不能为空',
            type: 'warning',
            duration: "1500"
          });
        }

      },
      resetPass(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //验证码是否正确
            let myData = {
              phone_number: this.ruleForm.number,
              auth_code: this.ruleForm.captcha
            };
            isAuthCodeRight(myData).then(response => {
              messageBox.prompt('请输入新密码', '重置密码', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /^\d{6,}$/,///[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                inputErrorMessage: '密码格式不正确'
              }).then(({value}) => {
                let myData = {
                  new_password: value,
                  auth_code: this.ruleForm.captcha,
                  phone_number: this.ruleForm.number
                };
                return resetPassword(myData);
              }).then(response => {
                this.$router.push("/user/login");
              }).catch(error => {
                var content = error.response.data.content;
                this.message({
                  message: content,
                  type: "error",
                  duration: "1500"
                });
              });
            }).catch(error => {
              var content = error.response.data.content;
              this.message({
                message: content,
                type: "warning",
                duration: "1500"
              })
            })
          }
        });
      }
    },   //方法
    watch: {}  //监听
  }
</script>

<style scoped>
  #reg {
    margin-left: -14px;
  }

  .r-line {
    width: 1px;
    height: 320px;
    background-color: #f0ebf0;
    display: block;
    text-align: center;
    margin: 0 auto;
  }

  .r-f-label {
    margin-bottom: 12px;
  }

  .r-login {
    width: 150px;
  }

  .el-button--primary {
    border-radius: 13px;
    width: 160px;
    height: 40px;
  }

  .r-login-text {
    color: #324057;
    font-size: large;
    line-height: 45px;
  }

  .codeNumber {
    width: 107px;
  }

  .el-icon-circle-check {
    display: inline;
    position: absolute;
  }

  .both-ok,
  .phone-ok,
  .pass-ok {
    right: -30px;
    top: 46px;
    color: green;
  }

  .right-phone-number {
    background: red;
  }
</style>
