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
  return `Date: ${dateAt} ${monthsMap[monthAt]} ${yearAt} ${hourAt}:${minutesAt}`
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
  
  const description = el.description || 'No description'
  const bioHtml = el.user.bio || 'No Bio'

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
    <div class="mosaic-item" style="aspect-ratio: ${el.width}/${el.height};background-color: ${el.color};">
      <div class='additirial-info hide' data-additionalInfo='${el.id}'>
      </div>
      <a href="${el.urls.full}" data-img data-pswp-width="${el.width}" data-pswp-height="${el.height}" title="${description}" target="_blank">
        <img class="mosaic-img" src="${el.urls.small_s3}" alt="">
      </a>

      <div class="mosaic-infoTop mosaic-text">
        <button class="btn-like" title="Like" data-like="${el.likes}">
          <svg data-svgLike width="32" height="32" class="svg-like" viewBox="0 0 32 32" version="1.1" aria-hidden="false" fill="#767676"><path data-path d="M17.4 29c-.8.8-2 .8-2.8 0l-12.3-12.8c-3.1-3.1-3.1-8.2 0-11.4 3.1-3.1 8.2-3.1 11.3 0l2.4 2.8 2.3-2.8c3.1-3.1 8.2-3.1 11.3 0 3.1 3.1 3.1 8.2 0 11.4l-12.2 12.8z"></path></svg>
        </button>
        
        <div class='mosaic-likes'>💔 <span data-mosaicLikes>${el.likes}</span></div>
      </div> 

      <div class="mosaic-infoBottom mosaic-text">
        <a class="avatar-name" href='https://unsplash.com/@${el.user.username}' target="_blank">
          <img class='mosaic-avatar' title="${bioHtml}" src="${el.user.profile_image.large}" alt="">
          ${el.user.name}
        </a>
        ${instaHtml}
        ${twitterHtml}
        ${portfolioHtml}
        <div>
          <button id='Info' class='btnItemById' data-btnItemById='${el.id}' title="Additirial info">Info</button>
        </div>
      </div>
    </div>
  `
}

document.addEventListener('click', function(event) {
  const isLikeButton = event.target.closest('[data-like]') !== null
  if (isLikeButton) {
    const btnLikes = event.target.closest('[data-like]')
    const attributeLikesCount = btnLikes.getAttribute('data-like')
    const parentEl = btnLikes.parentElement
    const counterLikes = parentEl.querySelector('[data-mosaicLikes]')
    let newLikesCount = parseInt(attributeLikesCount, 10)

    if (btnLikes.classList.contains('on')) {
      newLikesCount--
      btnLikes.classList.remove('on')
    } else {
      newLikesCount++
      btnLikes.classList.add('on')
    }
    
    counterLikes.innerText = newLikesCount
    btnLikes.setAttribute('data-like', newLikesCount)
  }
})

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
 * данная функция возвращает номер индекса самой короткой колонки  
 * @param {*} columns
 * @param {*} index 
 */
function calculateTopmostColumn() {
  const columnsEls = document.querySelectorAll('[data-col]')
  const col0Height = columnsEls[0].offsetHeight
  const col1Height = columnsEls[1].offsetHeight
  const col2Height = columnsEls[2].offsetHeight

  if (col0Height < col1Height && col0Height < col2Height) {
    return 0
  }

  if (col1Height < col0Height && col1Height < col2Height) {
    return 1
  }

  return 2
}

/**
 * данная функция получает массив строк с html данными и каждый раз перезаписывает в data-wrapper
 * @param {string[]} htmlColumns - массив строк
 */
function renderItems(htmlColumns) {
  //выбираем элемент в html куда будем подставлять результат строки со всеми html
  //в выбранный элемент в html подставляем строку с всеми html элементами
  const indexMinHeight = calculateTopmostColumn()
  const wrapperEl = document.querySelector('[data-wrapper]')
  const colElements = wrapperEl.querySelectorAll('[data-col]')

  htmlColumns.forEach(function (str, index) {
    if (colElements[index]) {
      colElements[index].insertAdjacentHTML('beforeend', str)
    } else {
      colElements[indexMinHeight].insertAdjacentHTML('beforeend', str)
    }
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

function toggleButtonStateById(myBtn, sign) {
  if (sign === true) {
    myBtn.dataset.myAwesomeCaptionBackup = myBtn.innerText
    myBtn.innerText = 'Loading...'
    myBtn.disabled = true
  } else {
    myBtn.innerText = myBtn.dataset.myAwesomeCaptionBackup
    myBtn.disabled = false
  }
}

/**
 * обработчик событий на весь документ
 * передаем функцию, чтобы при клике на определенной кнопке с заданным атрибутом происходили следующие действия
 * если id не нулл, то функция делает http запрос к апи ансплеша подставляя туда айди получает промисс и возвращает промисс
 * внутри метода then функция в нужное  место должна перебирать объект и подставлять нужный контент
 * 
 */
document.addEventListener('click', function(event) {
  const targetElement = event.target
  const id = targetElement.getAttribute('data-btnItemById')
  if (id !== null) {
    // id не null, это точно кнопка
    toggleButtonStateById(targetElement, true)
    getPhotoDataById(id).then(function(data) {
      const divDataAdditionalInfo = document.querySelector(`[data-additionalInfo='${id}']`)

      const dateStr = data.created_at === null ? '' : formatDateTime(data.created_at)
      const cameraName = data.exif.name === null ? '' : `<div>Camera: ${data.exif.name}</div>`
      const isoEl = data.exif.iso === null ? '' : `<div>ISO: ${data.exif.iso}</div>`
      const aperture = data.exif.aperture === null ? '' : `<div>Aperture: ${data.exif.aperture}</div>`
      const exposureTime = data.exif.exposure_time === null ? '' : `<div>Exposure time: ${data.exif.exposure_time}</div>`
      const focalLength = data.exif.focal_length === null ? '' : `<div>Focal length: ${data.exif.focal_length}</div>`
      const country = data.location.country === null ? '' : `<div>Country: ${data.location.country}</div>`
      const city = data.location.city === null ? '' : `<div>City: ${data.location.city}</div>`
      const resultAdditionalInfo = `${dateStr}${cameraName}${isoEl}${aperture}${exposureTime}${focalLength}${country}${city}`
      const btnEsc = `<button class="btnEsc" data-btnEsc  title="Close" aria-label="Close">Close</button>`
      const content = resultAdditionalInfo || 'No data'
      divDataAdditionalInfo.innerHTML = `${content} ${btnEsc}`
      divDataAdditionalInfo.classList.remove('hide')

      divDataAdditionalInfo.querySelector('[data-btnEsc]').addEventListener('click', function() {
        divDataAdditionalInfo.classList.add('hide')
      })
      toggleButtonStateById(targetElement, false)
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
  
  for (let index = 0; index < Math.ceil(array.length / size); index++) {
    subData[index] = array.slice((index * size), ((index * size) + size))
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
    console.log(data)
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


// -----------------------------------------------------------------
