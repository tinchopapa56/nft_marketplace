import React from 'react';

interface InputProps {
    onChange: (e: unknown) => void
    labelText?: string;
    type: string;
    className?: string;
}

const Input: React.FC<InputProps> = ({ onChange, labelText, type, className }) => {
    return (
        <div className={`flex flex-col mt-2 w-full ${className}`}>
            {labelText && (
                <label className="mb-2 text-orange-400">{labelText}</label>
            )}
            <input
                onChange={onChange}
                type={type}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
        </div>
    );
};

export default Input;
