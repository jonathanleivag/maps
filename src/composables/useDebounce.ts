import { computed, Ref, WritableComputedRef } from 'vue'
import { usePlacesStore } from '.'

export interface DebounceInterface {
  search: WritableComputedRef<string>
}

export interface PropsInterface {
  value: Ref<string>
  timeValue: Ref<number>
  centerMap: () => void
}

export default function useDebounce ({
  value,
  timeValue,
  centerMap
}: PropsInterface): DebounceInterface {
  const { searchPlace } = usePlacesStore()

  const search = computed({
    get () {
      return value.value
    },
    set (text: string) {
      if (timeValue.value) clearTimeout(timeValue.value)

      timeValue.value = setTimeout(() => {
        value.value = text
        if (text.length === 0) centerMap()
        searchPlace(text)
      }, 500)
    }
  })
  return { search }
}
