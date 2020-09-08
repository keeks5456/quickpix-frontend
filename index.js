let mainContainer = document.querySelector('.main-container')
let profile = document.querySelector('.profile-container')
console.log(profile)

const fetchAllPhotos = () => {
fetch(`http://localhost:3000/portraits`)
.then(res => res.json())
.then(json => json['data'].forEach(portrait => buildPortrait(portrait)))
}

fetchAllPhotos()

const buildPortrait = (portrait) => {
  console.log(portrait)
  let div = document.createElement('div')
  div.className = 'card'
  div.id = portrait.id
  div.innerHTML = `
  <img src=${portrait.attributes.img_url} />
  <h2>${portrait.attributes.comments}</h2>
  <h4>${portrait.attributes.description}</h4>
  <div class=${portrait.attributes.likes}"likes-section">
  <span class="likes">0 likes</span>
  <button class="like-button">♥</button>
  ` 
  mainContainer.appendChild(div)
}