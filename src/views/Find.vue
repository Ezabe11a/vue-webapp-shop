<template>
  <div class="jd-find">
    <!-- 品类列表 -->
    <div class="jd-find-left">
      <div
        v-for="(item,index) in cates"
        :key="item._id"
        v-text="item.cate_zh"
        @touchstart="touch(index,item)"
        :class="{'on':curIdx==index}"
      ></div>
    </div>
    <!-- 详情列表 -->
    <div class="jd-find-right">
      <van-grid :column-num="3">
        <van-grid-item v-for="item in goodArr" :key="item._id" @click="skipToDetail(item)">
          <van-image :src="img.imgBaseUrl+item.img" />
          <div v-text="item.name"></div>
        </van-grid-item>
      </van-grid>
    </div>
    <QfTabbar />
  </div>
</template>

<script>
import img from '@/utils/img';
import { QfTabbar } from "@/components/";
import { mapMutations, mapState } from "vuex";
import { Grid, GridItem, Image } from "vant";
export default {
  name: "Find",
  data: function() {
    return {
      img,
      curIdx: 0,
      cates: [],
      goodArr: []
    };
  },
  components: {
    QfTabbar,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Image.name]: Image
  },
  mounted() {
    this.init();
  },
  computed: {
    ...mapState("good", ["find"])
  },
  methods: {
    ...mapMutations("good", ["updateFind", "clearFind"]),
    // 页面初始化
    async init() {
      let arr = await this.$http.fetchAllCates({});
      this.cates = arr;
      let params = { cate: arr[0].cate };
      // this.getGoodsOfCate({params, index:0});
      this.$http.fetchGoodsOfCate(params).then(result => {
        this.goodArr = result;
        this.updateFind({ index: 0, list: result });
      });

      // this.goodArr = goodArr;
      // console.log(goodArr);
    },
    touch(index, item) {
      this.curIdx = index;
      let params = { cate: item.cate };
      // this.$http.fetchGoodsOfCate(params).then(result => {
      //   this.goodArr = result;
      // });
      if (this.find[index] && this.find[index].length) {
        // 不调接口，直接使用缓存中的数据
        this.goodArr = this.find[index];
      } else {
        // 如果缓存系统中没有，要调接口
        this.$http.fetchGoodsOfCate(params).then(result => {
          // 更新goodArr
          this.goodArr = result;
          this.updateFind({ index, list: result });
        });
      }
    },
    skipToDetail(value) {
      this.$router.push("/detail/" + value._id);
    }
  }
};
</script>

<style lang='scss' scoped>
.jd-find {
  position: relative;
  height: 100%;
  .jd-find-left {
    position: absolute;
    width: 2rem;
    left: 0;
    top: 0;
    bottom: 0;
    background: rgb(248, 248, 248);
    overflow: auto;
    padding-bottom: 1.5rem;

    & > div {
      font-size: 0.4rem;
      text-align: center;
      line-height: 1.333333rem;
    }
    & > div.on {
      background: #ffffff;
      color: #f63515;
    }
  }
  .jd-find-right {
    position: absolute;
    left: 2rem;
    top: 0;
    bottom: 0;
    right: 0;
    overflow: auto;
    padding-bottom: 1.4rem;

    .van-grid-item {
      font-size: 0.4rem;
      line-height: 0.666667rem;
      text-align: center;
      .van-Image {
        width: 1.866667rem;
        height: 1.866667rem;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      div {
        width: 2.2rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>