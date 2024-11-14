import { useState } from "react";
import Select from "./components/Select";

const App = () => {
    const [myValue, setMyValue] = useState('');
    const [myMultiValue, setMyMultiValue] = useState([]);

    const myOptions = ['Apple', 'Banana', 'Cherry', 'Date', 'Grape'];

    const handleSingleSelectChange = (value) => {
        setMyValue(value);
    };

    const handleMultiSelectChange = (values) => {
        setMyMultiValue(values);
    };

    return (
        <div className="p-4">
            <h1 className="text-xl mb-4 text-center">Custom Select Component</h1>

            <div className="mb-6">
                <Select
                    label="Select a Fruit"
                    value={myValue}
                    onChange={handleSingleSelectChange}
                    options={myOptions}
                    multiple={false} // Single Select
                />
            </div>

            <div>
                <Select
                    label="Select Fruits"
                    value={myMultiValue}
                    onChange={handleMultiSelectChange}
                    options={myOptions}
                    multiple={true} // Multi Select
                />
            </div>
        </div>
    );
};

export default App;


