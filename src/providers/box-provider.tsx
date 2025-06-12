'use client';

import { createBoxStore } from '@/stores/store';
import { createStoreContext } from 'leo-query';

// import { BoxState, createBoxStore } from '@/stores/store';
// import { createContext, useContext, useRef, type ReactNode } from 'react';
// import { useStore } from 'zustand';

// export type BoxStoreApi = ReturnType<typeof createBoxStore>;

// export const BoxStoreContext = createContext<BoxStoreApi | undefined>(undefined);

// export interface BoxStoreProviderProps {
//   children: ReactNode;
// }

// export const BoxStoreProvider = ({ children }: BoxStoreProviderProps) => {
//   const storeRef = useRef<BoxStoreApi | null>(null);
//   storeRef.current ??= createBoxStore();

//   return <BoxStoreContext.Provider value={storeRef.current}>{children}</BoxStoreContext.Provider>;
// };

// export const useBoxStore = <T,>(selector: (store: BoxState) => T): T => {
//   const context = useContext(BoxStoreContext);

//   if (!context) {
//     throw new Error('useBoxStore must be used within a BoxStoreProvider');
//   }

//   return useStore(context, selector);
// };

export const {
  Provider: BoxStoreProvider,
  Context: BoxStoreContext,
  useStore: useBoxStore,
  useStoreAsync: useBoxStoreAsync,
  useStoreSuspense: useBoxStoreSuspense,
  useHasHydrated: useBoxStoreHasHydrated,
} = createStoreContext(createBoxStore);
