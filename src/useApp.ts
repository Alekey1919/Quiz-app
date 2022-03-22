import { useState } from "react";

const useApp = () => {
  const [isSoundOn, setIsSoundOn] = useState(true);

  const toggleSound = () => {
    setIsSoundOn((curr) => !curr);
  };

  return { isSoundOn, toggleSound };
};

export default useApp;
