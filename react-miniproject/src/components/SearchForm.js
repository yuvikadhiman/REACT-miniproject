import { useRef,useEffect } from 'react'
import { useGlobalContext } from '../context'


const SearchForm = () => {

  const {setSearch}=useGlobalContext()
  // console.log(search)
  const searchValue=useRef('')

  useEffect(() => {
    searchValue.current.focus()
  }, [])


  const HandleSearch=()=>{
    // e.preventDefault()
    setSearch(searchValue.current.value)
    // setSearch(e.target.value)

  }
  return(
    <section className='section search'>
    <form className='search-form' onSubmit={(e)=>{e.preventDefault()}} >
      <div className='form-control'>
        <label htmlFor='name'>search your favorite cocktail</label>
        <input
          type='text'
          name='name'
          id='name'
          ref={searchValue}
          // value={search}
          onChange={HandleSearch}
        />
       
      <button className='btn-search'>Search</button>
      </div>
    </form>
  </section>
  )
}

export default SearchForm;
