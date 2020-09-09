

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
    // userDiv.dataset.id = user.id

    const image = document.createElement('img')
    image.src = user.image

    userDiv.appendChild(image)
    profileContainer.appendChild(userDiv)
  
  }

  //build user bio
  function buildBio(user){
    const userProfile = document.querySelector(".user-profile-pic")
    // debugger
    console.log(userProfile)
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
  let div = document.createElement('div')
  div.className = 'card'
  div.id = portrait.id
  console.log(div)
  console.log(portrait.id)

  div.innerHTML = `

        <img src= ${portrait.attributes.img_url} class="img-fluid">
        <h5 class='description'>description: ${portrait.attributes.description}</h5>

        <form method="post">
        <div>
        <textarea name="comments" id="comments" style="font-family:sans-serif;font-size:1.0em;"></textarea>
        </div>
        <input type="submit" value="Submit">
        </form>
        <div class="likes-section">
         <button class="like-button"> ${portrait.attributes.like} likes ♥</button>

         <ul>${commentSection(portrait)}</ul>
    
  ` 
  mainContainer.appendChild(div)

// likes event listener
  listenForLikes(portrait)

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

  const likes = document.querySelector('.likes-section')
  console.log(likes)
  // likes.appendChild(newUl)

// need help on the comment section
}

  function listenForLikes(portrait){
    const currentCard = document.getElementById(portrait.id)
    const likesBtn = currentCard.querySelector('.like-button')
    likesBtn.addEventListener('click', ()=>{
      patchLikes( portrait)

    })
    // console.log(likesBtn)
  }

  const patchLikes = ( portrait) => {
    data = {
      like: portrait.attributes.like += 1,
    }
    fetch(`http://localhost:3000/portraits/${portrait.id}`,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(json => {
      let currentCard = document.getElementById(json.id)
      let button = currentCard.querySelector('.like-button')
      button.textContent = `${json.like} likes ♥`
      console.log(button)
    })
  }


