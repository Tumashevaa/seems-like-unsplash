



// access key ptJ9sMq465MLUNnrewrag_75WkMawAuAFrdyxSeK_EE/
// Secret key 60PrXNwZy3yyBl7FnIQuVST56Pb801yXJLandU8d32Y

// https://api.unsplash.com/photos/?client_id=ptJ9sMq465MLUNnrewrag_75WkMawAuAFrdyxSeK_EE


const monthsMap = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function render(picData, currentIndex, dataLenght) {
  document.querySelector('[data-control="counter"]').innerText = currentIndex + 1 + "/" + dataLenght
  document.querySelector('[data-info="avatar"]').setAttribute('src', picData.user.profile_image.large)
  document.querySelector('[data-info="portfolio-link"]').setAttribute('href', `https://unsplash.com/@${picData.user.username}`)
  document.querySelector('[data-info="name"]').innerText = `${picData.user.name}`
  document.querySelector('[data-info="user-name"]').innerText = `User name: ${picData.user.username}`
  document.querySelector('.circle').setAttribute('style', `background-color: ${picData.color}`)
  document.querySelector('[data-control="likesQty"]').innerText = `💔 ${picData.likes}`
  document.querySelector('[data-info="user-bio"]').innerText = picData.user.bio === null ? '' : `Bio: ${picData.user.bio}`

  const userPortfolio = document.querySelector('.user-portfolio')
  const userPLink = userPortfolio.querySelector('a')
  userPLink.setAttribute('href', picData.user.portfolio_url)
  if (picData.user.portfolio_url) {
    userPLink.setAttribute('href', picData.user.portfolio_url)
    userPLink.innerText = picData.user.portfolio_url
    userPortfolio.classList.remove('hide')
  } else {
    userPLink.setAttribute('href', '')
    userPortfolio.classList.add('hide')
  }

  const instaProf = document.querySelector('.instagram-profile')
  const instaLink = instaProf.querySelector('a')
  instaLink.setAttribute('href', picData.user.social.instagram_username)
  if (picData.user.social.instagram_username) {
    instaLink.setAttribute('href', `https://instagram.com/${picData.user.social.instagram_username}`)
    instaLink.innerText = `@${picData.user.social.instagram_username}`
    instaProf.classList.remove('hide')
  } else {
    instaLink.setAttribute('href', '')
    instaLink.innerText = ``
    instaProf.classList.add('hide')
  }

  const twitterProf = document.querySelector('.twitter-profile')
  const twitterLink = twitterProf.querySelector('a')
  twitterLink.setAttribute('href', picData.user.twitter_username)
  if (picData.user.social.twitter_username) {
    twitterLink.setAttribute('href', `https://twitter.com/${picData.user.twitter_username}`)
    twitterLink.innerText = `@${picData.user.twitter_username}`
    twitterProf.classList.remove('hide')
  } else {
    twitterLink.setAttribute('href', '')
    twitterLink.innerText = ``
    twitterProf.classList.add('hide')
  }

  document.querySelector(".img1").setAttribute("src", picData.urls.regular)
  document.querySelector('.img-full').setAttribute('href', picData.urls.full)
  document.querySelector('.img-full').setAttribute('data-pswp-width', picData.width)
  document.querySelector('.img-full').setAttribute('data-pswp-height', picData.height)

  const descriptionImg = document.querySelector('[data-info="description-img"]')
  descriptionImg.innerText = picData.description === null ? '' : `${picData.description}`

  const createdAt = new Date(picData.created_at)
  const dateAt = createdAt.getDate()
  const monthAt = createdAt.getMonth()
  const yearAt = createdAt.getFullYear()
  const hourAt = createdAt.getHours()
  const minutesAt = createdAt.getMinutes()
  const dateStr = `${dateAt} ${monthsMap[monthAt]} ${yearAt} ${hourAt}:${minutesAt}`
  document.querySelector(".date").innerText = dateStr

  document.querySelector(".links-html").innerText = picData.links.html
}


fetch('https://api.unsplash.com/photos/?client_id=ptJ9sMq465MLUNnrewrag_75WkMawAuAFrdyxSeK_EE')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data)


    // MOSAIC
    const imagesHtmlList = data.map(function (el) {
      return `
        <div class="mosaic-item">
          <a class="mosaic-img-link" href="${el.urls.full}" data-pswp-width="${el.width}" data-pswp-height="${el.height}" target="_blank">
            <img class="mosaic-img" src="${el.urls.small_s3}" alt="">
          </a>
        </div>
      `
    })

    console.log(imagesHtmlList)

    const imagesHtml = imagesHtmlList.join('\n')
    const imageMosaic = document.querySelector('[data-wrapper]')
    imageMosaic.innerHTML = imagesHtml



    // const itemNameList = data.map(function (el) {
    //   return `<div class="item__username">${el.user.name}</div>` 
    // })
    // const itemUsername = itemNameList.join(`\n`)
    // const itemUsernameFinally = document.querySelector('.item_content')
    // itemUsernameFinally.innerHTML = itemUsername
    // MOSAIC
    

    let currentIndex = 0
    const dataLenght = data.length
    
    const renderCurrent = () => render(data[currentIndex], currentIndex, dataLenght)

    renderCurrent()
    
    document.querySelector('[data-control="prev"]').addEventListener("click", function() {      
      
      if (currentIndex === 0) {
        currentIndex = dataLenght - 1
      } else {
        currentIndex--
      }

      renderCurrent()
    })

    document.querySelector('[data-control="next"]').addEventListener("click", function() {      

      if (currentIndex === dataLenght - 1) {
        currentIndex = 0
      } else {
        currentIndex++
      }

      renderCurrent()
    })
  });