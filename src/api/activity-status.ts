// import useMessageStore from '@/store/message'
import { http } from '@/utils/request'
import url from './url'

const flag = ref(true)

export function getActivityStatus() {
  if (!flag.value) {
    return
  }
  flag.value = false
  return http.get<ActivityStatus>(url.GET_ACTIVITY_DETAIL).finally(() => {
    flag.value = true
  })
}

/**
 * 活动验证
 */
// export async function VerificationActivity() {
//   const res = await getActivityStatus()
//   if (res?.code !== 200) {
//     await useMessageStore().openMessage(res!.code, res?.message)
//   }
// }
