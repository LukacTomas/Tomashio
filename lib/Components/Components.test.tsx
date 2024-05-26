import React from 'react';
import {Components} from './Components';

import {describe, expect, test} from 'vitest'

describe('Components should be added and retrieved', () => {
	test('should add a component', () => {
		const TestComponent: React.ComponentType = () => (<div>TestComponents</div>);
		Components.add('test', TestComponent);
		expect(Components.has('test')).toBe(true);
	});

	test('should get a component', () => {
		const TestComponent: React.ComponentType = () => (<div>Test</div>);
		Components.add('test', TestComponent);
		const component = Components.get('test');
		expect(component).toBe(TestComponent);
	});

	test('should get a newer component if it is overwritten', () => {
		const TestComponent: React.ComponentType = () => (<div>Test</div>);
		Components.add('test', TestComponent);
		const component = Components.get('test');
		expect(component).toBe(TestComponent);

		const NewComponent: React.ComponentType = () => (<div>New Test</div>);
		Components.add('test', NewComponent);
		const newComponent = Components.get('test');
		expect(newComponent).toBe(NewComponent);
	});

	test('I can add multiple components and retrieve them', () => {
		const TestComponent: React.ComponentType = () => (<div>Test</div>);
		const NewComponent: React.ComponentType = () => (<div>New Test</div>);
		Components.add('TestComponent', TestComponent);
		Components.add('NewComponent', NewComponent);

		expect(Components.has('NewComponent')).toBeTruthy();
		expect(Components.has('TestComponent')).toBeTruthy();

		expect(Components.get('NewComponent')).toBe(NewComponent);
		expect(Components.get('TestComponent')).toBe(TestComponent);
	});

	test('should return false if a component does not exist', () => {
		expect(Components.has('nonexistent')).toBe(false);
	});
})