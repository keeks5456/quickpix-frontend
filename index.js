let mainContainer = document.querySelector('.main-container')
let profile = document.querySelector('.profile-container')


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
  <div class="photo-container" id="myModal">
  <div class="row">


  <div class="modal-dialog">
  <div class="modal-content">
  <div class="modal-header">
  <div class="modal=body">
  <div class="modal=footer">
    </div>
  </div>
 </div>

 

  <img src=${portrait.attributes.img_url} />
  <h2>comments: ${portrait.attributes.comments}</h2>
  <h5>description: ${portrait.attributes.description}</h5>
  <div class=${portrait.attributes.likes}"likes-section">
  <span class="likes">0 likes</span>
  <button class="like-button">♥</button>
  ` 
  mainContainer.appendChild(div)

let card = document.getElementById(portrait.id)
let btn = card.querySelector('button')
console.log(btn)


}