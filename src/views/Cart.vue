<template>
  <div class="jd-cart">
    <!-- 顶部 -->
    <van-nav-bar title="购物车" left-text="返回" left-arrow fixed @click-left="back">
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar> 

    <div v-for="(item,index) in cartArr" :key="item._id">
      <van-swipe-cell>
        <van-row type="flex" align="center">
          <van-col offset="1" span="1">
            <van-checkbox icon-size="0.4rem" v-model="item.checked" @change="rowChange"></van-checkbox>
          </van-col>
          <van-col offset="1" span="21">
            <van-card
              :num="item.num"
              :price="item.good.price"
              :desc="item.good.desc"
              :title="item.good.name"
              class="goods-card"
              :thumb="img.imgBaseUrl+item.good.img"
            >
              <template #footer>
                <van-button @click="changeNum(index,item,'sub')" size="mini">-</van-button>
                <van-button @click="changeNum(index,item,'add')" size="mini">+</van-button>
              </template>
            </van-card>
          </van-col>
        </van-row>
        <template #right>
          <van-button
            @click="remove(index,item)"
            square
            text="删除"
            type="danger"
            class="delete-button"
          />
        </template>
      </van-swipe-cell>
    </div>
    <!-- 提交 -->
    <van-submit-bar :price="total" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checked" @click="fullClick">全选</van-checkbox>
      <template #tip>
        你的收货地址不支持同城送,
        <span @click="skipToAddr">修改地址</span>
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
import {
  NavBar,
  Icon,
  SubmitBar,
  Checkbox,
  Card,
  Button,
  SwipeCell,
  Col,
  Row,
  Toast
} from "vant";

import img from '@/utils/img';
export default {
  name: "Cart",
  data: function() {
    return {
      img,
      checked: false,
      cartArr: []
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [SubmitBar.name]: SubmitBar,
    [Checkbox.name]: Checkbox,
    [Card.name]: Card,
    [Button.name]: Button,
    [SwipeCell.name]: SwipeCell,
    [Col.name]: Col,
    [Row.name]: Row
  },
  mounted() {
    this.init();
  },
  computed: {
    total() {
      let t = 0;
      this.cartArr.map(ele => {
        if (ele.checked) t += ele.good.price * ele.num;
      });
      return t * 100;
    }
  },
  methods: {
    // 请求数据初始化
    init() {
      this.$http.fetchCartList({}).then(result => {
        // console.log(result);
        this.cartArr = result;
      });
    },
    // 页面更新
    updataCartItem(index, key, value) {
      this.cartArr[index][key] = value;
    },
    // 返回上层
    back() {
      this.$router.back();
    },
    // 删除购物车商品
    remove(index, item) {
      let params = { id: item._id };
      this.$http.fetchDeleteGood(params).then(() => {
        this.cartArr.splice(index, 1);
      });
    },
    // 商品选中框
    rowChange() {
      let arr = this.cartArr.filter(ele => ele.checked === true);
      this.checked = arr.length === this.cartArr.length;
    },
    // 全选按钮
    fullClick() {
      this.cartArr.map((ele, index) => {
        this.cartArr[index].checked = this.checked;
      });
    },
    // 修改商品数量
    changeNum(index, item, type) {
      let data = {
        id: item._id,
        num: item.num
      };
      if (type == "add") data.num++;
      if (type == "sub") {
        data.num--;
        if (data.num == 0) {
          data.num = 1;
          Toast.fail("不能再减少了");
        }
      }

      this.$http.fetchUpdateNum(data).then(() => {
        this.updataCartItem(index, "num", data.num);
      });
    },
    // 提交购物车
    onSubmit() {
      // console.log("提交购物车");
      let idstr = "";
      this.cartArr.map(ele => {
        if (ele.checked) {
          idstr += ";" + ele._id;
          this.$http.fetchCartSubmit({ goods: idstr }).then(() => {
            Toast.success("提交成功");
            this.init();
          });
        } else {
          Toast.fail('请选择商品')
          return false
        }
      });
    },
    skipToAddr() {}
  }
};
</script>

<style lang='scss' scoped>
.jd-cart {
  padding-top: 1.333333rem;
  padding-bottom: 2.3rem;

  .goods-card {
    margin: 0;
    background-color: white;
  }

  .delete-button {
    height: 100%;
  }
  .van-card__footer {
    .van-button {
      padding: 0 0.133333rem;
      font-size: 0.32rem;
      height: 0.4rem;
    }
  }
}
</style>