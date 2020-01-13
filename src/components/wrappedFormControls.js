import React from 'react';
import { Form, Message } from 'semantic-ui-react';

export const inputField = ({ input, label, meta: { error, touched } }) => (
	<div>
		<Form.Input
			{...input}
			name={input.name}
			label={label}
		/>
			{touched && error && <Message negative>{error}</Message>}
	</div>
);

export const selectField = ({ input, options, label, placeholder, meta: { error, touched }, handleInternalChange }) => (
	<div>
		<Form.Select
			label={label}
			name={input.name}
			onChange={(e, { value }) => {
				handleInternalChange(value) 
				input.onChange(value)
				}
			}
			options={options}
			placeholder={placeholder}
			value={input.value}
		/>
		{touched && error && <Message negative>{error}</Message>}
	</div>
);