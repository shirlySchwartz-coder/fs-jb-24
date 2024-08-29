const fieldNeed = {
    required: true,
    minLength: 4,
    maxLength: 35,
  };
export const ErrorsNoticeRequired = 'This filed is required';
export const ErrorsNoticeMin = `This filed must contain more than ${fieldNeed.minLength}`;
export const ErrorsNoticeMax = `This filed can't contain more then ${fieldNeed.maxLength}`;
