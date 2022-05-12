// access key ptJ9sMq465MLUNnrewrag_75WkMawAuAFrdyxSeK_EE/
// Secret key 60PrXNwZy3yyBl7FnIQuVST56Pb801yXJLandU8d32Y

// https://api.unsplash.com/photos/?client_id=ptJ9sMq465MLUNnrewrag_75WkMawAuAFrdyxSeK_EE

const monthsMap = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']


/**
 * счетчик с текущим значением страницы
 */
let counterPage = 1

// const result = createItemHtmlFromObject(
//   {
//     likes: 12,
//     height: 123,
//     width: 124,
//     description:'sdfghjkl',
//     created_at: '2022-03-31T10:47:51-04:00',
//     color: 'green',
//     urls: {
//       portfolio_url: 'https://images.unsplash.com/photo1',
//       small_s3: 'https://images.unsplash.com/photo1',
//       full: "https://images.unsplash.com/photo-1648737965997"
//     },
//     user: {
//       portfolio_url: 'https://www.anya.com',
//       name:'fghjk',
//       username: 'fghjk',
//       bio:'SEDFGHBJNKML',
//       profile_image: {
//         large: 'https://images.unsplash.com/photo1'
//       },
//       social: {
//         twitter_username:'bnjk',
//         instagram_username: 'fghjkl;',
//       }
//     }
//   }
// )
// console.log(result)
/**
 * функция создает строку с html из объекта с данными
 * @param {object} el - данные о фотографии
 * @returns {string} - html разметка о фотографии
 */
function createItemHtmlFromObject(el) {
  const colorHtml = `<div class='circle-color' style='background-color: ${el.color}'></div>`

  const createdAt = new Date(el.created_at)
  const dateAt = createdAt.getDate()
  const monthAt = createdAt.getMonth()
  const yearAt = createdAt.getFullYear()
  const hourAt = createdAt.getHours()
  const minutesAt = createdAt.getMinutes()
  const dateStr = `${dateAt} ${monthsMap[monthAt]} ${yearAt} ${hourAt}:${minutesAt}`

  const description = el.description === null ? '' : `Description: ${el.description}`

  const bioHtml = el.user.bio === null ? '' : `<div>Bio: ${el.user.bio}</div>`
  const instaHtml = el.user.social.instagram_username === null ? '' : 
    `<div> Instagram: <a href='https://instagram.com/${el.user.social.instagram_username}' target="_blank">@${el.user.social.instagram_username}
    </a></div>`
  const twitterHtml = el.user.social.twitter_username === null ? '' : 
    `<div> Twitter: <a href='https://twitter.com/${el.user.social.twitter_username}' target="_blank">@${el.user.social.twitter_username}
    </a></div>`
  const portfolioHtml = el.user.portfolio_url === null ? '' : 
    `<div> Portfolio: <a href='${el.user.portfolio_url}' target="_blank">${el.user.portfolio_url}
    </a></div>`

    return `
    <div class="mosaic-item">
      <a href="${el.urls.full}" data-img data-pswp-width="${el.width}" data-pswp-height="${el.height}" target="_blank">
        <img class="mosaic-img" src="${el.urls.small_s3}" alt="">
      </a>
      <div class="mosaic-info">
        <div class='mosaic-likes'>💔 ${el.likes}</div>
        ${colorHtml}
        <div>${dateStr}</div>
        ${description}
        <div class='mosaic-content'>
          <a href='https://unsplash.com/@${el.user.username}' target="_blank">
            <img class='mosaic-avatar' src="${el.user.profile_image.large}" alt="">
          </a>
          <a href="https://unsplash.com/@${el.user.username}" target="_blank">${el.user.name}</a>
        </div>  
        ${bioHtml}
        ${portfolioHtml}
        ${instaHtml}
        ${twitterHtml}
      </div>
    </div>
  `
}


/**
 * данная функция принимает массив объектов и возвращает строку со всеми html элементами
 * @param {array} arr 
 * @returns {string}
 */
function createHtmlStringFromArrayOfElements(arr) {
  //у массива вызываем метод map, который применяет к каждому элементу(объекту) массива указанную функцию в аргументе
  //функция возвращает массив строк со всеми html из объекта с данными
  //далее присваиваем результат работы map к переменной 
  //массив строк
  const imagesHtmlList = arr.map(createItemHtmlFromObject)

  //у массива строк вызываем метод join, который соединяет все элементы в одну строку через разделитель указаный параметром
  const imagesHtml = imagesHtmlList.join('\n')

  return imagesHtml
}

/**
 * данная функция получает любую строку с html данными и каждый раз перезаписывает в data-wrapper
 * @param {string} str - любая строка
 */
function renderItems(str) {
  //выбираем элемент в html куда будем подставлять результат строки со всеми html
  //в выбранный элемент в html подставляем строку с всеми html элементами
  document.querySelector('[data-wrapper]').insertAdjacentHTML('beforeend', str)
}

/**
 * функция делает http запрос к апи ансплеша подставляя туда указанный номер страницы
 * @param {number} page номер страницы
 * @returns {Promise} промис с данными
 */
function getData(page) {
  return fetch(`https://api.unsplash.com/photos/?client_id=ptJ9sMq465MLUNnrewrag_75WkMawAuAFrdyxSeK_EE&page=${page}`)
    .then((response) => {
      return response.json();
    })
}

/**
 * 1 получает данные для текущей страницы
 * 2 создает html, добавляет на страницу
 */
function renderAll() {
  getData(counterPage).then(function (data) {
    renderItems(createHtmlStringFromArrayOfElements(data))
  })
}

// -----------------------------------------------------------------

renderAll()

document.querySelector('[data-btn]').addEventListener('click', function () {
  counterPage ++

  renderAll()
})

