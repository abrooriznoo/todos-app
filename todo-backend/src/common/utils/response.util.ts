export const successResponse = (
  data: any,
  message = 'Success',
  meta: any = null,
) => ({
  success: true,
  message,
  data,
  meta,
});

export const errorResponse = (message: string) => ({
  success: false,
  message,
});
