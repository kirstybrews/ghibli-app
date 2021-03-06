const charactersURL = 'http://localhost:3000/characters/'

let movieId

function qSelect(id){
    return document.querySelector(id)
}

function create(el){
    return document.createElement(el)
}

function fetchCharacters(){
    fetch(charactersURL)
    .then((res) => res.json())
    .then ((characterData) => {
      createDiv()

      const cardContainer = qSelect('#card-container')
      cardContainer.innerHTML = ""
      cardContainer.classList.add("row", "row-cols-1", "row-cols-sm-2", "row-cols-md-3", "g-3")

        characterData.forEach(function(character) {
            renderCharacter(character)
        })
    })

    qSelect("#films").addEventListener('click', () => {
          fetchMovies()
    })
}

function createDiv(){
      const revealF = qSelect("#reveal-form")
            revealF.innerHTML = ""

      const form = qSelect("#form")
          form.innerHTML = ""

      let header = create('h4')
          header.innerText = "Don't see your favorite character?"
          header.className = "fw-light"

      let button = create('button')
          button.classList.add('btn', 'btn-default', 'button')
          button.innerText = "Add a Character!"

          button.addEventListener('click', () => {
            createForm()
          })

          
          revealF.append(header, button)
}

function createForm() {

      qSelect("#reveal-form").innerHTML = ""

    const formContainer = qSelect("#form-container")
          formContainer.className = "container"
          
    const form = qSelect("#form")
          form.innerHTML = ""
          
    const nameDiv = create('div')
          nameDiv.className = "form-group"
          
          let name = document.createElement('input')
              name.type = "text"
              name.className = "form-control"
              name.placeholder = "Add Character Name"
              name.name = "name"
          
          nameDiv.appendChild(name)

    const imageDiv = create('div')
          imageDiv.className = "form-group"

          let image = document.createElement('input')
              image.type = "text"
              image.className = "form-control"
              image.placeholder = "Add Character Image URL"
              image.name = "image"

          imageDiv.appendChild(image)

    const speciesDiv = create('div')
          speciesDiv.className = "form-group"

      const speciesSelect = create('select')
            speciesSelect.className = 'form-control' 
            speciesSelect.name = "species"

      let speciesOption = create('option')
          speciesOption.innerText = "--Add Species--"
            
      let humanOption = create('option')
          humanOption.innerText = "human"

      let spiritOption = create('option')
          spiritOption.innerText = "spirit"

      let godOption = create('option')
          godOption.innerText = "god"

      let catOption = create('option')
          catOption.innerText = "cat"


          speciesSelect.append(speciesOption, humanOption, spiritOption, godOption, catOption)

          speciesDiv.appendChild(speciesSelect)

      const movieDiv = create('div')
            movieDiv.className = "form-group"

      fetch(moviesURL)
            .then(resp => resp.json())
            .then(movies => renderMovieSelect(movies))

      function renderMovieSelect(movies){

            let moviesSelect = create('select')
                moviesSelect.className = 'form-control' 
                moviesSelect.name = "movies"

            let chooseMovieOption = create('option')
                chooseMovieOption.innerText = "--Which Film Does This Character Belong To?--"

            moviesSelect.appendChild(chooseMovieOption)

            movies.forEach(movie => {
                  let movieOption = create('option')
                  movieOption.innerText = `${movie.title}`
                  movieOption.addEventListener('click', () => {
                        console.log('click')
                  })

                  moviesSelect.append(movieOption)
            })
            movieDiv.append(moviesSelect)
      }
          
          let button = document.createElement('button')
              button.type = "submit"
              button.classList.add('btn', 'btn-default', 'button')
              button.innerText = "Add Character!"
          
        form.append(nameDiv, imageDiv, speciesDiv, speciesDiv, movieDiv, button)

        form.addEventListener('submit', (event) => {
              event.preventDefault()
              addCharacter(event.target)
          })
  }

  function addCharacter(formInfo) {

      const newChar = {
          name: formInfo.name.value,
          image: formInfo.image.value,
          species: formInfo.species.value,
          title: formInfo.movies.value
      }

      
      const reqPackage = {
            headers: {
                  "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(newChar)
      }
      
      fetch(charactersURL, reqPackage)
          .then(res => res.json())
          .then(characterObj => {
              qSelect('#form').reset()
              renderCharacter(characterObj)
          })
  }

function renderCharacter(character){
    const cardContainer = qSelect('#card-container') 

    const col = create('div')
          col.className = "col"

    const card = create('div')
          card.classList.add("card", "shadow-sm")

    const image = create('img')
          image.src = character.image
          image.className = "img-thumbnail"
          image.alt = character.name
    

    const cardBody = create('div')
          cardBody.className = "card-body"

    const p = create('p')
          p.className = "card-text"
          p.innerText = character.name

    const div = create('div')
          div.classList.add("d-flex", "justify-content-between", "align-items-center")

    const buttonGroup = create('div')
          buttonGroup.className = "btn-group"

    const viewBtn = create('button')
          viewBtn.classList.add("btn", "btn-sm", "btn-outline-secondary")
          viewBtn.innerText = "View"
          viewBtn.addEventListener('click', () => {
            fetchCharacter(character)
        })
          
    const deleteBtn = create('button')
          deleteBtn.classList.add("btn", "btn-sm", "btn-outline-secondary")
          deleteBtn.innerText = "Delete"

          deleteBtn.addEventListener('click', () => {
                deleteChar(character, col)
          })

    buttonGroup.append(viewBtn, deleteBtn)

    div.appendChild(buttonGroup)
    
    cardBody.append(p, div)

    card.append(image, cardBody)

    col.appendChild(card)
        
    cardContainer.appendChild(col)
}

function fetchCharacter(character){
      fetch(charactersURL + character.id)
      .then((res) => res.json())
      .then((characterData) => {
          showCharacter(characterData)
      })
  }

function showCharacter(character){

      const revealF = qSelect("#reveal-form")
            revealF.innerHTML = ""
  
      const cardContainer = qSelect('#card-container')
          cardContainer.innerHTML = ""
          cardContainer.className = "text-center"
  
      let characterImage = create('img')
          characterImage.classList.add("img-fluid", "img-thumbnail")
          characterImage.src = character.image
  
      let characterName = create('h2')
          characterName.innerText = character.name
          characterName.classList.add("fw-light", "padding")
  
      let characterSpecies = create('p')
          characterSpecies.innerText = `Species: ${character.species}` 
          characterSpecies.classList.add("fw-light", "padding")
  
      let characterMovie = create('p')
          characterMovie = `Appears In: ${character.movie.title}`
          characterMovie.className = "fw-light"

      let br = create('br')
  
      let button = document.createElement('button')
          button.classList.add('btn', 'btn-default', 'button')
          button.innerText = "Back"
          button.addEventListener('click', () => {
              fetchCharacters()
          })
  
      cardContainer.append(characterName, characterImage,  characterSpecies, characterMovie, br, button)
  
      
  }

function deleteChar(character, col){
    fetch(charactersURL + character.id, {method: "DELETE"})
    .then((res) => res.json())
    .then (col.remove()) 
} 
