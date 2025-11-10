export const successResponse = (data: any, message: string = 'Success') => {
  return {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  };
};

export const errorResponse = (message: string, statusCode: number = 500, details?: any) => {
  return {
    success: false,
    message,
    statusCode,
    details,
    timestamp: new Date().toISOString(),
  };
};