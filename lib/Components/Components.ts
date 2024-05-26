import React from "react";

interface AddComponentsProps  {
	key: string;
	component: React.ComponentType<unknown>
}

interface ComponentsInstance {
	add: (key: AddComponentsProps["key"], component: AddComponentsProps["component"]) => void;
	get: (key: AddComponentsProps["key"]) => AddComponentsProps["component"] | undefined;
	has: (key: AddComponentsProps["key"]) => boolean;
}
const Components: ComponentsInstance = (() => {

	const components = new Map<AddComponentsProps["key"], AddComponentsProps["component"]>();

	function add(key: AddComponentsProps["key"], component: AddComponentsProps["component"]) {
		components.set(key, component);
	}

	function get(key: AddComponentsProps["key"]) {
		return components.get(key);
	}

	function has(key: AddComponentsProps["key"]){
		return components.has(key)
	}

	return  {
		add,
		get,
		has
	}
})() as ComponentsInstance;

export {Components}