import { compareVersion, isAndOrIos, trim } from '@sky-serein/js-utils'
import { getEnv } from '@/utils/tools'

/**
 * 检查用户登录状态
 * @returns {boolean|boolean|*|void}
 */
export function checkLoginStatus() {
  if (typeof window.isLogin === 'undefined') {
    return console.error('window.isLogin not undefined')
  }
  return import.meta.env.MODE === 'development' ? true : window.isLogin
}

/**
 * 在当前版本能否使用
 * @param expectVersion
 */
export async function canUserInCurVersion(expectVersion: string) {
  try {
    const curVersion = await getAppVersion()
    if (!curVersion) {
      return false
    }
    return compareVersion(expectVersion, curVersion) !== 1
  } catch (e) {
    return false
  }
}

/**
 * 获取APP版本号
 * @returns {Promise<String>}
 */
export function getAppVersion() {
  const _curAppVersion = window.localStorage.getItem('app_version')
  if (_curAppVersion) {
    return Promise.resolve(_curAppVersion)
  }
  return new Promise<string>((resolve) => {
    const xhr = new XMLHttpRequest()
    xhr.open('get', '/api/v2/activity/fool/get_app_version')
    xhr.addEventListener(
      'loadend',
      (r) => {
        const target = <XMLHttpRequest>r.target
        if (target && target.readyState === 4 && target.status === 200) {
          const { succ, status, app_version } = JSON.parse(target.response)
          if (succ || status) {
            window.localStorage.setItem('app_version', app_version)
            resolve(app_version)
          }
        } else {
          resolve('')
        }
      },
      { once: true }
    )
    xhr.send()
  })
}

/**
 * 前往Steam账号管理页面
 */
export function goSteamAccount() {
  console.log('前往Steam账号管理页面')
  const action = 'goSteamAccount'
  try {
    window.productDetail[action]()
  } catch (e) {
    try {
      window.webkit.messageHandlers[action].postMessage(null)
    } catch (e) {
      try {
        window[action]()
      } catch (e) {}
    }
  }
}

/**
 * 跳转到APP h5页
 * @param url {string} h5地址
 */
export function goAppH5(url?: string) {
  let href = `IGXEAssistant://`
  if (url) {
    href += `?detail_flag=10&url=${encodeURIComponent(url)}`
  }
  window.location.assign(href)
  setTimeout(function () {
    window.location.href = '/app'
  }, 2000)
}

/**
 *
 * 前往 app
 * 999:打开url地址
 * 1:steam账号管理
 * 2:IGXE微信公众号二维码
 * 3:偏好设置
 * 4:库存
 * 5:app首页/市场页
 * 6:邀请有礼
 * 7:出售订单页
 * 8:购买订单页
 * 9:CDK首页
 * 10:IGB首页
 * 11:鱼塘首页
 * 12:赛程详情
 * 13:会员中心
 * 14:积分商城
 * 15:积分任务
 * 16:模拟开箱
 * 17:3D印花
 * 18:汰换
 * 21:租赁出租订单
 * 22:租赁购买订单
 * 23: 租赁库存
 * 26: 跳转到租赁市场
 */
export function goToApp(app_page: number) {
  const action = 'routeAppPage'
  const data = { app_page: app_page }
  try {
    window.productDetail[action](JSON.stringify(data))
  } catch (e) {
    try {
      window.webkit.messageHandlers[action].postMessage(data)
    } catch (e) {
      try {
        window[action](data)
      } catch (e) {}
    }
  }
}

/**
 * 跳转到IG背包
 */
export function goIgBag() {
  const action = 'goIgBag'
  try {
    window.productDetail[action]()
  } catch (e) {
    try {
      window.webkit.messageHandlers[action].postMessage(null)
    } catch (e) {
      try {
        window[action]()
      } catch (e) {}
    }
  }
}

/**
 * 跳转我的卡券
 */
export function goMyTicket() {
  const action = 'goMyTicket'
  try {
    window.productDetail[action]()
  } catch (e) {
    try {
      window.webkit.messageHandlers[action].postMessage(null)
    } catch (e) {
      try {
        window[action]()
      } catch (e) {}
    }
  }
}

/**
 * 启动摇一摇监听
 */
export function switchDeviceMotion(params = {}) {
  const action = 'switchDeviceMotion'
  const data = params
  try {
    window.productDetail[action](JSON.stringify(data))
  } catch (e) {
    try {
      window.webkit.messageHandlers[action].postMessage(data)
    } catch (e) {
      try {
        window[action](data)
      } catch (e) {}
    }
  }
}

/**
 * 跳转到会员中心页
 */
export function goMemberCenter() {
  const action = 'routeAppPage'
  const data = { app_page: 13 }
  try {
    window.productDetail[action](JSON.stringify(data))
  } catch (e) {
    try {
      window.webkit.messageHandlers[action].postMessage(data)
    } catch (e) {
      try {
        window[action](data)
      } catch (e) {}
    }
  }
}

