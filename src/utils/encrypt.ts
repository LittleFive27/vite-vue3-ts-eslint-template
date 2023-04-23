import CryptoES from 'crypto-es'
import { JSEncrypt } from 'jsencrypt'

/**
 * AES加密
 * @param content 需要加密的内容
 * @param key 秘钥
 */
export function encryptAES(content: string, key: string) {
  const cfg = {
    mode: CryptoES.mode.ECB,
    padding: CryptoES.pad.ZeroPadding
  }
  const newKey = CryptoES.enc.Utf8.parse(key)
  const contentStr = CryptoES.enc.Utf8.parse(content)
  const encrypted = CryptoES.AES.encrypt(contentStr, newKey, cfg)
  return CryptoES.enc.Base64.stringify(encrypted.ciphertext)
}

/**
 * AES解密
 * @param content 内容
 * @param key 秘钥
 */
function decryptAES(content: string, key: string) {
  const cfg = {
    mode: CryptoES.mode.ECB,
    padding: CryptoES.pad.ZeroPadding
  }
  const newKey = CryptoES.enc.Utf8.parse(key)
  const contentStr = CryptoES.enc.Base64.stringify(CryptoES.enc.Base64.parse(content))
  const decrypt = CryptoES.AES.decrypt(contentStr, newKey, cfg)
  return decrypt.toString(CryptoES.enc.Utf8)
}

/**
 * RSA加密
 * @param content 需要加密的内容
 * @param publicKey 秘钥
 */
export function encryptRSA(content: string, publicKey: string) {
  const encrypt = new JSEncrypt()
  encrypt.setPublicKey(publicKey)
  return encrypt.encrypt(content)
}
