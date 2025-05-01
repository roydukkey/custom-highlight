<!-- Sourced from https://github.com/mdn/yari and modified. -->
<!-- https://www.mozilla.org/en-US/MPL/2.0/ -->
<!-- eslint-disable-next-line vue/no-root-v-if -->
<template>
	<details v-if="status" :class="$style.baselineStatus" :data-level-of-support="status.baseline.status">
		<summary>
			<span :class="$style.indicator" role="img" :aria-label="status.baseline.status === 'limited' ? 'Baseline Cross' : 'Baseline Check'"></span>

			<span :class="$style.title">{{ status.name }}</span>

			<span :class="$style.status">
				<span v-if="status.baseline.status === 'limited'">Limited availability</span>
				<template v-else>
					Baseline
					<span>
						{{ status.baseline.status === 'widely' ? 'Widely available' : lowDate?.getFullYear() }}
					</span>
				</template>

			</span>

			<span v-if="status.baseline.status === 'newly'" :class="$style.pill">Newly available</span>

			<span :class="$style.browsers">
				<span v-for="{ name, browsers } in engines" :key="name" :class="$style.engine" :title="engineTitle(browsers)">
					<span
						v-for="browser in browsers"
						:key="browser.ids[0]"
						:class="[$style.browser, browser.ids[0]]"
						role="img"
						:data-supported="supported(browser) ? '' : null"
						:aria-label="`${browser.name} ${supported(browser) ? 'check' : 'cross'}`"
					></span>
				</span>
			</span>

			<span :class="$style.thumb"></span>
		</summary>

		<div :class="$style.extra">
			<p>
				<template v-if="status.baseline.status === 'widely' && lowDate">
					This feature is well established and works across many devices and browser versions. It’s been available across browsers since {{ lowDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) }}.
				</template>

				<template v-else-if="status.baseline.status === 'newly' && lowDate">
					Since {{ lowDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) }}, this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.
				</template>

				<template v-else>
					This feature is not Baseline because it does not work in some of the most widely-used browsers.
				</template>
			</p>
			<ul>
				<li>
					<a :class="$style.learnMore" href="https://developer.mozilla.org/en-US/docs/Glossary/Baseline/Compatibility" target="_blank" rel="noopener noreferrer">Learn more</a>
				</li>
				<li v-if="mdnCompatibilityHref">
					<a :href="mdnCompatibilityHref" target="_blank" rel="noopener noreferrer">See full compatibility</a>
				</li>
				<li>
					<a :href="`https://webstatus.dev/features/${featureId}`" target="_blank" rel="noopener noreferrer">Web Platform Status</a>
				</li>
			</ul>
		</div>
	</details>
</template>

<script lang="ts" setup>

import { computed, toRef } from 'vue';
import { useWebStatus } from '../composables/useWebStatus.js';
import type { features } from 'web-features';

interface Props {
	featureId: string;
	mdnCompatibilityHref?: string;
}

const props = defineProps<Props>();
const status = useWebStatus(toRef(props, 'featureId'));

const lowDate = computed(() => status.value?.baseline.low_date
	? new Date(status.value.baseline.low_date.slice(
		(/^([^0-9])/.exec(status.value.baseline.low_date))?.[0]
			? 1
			: 0,
	))
	: undefined,
);

const supported = (browser: BrowserGroup) => browser.ids
	.map((id) => status.value?.browser_implementations[id]?.version)
	.every(Boolean);

const engineTitle = (browsers: BrowserGroup[]) => browsers.map((browser, index, array) => {
	// Guaranteed, given where this is invoked.
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const previous = index > 0 ? supported(array[index - 1]!) : undefined;
	const current = supported(browser);
	const name = browser.name;

	return typeof previous === 'undefined'
		? current
			? `Supported in ${name}`
			: `Not widely supported in ${name}`
		: current === previous
			? ` and ${name}`
			: current
				? `, and supported in ${name}`
				: `, and not widely supported in ${name}`;
}).join('');

</script>

<style lang="sass" module>

$browsers: 'chrome', 'edge', 'firefox', 'safari'
$gap: 0.75rem
$indicator-width: 2.3125rem
$indicator-height: 2.25rem
$chevron-size: 0.6875rem
$chevron-padding-left: 0.75rem
$chevron-padding-right: 1.25rem

