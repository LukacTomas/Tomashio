import {ComponentProps, useComponentsValidation} from "../../lib/Renderer";
import React, {forwardRef, useState} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Box, TextField as MuiTextField} from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const TextField = forwardRef(({label, onChange, value, ...props}: ComponentProps, ref) => {
	const [error, setError] = useState<string | null>(null);
	useComponentsValidation(ref, () => {
		if (props.validate?.required && !value) {
			setError('This field is required');
			return false;
		}

		return true;
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setError(null);
		onChange(e);
	};

	return (
		<Box sx={{m:1}}>
			<MuiTextField type="text" onChange={handleChange} label={label} variant="outlined" error={!!error} required={props.validate?.required ?? false} helperText={error ?? ''} disabled={!!props.disabled ?? false}/>
		</Box>
	);
})

export const NumberField = forwardRef(({label, onChange, value, ...props}: ComponentProps, ref) => {
	const [error, setError] = useState<string | null>(null);
	useComponentsValidation(ref, () => {
		if (props.validate?.required && !value) {
			setError('This field is required');
			return false;
		}

		return true;
	})

	const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		if (isNaN(Number(value))) {
			return;
		}

		onChange(e);
	}

	return (
		<Box sx={{m:1}}>
			<MuiTextField type="number" onChange={onValueChange} label={label} variant="outlined" error={!!error} required={props.validate?.required ?? false} helperText={error ?? ''}/>
		</Box>
	);
})

export const Panel = forwardRef(({label, children}: ComponentProps & { children: React.ReactNode }, _ref) => {
	return (
		<Accordion  sx={{m:2}}>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1-content"
				id="panel1-header"

			>
				{label}
			</AccordionSummary>
			<AccordionDetails>
				{children}
			</AccordionDetails>
		</Accordion>
	)
});
