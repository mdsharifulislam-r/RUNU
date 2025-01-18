import { useDispatch, useSelector, useStore } from 'react-redux'
import type { RootState, AppDispatch, AppStore } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()

export const getStorLocal = (item:string) => {
    if (typeof localStorage !== 'undefined') {
        return JSON.parse(localStorage.getItem(item)??'[]');
    }
    return null;
}
export const setStorLocal = (item:string, value:any) => {
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem(item, JSON.stringify(value));
    }
}