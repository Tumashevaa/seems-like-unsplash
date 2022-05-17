// access key ptJ9sMq465MLUNnrewrag_75WkMawAuAFrdyxSeK_EE/
// Secret key 60PrXNwZy3yyBl7FnIQuVST56Pb801yXJLandU8d32Y

// https://api.unsplash.com/photos/?client_id=ptJ9sMq465MLUNnrewrag_75WkMawAuAFrdyxSeK_EE
// https://api.unsplash.com/photos/H0bmuj6xCN4?client_id=ptJ9sMq465MLUNnrewrag_75WkMawAuAFrdyxSeK_EE

const monthsMap = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/**
 * счетчик с текущим значением страницы
 */
let counterPage = 1

/**
 * element button page
 */
const buttonEl = document.querySelector('[data-btn]')

/**
 * функция получает данные в виде строки о времени создании фото и формирует эти данные в корректный формат, поочередно выполняя методы к одним и тем же данным, а далее все результаты совмешаем в одну чистовую строку
 * @param {string} createdAtStr 
 * @returns string
 */
function formatDateTime(createdAtStr) {
  const createdAt = new Date(createdAtStr)
  const dateAt = createdAt.getDate()
  const monthAt = createdAt.getMonth()
  const yearAt = createdAt.getFullYear()
  const hourAt = createdAt.getHours()
  const minutesAt = createdAt.getMinutes()
  return `${dateAt} ${monthsMap[monthAt]} ${yearAt} ${hourAt}:${minutesAt}`
}

/**
 * данная функция получает 3 параметра
 * делает проверку на наличие url
 * создает html строку на основе параметров
 * @param {string} title - название социалки
 * @param {string|null} url - ссылка на пользователя в социалке
 * @param {string=} username - никнейм пользователя в социалке
 * @returns {string} html
 */
function createHtmlForSocialBlocks(title, url, username) {
  if (!url) {
    return ''
  }
  return `<div> ${title}: <a href='${url}' target="_blank">${username ? `@${username}` : url}</a></div>`
}

/**
 * Пример:
 * const result = createItemHtmlFromObject(
 *   {
 *     likes: 12,
 *     height: 123,
 *     width: 124,
 *     description:'sdfghjkl',
 *     created_at: '2022-03-31T10:47:51-04:00',
 *     color: 'green',
 *     urls: {
 *       portfolio_url: 'https://images.unsplash.com/photo1',
 *       small_s3: 'https://images.unsplash.com/photo1',
 *       full: "https://images.unsplash.com/photo-1648737965997"
 *     },
 *     user: {
 *       portfolio_url: 'https://www.anya.com',
 *       name:'fghjk',
 *       username: 'fghjk',
 *       bio:'SEDFGHBJNKML',
 *       profile_image: {
 *         large: 'https://images.unsplash.com/photo1'
 *       },
 *       social: {
 *         twitter_username:'bnjk',
 *         instagram_username: 'fghjkl;',
 *       }
 *     }
 *   }
 * )
 * 
 * функция создает строку с html из объекта с данными
 * @param {object} el - данные о фотографии
 * @returns {string} - html разметка о фотографии
 */
