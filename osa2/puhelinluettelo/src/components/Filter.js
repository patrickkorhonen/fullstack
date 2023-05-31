const Filter = ({ handleFilterChange }) => {
    return (
      <form>
        filter shown with 
        <input 
        onChange={handleFilterChange}
        />
        </form>
    )
  }
  
  export default Filter