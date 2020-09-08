

  const userURL = "http://localhost:3000/users"

  let profile = document.querySelector('.profile-container')
  let button = document.querySelector('.btn btn-primary')
  let mainContainer = document.querySelector('.main-container')
  const profileContainer = document.querySelector('.profile-container')
 
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
    console.log(userBio)
    userBio.innerHTML = `
      <h2>${user.name}</h2>
      <h4>${user.bio}</h4>
    `
    userProfile.appendChild(userBio)
    console.log(userProfile)
  }
  
//fetch all photos
const fetchAllPhotos = () => {
fetch(`http://localhost:3000/portraits`)
.then(res => res.json())
.then(json => json['data'].forEach(portrait => buildPortrait(portrait)))
}
fetchAllPhotos()

//build phots
const buildPortrait = (portrait) => {

  console.log(portrait)
  // console.log(portrait)
  let div = document.createElement('div')
  div.className = 'card'
  div.id = portrait.id
  div.innerHTML = `
  <div class="row justify-content-center">
    <div class="col-md-8">
        <div class="row">
            <a href="${portrait.attributes.img_url} " data-toggle="lightbox" data-gallery="example-gallery" class="col-sm-4">
                <img src= ${portrait.attributes.img_url} class="img-fluid">
            </a>
          </div>

  <h2>comments: ${portrait.attributes.comments}</h2>
  <h5>description: ${portrait.attributes.description}</h5>
  <div class=${portrait.attributes.likes}"likes-section">

  ` 
  // console.log(portrait.attributes.description)
  mainContainer.appendChild(div)

  let card = document.getElementById(portrait.id)
  card.addEventListener('click', (e) => popImage(portrait))

}

const popImage = (e) => {
  console.log(e.target)
}


// need to do the comments here
