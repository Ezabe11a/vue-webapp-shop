<template>
  <div class="qf-good-item">
    <img :src="img.imgBaseUrl+good.img" alt="" @click='skipToDetail'>
    <div v-text="good.name"></div>
    <div>
      <span v-text="good.price"></span>
    </div>
  </div>
</template>

<script>
import img from '@/utils/img';
export default {
  data() {
    return {
      img
    }
  },
  props:{
    good:{
      type: Object,
      required: true
    }
  },
  methods: {
    skipToDetail() {
      this.$router.push('/detail/' + this.good._id)
    }
  },
};
</script>

<style lang='scss' scope>
.qf-good-item{
  flex: 1;
  width: 5rem;
  box-sizing: border-box;
  background-color: #f8f8f8;
  font-size: 0.4rem;
  &>img{
    display: block;
    width: 4.333333rem;
    height: 4.333333rem;
    overflow: hidden;
  }
}
</style>