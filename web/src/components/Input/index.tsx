import React, { InputHTMLAttributes } from 'react';

import './styles.css';

// Definir as propriedades que o InputProps pode receber
// com extensão para os atributos de input do HTML
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
}

const Input: React.FC<InputProps> = ({ label, name, ...rest}) => {
    return (
        <div className="input-block">
            <label htmlFor={name}> {label} </label>
            <input type="text" id={name} {...rest} />
        </div>
    );
}

export default Input;
