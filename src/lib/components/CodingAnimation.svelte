<script lang="ts">
	import { onMount } from 'svelte';

	let visible = false;
	
	onMount(() => {
		visible = true;
	});

	const codeLines = [
		'{',
		'  "coding": true,',
		'  "passion": "build cool stuff",',
		'  "status": "in progress...",',
		'  "coffee": ∞',
		'}'
	];

	let currentLine = 0;
	let currentChar = 0;
	let displayText = '';
	let showCursor = true;

	onMount(() => {
		const interval = setInterval(() => {
			if (currentLine < codeLines.length) {
				const line = codeLines[currentLine];
				if (currentChar < line.length) {
					displayText += line[currentChar];
					currentChar++;
				} else {
					displayText += '\n';
					currentLine++;
					currentChar = 0;
				}
			} else {
				clearInterval(interval);
			}
		}, 80);

		const cursorInterval = setInterval(() => {
			showCursor = !showCursor;
		}, 500);

		return () => {
			clearInterval(interval);
			clearInterval(cursorInterval);
		};
	});
</script>

<div class="fixed bottom-8 right-8 z-50 {visible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000">
	<div class="bg-gray-900/95 backdrop-blur-md rounded-xl p-4 font-mono text-sm border border-emerald-500/30 shadow-2xl shadow-emerald-500/10 max-w-xs">
		<!-- Terminal header -->
		<div class="flex items-center gap-2 mb-3 pb-3 border-b border-gray-700">
			<div class="flex gap-1.5">
				<span class="w-3 h-3 rounded-full bg-red-500"></span>
				<span class="w-3 h-3 rounded-full bg-yellow-500"></span>
				<span class="w-3 h-3 rounded-full bg-green-500"></span>
			</div>
			<span class="text-xs text-gray-500 ml-auto">coding.js</span>
		</div>
		
		<!-- Code content -->
		<div class="space-y-1">
			{#each displayText.split('\n') as line, i}
				<div class="flex">
					<span class="text-gray-600 w-6 select-none">{i + 1}</span>
					<span class="text-gray-300">
						{#if line.includes('"coding"')}
							<span class="text-purple-400">"coding"</span>
							<span class="text-gray-400">:</span>
							<span class="text-yellow-400">true</span>
						{:else if line.includes('"passion"')}
							<span class="text-purple-400">"passion"</span>
							<span class="text-gray-400">:</span>
							<span class="text-green-400">"build cool stuff"</span>
						{:else if line.includes('"status"')}
							<span class="text-purple-400">"status"</span>
							<span class="text-gray-400">:</span>
							<span class="text-emerald-400">"in progress..."</span>
							<span class="animate-pulse">▋</span>
						{:else if line.includes('"coffee"')}
							<span class="text-purple-400">"coffee"</span>
							<span class="text-gray-400">:</span>
							<span class="text-amber-400">∞</span>
						{:else if line === '{'}
							<span class="text-gray-400">{line}</span>
						{:else if line === '}'}
							<span class="text-gray-400">{line}</span>
						{:else}
							{line}
						{/if}
					</span>
				</div>
			{/each}
			{#if showCursor}
				<span class="text-emerald-400 animate-pulse">▋</span>
			{/if}
		</div>
		
		<!-- Animated typing indicator -->
		<div class="flex items-center gap-2 mt-4 pt-3 border-t border-gray-700">
			<div class="flex gap-1">
				<span class="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style="animation-delay: 0ms"></span>
				<span class="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style="animation-delay: 150ms"></span>
				<span class="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style="animation-delay: 300ms"></span>
			</div>
			<span class="text-xs text-gray-500">compiling...</span>
		</div>
	</div>
</div>
