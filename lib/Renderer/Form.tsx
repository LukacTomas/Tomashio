import React, {forwardRef, RefObject, useCallback, useImperativeHandle, useState} from 'react';
import {ConfigItem} from "./types.ts";
import {Components} from "../Components";
import {useComponentsRefs} from "./hooks.ts";

export interface FormRendererProps {
	config: ConfigItem[]
	onSubmit: (values: { [key: string]: unknown }) => void;
}

export interface ComponentRef {
	validate: () => boolean;
}

export type  ComponentProps = ConfigItem & {
	onChange(e: React.ChangeEvent<HTMLInputElement>): void,
	value: unknown
}
const renderComponent = (
	config: ConfigItem,
	values: { [key: string]: unknown },
	handleChange: (key: string, value: unknown) => void,
	refs: React.MutableRefObject<{ [key: string]: RefObject<ComponentRef> }>
) => {
	const { type, key, nested, ...props } = config;

	if (!Components.has(type)) {
		return (
			<div style={{color: 'red'}}>Component {type} has not been registered</div>
		);
	}

	const ref = refs.current[key];

	if (!ref) {
		console.error(`Ref for key ${key} is not initialized.`);
		return 'Ref for key ${key} is not initialized.';
	}

	const MyComponent = Components.get(type)!

	const handleComponentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		handleChange(key, value);
	};

	if (nested) {
		return (
			<MyComponent key={refs.current[key]} ref={refs.current[key]} {...props}>
				{config.items && config.items.map((item) => (
					<React.Fragment key={`${config.key}:${item.key}`}>
						{
							renderComponent(item, values, handleChange, refs)
						}
					</React.Fragment>
				))}
			</MyComponent>
		);
	}

	return (
		<MyComponent
			key={refs.current[key]}
			ref={refs.current[key]}
			value={values[key] || ''}
			onChange={handleComponentChange}
			{...props}
		/>
	);
};
export const Form = forwardRef((props: FormRendererProps, ref) => {
	const { config, onSubmit } = props;
	const [values, setValues] = useState<{ [key: string]: unknown }>({});
	const refs = useComponentsRefs(config);

	const handleChange = (key: string, value: unknown) => {
		setValues((prevValues) => ({
			...prevValues,
			[key]: value,
		}));
	};

	const validate = useCallback(()=> {
		const validation = Object.keys(refs.current).map((key) => {
			const componentRef = refs.current[key].current;
			return componentRef
				? {[key]: componentRef.validate()}
				: {[key]: true, reason: 'NOT_VALIDATED'}
		});

		const isSubmittable = validation.every(e => Object.values(e)[0])

		return {
			validation,
			isSubmittable
		}

	},[refs]);

	useImperativeHandle(ref, () => ({
		submit: () => {
			const {validation, isSubmittable} = validate();
			if (isSubmittable) {
				onSubmit(values);
			} else {
				console.error('Validation errors:', validation);
			}
		},
	}));

	return (
		<form>
			{config.map((item, index) =>
				<React.Fragment key={index}>
					{
						renderComponent(item, values, handleChange, refs)
					}
				</React.Fragment>
			)}
		</form>
	);
});

export default Form;