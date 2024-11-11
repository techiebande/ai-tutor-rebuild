"use server";

export const getLanguages = async () => {
  let languages;
  try {
    let response = await fetch(`https://api.7x95.com/api/v1/data/languages`);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    languages = await response.json();

    return languages.data;
  } catch (e: any) {
    console.log("Error happened", e?.message);
  }
};
