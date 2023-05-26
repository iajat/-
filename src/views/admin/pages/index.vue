<template>
	<div>
		<div></div>
		<div style="font-size: 30px;color: white; text-align: center; width: 400px;height: 400px; position: absolute; right: 20px;">
			<div>今日气温</div>
			<div class="temperature" ref="temperature"></div>
		</div>
	
	</div>
</template>

<script>
	import myChart from '@/util/myChart'
	export default {
		data() {
			return {
				option: {
					series: [{
							type: 'gauge',
							center: ['50%', '60%'],
							startAngle: 200,
							endAngle: -20,
							min: -60,
							max: 60,
							splitNumber: 12,
							itemStyle: {
								color: '#FFAB91'
							},
							progress: {
								show: true,
								width: 30
							},
							pointer: {
								show: false
							},
							axisLine: {
								lineStyle: {
									width: 30
								}
							},
							axisTick: {
								distance: -45,
								splitNumber: 5,
								lineStyle: {
									width: 2,
									color: '#999'
								}
							},
							splitLine: {
								distance: -52,
								length: 14,
								lineStyle: {
									width: 3,
									color: '#999'
								}
							},
							axisLabel: {
								distance: -20,
								color: '#999',
								fontSize: 20
							},
							anchor: {
								show: false
							},
							title: {
								show: false
							},
							detail: {
								valueAnimation: true,
								width: '60%',
								lineHeight: 40,
								borderRadius: 8,
								offsetCenter: [0, '-15%'],
								fontSize: 60,
								fontWeight: 'bolder',
								formatter: '{value} °C',
								color: 'inherit'
							},
							data: [{
								value: 35
							}]
						},
						{
							type: 'gauge',
							center: ['50%', '60%'],
							startAngle: 200,
							endAngle: -20,
							min: -60,
							max: 60,
							itemStyle: {
								color: '#FD7347'
							},
							progress: {
								show: true,
								width: 8
							},
							pointer: {
								show: false
							},
							axisLine: {
								show: false
							},
							axisTick: {
								show: false
							},
							splitLine: {
								show: false
							},
							axisLabel: {
								show: false
							},
							detail: {
								show: false
							},
							data: [{
								value: 40
							}]
						}
					]
				}
			}
		},
		mounted() {
			myChart(this.$refs.temperature,this.option)
		},
		methods: {

		}
	}
</script>

<style scoped>
	.temperature {
		width: 400px;
		height: 400px;
	}
</style>