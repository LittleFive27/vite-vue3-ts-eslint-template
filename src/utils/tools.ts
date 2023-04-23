import html2canvas from 'html2canvas'
import { base64ToBlob, downloadFile } from '@sky-serein/js-utils'
import { saveImage } from '@/utils/app'

export const debug = import.meta.env.MODE === 'development'

export function getEnv() {
  const env = import.meta.env
  if (env.VITE_ASSETS_BASE && typeof env.VITE_ASSETS_BASE === 'string' && !/^http/.test(env.VITE_ASSETS_BASE)) {
    env.VITE_ASSETS_BASE = window.location.origin + env.VITE_ASSETS_BASE
  }
  return env
}

/**
 * 获取图片路径
 * @param path
 */
export function getImageUrl(path: string) {
  interface Modules {
    [key: string]: any
  }

  const modules: Modules = import.meta.glob(
    '/(src|public)/**/*.{bmp,jpg,png,tif,gif,pcx,tga,exif,fpx,svg,psd,cdr,pcd,dxf,ufo,eps,ai,raw,WMF,webp,jpeg}',
    { eager: true }
  )
  return modules[path]?.default ?? null
}

interface IDom2Img {
  ignoreClassList?: string[]
  dom: HTMLElement | null
  isDownload?: boolean
  isAppSave?: boolean
}

/**
 * dom转图片 (区分app下载 或 pc下载)
 * @param {Object} options
 * @returns {Promise<string>}
 */
export function dom2Img(options: IDom2Img) {
  const { ignoreClassList, dom, isDownload, isAppSave } = {
    isDownload: false,
    isAppSave: false,
    ignoreClassList: [],
    ...options
  }
  if (!dom) {
    return Promise.reject('dom is null')
  }
  return new Promise((resolve) => {
    html2canvas(dom, {
      scrollX: 0,
      scrollY: 0,
      useCORS: true,
      backgroundColor: null,
      ignoreElements: (elem) => {
        for (let i = 0; i < ignoreClassList.length; i++) {
          const className = ignoreClassList[i]
          if (elem.classList.contains(className)) {
            return true
          }
        }
        return false
      }
    }).then((canvas) => {
      const base64 = canvas.toDataURL('image/png')
      if (isDownload) {
        const blob = base64ToBlob(base64)
        blob && downloadFile(blob, 'share')
      }
      if (isAppSave) {
        const toAppImage = base64.slice(22)
        saveImage(toAppImage)
      }
      resolve(base64)
    })
  })
}
