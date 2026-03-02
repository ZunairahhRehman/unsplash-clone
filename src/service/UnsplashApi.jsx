const BASE_URL = "https://api.unsplash.com";

export const fetchImagesApi = async (page = 1, query = "") => {
  try {
    let url = query
      ? `${BASE_URL}/search/photos?page=${page}&query=${query}&per_page=12`
      : `${BASE_URL}/photos?page=${page}&per_page=12`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Client-ID kM5N0wGkThOPen4Xfm6mEjUg4vybdKizZqp-WY5A_uE`,
      },
    });

    const data = await res.json();
    console.log(data); // check response in console

    return query ? data.results : data;
  } catch (err) {
    console.log("API ERROR:", err);
    return [];
  }
};