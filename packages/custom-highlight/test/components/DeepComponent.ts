import { defineComponent, h, toRef, withDirectives } from 'vue';
import RotatingGreeting from './GreetingComponent.js';
import { useDirectiveInstances } from '../composables/useDirectiveInstances.js';
import type { InstanceConfig } from '../composables/useDirectiveInstances.js';

export default defineComponent((props: { searches: InstanceConfig[]; subject: string }) => {
	const instances = useDirectiveInstances(toRef(props, 'searches'));

	return () => withDirectives(
		h('p', [
			h(RotatingGreeting, () => props.subject),
		]),
		instances.value,
	);
}, {
	props: ['searches', 'subject'],
});
