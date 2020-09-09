

  const userURL = "http://localhost:3000/users"

  let profile = document.querySelector('.profile-container')
  let button = document.querySelector('.btn btn-primary')
  let mainContainer = document.querySelector('.main')
  const profileContainer = document.querySelector('.profile')
 
  //fetch user api
  const fetchOneUser = () => {
    fetch("http://localhost:3000/users")
    .then(res => res.json())
    .then(json => json.forEach(user => {
      buildProfile(user)
      buildBio(user)
    }))
  }
  fetchOneUser()

  //build user profile
  const buildProfile = (user) =>{

    const userDiv = document.createElement('div')
    userDiv.className = "user-profile-pic"
    userDiv.id = user.id

    const image = document.createElement('img')
    image.src = user.image

    userDiv.appendChild(image)
    profileContainer.appendChild(userDiv)
  
  }

  //build user bio
  function buildBio(user){
    const userProfile = document.getElementById(user.id)
    const userBio = document.createElement('div')
    userBio.className = 'user-bio'
    userBio.innerHTML = `
      <h2>${user.name}</h2>
      <h4>${user.bio}</h4>
    `
    userProfile.appendChild(userBio)
  
  }
  
//fetch all photos
const fetchAllPhotos = () => {
fetch(`http://localhost:3000/portraits`)
.then(res => res.json())
.then(json => json['data'].forEach(portrait => buildPortrait(portrait)))
}
fetchAllPhotos()

//build photos
const buildPortrait = (portrait) => {

  // console.log(portrait)
  let div = document.createElement('div')
  div.className = 'card'
  div.dataset.id = portrait.id
  div.innerHTML = `

  <div>
          <img src= ${portrait.attributes.img_url} class="img-fluid">
          <h5 class='description'>description: ${portrait.attributes.description}</h5>
          <ul>${commentSection(portrait)}</ul>
          <div class=${portrait.attributes.likes}"likes-section">	 
          <span class="likes">0 likes</span>	 
          <button class="like-button">♥</button>
  </div>
  ` 

  mainContainer.appendChild(div)



} // end of buildPortrait



// need to do the comments here
function commentSection(portrait){
  const ul = document.getElementsByName('ul')
  ul.innerHTML = ''
  const newUl = document.createElement('ul')
  newUl.className = 'comments'
  
  portrait.attributes.comments.map(comment => {
    let li = document.createElement('li')
    li.textContent = comment.content
    newUl.appendChild(li)
  })

  const likesSection = document.querySelector('.like-button')
  // likes.appendChild(newUl)

  console.log(likesSection)

  // console.log(portrait.attributes.comments)
}






//this is fr the modal, come back to this later
// <a href="${portrait.attributes.img_url} " data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-4">
// <img src= ${portrait.attributes.img_url} class="img-fluid">
// </a>
// </div>
// <h5 class='description'>description: ${portrait.attributes.description}</h5>
// <ul>${commentSection(portrait)}</ul>
// <div class='likes-btn'${portrait.attributes.likes}"likes-section">
// add likes to this section 
// </div>
// </div>

