import React from 'react';

const CopyInput = ({ text }) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(text)
            .then(() => alert('Text copied to clipboard!'))
            .catch(() => alert('Failed to copy text.'));
    };

    return (
        <div className="flex items-center space-x-2">
            <input
                type="text"
                value={text ? text : 'Not found'}
                readOnly
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
            {text && <button
                onClick={handleCopy}
                className="p-2 text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                aria-label="Copy to clipboard"
            >
                📋
            </button>}
        </div>
    );
};

export default CopyInput;
