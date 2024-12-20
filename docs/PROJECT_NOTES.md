## Fullstack Coding Exercise
### Eric Kerney

#### Project Objectives:
- Inputs: One or more airport identifiers
- Output: webpage/App with 3 display cards:
  - Airport Info
  - Current Weather
  - Forecast Weather 
- Data Sources:
  - FF Weather Conditions API
  - FF Airport API

#### Approach:
Build a simple React App using Vite as the Build Tool.  
Utilize TypeScript to assist with type hint for data structures and improve accuracy.  
Bring in TailwindCSS to expedite styling with utility classes for components.   
Also add DaisyUI, a set of simple TailwindCSS based components that I have experience with.   
Add in the DeckGL mapping library as time permits to add an extra spatial aspect to the App.    

My goal is to keep the architecture as minimal as possible, and only add libraries that are 
essential to the project.  There should not be any need for global state management libraries
such as Redux, and it may be possible to even avoid bringing in built-in React useContext/Reducer.

#### Process:
With such a short time frame for delivery (3 days), I need to be cautious and not get stuck on any
one part of the project for too long.  Even a short blocker can be fatal within this timeframe, and 
I need to plan out each day carefully, so there are not to many tasks near the end.    

Quickly I sketched out a simple plan for what the week would look like, and the progress I was hoping
to complete each day.  Also the libraries I would need to implement and deliver the solution.   

First a quick exploration of the data was needed, and I quickly proved this out using curl in 
the bash terminal.  I was able to make successful requests to both the Airport and Weather APIs, a 
great start!  I also found the airport data contained lat/lon coordinates, which I would need later
for the map.  There was also a need for a data source containingg a complete list of US airports, 
so the user would be able to choose which airport to view information on.  

I discovered a nice github repo that contained all of the [airports with idenifier codes](https://github.com/lxndrblz/Airports/blob/main/airports.csv).  
This would really come in handy for a dropdown select, and also contained the airport coordinates.
Typically I would fire up a Jupyter Notebook in VSCode for data explorationa and cleaning, though I was 
hoping for something even more simple.  I was able to use the bash `awk` command to parse the csv and remove
any airports outside of the US.  This was the command I used to filter the airport.csv:
```bash
awk -F '$10 == "US" {print}' airports.csv > filter.csv
```

#### Project Setup 
```bash
yarn create vite # react/TS

# setup project
yarn
yarn dev
# installs
yarn add react-map-gl maplibre-gl
yarn add -D tailwindcss postcss autoprefixer
# init tailwindcss for project
npx tailwindcss init -p
yarn add -D daisyui@latest
# for API requests
yarn add axios 
# DeckGL was needed for the map data 
yarn add deck.gl
# not pre-installed, made LSP very slow for developing custom hooks 
yarn add eslint-plugin-react-hooks --dev
```

While React can directly import a local JSON file, this does not work with CSV.  I needed to import the 
list of airports in airports.csv.  I was hoping that the command line utility `jq` would work, but it 
doesn't handle csv very well.  I discovered an improved CLI utility called `yq` written in Rust.
It was able to easily parse the csv into a nicely formatted JSON file:
```bash
yq us_airports.csv -p=csv -o=json > us_airports.json

```

I was very pleased to be able to add the DeckGL map component to the project. Since this was not in the
requirements, it was the last section added.  My goal was to add the airports.json as a point layer to 
the map, and a great feature of DeckGL is it's ability to directly work with a JSON data source.
The data does not need be formatted as GeoJSON, but only needs to provide lat/lon coordinates.
It was also not too much trouble to pan the map to the selected airport, providing a UI connection 
between the map and display cards.  

#### Noted Issues/Blockers
Had some challenges with typescript imports and enums, they cannot be combined in a single .d.ts type 
declaration file.  Went with string literal unions in place of enums, which may be a better for other
reasons as well.  My projecy also didn't have eslint-plugin-react-hooks installed, which I later added 
with yarn.  I typically write a little bash script to create and scaffold a template, which helps
to get a fast start on similar map/app POCs.    

While the curl CLI requests to the API worked great, I began getting CORS errors making the rerquests 
from the React app.  This was a little bit of a blocker, but thankfully adding a server proxy for both 
endpoints into my vite.config.ts resolved the issue!   

I did not know the extent of the data coverage for the lists and did quite a bit of manual testing the
airports codes in the dropdown.  Some airports were missing current weather conditions, and other portions
of the current or forecast weather data.  I added some validation by testing using `'key' in data`, so the
app would display 'NO DATA' in place of throwing an uncaight error.  TypeScript truly showed it's value
as the app become more fleshed out, providing type hints for the types/intefaces I had been adding during
development.  Once you are accustomed to using TS, it almost feels like driving blind without any sort of 
type safety or hints provided.  Having type definitions for the API response would have been useful, as 
the weather response contained over 5000 lines, and I was not able to create response types. 


### Summary

- The project took about 3 full days to complete.
- The user experience should be fairly simple, choose an airport from the dropdown, the app first makes 
a call to the Airport API, then the Weather API, populates the display cards, and pans the map to the
airport location.
- Hovering airports on the map will also show some details such as name and ID. 
- There are several parts that could be improved to make this implementation production ready.
  - The app was written very quickly, and could be refactored with less typescript warnings.
  - I was reluctantly unable to write any tests using Vitest.  Some unit tests would be nice, particulary
  to test out how airports with missing data could be handled.  If we were going truly to production then
  some larger integration testing would be in order.
  - Adding github workflows to specify which environment to deploy the app, and run standard build tests.
  - It would be nice to implement some more generic types for custom hooks and API responses. 
  - Other UI improvements include: matching the company branding and color themes, adding some data 
  visualization aspect to the weather data, adding icons to match the weather conditions, add spinners for
  data loading, and slow the map pan to give a smoother experience.  


