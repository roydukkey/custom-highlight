import { defineComponent, h, ref } from 'vue';

const greetings = ['Hiya', 'Hi'];

export default defineComponent((_, { slots }) => {
	const greeting = ref<string | undefined>('Hiya');
	let cursor = 0;

	return () => [
		greeting.value,
		slots['default']?.(),
		h('button', {
			onClick() {
				cursor = cursor < greetings.length - 1 ? cursor + 1 : 0;
				greeting.value = greetings[cursor];
			},
		}),
	];
});
