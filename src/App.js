/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from 'react';
import Select from 'react-select';

function App() {
  let [odropdownList, setOdropdownList] = useState([]);
  let [makeList, setMakeList] = useState([]);

  const fetchDropdown = useCallback(() => {
    fetch(
      'https://vpic.nhtsa.dot.gov/api/vehicles/getvehiclevariablevalueslist/vehicle%20type?format=json'
    )
      .then((response) => response.json())
      .then((data) => {
        let res = data.Results.map((x) => ({ value: x.Name, label: x.Name, ...x }));
        setOdropdownList(res);
      });
  }, []);

  useEffect(() => {
    fetchDropdown();
  }, [fetchDropdown]);

  const [selectedOption, setSelectedOption] = useState(null);
  const [name, setName] = useState('');
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    function fetchMakes() {
      if (selectedOption && selectedOption.value && typeof selectedOption.value === 'string') {
        let url =
          'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/' +
          selectedOption.value.trim().replace(' ', '%20') +
          '?format=json';

        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            let res = data.Results.map((x) => ({ value: x.MakeName, label: x.MakeName, ...x }));
            setMakeList(res);
          });
      }
    }

    fetchMakes();
  }, [selectedOption]);

  const handleChangeCheck = () => {
    setChecked(!checked);
  };

  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
  };

  return (
    <div>
      Vehicle Type
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <Select
          closeMenuOnSelect={true}
          options={odropdownList}
          defaultValue={selectedOption}
          onChange={setSelectedOption}
        />
        Make
        <Select closeMenuOnSelect={true} isMulti options={makeList} />
        <label>
          <input type="checkbox" checked={checked} onChange={handleChangeCheck} />
          Use Year
        </label>
        <br />
        {checked && (
          <label>
            Year:
            <input
              type="number"
              maxLength="4"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        )}
      </form>
      {/* <div>{body && <Table heading={heading} body={body} />}</div> */}
    </div>
  );
}

export default App;
