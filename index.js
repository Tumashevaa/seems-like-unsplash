// access key ptJ9sMq465MLUNnrewrag_75WkMawAuAFrdyxSeK_EE/
// Secret key 60PrXNwZy3yyBl7FnIQuVST56Pb801yXJLandU8d32Y

// https://api.unsplash.com/photos/?client_id=ptJ9sMq465MLUNnrewrag_75WkMawAuAFrdyxSeK_EE

const monthsMap = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

let counterPage = 1

fetch('https://api.unsplash.com/photos/?client_id=ptJ9sMq465MLUNnrewrag_75WkMawAuAFrdyxSeK_EE')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data)
    
    const imagesHtmlList = data.map(function (el) {
      const colorHtml = `<div class='circle-color' style='background-color: ${el.color}'></div>`

      const createdAtHtml = new Date(el.created_at)
      const dateAt = createdAtHtml.getDate()
      const monthAt = createdAtHtml.getMonth()
      const yearAt = createdAtHtml.getFullYear()
      const hourAt = createdAtHtml.getHours()
      const minutesAt = createdAtHtml.getMinutes()
      const dateStrHtml = `${dateAt} ${monthsMap[monthAt]} ${yearAt} ${hourAt}:${minutesAt}`

      const descriptionImgHtml = el.description === null ? '' : `Description: ${el.description}`

      const bioHtml = el.user.bio === null ? '' : `<div>Bio: ${el.user.bio}</div>`
      const instaHtml = el.user.social.instagram_username ===null ? '' : 
        `<div> Instagram: <a href='https://instagram.com/${el.user.social.instagram_username}' target="_blank">@${el.user.social.instagram_username}
        </a></div>`
      const twitterHtml = el.user.twitter_username ===null ? '' : 
        `<div> Twitter: <a href='https://twitter.com/${el.user.twitter_username}' target="_blank">@${el.user.twitter_username}
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
            <div>${dateStrHtml}</div>
            ${descriptionImgHtml}
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
    }) // MOSAIC

    const imagesHtml = imagesHtmlList.join('\n')
    const imageMosaic = document.querySelector('[data-wrapper]')
    imageMosaic.innerHTML = imagesHtml
  })

/**
 * @param {number} page номер страницы
 * @returns Promise промис с данными
 */
function getData(page) {
  return fetch(`https://api.unsplash.com/photos/?client_id=ptJ9sMq465MLUNnrewrag_75WkMawAuAFrdyxSeK_EE&page=${page}`)
    .then((response) => {
      return response.json();
    })
}

document.querySelector('[data-btn]').addEventListener('click', function () {
  console.log('click')
  counterPage ++

  getData(counterPage).then((data) => {
    console.log(data)
    // отрендерить следущую страницу
    const nextImagesHtmlList = data.map( el => {
      const colorHtml = `<div class='circle-color' style='background-color: ${el.color}'></div>`

      const createdAtHtml = new Date(el.created_at)
      const dateAt = createdAtHtml.getDate()
      const monthAt = createdAtHtml.getMonth()
      const yearAt = createdAtHtml.getFullYear()
      const hourAt = createdAtHtml.getHours()
      const minutesAt = createdAtHtml.getMinutes()
      const dateStrHtml = `${dateAt} ${monthsMap[monthAt]} ${yearAt} ${hourAt}:${minutesAt}`

      const descriptionImgHtml = el.description === null ? '' : `Description: ${el.description}`

      const bioHtml = el.user.bio === null ? '' : `<div>Bio: ${el.user.bio}</div>`
      const instaHtml = el.user.social.instagram_username ===null ? '' : 
        `<div> Instagram: <a href='https://instagram.com/${el.user.social.instagram_username}' target="_blank">@${el.user.social.instagram_username}
        </a></div>`
      const twitterHtml = el.user.twitter_username ===null ? '' : 
        `<div> Twitter: <a href='https://twitter.com/${el.user.twitter_username}' target="_blank">@${el.user.twitter_username}
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
            <div>${dateStrHtml}</div>
            ${descriptionImgHtml}
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
    })
    const nextImagesHtml = nextImagesHtmlList.join('\n')
    const nextImageMosaic = document.querySelector('[data-nextWrapper]')
    nextImageMosaic.innerHTML = nextImagesHtml
  })
})

