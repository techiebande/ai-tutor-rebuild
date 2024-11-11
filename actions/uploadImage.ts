"use server";

export const uploadImage = async (formData: FormData) => {
  let data;

  try {
    const response = await fetch("https://api.7x95.com/api/v1/upload/image", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      return [data.data.file_url];
    } else {
      console.error("Upload Error:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
