<script lang="ts">
	export let text: string;
	export let width: number;
</script>

<div aria-label="Content is loading">
	<svg
		aria-hidden="true"
		focusable="false"
		role="img"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 100 100"
		{width}
	>
		<circle cx="50" cy="50" r="45" />
	</svg>
	<p>Loading {text}</p>
</div>

<style lang="sass">
  @use '../styles/variables/colors' as *

  svg
    max-width: 100px
    animation: 2s linear infinite spin

  circle
    display: block
    fill: transparent
    stroke: $green
    stroke-linecap: round
    stroke-dasharray: 283
    stroke-dashoffset: 280
    stroke-width: 10px
    transform-origin: 50% 50%
    animation: 1.4s ease-in-out infinite both dash

  @keyframes spin
    0%
      transform: rotateZ(0deg)
    100%
      transform: rotateZ(360deg)

  @keyframes dash
    0%,
    25%
      stroke-dashoffset: 280
      transform: rotate(0)
    50%,
    75%
      stroke-dashoffset: 75
      transform: rotate(45deg)
    100%
      stroke-dashoffset: 280
      transform: rotate(360deg)
</style>
