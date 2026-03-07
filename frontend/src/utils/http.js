export const getErrorMessage = (error, fallback = "Something went wrong") => {
  const responseMessage =
    error?.response?.data?.message || error?.response?.data?.error;
  const directMessage =
    typeof error?.response?.data === "string" ? error.response.data : null;

  return responseMessage || directMessage || error?.message || fallback;
};
