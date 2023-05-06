import { Ref, ref, UnwrapRef } from 'vue'

type UseRef<T> = [Ref<UnwrapRef<T>>, (value: UnwrapRef<T>) => void]

export default function useRef<T = any>(initValue: T): UseRef<T> {
  const refValue = ref<T>(initValue)
  const setRefValue = (value: UnwrapRef<T>) => {
    refValue.value = value
  }
  return [refValue, setRefValue]
}
