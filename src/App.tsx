import { useState, useEffect } from 'react';
import './App.css';

import SearchField from './components/SearchField';
import Project from './components/Project';
import useDebounce from './hooks/useDebounce';

import { findLocation, getAllLocationNames } from './services/LocationService';
import { LocationType } from './types/Location';
import { ProjectWithDistanceType } from './types/Project';
import { findNumberOfProjectsByDistanceAsc } from './services/ProjectService';

function App() {
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearchInput = useDebounce(searchInput, 500);

  const [searchLocation, setSearchLocation] = useState("");
  const [hint, setHint] = useState("");

  const numberOfProjectsToRender = 3;
  const [projects, setProjects] = useState<ProjectWithDistanceType[]>();

  useEffect(() => {
    if (debouncedSearchInput.trim().length > 1) { // prevent empty space to be Bad Kreuznach or - to be Neu-Ulm
      const tempSearchLocation: LocationType = findLocation(debouncedSearchInput);
      if (!tempSearchLocation) {
        setProjects(undefined);
        setSearchLocation("");
        setHint("Ort nicht gefunden. Benutze bitte einen dieser Orte: " + getAllLocationNames().join(", "));
        return;
      } 

      setSearchLocation(tempSearchLocation.name);
      setHint("");
      
      const projectsSortedByDistance: ProjectWithDistanceType[] = findNumberOfProjectsByDistanceAsc(numberOfProjectsToRender, tempSearchLocation.latitude, tempSearchLocation.longitude);
      setProjects(projectsSortedByDistance);
    }
  }, [ debouncedSearchInput ])

  return (
    <div className="App">
      <header className="App-header">
        Planted Coding Challenge
      </header> 
      
      <SearchField value={searchInput} onChange={setSearchInput} />

      {"" !== hint && <div className="Search-Hint">{hint}</div>}

      {"" !== searchLocation && <div className="Search-Location">{searchLocation}</div>} 
      {undefined !== projects && projects.map((project: ProjectWithDistanceType) => (<Project key={project.id} {...project}/>))}
      
    </div>
  );
}

export default App;
