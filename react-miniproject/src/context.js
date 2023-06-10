import React, {
  useState,
  useContext,
  createContext,
  useEffect,
  useCallback,
} from "react";
const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const SearchContext = createContext();

const AppProvider = (props) => {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("a");
  const [cocktails, setcocktails] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchdrinks = useCallback(async () => {
    setLoading(true);
    try {
      const resp = await fetch(`${url}${search}`);
      const data = await resp.json();
      // console.log(data);
      const { drinks } = data;
      if (drinks) {
        const newCocktails = drinks.map((items) => {
          const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } =
            items;
          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          };
        });
        setcocktails(newCocktails);
      } else {
        setcocktails([]);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchdrinks();
  }, [search, fetchdrinks]);

  return (
    <SearchContext.Provider
      value={{
        loading: loading,
        // search: search,
        cocktails: cocktails,
        setSearch: setSearch,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};
export default AppProvider;
export const useGlobalContext = () => useContext(SearchContext);
// make sure use
// export const useGlobalContext = () => {
//   return useContext(SearchContext);
// };

// export {SearchContext, AppProvider };
