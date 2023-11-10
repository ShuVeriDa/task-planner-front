import {useCallback} from "react";
import debounce from "lodash.debounce";

export const useDebounce = (setName: (value: string) => void, delay: number) => useCallback(
  debounce((str: string) => {
    setName(str)
  }, delay), []
)