function createItemHtmlFromObject(el) {
  const colorHtml = `<div class='circle-color' style='background-color: ${el.color}'></div>`
  const dateStr = formatDateTime(el.created_at)
  const description = el.description === null ? '' : `Description: ${el.description}`
  const bioHtml = el.user.bio === null ? '' : `<div>Bio: ${el.user.bio}</div>`

  const portfolioHtml = createHtmlForSocialBlocks(
    'Portfolio',
    el.user.portfolio_url
  )

  const instaHtml = createHtmlForSocialBlocks(
    'Instagram',
    el.user.social.instagram_username ? `https://instagram.com/${el.user.social.instagram_username}` : null,
    el.user.social.instagram_username
  )
  
  const twitterHtml = createHtmlForSocialBlocks(
    'Twitter',
    el.user.social.twitter_username ? `https://twitter.com/${el.user.social.twitter_username}` : null,
    el.user.social.twitter_username
  )

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
        <div>
          <a href='https://unsplash.com/@${el.user.username}' target="_blank">
            <img class='mosaic-avatar' src="${el.user.profile_image.large}" alt="">
          </a>
          <a href="https://unsplash.com/@${el.user.username}" target="_blank">${el.user.name}</a>
        </div>  
        ${bioHtml}
        ${portfolioHtml}
        ${instaHtml}
        ${twitterHtml}
        <div>
          <button class='btnItemById turn-on' data-btnItemById='${el.id}'>Additional Information</button>
        </div>
        <div data-additionalInfo='${el.id}'>
          
        </div>
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
 * данная функция получает массив строк с html данными и каждый раз перезаписывает в data-wrapper
 * @param {string[]} htmlColumns - массив строк
 */
function renderItems(htmlColumns) {
  //выбираем элемент в html куда будем подставлять результат строки со всеми html
  //в выбранный элемент в html подставляем строку с всеми html элементами
  // array.forEach(function (item, index) {
  //   columns[index].insertAdjacentHTML('beforeend', str)
  // })

  const wrapperEl = document.querySelector('[data-wrapper]')
  const colElements = wrapperEl.querySelectorAll('[data-col]')

  htmlColumns.forEach(function (str, index) {
    colElements[index].insertAdjacentHTML('beforeend', str)
  })

  
}

/**
 * функция делает http запрос к апи ансплеша подставляя туда указанный номер страницы
 * @param {number} page номер страницы
 * @returns {Promise<Photos>} промис с данными
 */
function getAllPhotosData(page) {
  return fetch(`https://api.unsplash.com/photos/?client_id=ptJ9sMq465MLUNnrewrag_75WkMawAuAFrdyxSeK_EE&page=${page}`)
    .then((response) => {
      return response.json();
    })
}

/**
 * обработчик событий на весь документ
 * передаем функцию, чтобы при клике на определенной кнопке с заданным атрибутом происходили следующие действия
 * если id не нулл, то функция делает http запрос к апи ансплеша подставляя туда айди получает промисс и возвращает промисс
 * внутри метода then функция в нужное  место должна перебирать объект и подставлять нужный контент
 * 
 */
document.addEventListener('click', function(event) {
  const id = event.target.getAttribute('data-btnItemById')

  if (id !== null) {
    getPhotoDataById(id).then(function(data) {
      const divDataAdditionalInfo = document.querySelector(`[data-additionalInfo='${id}']`)

      const cameraName = data.exif.name === null ? '' : `<div>Camera name: ${data.exif.name}</div>`
      const isoEl = data.exif.iso === null ? '' : `<div>ISO: ${data.exif.iso}</div>`
      const aperture = data.exif.aperture === null ? '' : `<div>Aperture: ${data.exif.aperture}</div>`
      const exposureTime = data.exif.exposure_time === null ? '' : `<div>Exposure time: ${data.exif.exposure_time}</div>`
      const focalLength = data.exif.focal_length === null ? '' : `<div>Focal length: ${data.exif.focal_length}</div>`
      const country = data.location.country === null ? '' : `<div>Country: ${data.location.country}</div>`
      const city = data.location.city === null ? '' : `<div>City: ${data.location.city}</div>`
      const resultAdditionalInfo = `${cameraName}${isoEl}${aperture}${exposureTime}${focalLength}${country}${city}`
      divDataAdditionalInfo.innerHTML = resultAdditionalInfo || `No data`
    })
  }
})

/**
 * функция делает http запрос к апи ансплеша подставляя туда айди
 * получает промисс и возвращает промисс
 * @param {id} id  адрес определенной фотографии
 * @returns {Promise<PhotoData>} промис с данными
 */
function getPhotoDataById(id) {
 return fetch(`https://api.unsplash.com/photos/${id}?client_id=ptJ9sMq465MLUNnrewrag_75WkMawAuAFrdyxSeK_EE`)
  .then((response) => {
    return response.json();
  })
}

/**
 * данная функция переключает состояние кнопки в зависимости от значения аргумента,
 * ничего не возвращает
 * @param {boolean} sign 
 */ 
function toggleButtonState(sign) {
  if (sign === true) {
    buttonEl.innerText = 'Loading...'
    buttonEl.disabled = true
  } else {
    buttonEl.innerText = 'Show more photos'
    buttonEl.disabled = false
  }
}

/**
 * получает массив объектов, делить его содержимое на 3 массива и возвращает новый массив с тремя массивами внутри
 * @param {array} array 
 */
function splitAnArray(array) {
  let size = 3
  let subData = []

  for (let index = 0; index < Math.floor(array.length / size); index++) {
    subData[index] = array.slice((index * size), (index == 2 ? (index * size) + 4 : (index * size) + size))
  }
  return subData
}

/**
 * получает массив массивов с объектами и возвращает один большой массив c N-количеством (от splita) html строками
 * @param {object[][]} arrayColums 
 * @returns {string[]}
 */
function createHtmlForColumns(arrayColums) {

  return arrayColums.map((column) => {
    return createHtmlStringFromArrayOfElements(column)
  })
}

/**
 * 1 получает данные для текущей страницы
 * 2 создает html, добавляет на страницу
 */
function renderAll() {
  toggleButtonState(true)

  getAllPhotosData(counterPage).then(function (data) {
    const dataForColumns = splitAnArray(data)
    const htmlForColumns = createHtmlForColumns(dataForColumns)

    renderItems(htmlForColumns)
    toggleButtonState(false)
  })
}


// -----------------------------------------------------------------

renderAll()

buttonEl.addEventListener('click', function () {
  counterPage ++
  renderAll()
})
