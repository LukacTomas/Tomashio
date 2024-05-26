export type ConfigItem = {
	type: string,
	key: string,
	label: string,
	items?: ConfigItem[]
	nested?: boolean
	validate?: {
		required?: boolean,
		minLength?: number;
		maxLength?: number;
		min?: number;
		max?: number;
	}
} & Record<string, unknown>
