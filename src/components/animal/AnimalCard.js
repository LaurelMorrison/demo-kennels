import React from "react"
import "./Animal.css"
import { Link } from "react-router-dom";
import { firstLetterCase } from '../../Modules/helpers';
import { useHistory } from "react-router-dom";

export const AnimalCard = ({ animal, handleDeleteAnimal }) => {
  const history = useHistory();

  return (
    <div className="card">
      <div className="card-content">
        <h3>Name: <span className="card-petname">
          {firstLetterCase(animal.name)}
        </span></h3>
        <p>Breed: {animal.breed}</p>
        <Link to={`/animals/${animal.id}`}>
          < button>Details</button>
        </Link>
        <Link to={`/animals/${animal.id}/edit`}>
          <button>Edit</button>
          </Link>
        <button type="button" onClick={() => handleDeleteAnimal(animal.id)}>Discharge</button>
      </div>
    </div>
  );
}