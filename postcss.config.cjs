// 根据 isH5 变量确定是否开启 H5 自适应模式
const isH5 = true

const autoprefixer = require('autoprefixer');
const pxToViewport = require('postcss-px-to-viewport');

module.exports = () => {

  // 添加 postcss 插件
  const plugins = [
    autoprefixer(),
    isH5 ?
        pxToViewport({
          viewportWidth: 1080,
          mediaQuery: true,
          minPixelValue: 1,
          propList: ['*'],
          exclude: [/node_modules/],
          selectorBlackList: ['.ignore']
        }) :
        null
  ];

  return {
    plugins
  };
};