/* eslint-disable @typescript-eslint/no-explicit-any */
export const modifyPayloads = (values: any) => {
  const obj = { ...values };

  // Extract file if it exists
  const file = obj.file || obj.profilePhoto || null;
  delete obj.file;
  delete obj.profilePhoto;

  // Convert rest of values to JSON
  const data = JSON.stringify(obj);

  // Create FormData
  const formData = new FormData();
  formData.append("data", data);

  if (file) {
    formData.append("file", file as Blob);
  }

  return formData;
};