/**
 * 关闭页面
 */
export function closeWebview() {
  console.log('关闭页面')
  const action = 'closePage'
  try {
    window.productDetail[action]()
  } catch (e) {
    try {
      window.webkit.messageHandlers[action].postMessage(null)
    } catch (e) {
      try {
        window[action]()
      } catch (e) {}
    }
  }
}

/**
 * 前往市场页
 */
export function goMarket() {
  const action = 'goHome'
  try {
    window.productDetail[action]()
  } catch (e) {
    try {
      window.webkit.messageHandlers[action].postMessage(null)
    } catch (e) {
      try {
        window[action]()
      } catch (e) {}
    }
  }
}

/**
 * 前往登录页
 */
export function goLogin() {
  const action = 'goFlashLogin'
  try {
    window.productDetail[action]()
  } catch (e) {
    try {
      window.webkit.messageHandlers[action].postMessage(null)
    } catch (e) {
      try {
        window[action]()
      } catch (e) {}
    }
  }
}

/**
 * 前往设置-账号与安全（绑定手机/邮箱等）
 */
export function goAccountSet() {
  const action = 'goAccountSet'
  try {
    window.productDetail[action]()
  } catch (e) {
    try {
      window.webkit.messageHandlers[action].postMessage(null)
    } catch (e) {
      try {
        window[action]()
      } catch (e) {}
    }
  }
}

/**
 * 前往设置
 */
export function goPreference() {
  const action = 'goPreference'
  try {
    window.productDetail[action]()
  } catch (e) {
    try {
      window.webkit.messageHandlers[action].postMessage(null)
    } catch (e) {
      try {
        window[action]()
      } catch (e) {}
    }
  }
}

interface IShareActive {
  share_tile: string
  share_code: string
  canSave: 'yes' | 'no'
}

/**
 * 打开app分享
 * @param params Object {share_tile: '成功后的提示',share_code: '口令',canSave: 'no/yes是否显示下载按钮',}
 */
export function shareActive(params: Partial<IShareActive>) {
  const action = 'shareActive'
  const data = {
    ...{
      share_tile: '口令已复制',
      share_code: '',
      canSave: 'no'
    },
    ...params
  }
  console.log(JSON.stringify(data))
  try {
    window.productDetail[action](JSON.stringify(data))
  } catch (e) {
    try {
      window.webkit.messageHandlers[action].postMessage(data)
    } catch (e) {
      try {
        window[action](data)
      } catch (e) {}
    }
  }
}

interface IShareActiveV2 {
  img: string
  uri: string
  title: string
  desc: string
  share_code: string
}

/**
 * 打开app分享 V2
 * @param type  1 图文  2口令
 * @param params
 */
export function shareActiveV2(type: 1 | 2, params: Partial<IShareActiveV2>) {
  const action = 'shareActiveV2'
  const data = {
    type: type,
    data: {
      img: '',
      uri: '',
      title: '',
      desc: '',
      share_code: '',
      ...params
    }
  }
  console.log(data)
  try {
    window.productDetail[action](JSON.stringify(data))
  } catch (e) {
    try {
      window.webkit.messageHandlers[action].postMessage(data)
    } catch (e) {
      try {
        window[action](data)
      } catch (e) {}
    }
  }
}

/**
 * 根据版本自动调用分享组件
 * @param version 3.15及以后的使用v2分享
 * @param params
 * @param type 1 图文|2 口令
 */
export function autoShareActiveByVersion(
  params: Partial<IShareActiveV2> | Partial<IShareActive>,
  type: 1 | 2 = 2,
  version: string = '3.15'
) {
  const newParams: Partial<IShareActiveV2> = params
  if (newParams.img) {
    if (/^\/\//.test(newParams.img)) {
      newParams.img = 'http:' + newParams.img
    }
    if (!/^http/.test(newParams.img)) {
      const baseUrl = getEnv()?.VITE_ASSETS_BASE?.toString().slice(0, -1)
      baseUrl && (newParams.img = baseUrl + newParams.img)
    }
  }
  getAppVersion().then((curVersion) => {
    if (compareVersion(version, curVersion) !== 1) {
      shareActiveV2(type, newParams)
    } else {
      shareActive(newParams)
    }
  })
}

/**
 * 关闭app分享（底部自动弹出）
 */
export function closeShare() {
  const action = 'closeShare'
  try {
    window.productDetail[action]('')
  } catch (e) {
    try {
      window.webkit.messageHandlers[action].postMessage('')
    } catch (e) {
      try {
        window[action]('')
      } catch (e) {}
    }
  }
}

/**
 * 保存图片到相册
 * @param base64 String
 */
export function saveImage(base64: string) {
  const action = 'shareImage'
  const data = {
    share_title: '',
    share_code: '',
    share_img: base64
  }
  try {
    window.productDetail[action](JSON.stringify(data))
  } catch (e) {
    try {
      window.webkit.messageHandlers[action].postMessage(data)
    } catch (e) {
      try {
        window[action](data)
      } catch (e) {}
    }
  }
}

