const PersonForm = ({ handleNameChange, handleNumberChange, newName, addPerson, newNumber }) => {
    return (
        <div>
        <form onSubmit={addPerson}>
          <div>
          name:
          <input 
          value={newName} 
          onChange={handleNameChange}
          />
          </div>
          <div>
          number:
          <input 
          value={newNumber} 
          onChange={handleNumberChange}
          />
          </div>
        <button type="submit">add</button>
        </form>
      </div>
    )
  }
  
  export default PersonForm