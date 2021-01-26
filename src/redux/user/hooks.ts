import { useSelector } from 'react-redux';
import { RootState } from '..';

export const selectUserId = (state: RootState) => state.user.userId;

export const useUserId = () =>
  useSelector((state: RootState) => {
    const userId = state.user?.userId ?? null;
    return userId;
  });

export const useInitialized = () => useSelector((state: RootState) => state.user.initialized);

export const useUserAccount = () =>
  useSelector((state: RootState) => {
    const userAccount = state.user?.userAccount ?? null;
    return userAccount;
  });
