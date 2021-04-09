const remoteURL = "http://localhost:5002"

  export const getAnimalById = (id) => {
    //be sure your animals have good data and related to a location and customer
   return fetch(`${remoteURL}/animals/${id}?_expand=location&_expand=customer`)
    .then(response => response.json())
  }

  export const getAllAnimals = () => {
    return fetch(`${remoteURL}/animals`)
    .then(response => response.json())
  }

  export const deleteAnimal = (id) => {
    return fetch(`${remoteURL}/animals/${id}`, {
      method: "DELETE"
    }).then(response => response.json())
  }

  export const addAnimal = (newAnimal) => {
    return fetch(`${remoteURL}/animals`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newAnimal)
    }).then(response => response.json())
  }

  export const updateAnimal = (editedAnimal) => {
    return fetch(`${remoteURL}/animals/${editedAnimal.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedAnimal),
    }).then((data) => data.json());
  };

  export const getRandomId = () => {
    return fetch(`${remoteURL}/animals`)
      .then(result => result.json())
      .then(animals => {
        const randomIndex = Math.floor(Math.random() * animals.length);
        const randomAnimal = animals[randomIndex];
        return randomAnimal.id;
    });
  }