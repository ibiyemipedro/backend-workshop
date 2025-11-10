export const formatResponse = <T>(
  success: boolean,
  data?: T,
  message?: string,
  error?: string
) => {
  return {
    success,
    ...(data && { data }),
    ...(message && { message }),
    ...(error && { error })
  };
};

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};