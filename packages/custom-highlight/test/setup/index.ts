import { beforeEach } from 'vitest';
import './mocks.js';
import BasicComponent from '../components/BasicComponent.js';
import DeepComponent from '../components/DeepComponent.js';

beforeEach((context) => {
	context.basicComponent = BasicComponent;
	context.deepComponent = DeepComponent;
	context.contents = (range) => range instanceof Range ? range.toString() : null;
});

declare module 'vitest' {
	interface TestContext {
		basicComponent: typeof BasicComponent;
		deepComponent: typeof DeepComponent;
		contents: (range: AbstractRange | undefined) => string | null;
	}
};
