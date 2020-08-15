<template>
  <div class="jd-user">

    <!-- info -->
    <div class="user-info">
        <van-row type="flex" justify="center">
            <van-col span="5">
                <van-image 
                    round 
                    width="1.3rem" 
                    height="1.3rem" 
                    src="https://img.yzcdn.cn/vant/cat.jpeg" 
                />
            </van-col>
            <van-col span="19">
                <div>
                    <div>用户名</div>
                    <div>15579781383</div>
                    <div>
                        <span>京享值：4545 </span>
                        <span>小白信用：95</span>
                        <span> ></span>
                    </div>
                </div>
            </van-col>
        </van-row>
    </div>

    <!-- btn -->

    <QfTabbar />
  </div>
</template>

<script>
import { QfTabbar } from "@/components/";
import { Col, Row, Image } from "vant";
export default {
  name: "User",
  data: function() {
    return {};
  },
  components: {
    QfTabbar,
    [Col.name]: Col,
    [Row.name]: Row,
    [Image.name]: Image
  }
};
</script>

<style lang='scss' scope>
    .jd-user{
        .user-info{
            font-size: 0.32rem;
            color: #ffffff;
            background: linear-gradient(to right,#ff6034,#ee0a24);
            padding: 0.533333rem;
        }
    }
</style>