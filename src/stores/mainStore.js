export const mainStore = (set) => ({
  stats: null,
  setStats: (stats) => set({ stats }),

  services: null,
  setServices: (services) => set({ services })
});
