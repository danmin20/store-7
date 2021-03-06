import { atom } from "recoil";

export const alertState = atom({
  key: "isOpen",
  default: {
    isOpened: false,
    message: "",
  },
});

export const loginState = atom({
  key: "isLoggedin",
  default: null,
});

export const isMyWishInDetail = atom({
  key: "isMyWishInDetail",
  default: false,
});
