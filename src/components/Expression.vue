<template>
  <div>
  <el-popover
      placement="bottom"
      title="标题"
      width="480"
      height="700"
      trigger="click"
      v-model="emojiShow"
  >
    <el-button slot="reference">😀</el-button>
    <div class="browBox" v-if="emojiShow">
      <ul>
        <li v-for="(item, index) in faceList" :key="index" @click="getBrow(index)">
          {{ item }}
        </li>
      </ul>
    </div>
  </el-popover>
    <el-input
        :rows="5"
        type="textarea"
        placeholder="请输入内容"
        @keyup.enter.native="submitMessage"
        v-model="content"
    >
    </el-input>
  <el-button
      class="submit-btn"
      type="primary"
      @click="submitMessage"
      :disabled="content === ''"
  >发送
  </el-button>
  </div>
</template>

<script>
const appData = require("@/assets/emojis.json");
export default {
  name: "Expression",
  props:["floor","fid","publish","lpId","title"],
  data() {
    return {
      //聊天输入内容
      content: "",
      //表情框是否展示
      emojiShow: false,
      //表情列表
      faceList: [],
      //表情文本
      getBrowString: "",

    }
  },
  created() {
    this.loadEmojis();
  },
  methods: {
//加载表情，存放到表情列表中
    loadEmojis() {
      for (let i in appData) {
        this.faceList.push(appData[i].char);
      }
    },
    // 获取用户点击之后的标签 ，存放到输入框内
    getBrow(index) {
      for (let i in this.faceList) {
        // 使用==比较值是否一致，而不要求类型一致
        // i为String index为Number
        if (index == i) {
          this.getBrowString = this.faceList[index];
          this.content += this.getBrowString;
          break;
        }
      }
      this.emojiShow = false;
    },
    submitMessage() {
      // 先判断是否已登录
      // 再判断是发贴还是回帖
      //     发帖需要完整填写所有信息
      let _this = this;
      if (this.$store.getters.getLogin[0].star === -1) {
        alert('请先登录')
      } else {
        if (this.publish === false) {
          let params = new URLSearchParams();
          params.append('ids',params.ids)
          params.append('fid', this.fid);
          params.append('id', this.$store.getters.getLogin[0].star);
          params.append('content', this.content);
          this.$http.post("http://localhost:8011/floor/postFloor", params).then((result) => {
            if (result) {
              _this.$router.go(0);
            } else {
              alert("系统繁忙，请稍后重试");
            }
          })
        } else if (this.$emit('checkData')){
          this.$http("http://localhost:8011/forum/postForum",
              {
                params: {
                  lpId: _this.lpId,
                  title: _this.title,
                  id: _this.$store.getters.getLogin[0].star,
                  content: _this.content,
                  floorNum: 1
                }
              }
          ).then((result) => {
            if (result.data !== -1) {
              _this.$router.push("/p/" + result.data);
            } else {
              alert("系统繁忙，请稍后重试");
            }
          })
        }else {
          alert('请完整填写内容')
        }
      }
    }
  }
}
</script>

<style scoped>
.browBox {
  width: 100%;
  height: 200px;
  background: #e6e6e6;
  position: absolute;
  z-index: 100;
  bottom: 0;
  overflow: scroll;
}
ul {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
}
li {
  cursor: pointer;
  width: 10%;
  font-size: 26px;
  list-style: none;
  text-align: center;
}
.submit-btn {
  margin: 0 15px 10px 0;
  float: right;
}
</style>