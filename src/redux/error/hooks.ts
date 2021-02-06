import { useSelector } from 'react-redux';
import { RootState } from '..';

export const useError = () => useSelector((state: RootState) => state?.error);
