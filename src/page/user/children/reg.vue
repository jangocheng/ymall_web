<template>
  <div id="reg">
    <el-row type="flex" justify="space-around" align="middle">
      <el-col :xs="10" :sm="10" :md="10" :lg="10">
        <el-form ref="form1" :model="form1" :rules="rules">
          <el-form-item label="手机号" class="r-f-label" prop="phone_number">
            <el-input placeholder="请输入手机号" v-model="form1.phone_number"></el-input>
            <span class="el-icon-circle-check phone-ok" v-show="rightPhoneNumber"></span>
          </el-form-item>
          <el-form-item v-if="false" label="邮箱" class="r-f-label">
            <el-input placeholder="请输入邮箱" v-model="email"></el-input>
          </el-form-item>
          <el-form-item label="密码" class="r-f-label" prop="password">
            <el-input type="password" placeholder="请输入密码" v-model="form1.password"></el-input>
            <span class="el-icon-circle-check pass-ok" v-if="isPass"></span>
          </el-form-item>
          <el-form-item label="确认密码" class="r-f-label" prop="passwordOk">
            <el-input type="password" placeholder="请再次输入密码" v-model="form1.passwordOk"></el-input>
            <span class="el-icon-circle-check both-ok" v-if="isSamePass"></span>
          </el-form-item>
          <el-form-item label="验证码" class="r-f-label" style="margin-top: 25px;" prop="auth_code">
            <el-row>
              <el-col :xs="6" :sm="6" :md="6" :lg="6">
                <el-input placeholder="请输入验证码" class="codeNumber" v-model="form1.auth_code"></el-input>
              </el-col>
              <el-col :xs="6" :sm="6" :md="6" :lg="6" :offset="6">
                <el-button style="background: #f0ebf0;" @click.prevent="sendCode"
                           :class="{'right-phone-number':rightPhoneNumber}" v-show="!computedTime">获取验证码
                </el-button>
                <el-button @click.prevent v-show="computedTime">已发送({{computedTime}}s)</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row>
              <el-col :xs="2" :sm="2" :md="2" :lg="2" :offset="5">
                <el-button :offset="6" type="primary" @click="register('form1')" style="margin-top: 25px;">立即注册
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :xs="2" :sm="2" :md="2" :lg="2">
        <span class="r-line"></span>
      </el-col>
      <el-col :xs="8" :sm="8" :md="8" :lg="8">
        <div>
          <span class="r-login-text">已注册WisSky账号？</span>
          <el-button type="primary" @click="$router.push('/user/login')" class="r-login">登录账号
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  import Vue from 'vue'
  import {input, form, validateState, icon, formItem, option} from 'element-ui'
  import {getSmsCode, register} from 'service/getData'
  Vue.use(input)
  Vue.use(form)
  Vue.use(formItem)
  Vue.use(icon)
  Vue.use(option)
  export default {
    mixins: [],     //混合
    components: {},//注册组件
    data(){         //数据
      var validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error("请输入手机号"))
        } else if (!/^1\d{10}$/g.test(value)) {
          callback(new Error("手机号格式不正确"))
        } else {
          callback();
        }
      }
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (value.length < 6) {
          callback(new Error("长度必须大于6位"))
        } else {
          callback();
        }
      };
      var validatePassOk = (rule, value, callback) => {
        if (this.form1.password.length >= 6) {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.form1.password) {
            callback(new Error('两次密码不一致'))
          } else {
            callback();
          }
        }
      }
      return {
        title: "用户注册",//父组件名字
        computedTime: 0, //倒数记时
        form1: {
          phone_number: "",
          email: "",
          password: "",
          passwordOk: "",
          auth_code: "",
        },
        rules: {
          phone_number: [
            {validator: validatePhone, trigger: 'change'}
          ],
          password: [
            {validator: validatePass, trigger: 'change'}
          ],
          passwordOk: [
            {validator: validatePassOk, trigger: 'change'}
          ],
          auth_code: [
//          {required: true, message: '验证码不能为空', trigger: 'blur'},
            {min: 6, max: 6, message: '验证码格式不对', trigger: 'blur'}
          ],
        },

      };
    },
    created(){
      //this.$parent.$data.titleData.title="用户注册";
    },
    props: ["parentData"],
    beforeRouteEnter(to, from, next){
      next(vm => {
        vm.parentData.title = "用户注册";
      });
    },
    computed: {
      rightPhoneNumber(){
        return /^1\d{10}$/g.test(this.form1.phone_number);
      },
      isSamePass(){
        let flag = /^\d{6,}$/g.test(this.form1.password);
        return flag && this.form1.password == this.form1.passwordOk;
      },
      isPass(){
        return /^\d{6,}$/g.test(this.form1.password);
      }
    },  //计算属性
    //挂载
    methods: {
      sendCode(){
        if (this.rightPhoneNumber) {
          let myData = {flag: 'register', phone_number: this.form1.phone_number};
          getSmsCode(myData).then(response => {
            if (response.data.status == "success") {
              this.computedTime = 60;
              this.timer = setInterval(() => {
                this.computedTime--;
                if (this.computedTime == 0) {
                  clearInterval(this.timer)
                }
              }, 1000)
            }
          }).catch(error => {
            let content = error.response.data.content;
            this.message({
              message: content,
              type: 'warning',
              duration: '1500'
            });
          });
        } else {
          this.message({
            message: '手机号不能为空',
            type: 'warning',
          });
        }
      },
      register(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let myData = {
              phone_number: this.form1.phone_number,
              password: this.form1.password,
              auth_code: this.form1.auth_code
            }
            register(myData).then(response => {
              this.message({
                message: '注册成功',
                type: 'success',
                duration: '1500'
              });
              this.$router.push("/user/login");
            }).catch(error => {
              var content = error.response.data.content;
              this.message({
                message: content,
                type: 'warning',
                duration: '1500'
              });
            })
          } else {
            this.message({
              message: '您有信息未填写完整',
              type: 'warning',
              duration: '1500'
            });
          }
        });

      },
    },   //方法
    watch: {}      //监听

  }
</script>

<style scoped>
  .el-button--primary {
    margin-left: 25px;
    border-radius: 13px;
    width: 160px;
    height: 40px;
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

  .r-login-text {
    color: #324057;
    font-size: large;
    margin-left: 29px;
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
