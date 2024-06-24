export const createFormData = (obj: any): FormData => {
    const formData = new FormData();
    Object.keys(obj).forEach((key) => {
      formData.append(key, String(obj[key]));
    });
    return formData;
  };