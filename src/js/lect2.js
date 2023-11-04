// import flatpickr from "flatpickr";
import { Notify } from "notiflix"; 
// import "flatpickr/dist/flatpickr.min.css";


const elements = {
  loadMore: document.querySelector('.js-load-more'),

}


function serviceMovie(page = 1) {
  const BASE_URL = "https://api.themoviedb.org/3"
  const API_KEY = "345007f9ab440e5b86cef51be6397df1"
  const END_POINT = "/trending/movie/week"
  const params = new URLSearchParams({
    api_key: API_KEY,
    page,
  })

  return fetch(`${BASE_URL}${END_POINT}?${params}`)
    .then(resp => {
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      return resp.json();
     })
}
 
serviceMovie(2)
  .then(data => {
    if (data.page < data.total_pages) {
      elements.loadMore.classList.remove("load-more-hidden")
    }
  })
  .catch(err => console.log(err))
