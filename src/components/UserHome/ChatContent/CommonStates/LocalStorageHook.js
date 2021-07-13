//Setting the localStorage to get persistent data for both chats and contacts
import { useEffect, useState } from "react";
const PREFIX = "piperchat-alpha-";//adding a prefix so that the data dosent mixup with local data of other projects

export default function useLocalStorage(key, initialValue) {
  const prefixedKey = PREFIX + key;//adding a key like chat or contact to set the localStorage
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    if (jsonValue != null) {
      if (jsonValue === "undefined") {
        return null;
      } else {
        return JSON.parse(jsonValue);
      }
    }
    if (typeof initialValue === "function") {
      return initialValue();
    } else {
      return initialValue;
    }
  });
  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);
  return [value, setValue];
}