/**
 * 跳转市场详情页
 */
export function goMarketDetail(product_id: string, app_id: string) {
  const action = 'goProductDetail'
  try {
    window.productDetail[action](parseInt(product_id), app_id)
  } catch (e) {
    try {
      window[action]({ product_id: product_id, app_id: app_id })
    } catch (e) {
      try {
        window.webkit.messageHandlers[action].postMessage({
          product_id: product_id,
          app_id: app_id
        })
      } catch (e) {}
    }
  }
}

/**
 * 跳转到商品详情页
 */
export function goProductWebDetail(trade_id: number, product_id: number, app_id: number) {
  const action = 'goProductWebDetail'
  const data = {
    app_id,
    product_id,
    trade_id
  }
  try {
    window.productDetail[action](JSON.stringify(data))
  } catch (e) {
    try {
      window.webkit.messageHandlers[action].postMessage(data)
    } catch (e) {
      try {
        window[action](data)
      } catch (e) {}
    }
  }
}

interface IShareTo {
  title: string
  desc: string
  image: string
  type: number
}

/**
 * 分享到(目前只有开箱模拟器H5在使用)
 * @param params Object {title:[String],desc:[String],images:[String],type:Number{1:微信 2:微信朋友圈 3:QQ}}
 */
export function shareTo(params: Partial<IShareTo>) {
  const action = 'shareBox'
  const data = {
    title: '',
    desc: '',
    image: '',
    type: '',
    ...params
  }
  try {
    window.productDetail[action](JSON.stringify(data))
  } catch (e) {
    try {
      window.webkit.messageHandlers[action].postMessage(data)
    } catch (e) {
      try {
        window[action](data)
      } catch (e) {}
    }
  }
}

interface IGetAndroidResource {
  status_bar_height: number
}

/**
 * 获取安卓设备的一些物理参数
 */
export function getAndroidResource(): IGetAndroidResource | null {
  let res
  const action = 'phoneResource'
  try {
    res = window.productDetail[action]()
  } catch (e) {
    try {
      res = window.webkit.messageHandlers[action].postMessage(null)
    } catch (e) {
      try {
        res = window[action]()
      } catch (e) {}
    }
  }
  if (typeof res === 'string') {
    res = JSON.parse(res)
  }
  if (typeof res === 'string') {
    res = JSON.parse(res)
  }
  if (typeof res === 'object') {
    return res
  }
  return null
}

interface ISafeAreaInset {
  top: string
  bottom: string
  right: string
  left: string
}

/**
 * 获取安全区域css属性值
 * @param position top/right/bottom/left
 * @return string
 */
export function getSafeAreaInset(position: string) {
  return trim(getComputedStyle(document.documentElement).getPropertyValue(`--sa-${position}`))
}

/**
 * 获取IOS刘海屏安全区域css属性值
 * @param position top/right/bottom/left
 * @return string
 */
export function getIOSCssVarSafeAreaInset(position: string) {
  return trim(getComputedStyle(document.documentElement).getPropertyValue(`--sa-ios-${position}`))
}

/**
 * 设置安全区域css变量
 * @param params
 */
export function settCssVarSafeAreaInset(params: ISafeAreaInset) {
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      document.documentElement.style.setProperty(`--sa-${key}`, params[key as keyof ISafeAreaInset])
    }
  }
}

/**
 * 设置安全区域值(页面挂载后调用)
 */
export async function setSafaAreaInset(): Promise<boolean> {
  // 没有获取到安全区域的默认边距
  const defaultSafeInset = {
    top: '45px',
    bottom: '0px',
    left: '0px',
    right: '0px'
  }
  const isCanFullScreen = await canUserInCurVersion('3.12')
  if (!isCanFullScreen) {
    return false
  }
  const top = getIOSCssVarSafeAreaInset('top')
  if (top && parseInt(top)) {
    settCssVarSafeAreaInset({
      top,
      bottom: getIOSCssVarSafeAreaInset('bottom') ?? defaultSafeInset.bottom,
      right: getIOSCssVarSafeAreaInset('right') ?? defaultSafeInset.right,
      left: getIOSCssVarSafeAreaInset('left') ?? defaultSafeInset.left
    })
    return true
  }
  const isAndroid = isAndOrIos() === 1
  const isGetSafeAreaInsetInAndroid = await canUserInCurVersion('3.15')
  if (isAndroid && isGetSafeAreaInsetInAndroid) {
    const androidResource = getAndroidResource()
    if (androidResource && androidResource.status_bar_height) {
      settCssVarSafeAreaInset({
        top: Math.ceil(androidResource.status_bar_height / window.devicePixelRatio) + 'px',
        bottom: defaultSafeInset.bottom,
        right: defaultSafeInset.right,
        left: defaultSafeInset.left
      })
      return true
    }
  }
  settCssVarSafeAreaInset(defaultSafeInset)
  return true
}
