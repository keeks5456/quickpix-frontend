
  const userURL = "http://localhost:3000/users"

  let profile = document.querySelector('.profile-container')
  let button = document.querySelector('.btn btn-primary')
  let mainContainer = document.querySelector('.main')
  const profileContainer = document.querySelector('.profile')
  //this is for submitting new portrait
  function listenForSubmit(){
  const addPortrait = document.querySelector('.form')
  addPortrait.addEventListener('submit', (e) => {
  e.preventDefault()
  addNewPortrait(portrait)
  addPortrait.reset()
})
  }  
listenForSubmit()

  // this is for delete
function listenForDelete(portrait){
  const currentCard = document.getElementById(portrait.id)
  const deleteBtn = currentCard.querySelector('#delete')
  deleteBtn.addEventListener('click', () => {
    deletePortrait(portrait)
  })
  // listenForDelete()
}


//delete method to delete card
const deletePortrait = (portrait) => {
  const currentCard = document.getElementById(portrait.id)
  currentCard.remove()
  fetch(`http://localhost:3000/portraits/${portrait.id}`,{
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
  .then(res => res.json())
  .then(json => console.log(json))
}

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
  // debugger
  let div = document.createElement('div')
  div.className = 'card'
  div.id = portrait.id
  div.innerHTML = `

        <img src= ${portrait.attributes.img_url} class="img-fluid">
        <h5 class='description'>description: ${portrait.attributes.description}</h5>
        <form data-portrait=${portrait.id} class="comment-form">
          <input
            class="comment-input"
            type="text"
            name="comment"
            placeholder="Add a comment..."
          />
          <button class="comment-button" type="submit">Post</button>
        </form>
        
        <div class="likes-section">

        <button id="delete"> X </button>
         <button class="like-button"> ${portrait.attributes.like} likes ♥</button>
           ` 
  mainContainer.appendChild(div)

  listenForLikes(portrait)
  commentSection(portrait)
  listenForComment(portrait)
  listenForEditComment(portrait)
  listenForDelete(portrait)
} // end of buildPortrait


  function listenForLikes(portrait){
    const currentCard = document.getElementById(portrait.id)
    const likesBtn = currentCard.querySelector('.like-button')
    likesBtn.addEventListener('click', ()=>{
      patchLikes(portrait)

    })
  }
//patch request likes
  const patchLikes = (portrait) => {
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

    })
  }
//create comments
  function commentSection(portrait){
      const newUl = document.createElement('ul')
      newUl.className = 'comments'
      
      portrait.attributes.comments.map(comment => {
        let li = document.createElement('li')
        li.textContent = comment.content
        newUl.appendChild(li)
        const editBtn = document.createElement('button')
        editBtn.className = 'edit-button'
        editBtn.dataset.commentId = comment.id
        editBtn.innerText = '...' 
        li.appendChild(editBtn)

      })
      const currentCard= document.getElementById(portrait.id)
      const description = currentCard.querySelector('.description')
      description.after(newUl)
    }
//event listen for comments
    function listenForComment(portrait){
      const portraitComment = document.getElementById(portrait.id)
      const commentForm = portraitComment.querySelector('.comment-form')
      commentForm.addEventListener('submit', (e)=> {
        e.preventDefault()
        postComments(e)
        commentForm.reset()
      })
    }
//fetch comments
    function postComments(e){
      console.log()
      data = {
        content: e.target[0].value,
        portrait_id: e.target.dataset.portrait
      }
      console.log(data)

      fetch(`http://localhost:3000/comments`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: "application/json"
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(json => {
        const ul = document.querySelector('ul')
        const li = document.createElement('li')
        li.textContent = json["data"].attributes.content
        console.log(ul)
        ul.appendChild(li)


      })
    }

    // edit the comments here
    function listenForEditComment(portrait){
      const currentCard = document.getElementById(portrait.id)
      let editBtn = currentCard.querySelector('button.edit-button')
      console.log(editBtn)
      editBtn.addEventListener('click', (e)=> {
          patchEditComments(portrait, e)
        // console.log(portrait, e)
      })
    }

    function patchEditComments(e){
      // let getComments = e.attributes.comments
      // getComments.forEach(comment => {
      //   comment.
      // })

      let commentPrompt = prompt("Edit Comment Here", e.attributes.comments[0].content)
      let data = {
        content: commentPrompt
      }
      // debugger
      fetch(`http://localhost:3000/comments/${e.id}`,{
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        console.log(e)
        const li = document.getElementById(json.content)
 
        debugger
      })
    }
    


  // create a post
const addNewPortrait = (e) => {
  let portrait = {
    img_url: e.form[0].value,
    description: e.form[1].value,
    like: 0,
    user_id: 1
  }
  fetch(`http://localhost:3000/portraits`,{
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify(portrait),
  })
  .then(res => res.json())
  .then(json => {
    console.log(json)
    // buildPortrait(json)
  })
}

