  const userURL = "http://localhost:3000/users"

  const profileContainer = document.querySelector('.profile-container')
 
  //fetch user api
  const fetchOneUser = () => {
    fetch(userURL)
    .then(res => res.json())
    .then(json => json.forEach(user => {
      buildProfile(user)
      buildBio(user)
    }))
  }
  fetchOneUser()

  //build user profile
  const buildProfile = (user) =>{
    console.log(user)

    const userDiv = document.createElement('div')
    userDiv.className = "user-profile-pic"
    userDiv.id = user.id

    const image = document.createElement('img')
    image.src = user.image

    userDiv.appendChild(image)
    profileContainer.appendChild(userDiv)
    console.log(profileContainer)
  }


