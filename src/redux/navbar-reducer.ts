import { createReducer } from 'reduxsauce';
import { IconType } from '../type';
import { ICON } from '../utils/constants';

export type ItemType = {
  href: string;
  icon: IconType;
  id: number;
};

export interface NavbarState {
  items: Array<ItemType>;
}

const INITIAL_STATE: NavbarState = {
  items: [
    { href: '/employee/home', icon: ICON.HOME, id: 1 },
    { href: '/employee/notification', icon: ICON.NOTIFICATION, id: 2 },
    { href: '/employee/history', icon: ICON.TIME, id: 3 },
    { href: '/employee/profile', icon: ICON.USER, id: 4 },
    { href: '/employee/portfolio', icon: ICON.BRIEFCASE, id: 5 },
    { href: '/employee/settings', icon: ICON.SETTINGS, id: 6 },
  ],
};

export const navbarReducer = createReducer<NavbarState>(INITIAL_STATE, {});
