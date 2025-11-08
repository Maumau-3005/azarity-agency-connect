import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface SwipeAction {
  cardId: string;
  action: 'match' | 'deny' | 'info';
  timestamp: number;
}

interface SwipeStore {
  actions: SwipeAction[];
  addAction: (cardId: string, action: 'match' | 'deny' | 'info') => void;
  getMatches: () => SwipeAction[];
  clearActions: () => void;
}

export const useSwipeStore = create<SwipeStore>()(
  persist(
    (set, get) => ({
      actions: [],
      addAction: (cardId, action) =>
        set((state) => ({
          actions: [...state.actions, { cardId, action, timestamp: Date.now() }],
        })),
      getMatches: () => get().actions.filter((a) => a.action === 'match'),
      clearActions: () => set({ actions: [] }),
    }),
    {
      name: 'julia-azarity-swipes',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

interface DateRange {
  from: Date;
  to: Date;
}

interface FiltersStore {
  dateRange: DateRange;
  platform: 'all' | 'instagram' | 'tiktok';
  postType: 'all' | 'reels' | 'video' | 'photo' | 'carousel';
  setDateRange: (range: DateRange) => void;
  setPlatform: (platform: 'all' | 'instagram' | 'tiktok') => void;
  setPostType: (type: 'all' | 'reels' | 'video' | 'photo' | 'carousel') => void;
}

const getDefaultDateRange = (): DateRange => {
  const to = new Date();
  const from = new Date();
  from.setDate(from.getDate() - 30);
  return { from, to };
};

export const useFiltersStore = create<FiltersStore>((set) => ({
  dateRange: getDefaultDateRange(),
  platform: 'all',
  postType: 'all',
  setDateRange: (range) => set({ dateRange: range }),
  setPlatform: (platform) => set({ platform }),
  setPostType: (postType) => set({ postType }),
}));
