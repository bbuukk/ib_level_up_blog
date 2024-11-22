type ParamValue = string | number | boolean | File | null | undefined;

export function transformObjectToFormData(
  params: Record<string, ParamValue>
): FormData {
  const formData = new FormData();

  Object.entries(params).forEach(([key, value]) => {
    if (value == null || value === '') {
      return;
    }

    if (value instanceof File) {
      formData.append(key, value, value.name);
    } else {
      formData.append(key, String(value));
    }
  });


  return formData;
}
