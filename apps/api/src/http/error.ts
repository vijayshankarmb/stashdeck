export type AppError = {
  message: string;
  statusCode: number;
};

export const createError = (
  message: string,
  statusCode = 500
): AppError => ({
  message,
  statusCode
});
