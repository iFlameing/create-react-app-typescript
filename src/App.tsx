import React from 'react'
import {Store} from './Store'

export default function App() {
  const {state, dispatch} = React.useContext(Store)

  React.useEffect(() => {
    console.log('this is from useEffect ')
    state.episodes.length === 0 && fetchDataAction()
  })

  const fetchDataAction = async () => {
    console.log('this is from fetchDataAction')
     const URL  = 'https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes'
     const data = await fetch(URL)
     const dataJSON = await data.json()
     console.log(dataJSON._embedded.episodes)

     return dispatch({
       type: 'FETCH_DATA',
       payload: dataJSON._embedded.episodes
     })
  }

  return (
    <React.Fragment>
      <p>This is from the app component</p>
      <p>I am printing all the episodes that we are fetching from the url</p>
      {state.episodes.length ?(
          state.episodes.map( (episode : any) => {
            return <section key={episode.id}>
              <div>{JSON.stringify(episode.name)}</div>
            </section>
          })) : null
        }
      
    </React.Fragment>
  )
}
