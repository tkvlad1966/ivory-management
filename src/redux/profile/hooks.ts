import { useSelector } from 'react-redux';
import { RootState } from '..';

export const useUserProfile = (userId) =>
  useSelector((state: RootState) => {
    const userProfiles = state?.profile?.userProfiles ?? {};

    return userProfiles[userId] ?? null;
  });
