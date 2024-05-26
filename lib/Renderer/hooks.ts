import React, {RefObject, useImperativeHandle, useRef} from "react";
import {ConfigItem} from "./types.ts";
import {ComponentRef} from "./Form.tsx";

export const useComponentsValidation = (ref: React.ForwardedRef<unknown>, validationFcn: () => boolean) => {
	useImperativeHandle(ref, () => ({
		validate: () => {
			return validationFcn()
		}
	}));
}

export const useComponentsRefs = (config: ConfigItem[]) => {
	return  useRef<{ [key: string]: RefObject<ComponentRef> }>(
		config.reduce((acc, item) => {
			acc[item.key] = React.createRef();
			if (item.nested) {
				item.items?.forEach((nestedItem) => {
					acc[nestedItem.key] = React.createRef();
				});
			}
			return acc;
		}, {} as { [key: string]: RefObject<ComponentRef> })
	);
}