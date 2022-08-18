import create from "zustand";

import { mainStore } from "./mainStore";

export const useMainStore = create(mainStore);
