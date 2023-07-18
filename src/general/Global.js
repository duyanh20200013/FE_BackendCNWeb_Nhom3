import PreferenceKeys from './constants/PreferenceKeys';

const Global = {
  refreshToken: localStorage.getItem(PreferenceKeys.refreshToken),
  accessToken: localStorage.getItem(PreferenceKeys.accessToken),
  user: localStorage.getItem(PreferenceKeys.user),
  houseKindList: [
    {
      label: 'Nhà',
      icon: 'https://a0.muscache.com/pictures/4d7580e1-4ab2-4d26-a3d6-97f9555ba8f9.jpg',
    },
    {
      label: 'Phòng',
      icon: 'https://a0.muscache.com/pictures/4d7580e1-4ab2-4d26-a3d6-97f9555ba8f9.jpg',
    },
    {
      label: 'Nhà khách',
      icon: 'https://a0.muscache.com/pictures/6f261426-2e47-4c91-8b1a-7a847da2b21b.jpg',
    },
  ],
  houseKindOption: ['Nhà', 'Phòng', 'Nhà khách'],
};

export default Global;
