<template>
  <div class="jd-detail">
    <van-nav-bar @click-left="back" :title="info.name" left-text="返回" left-arrow>
      <template #right>
        <van-icon name="star-o" size="18" />
      </template>
    </van-nav-bar>
    <img :src="img.imgBaseUrl+info.img" alt />
    <p v-text="info.name"></p>
    <p v-text="'￥' + info.price"></p>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" dot />
      <van-goods-action-icon icon="cart-o" to="/Cart" text="购物车" badge="2" />
      <van-goods-action-icon icon="shop-o" text="店铺" />
      <van-goods-action-button type="warning" text="加入购物车" @click="addCart" />
      <van-goods-action-button type="danger" text="立即购买" @click="buy" />
    </van-goods-action>
  </div>
</template>

<script>
import img from '@/utils/img';

import {
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  NavBar,
  Icon,
  Toast
} from "vant";
export default {
  data() {
    return {
      img,
      info: {}
    };
  },
  components: {
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon
  },
  mounted() {
    let id = this.$route.params.id;
    let params = {
      good_id: id
    };
    this.$http.fetchGoodDetail(params).then(result => {
      this.info = result;
    });
  },
  methods: {
    back() {
      this.$router.back();
    },
    addCart() {
      //添加购物车
      let data = {
        good_id: this.info._id
      };
      this.$http.fetchAddToCart(data).then(() => {
        Toast.success("添加购物车成功");
        setTimeout(() => {
          this.$router.back();
        }, 800);
      });
    },
    buy() {
      // 直接购买
      let token = localStorage.getItem("token");
      if (!token) {
        this.$router.push("/login");
      } else {
        let data = {
          good_id: this.info._id
        };
        this.$http.fetchAddToCart(data).then(() => {
          this.$router.push("/Cart");
        });
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.jd-detail {
  .van-nav-bar {
    margin-bottom: 0.5rem;
    .van-nav-bar__title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  img {
    display: block;
    width: 70%;
    margin: 0 auto;
    margin-bottom: 0.5rem;
  }
  p {
    font-size: 0.533333rem;
    margin: 0 0.533333rem 0.4rem;
  }
}
</style>