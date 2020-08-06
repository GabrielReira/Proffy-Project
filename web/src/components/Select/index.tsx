import React, { SelectHTMLAttributes } from 'react';

import './styles.css';

// Definir as propriedades que o SelectProps pode receber
// com extensão para os atributos de select do HTML
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    name: string;
    label: string;
    options: Array<{
        value: string;
        label: string;
    }>;
}

const Select: React.FC<SelectProps> = ({ label, name, options,...rest}) => {
    return (
        <div className="select-block">
            <label htmlFor={name}> {label} </label>
            <select id={name} {...rest}>
                <option value="" disabled selected hidden>Selecione uma opção</option>

                {options.map(option => {
                    return <option key={option.value} value={option.value}>{option.label}</option>
                })}
            </select>
        </div>
    );
}

export default Select;
