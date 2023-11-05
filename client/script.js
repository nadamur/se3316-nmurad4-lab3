document.addEventListener("DOMContentLoaded", () => {
  // This function will be called when the DOM is fully loaded

  // Get a reference to the search button
  const searchButton = document.getElementById("searchButton");

  // Add a click event listener to the search button
  searchButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the form from submitting
    searchSuperheroes(); // Call your search function
  });
});




//function to get all hero info
async function getHero(id) {
  try {
    const response = await fetch(`/api/superheroes/${id}`);
    if (!response.ok) {
      throw new Error('Request failed');
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null; // Handle the error gracefully
  }
}




// Function to get all superhero information by ID
function getSuperheroInfo(id) {
  fetch(`/api/superheroes/${id}`)
    .then((response) => response.json())
    .then((data) => {
      // Handle the data received from the server
      console.log(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Function to get superhero powers by ID
function getSuperheroPowers(id) {
  fetch(`/api/superheroes/${id}/power`)
    .then((response) => response.json())
    .then((data) => {
      // Handle the data received from the server
      console.log(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Function to get all available publisher names
function getAllPublishers() {
  console.log("publishers");
  fetch('/api/publishers')
    .then((response) => response.json())
    .then((data) => {
      // Handle the data received from the server
      console.log(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}



async function displayHeroes(data){
  const searchResultsDiv = document.getElementById('searchResults');
  // Clear existing options
  while (searchResultsDiv.firstChild) {
    searchResultsDiv.removeChild(searchResultsDiv.firstChild);
  }
  const resultList = document.createElement('ul');
  for (const i of data.ids) {
    //get hero info based on id
    const hero = await getHero(i);
    const listItem = document.createElement('li');
    //hero info:
    //name
    const resultNameBold = document.createElement('strong');
    resultNameBold.style.color = 'blue';
    resultNameBold.appendChild(document.createTextNode(hero.name));
    //gender
    const resultGender = document.createElement('span');
    resultGender.style.fontSize = '14px';
    resultGender.appendChild(document.createTextNode(`Gender: ${hero.Gender}, `));
    //height
    const resultHeight = document.createElement('span');
    resultHeight.style.fontSize = '14px';
    resultHeight.appendChild(document.createTextNode(`Height: ${hero.Height}, `));
    //eye colour
    const resultEye = document.createElement('span');
    resultEye.style.fontSize = '14px';
    resultEye.appendChild(document.createTextNode(`Eye color: ${hero['Eye color']}, `));
    //alignment
    const resultAlignment = document.createElement('span');
    resultAlignment.style.fontSize = '14px';
    resultAlignment.appendChild(document.createTextNode(`Alignment: ${hero.Alignment}, `));
    //hair color
    const resultHair = document.createElement('span');
    resultHair.style.fontSize = '14px';
    resultHair.appendChild(document.createTextNode(`Hair colour: ${hero['Hair color']}, `));
    //publisher
    const resultPublisher = document.createElement('span');
    resultPublisher.style.fontSize = '14px';
    resultPublisher.appendChild(document.createTextNode(`Publisher: ${hero.Publisher}, `));
    //race
    const resultRace = document.createElement('span');
    resultRace.style.fontSize = '14px';
    resultRace.appendChild(document.createTextNode(`Race: ${hero.Race}, `));
    //skin colour
    const resultSkin = document.createElement('span');
    resultSkin.style.fontSize = '14px';
    resultSkin.appendChild(document.createTextNode(`Skin colour: ${hero['Skin color']}, `));
    //weight
    const resultWeight = document.createElement('span');
    resultWeight.style.fontSize = '14px';
    resultWeight.appendChild(document.createTextNode(`Weight: ${hero.Weight}`));
    //button to add to fav list
    const addToFavButton = document.createElement('button');
    addToFavoButton.textContent = 'Add to Favorite List';
    addToFavButton.addEventListener('click', () => {
      // Add logic to add this hero to the favorite list
      // You can implement this logic in your script.js
      // For example, create a function to handle this action.
      // addToFavoriteList(hero);
    });
    //append hero info to a list item:
    listItem.appendChild(resultNameBold);
    listItem.appendChild(document.createElement('br'));
    listItem.appendChild(resultGender);
    listItem.appendChild(resultHeight);
    listItem.appendChild(resultEye);
    listItem.appendChild(resultAlignment);
    listItem.appendChild(resultHair);
    listItem.appendChild(resultPublisher);
    listItem.appendChild(resultRace);
    listItem.appendChild(resultSkin);
    listItem.appendChild(resultWeight);
    //append list item to result list:
    resultList.appendChild(listItem);

    if (resultList.children.length > 0) {
      searchResultsDiv.style.display = 'block';
      searchResultsDiv.appendChild(resultList);
    } else {
      searchResultsDiv.style.display = 'none';
    }
  }
}
  // Function to search for superheroes based on a pattern and field
  async function searchSuperheroes() {
    const pattern = document.getElementById("searchCategory").value;
    console.log("pattern: " + pattern);
    const field = document.getElementById("searchInput").value;
    console.log("field: " + field);
    const n = 10;
    try {
      const response = await fetch(`/api/search/${pattern}/${field}/${n}`);
      if (!response.ok) {
        throw new Error('Request failed');
      }
      const data = await response.json();
      displayHeroes(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  // Function to create a new list of superheroes
  function createSuperheroList(listName) {
    fetch(`/api/lists/${listName}`, {
      method: 'POST',
    })
      .then((response) => {
        if (response.status === 201) {
          console.log('List created successfully');
        } else {
          console.error('Error:', response.status);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  // Function to save a list of superhero IDs to a given list name
  function saveSuperheroList(listName, ids) {
    fetch(`/api/lists/add/${listName}?ids=${ids.join(',')}`, {
      method: 'PUT',
    })
      .then((response) => {
        if (response.status === 200) {
          console.log('List updated successfully');
        } else {
          console.error('Error:', response.status);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  // Function to get the list of superhero IDs for a given list name
  function getSuperheroList(listName) {
    fetch(`/api/lists/${listName}`)
      .then((response) => response.json())
      .then((data) => {
        // Handle the data received from the server
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  // Function to delete a list of superheroes with a given name
  function deleteSuperheroList(listName) {
    fetch(`/api/lists/delete/${listName}`, {
      method: 'PUT',
    })
      .then((response) => {
        if (response.status === 200) {
          console.log('List deleted successfully');
        } else {
          console.error('Error:', response.status);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  // Function to get a list of names, information, and powers of all superheroes saved in a given list
  function getSuperheroListInfo(listName) {
    fetch(`/api/lists/info/${listName}`)
      .then((response) => response.json())
      .then((data) => {
        // Handle the data received from the server
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  