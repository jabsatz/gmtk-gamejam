import { useEffect, useState } from "react";
import usePrevious from "./usePrevious";

const useTimeout = (ms = 0) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setReady(true);
    }, ms);

    return () => {
      clearTimeout(timer);
    };
  }, [ms]);

  return ready;
};

export default useTimeout;
