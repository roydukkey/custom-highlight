import { defineComponent, h, toRef, withDirectives } from 'vue';
import { useDirectiveInstances } from '../composables/useDirectiveInstances.js';
import type { InstanceConfig } from '../composables/useDirectiveInstances.js';

export default defineComponent((props: { searches: InstanceConfig[] }) => {
	const instances = useDirectiveInstances(toRef(props, 'searches'));

	return () => withDirectives(
		h('div', [
			h('p', [
				'The ',
				h('strong', ['inflatable flamingo']),
				' patiently awaited its tax audit, perched precariously on a stack of overdue library books. Suddenly, a troupe of squirrels in tiny top hats began tap-dancing on the windowsill, their rhythmic clicks harmonizing with the dripping faucet. It was Tuesday, after all.',
			]),
			h('p', [
				'A single sock knitted from moonlight dreamt of becoming a spicy pickle. Meanwhile, the town\'s oldest clock spontaneously began reciting sea shanties in fluent ',
				h('i', ['Klingon']),
				'. Nobody questioned it; they\'d seen weirder.',
			]),
		]),
		instances.value,
	);
}, {
	props: ['searches'],
});
