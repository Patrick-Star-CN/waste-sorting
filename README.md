# 不聪明的垃圾桶

## 简介
> 基于移动端开发的 H5 益智类小游戏，用于宣传垃圾分类
>
> 我是一个垃圾桶，志愿者要使用我来暂存小区地上散落的垃圾。

## 背景 & 规则
> - 各种垃圾都有不同的性质，例如大小，*可接触性*等，志愿者要根据其属性合理地将垃圾扔到桶里，
> - 桶装载若干次垃圾后需要把垃圾按照正确的分类投放到远处相应的大垃圾桶。
> - 然后再回到小区继续捡垃圾，重复刚才的过程直到垃圾捡完。
> - 为了提高效率，志愿者想每次都尽可能地装满垃圾桶，使自己少走几趟来回，但是垃圾桶不能告诉他最优方案，请聪明的志愿者你来规划操作，最后一步垃圾分类可别弄错了哦～

## Getting Started

Install dependencies,

```bash
yarn
```

Start the dev server,

```bash
yarn start
```
## Solutions for common errors
> These dependencies were not found:

> * antd-mobile/es/button in ./src/pages/home-my/index.tsx
> * antd-mobile/es/button/style in ./src/pages/home-my/index.tsx
>
>
> 解决方法就是对插件进行一下升级：
>
> 如果你的项目中依赖了 @umijs/preset-react （可以在 package.json 文件中看到），那么请把它升级到最新版
>
> 如果你的项目中依赖了 @umijs/plugin-antd （可以在 package.json 文件中看到），那么请把它升级到最新版
>
> 如果你的项目中上述两个 npm 包都没有依赖，那么可以安装最新版的 @umijs/plugin-antd-mobile 插件
>
> 在 `.umirc.ts` 中添加 `antd: {mobile: false},`