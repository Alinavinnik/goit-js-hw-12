import axios from 'axios';

export async function getImagesByQuery(query, page) {
  const apiRespose = await axios.get('https://pixabay.com/api/', {
    params: {
      key: '55036420-a7a19d5751e273048ff10c958',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: 15,
    },
  });

  return apiRespose.data;
}
