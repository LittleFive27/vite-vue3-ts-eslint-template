// 提取浮点数
export function extractFloatNumber(str: string) {
  if (!str) {
    return 0
  }
  return +str.toString().replace(/[^0-9.]/gi, '')
}

// 获取手机系统版本
export function getOsVersion() {
  let u = navigator.userAgent,
    version = ''
  if (u.indexOf('Mac OS X') > -1) {
    // ios
    const regStr_saf = /OS [\d._]*/gi
    const info = u.match(regStr_saf)
    version = 'IOS' + (info + '').replace(/[^0-9|_.]/gi, '').replace(/_/gi, '.')
  } else if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
    // android
    version =
      'Android' + u.substr(u.indexOf('Android') + 8, u.indexOf(';', u.indexOf('Android')) - u.indexOf('Android') - 8)
  } else if (u.indexOf('BB10') > -1) {
    // 黑莓bb10系统
    version = 'blackberry' + u.substr(u.indexOf('BB10') + 5, u.indexOf(';', u.indexOf('BB10')) - u.indexOf('BB10') - 5)
  } else if (u.indexOf('IEMobile') > -1) {
    // windows phone
    version =
      'winphone' +
      u.substr(u.indexOf('IEMobile') + 9, u.indexOf(';', u.indexOf('IEMobile')) - u.indexOf('IEMobile') - 9)
  } else {
    const userAgent = navigator.userAgent.toLowerCase()
    if (userAgent.indexOf('windows nt 5.0') > -1) {
      version = 'Windows 2000'
    } else if (userAgent.indexOf('windows nt 5.1') > -1 || userAgent.indexOf('windows nt 5.2') > -1) {
      version = 'Windows XP'
    } else if (userAgent.indexOf('windows nt 6.0') > -1) {
      version = 'Windows Vista'
    } else if (userAgent.indexOf('windows nt 6.1') > -1 || userAgent.indexOf('windows 7') > -1) {
      version = 'Windows 7'
    } else if (userAgent.indexOf('windows nt 6.2') > -1 || userAgent.indexOf('windows 8') > -1) {
      version = 'Windows 8'
    } else if (userAgent.indexOf('windows nt 6.3') > -1) {
      version = 'Windows 8.1'
    } else if (userAgent.indexOf('windows nt 6.2') > -1 || userAgent.indexOf('windows nt 10.0') > -1) {
      version = 'Windows 10'
    } else {
      version = 'Unknown'
    }
  }
  return version
}
