import { createContext, useEffect, useState } from 'react'
// import SHOP_DATA from '../shop-data.js'
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js'


export const CategoriesContext = createContext({
    categoriesMap: {}
})

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({})

/** use this only once useEffect fetcting data for firebase, if not it is going to create new collection every time rerendering the fetch
  useEffect(() => {
        addCollectionAndDocuments('categories', SHOP_DATA )
    }, [])
 */

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            console.log(categoryMap)
            setCategoriesMap(categoryMap)
        }
        getCategoriesMap()
    }, [])
   

    const value = {categoriesMap}
    return(
        <CategoriesContext.Provider value = {value}>
            {children}
        </CategoriesContext.Provider>
    )
}