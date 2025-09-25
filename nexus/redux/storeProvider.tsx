import type { ReactNode } from 'react'; // ✅ Import the type properly
import { Provider } from 'react-redux';
import { store } from './store';

export function StoreProvider({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}
