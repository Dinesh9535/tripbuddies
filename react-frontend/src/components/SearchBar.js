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
      {/* <div className="left-panel">
        <ClearRefinements />
        <SortBy
          defaultRefinement="steam-video-games"
          items={[
            { value: 'steam-video-games', label: 'Relevant' },
            {
              value: 'steam-video-games:recommendationCount:desc',
              label: 'Most Recommended',
            },
            {
              value: 'steam-video-games:recommendationCount:asc',
              label: 'Least Recommended',
            },
          ]}
        />
        <h2>Genres</h2>
        <RefinementList attribute="genres" />
        <h2>Players</h2>
        <RefinementList attribute="players" />
        <h2>Platforms</h2>
        <RefinementList attribute="platforms" />
        <h2>Misc</h2>
        <RefinementList attribute="misc" />
        <Configure
          hitsPerPage={6}
          attributesToSnippet={['description:50']}
          snippetEllipsisText={'...'}
        />
      </div>
      <div className="right-panel"> */}
        <SearchBox />
        <InfiniteHits hitComponent={Hit} />
      {/* </div> */}
    </InstantSearch>
  </div>
)

const Hit = ({ hit }) => {
  return (
    <div key={hit.id}>
      <div className="hit-name">
        <Highlight attribute="title" hit={hit} />
      </div>
      {/* <div className="hit-name">
        <Snippet attribute="description[0]" hit={hit} />
      </div> */}
      <p>{hit.description[2].children[0].text}</p>
      <img src={hit.tripimage[0].url} align="left" alt={hit.name} />

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