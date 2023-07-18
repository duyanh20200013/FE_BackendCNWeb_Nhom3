import * as yup from 'yup';

yup.setLocale({
  mixed: {
    default: 'Thông tin không hợp lệ.',
    required: 'Thông tin là bắt buộc.',
  },
  string: {
    email: 'Email không hợp lệ',
  },
});

export default yup;
