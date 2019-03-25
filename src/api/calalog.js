import { fetch, post } from './http'

// 获取验证码data
export function getRelation (phone) {
  return fetch(`/catalog/sys/enum/doct/allListType/?dictId=25`)
}
