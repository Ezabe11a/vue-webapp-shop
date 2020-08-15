<template>
  <div class="qf-home">
    <!-- 通知栏 -->
    <van-notice-bar 
      left-icon="volume-o" 
      mode='closeable'
      color="#ffffff" 
      background='linear-gradient(to right,#ff6034,#ee0a24)'
      text="打开京东App，购物更轻松; 京东618，秒杀全场！手快可抢618元大红包！" />
    
    <!-- 搜索框 -->
    <van-search
      show-action
      placeholder="请输入搜索关键词"
      background='linear-gradient(to right,#ff6034,#ee0a24)'
    >
      <template #action>
        <div @click="onLogin" >登录</div>
      </template>
    </van-search>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <!-- 轮播图 -->
      <van-swipe :autoplay="3000" loop>
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
      <!-- 分割线 -->
      <van-divider
        :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
      >
        为你推荐
      </van-divider>
    <!-- 商品列表 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :offset='100'
      >
        <div 
          class="row" 
          v-for="i in length" 
          :key='i'>
          <QfGoodItem :good='goods[2*i-2]' />
          <QfGoodItem :good='goods[2*i-1]' />
        </div>
      </van-list>
    </van-pull-refresh>

    <QfTabbar />
  </div>
</template>

<script>
import { QfTabbar, QfGoodItem } from "@/components/";
import { 
    NoticeBar, 
    Search, 
    Swipe, 
    SwipeItem, 
    Lazyload,
    Divider,
    PullRefresh,
    List,
    Toast  
    } from "vant";
import Vue from "vue";
Vue.use(Lazyload);

export default {
  name: "Home",
  data: function() {
    return {
      // 数据来自后端
      images: [
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg',
      ],
      goods: [],
      loading: false,
      finished: false,
      refreshing: false,
      page: 1
    };
  },
  computed: {
    length: function() {
      return Math.floor(this.goods.length / 2)
    }
  },
  components: {
    QfTabbar,
    QfGoodItem,
    [NoticeBar.name]: NoticeBar,
    [Search.name]: Search,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Divider.name]:Divider,
    [PullRefresh.name]:PullRefresh,
    [List.name]:List,
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      let params = {
        page: this.page,
        size: 4
      }
      this.$http.fetchGoodList(params).then((result) => {
        // console.log(result)
        if(result.list.length == 0) Toast.fail('没有更多了')
        if(result.list.length > 0) {
          // 下拉刷新
          if(this.refreshing) {
            this.goods = result.list
          } else {
            // 加载更多
            this.goods = [...this.goods,...result.list]
          }
          this.loading = false
          this.refreshing = false
        }
      })
    },
    onLogin() {
      // 跳转到登录页
      this.$router.push('/login')
    },
    onLoad() {
      console.log('end')
      this.page++
      this.getList()

    },
    onRefresh() {
      this.page = 1
      this.getList()
    }
  }
};
</script>

<style lang='scss' scoped>
.van-search{
  margin-bottom: .5rem;
.van-search__action{
  div{
    color: #fff;
  }
}}
.van-swipe-item{
  img{
    display: block;
    width: 10rem;
    height: 6rem;
  }
}
.row{
  margin-left: 0.133333rem;
  padding: 0.133333rem;
  display: flex;
  .qf-good-item{
    overflow: hidden;
    margin-right: 0.133333rem;
    padding: 0.133333rem;
    div{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    img{
      display: block;
    }
  }
}
</style>