.baselineStatus
	--baseline-bg: var(--baseline-limited-bg)
	--baseline-engine-bg: var(--baseline-limited-engine-bg)
	--baseline-img: var(--baseline-limited-img)
	--baseline-check: var(--baseline-limited-check)
	--baseline-cross: var(--baseline-limited-cross)

	container-name: baseline-status
	container-type: inline-size
	margin: 1.5rem 0 1rem
	border-radius: 0.25rem
	padding-left: $indicator-width + $gap * 1.5 + $gap
	background: var(--baseline-bg)

	&[open] summary .thumb
		transform: rotate(180deg)

	&[data-level-of-support='widely']
		--baseline-bg: var(--baseline-high-bg)
		--baseline-engine-bg: var(--baseline-high-engine-bg)
		--baseline-img: var(--baseline-high-img)
		--baseline-check: var(--baseline-high-check)

	&[data-level-of-support='newly']
		--baseline-bg: var(--baseline-low-bg)
		--baseline-engine-bg: var(--baseline-low-engine-bg)
		--baseline-img: var(--baseline-low-img)
		--baseline-check: var(--baseline-low-check)
		--baseline-pill-bg: var(--baseline-low-pill-bg)
		--baseline-pill-color: var(--baseline-low-pill-color)

	summary
		position: relative
		gap: 0 $gap
		align-items: center
		margin: 0
		padding: $gap $gap * 1.5 $gap 0
		cursor: pointer

		display: grid
		grid-template-columns: auto 1fr auto min-content
		grid-template-areas: 'title title browsers thumb' 'status pill browsers thumb'

		// Remove arrow from older versions of Safari.
		&::-webkit-details-marker
			display: none

.indicator
	display: block
	position: absolute
	top: 1rem
	left: ($indicator-width + $gap) * -1
	width: $indicator-width
	height: $indicator-height
	background-image: var(--baseline-img)
	background-position: center
	background-repeat: no-repeat
	background-size: contain

.title
	grid-area: title
	font-size: 1.15rem
	font-weight: 600

.status
	grid-area: status
	margin: 0
	font-size: 1rem
	font-weight: 600
	letter-spacing: 0
	line-height: 1.5

	span
		font-weight: normal

.pill
	grid-area: pill
	margin-right: auto
	border-radius: 0.125rem
	padding: 0 0.25rem
	color: var(--baseline-pill-color)
	background: var(--baseline-pill-bg)
	font-size: 0.75rem
	font-weight: 800
	text-transform: uppercase

.browsers
	grid-area: browsers
	display: flex
	flex-wrap: wrap
	gap: 0.5rem

.engine
	display: flex
	flex-wrap: wrap
	gap: 0.5rem
	border-radius: 2rem
	padding: 0.5rem 0.625rem
	background: var(--baseline-engine-bg)

.browser
	display: flex

	&::before
		content: ''
		display: block
		width: 1.25rem
		height: 1.25rem
		background-repeat: no-repeat
		background-size: contain

	@each $name in $browsers
		&:global(.#{$name})::before
			background-image: url(../assets/icons/baseline/#{$name}.svg)

	&::after
		content: ''
		display: block
		width: 1rem
		height: 1.25rem
		mask-image: url(../assets/icons/baseline/browser-cross.svg)
		mask-repeat: no-repeat
		mask-size: contain
		background-color: var(--baseline-cross)

	&[data-supported]::after
		background-color: var(--baseline-check)
		mask-image: url(../assets/icons/baseline/browser-check.svg)

.thumb
	grid-area: thumb
	display: inline-block
	width: $chevron-size
	height: $chevron-size
	background-color: var(--baseline-thumb)
	mask-image: url(../assets/icons/chevron-down.svg)
	mask-position: center
	mask-repeat: no-repeat
	flex-shrink: 0
	vertical-align: middle

.extra
	padding-bottom: 1rem
	padding-right: 1rem

	p
		margin-bottom: 1rem
		margin-top: 0
		line-height: 1.5

	ul
		column-gap: 1.5rem
		display: flex
		flex-wrap: wrap
		margin: 0
		padding: 0
		row-gap: 1rem

		li
			font-weight: 500
			list-style: none
			margin: 0

			a:not(.learnMore)
				&, &:active, &:visited
					background: none
					color: var(--vp-c-text-1)

@container baseline-status (width < 550px)
	.baselineStatus summary
		grid-template-columns: auto 1fr min-content
		grid-template-areas: 'title title thumb' 'status pill thumb' 'browsers browsers thumb'

	.browsers
		margin-top: $gap

@container baseline-status (width < 300px)
	.baselineStatus summary
		grid-template-columns: 1fr min-content
		grid-template-areas: 'title thumb' 'status thumb' 'pill thumb' 'browsers thumb'

</style>

<script lang="ts">

type BrowserIdentifier = keyof (typeof features)[keyof typeof features]['status']['support'];

interface BrowserGroup {
	name: string;
	ids: BrowserIdentifier[];
}

const engines: { name: string; browsers: BrowserGroup[] }[] = [
	{
		name: 'Blink',
		browsers: [
			{ name: 'Chrome', ids: ['chrome'] },
			{ name: 'Edge', ids: ['edge'] },
		],
	},
	{
		name: 'Gecko',
		browsers: [
			{ name: 'Firefox', ids: ['firefox'] },
		],
	},
	{
		name: 'WebKit',
		browsers: [
			{ name: 'Safari', ids: ['safari'] },
		],
	},
];

</script>
