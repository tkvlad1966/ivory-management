import { useSelector } from 'react-redux';
import { RootState } from '..';

export const useCompany = () =>
  useSelector((state: RootState) => {
    const company = state.company ?? null;
    return company;
  });
