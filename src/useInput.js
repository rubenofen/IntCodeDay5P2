import { useState } from "react";

const useInput = initialState => {
  const [input, setInput] = useState(initialState);
  const setState = e => {
    setInput(e.target.value);
  };
  return [input, setState];
};

export default useInput;
