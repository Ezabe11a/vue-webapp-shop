## 项目

webapp：运行在移动端的看上去像App的web H5应用

像素密度：dpr（devicePixelRatio）= 屏幕像素总数 / 屏幕物理尺寸

正是因为手机硬件的不统一性，导致前端在做移动端web，必须考虑兼容器。

常用的适配方案：rem，vw/vh, flixable。我们考虑移动端布局的真实原因，要避免使用px做单位。

工作中，常用的还是　rem　布局。

px：绝对的单位。
em：以最近一个font-size为基准的单位。
rem（root em）：以html元素的font-size为基准的单位。

UI稿，750px = 满屏　= 10 * (root font-zie)


## Sass

cnpm install sass-loader -D
cnpm install sass -D   （node-sass）
```
<style lang='scss' scoped>
</style>
```

##　Vant

有赞出品
Vant，是一个专注于移动的Vue UI组件库

cnpm install vant -S
cnpm install babel-plugin-import -D

配置babel.config.js
```
plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
]
```
重启项目

在组件上，使用vant的组件：
```
import { Button } from 'vant'

{
    components: {
        [Button.name]: Button
    }
}
````