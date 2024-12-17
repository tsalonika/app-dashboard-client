import React, { useState, useRef, useEffect } from 'react';

const Dropdown = ({ options, onSelect, isDisabled = false, errorCheck = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        if (!isDisabled) {
            setIsOpen(!isOpen);
        }
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option.label);
        setIsOpen(false);
        if (onSelect) {
            onSelect(option.value);
        }
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={`relative w-full ${isDisabled ? 'opacity-50' : ''}`} ref={dropdownRef}>
            <div
                className={`flex items-center justify-between border border-black ${errorCheck ? 'border-red-500' : ''} p-2 rounded-md w-full cursor-pointer`}
                onClick={toggleDropdown}
            >
                <span>{selectedOption || 'Pilih...'}</span>
                <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </span>
            </div>
            {isOpen && !isDisabled && (
                <div className="absolute mt-1 w-full border border-black bg-white z-10">
                    {options.map(option => (
                        <div
                            key={option.value}
                            className="p-2 hover:bg-[#237D31] hover:text-white cursor-pointer"
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
