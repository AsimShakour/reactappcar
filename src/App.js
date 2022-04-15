import { useState, useEffect, useCallback } from 'react'
import { BiListMinus } from "react-icons/bi"
import Search from "./components/Search"
import CarInfo from "./components/CarInfo"
// import Select from "./components/Select"
import Select, { StylesConfig } from 'react-select'


function App() {

  // let [carList, setCarList] = useState([]);
  // let [query, setQuery] = useState("");
  let [vehicleTypeBy, setVehicleTypeBy] = useState("");
  // let [orderBy, setOrderBy] = useState("asc");
  let [dropdownList, setDropdownList] = useState([]);
  let [odropdownList, setOdropdownList] = useState([]);
  let [makeList, setMakeList] = useState([]);



  // const fetchData = useCallback(() => {
  //   fetch('./data.json')
  //     .then(response => response.json())
  //     .then(data => {
  //       setCarList(data)
  //     });
  // }, [])

  // useEffect(() => {
  //   fetchData()
  // }, [fetchData]);

  const fetchDropdown = useCallback(() => {
    fetch(
      "https://vpic.nhtsa.dot.gov/api/vehicles/getvehiclevariablevalueslist/vehicle%20type?format=json"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.Results);
        setDropdownList(data.Results);
        let res = data.Results.map(x=>({value: x.Name, label: x.Name, ...x}));
        setOdropdownList(res);
      });
  }, []);
  


  useEffect(() => {
    fetchDropdown()
  }, [fetchDropdown]);

  // const getMakesList = (myVehicleType) => {
  //   console.log(myVehicleType);
  //   setVehicleTypeBy(myVehicleType);
  //   fetchMakes(myVehicleType);
  // }

  // useEffect(() => {
  //   fetchMakes()
  // }, [fetchMakes]);

  
  const [selectedOption, setSelectedOption] = useState(null);
  const [name, setName] = useState("");
  const [checked, setChecked] = useState(false);


  

  useEffect(() => {
    console.log('Do something after counter has changed', selectedOption);

    function fetchMakes() {
      console.log("fetchMakes");
  
      if (selectedOption &&  selectedOption.value && typeof selectedOption.value === 'string') console.error(selectedOption.value.trim().replace(" ",'%20'));
      if (selectedOption &&  selectedOption.value && typeof selectedOption.value === 'string') {
        console.error(selectedOption.value.trim().replace(" ",'%20'));
        let url = "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/"+selectedOption.value.trim().replace(" ",'%20')+"?format=json";
        console.log(url)
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            let res = data.Results.map(x=>({value: x.MakeName, label: x.MakeName, ...x}));
            console.error(res);
            setMakeList(res);
          });
      }
    }

    fetchMakes()

 }, [selectedOption]);

 const handleChangecheck = () => {
  setChecked(!checked);
};


const [inputs, setInputs] = useState({});

const handleChange = (event) => {
  const name = event.target.name;
  const value = event.target.value;
  setInputs(values => ({...values, [name]: value}))
}

const handleSubmit = (event) => {
  event.preventDefault();
  console.log(inputs);
}

  return (
    <div>Vehicle Type
    <form onSubmit={handleSubmit}>
      <Select
      
        closeMenuOnSelect={true}
        options={odropdownList}
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        />
        Make
      <Select
        closeMenuOnSelect={true}
        isMulti
        options={makeList}
      />

      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChangecheck}
        />
        Use Year
      </label>
<br></br>
      {checked && <label>Year:
        <input
          type="number" 
          maxLength="4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>}
      </form>

      <div >
                {body && <Table heading={heading} body={body} />}
            </div>

    </div>
  );
}

let body = null;

let heading = ['Make Id', 'Make Name', 'Model Id', 'Model Name'];

const Table  = ({ heading, body  }) => {

      return (
          <table style={{ width: 500 }}>
              <thead>
                  <tr>
                      {heading.map(head => <th>{head}</th>)}
                  </tr>
              </thead>
              <tbody>
                  {body.map(row => <TableRow row={row} />)}
              </tbody>
          </table>
      );
  }

const TableRow  = ({ row }) => {

      return (
          <tr>
              {row.map(val => <td>{val}</td>)}
          </tr>
      )
  }

export default App;
