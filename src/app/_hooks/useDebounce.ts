import { useState } from "react";

const useDebounce = () => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const debounce = (debounceFunction: () => void, delay: number) => {
    clearTimeout(timeoutId!);
    setTimeoutId(setTimeout(debounceFunction, delay));
  };

  return { debounce };
};

export default useDebounce;