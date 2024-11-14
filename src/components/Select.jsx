import  { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';


const Select = ({ label, value, onChange, options, multiple, ...props }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOptions, setSelectedOptions] = useState(multiple ? value || [] : value || null);
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                !inputRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleToggleDropdown = () => {
        setIsOpen((prevState) => !prevState);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleOptionSelect = (option) => {
        if (multiple) {
            setSelectedOptions((prev) =>
                prev.includes(option)
                    ? prev.filter((item) => item !== option)
                    : [...prev, option]
            );
        } else {
            setSelectedOptions(option);
            onChange(option); // Update selected option immediately
            setIsOpen(false); // Close dropdown after selection
        }
        setSearchTerm(''); // Clear search after selection
    };

    const filteredOptions = options.filter((option) =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        if (multiple) {
            onChange(selectedOptions);
        } else {
            onChange(selectedOptions); 
        }
    }, [selectedOptions, onChange]);

    return (
        <div className="select-container relative" {...props}>
            {label && <label>{label}</label>}
            <div
                className="select-input flex justify-between items-center cursor-pointer border p-2 rounded"
                onClick={handleToggleDropdown}
                ref={inputRef}
            >
                <span>{multiple ? selectedOptions.join(', ') : selectedOptions || 'Select...'}</span>
                <span className="caret">{isOpen ? '▲' : '▼'}</span>
            </div>
            {isOpen && (
                <div
                    ref={dropdownRef}
                    className="select-dropdown absolute top-full left-0 w-full border p-2 mt-1 rounded bg-white shadow-lg z-10"
                >
                    <input
                        type="text"
                        className="w-full p-2 border rounded mb-2"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <ul className="list-none p-0">
                        {filteredOptions.length ? (
                            filteredOptions.map((option, index) => (
                                <li
                                    key={index}
                                    className={`option-item p-2 cursor-pointer ${
                                        selectedOptions === option ? 'bg-blue-500 text-white' : ''
                                    }`}
                                    onClick={() => handleOptionSelect(option)}
                                >
                                    {option}
                                </li>
                            ))
                        ) : (
                            <li className="p-2 text-gray-500">No options available</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

Select.propTypes = {
    label: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    multiple: PropTypes.bool
};

export default Select;
