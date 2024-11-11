"use server";

export const getTones = async () => {
  let tones;
  try {
    let response = await fetch(`https://api.7x95.com/api/v1/data/tones`);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    tones = await response.json();

    return tones.data;
  } catch (e: any) {
    console.log("Error happened", e?.message);
  }
};
