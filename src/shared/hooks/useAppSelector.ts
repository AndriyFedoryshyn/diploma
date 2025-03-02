import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { AppStateT } from '../store/store';

export const useAppSelector: TypedUseSelectorHook<AppStateT> = useSelector;
