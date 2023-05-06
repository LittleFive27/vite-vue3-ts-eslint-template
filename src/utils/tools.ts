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
