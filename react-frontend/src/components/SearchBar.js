import 'instantsearch.css/themes/algolia-min.css'
import React from 'react'
import {
  InstantSearch,
  InfiniteHits,
  SearchBox,
  Stats,
  Highlight,
  ClearRefinements,
  RefinementList,
  Configure,
  SortBy,
  Snippet,
} from 'react-instantsearch-dom'

import '../styling/SearchBar.css'
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'

const { searchClient } = instantMeiliSearch(
  'http://localhost:7700',
  '',
//   {
//     primaryKey: 'id',
//   }
)

const SearchBar = () => (
  <div className="ais-InstantSearch">
    <h1>Trips</h1>
    <InstantSearch indexName="trip" searchClient={searchClient}>
      <Stats />
        <SearchBox />
        <InfiniteHits hitComponent={Hit} />
    </InstantSearch>
  </div>
)

const Hit = ({ hit }) => {
  return (
    <div key={hit.id}>
      <div className="hit-name">
        {/* <Snippet attribute="title" hit={hit} /> */}
        <h1>{hit.title}</h1>
      </div>
      {/* <div className="hit-name">
        <Snippet attribute="description[0]" hit={hit} />
      </div> */}
      <p>{hit.description[2].children[0].text}</p>
      <img src={"http://localhost:1337"+hit.tripimage[0].url} align="left" alt={hit.name} />

      {/* <div className="hit-description">
        {hit.description && hit.description.length > 0 ? (
          hit.description.map((desc, index) => (
            <Snippet key={index} attribute={`description.${index}`} hit={hit} />
          ))
        ) : (
          <Snippet attribute="description" hit={hit} />
        )}
      </div> */}
    </div>
  )
}

export default SearchBar