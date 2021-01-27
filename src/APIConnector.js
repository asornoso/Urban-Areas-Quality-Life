
//Fetch cities as user types in input box
//Returns returns a list of cities that match search query
const fetchCities = async (query) => {
  if(query.length === 0 ) return []
  let data = await fetch(`https://api.teleport.org/api/cities/?search=${query}&limit=5`)
  data = await data.json()

  if(data.count === 0) return []

  const cities = data._embedded["city:search-results"].reduce( (result, city) => {
    //check if city is US based
    if(city.matching_full_name.includes('United States')){
      //Check if city is in selected state
      if(query === city.matching_full_name.split(',')[1].trim())
        result.push({city: city.matching_full_name, link: city._links['city:item'].href})
    }

    return result
  }, [])
  return cities
}

//Fetch data once a city is selected
//Must first fetch city data
//Then fetch urban area for corresponding city
//Filter urban data and returns data object
const fetchData = async (link) => {
  //Get info for selectedCity
  let data = await fetch(link)
  data = await data.json()

  //Get urban area... from link in data fetched above
  if(! data._links['city:urban_area']) return {name: 'No nearby urban area data for: '+data.full_name}
  data = await fetch(data._links['city:urban_area'].href)
  data = await data.json()

  const full_name = data.full_name

  //Get urban scores... form link in data fetched above
  data = await fetch(data._links['ua:scores'].href)
  data = await data.json()

  //Create obj object to return with proper data
  const obj = {
    name: full_name,
    summary: data.summary,
    categories: data.categories.map( category => {
      return {name: category.name, score: Math.round(category.score_out_of_10 * 10)/10}
    })
  }

  return obj
}


export {fetchCities, fetchData}
