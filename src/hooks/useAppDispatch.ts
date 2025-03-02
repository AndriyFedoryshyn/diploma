import { AppDispatchT } from '@/store/store';
import { useDispatch } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatchT>();
