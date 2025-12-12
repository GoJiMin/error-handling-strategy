import {create} from 'zustand';
import {RequestError} from '@/shared/apis';
import {ClientError} from '@/shared/lib';

type State = {
  globalError: RequestError | ClientError | null;
};

type Action = {
  setGlobalError: (error: State['globalError']) => void;
  resetGlobalError: () => void;
};

const globalErrorStore = create<State & Action>(set => ({
  globalError: null,
  setGlobalError: error => set({globalError: error}),
  resetGlobalError: () => set({globalError: null}),
}));

export const useGlobalError = () => globalErrorStore(state => state.globalError);
export const useSetGlobalError = () => globalErrorStore(state => state.setGlobalError);
export const useResetGlobalError = () => globalErrorStore(state => state.resetGlobalError);
