import React, { TextareaHTMLAttributes } from 'react';

import './styles.css';

// Definir as propriedades que o TextareaProps pode receber
// com extensão para os atributos de textarea do HTML
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: string;
    label: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, name, ...rest}) => {
    return (
        <div className="textarea-block">
            <label htmlFor={name}> {label} </label>
            <textarea id={name} {...rest} />
        </div>
    );
}

export default Textarea;
