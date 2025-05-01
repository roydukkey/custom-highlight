<template>
	<div :class="$style.preview">
		<slot></slot>
	</div>
</template>

<style lang="sass" module>

.preview
	border: 1px solid var(--vp-c-border)
	border-radius: 8px
	padding: 0 24px
	font-size: 14px
	line-height: 1.5

</style>
