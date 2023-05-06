class Loading {
  private static instance: Loading
  el: HTMLDivElement | null = null
  styleEl: HTMLStyleElement | null = null
  defaultStyle = `
    ._loading_placeholder.ignore {
      width: 48px;
      height: 48px;
      border: 5px solid #67e59d;
      border-bottom-color: #099545;
      border-radius: 50%;
      display: inline-block;
      -webkit-animation: rotation 1s linear infinite;
      animation: rotation 1s linear infinite;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      box-sizing: border-box;
    }
  
    @keyframes rotation {
      0% {
        transform: translateX(-50%) translateY(-50%) rotate(0deg);
      }
      100% {
        transform: translateX(-50%) translateY(-50%) rotate(360deg);
      }
    }
  `

  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new Loading()
    }
    return Loading.instance
  }

  addStyles() {
    this.styleEl = document.createElement('style')
    this.styleEl.type = 'text/css'
    this.styleEl.appendChild(document.createTextNode(this.defaultStyle))
    document.head.appendChild(this.styleEl)
  }

  createEl() {
    this.addStyles()
    this.el = document.createElement('div')
    this.el.classList.add('_loading_placeholder', 'ignore')
    document.body?.appendChild(this.el)
  }

  removeEl() {
    this.el && document.body.removeChild(this.el)
    this.styleEl && document.head.removeChild(this.styleEl)
    this.el = null
    this.styleEl = null
  }

  load() {
    if (this.el) {
      return
    }
    this.createEl()
  }
}

const loadingInstance = Loading.getInstance()

export const placeholderLoading = loadingInstance.load.bind(loadingInstance)

export const clearPlaceholderLoading = loadingInstance.removeEl.bind(loadingInstance)
