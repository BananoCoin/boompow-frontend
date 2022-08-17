import create from "zustand";

import { mainStore } from "./mainStore";
import { userStore } from "./userStore";

export const useMainStore = create(mainStore);
export const useUserStore = create(userStore);
