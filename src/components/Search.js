import { useState } from 'react'
import { BiSearch, BiCaretDown } from "react-icons/bi"
import Select from 'react-select'


const DropDown = ({ toggle, vehicleTypeBy, onVehicleTypeByChange, dropdownList, makeList }) => {
  if (!toggle) {
    return null;
  }
  return (
    <>
    <Select options={makeList} />
    <div className="origin-top-right absolute right-0 mt-2 w-56
      rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">

      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
      {dropdownList.map(vt => (
        <div onClick={() => onVehicleTypeByChange(vt.Name)}
          key={vt.Id}
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
          role="menuitem">
          {vt.Name}
        </div>
          ))
      }
      </div>
    </div>
    </>
  )
}

const Search = ({ query, onQueryChange, vehicleTypeBy, onVehicleTypeByChange, dropdownList, makeList }) => {
  let [toggleVehicleType, setToggleVehicleType] = useState(false);
  return (
    <div className="py-5">
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <BiSearch />
          <label htmlFor="query" className="sr-only" />
        </div>
        <input type="text" name="query" id="query" value={query}
          onChange={(event) => { onQueryChange(event.target.value) }}
          className="pl-8 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300" placeholder="Make" />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <div>
            <button type="button" onClick={() => { setToggleVehicleType(!toggleVehicleType) }}
              className="justify-center px-4 py-2 bg-blue-400 border-2 border-blue-400 text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center" id="options-menu" aria-haspopup="true" aria-expanded="true">
              Vehicle Type <BiCaretDown className="ml-2" />
            </button>
            <DropDown toggle={toggleVehicleType}
              dropdownList={dropdownList}
              makeList={makeList}
              vehicleTypeBy={vehicleTypeBy}
              onVehicleTypeByChange={myVehicleType => onVehicleTypeByChange(myVehicleType)}
            />
          </div>
        </div>
    {/* <Select options={makeList} /> */}

      </div>
    </div>
  )
}

export default Search