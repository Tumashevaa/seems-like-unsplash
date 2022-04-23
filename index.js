// access key ptJ9sMq465MLUNnrewrag_75WkMawAuAFrdyxSeK_EE/
// Secret key 60PrXNwZy3yyBl7FnIQuVST56Pb801yXJLandU8d32Y

// https://api.unsplash.com/photos/?client_id=ptJ9sMq465MLUNnrewrag_75WkMawAuAFrdyxSeK_EE


const monthsMap = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']


function render(picData, currentIndex, dataLenght) {
  document.querySelector('[data-control="qty"]').innerText = currentIndex + 1 + "/" + dataLenght
  document.querySelector('[data-info="profile-image"]').setAttribute('src', picData.user.profile_image.medium)
  document.querySelector('[data-info="name"]').innerText = `${picData.user.name}`
  document.querySelector('[data-info="user-name"]').innerText = `User name: ${picData.user.username}`
  document.querySelector('.circle').setAttribute('style', `background-color: ${picData.color}`)
  document.querySelector('[data-control="likesQty"]').innerText = `💔 ${picData.likes}`
  
  const userBio = document.querySelector('[data-info="user-bio"]')
  userBio.innerText = picData.user.bio === null ? '' : `Bio: ${picData.user.bio}`

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

  const image = document.querySelector(".img1")  
  image.setAttribute("src", picData.urls.regular)
  document.querySelector('.links-html').setAttribute('href', picData.links.html)

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
}


fetch('https://api.unsplash.com/photos/?client_id=ptJ9sMq465MLUNnrewrag_75WkMawAuAFrdyxSeK_EE')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data)
    
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