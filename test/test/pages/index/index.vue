<template>
	<view class="content">
		<view class="text-area">
			<img class="welcome-img" src="../../static/index_top_img.png" alt="">
			<text class="title">{{ indexHelloNum }}</text>
		</view>
		<view class="vedio">
<!-- 			<video-player :src="item.src" :poster="item.poster" :controls="true"></video-player>
 -->
			<video-player :controls="true"></video-player>
		 </view>
		<view>
			<!-- <lime-echart></lime-echart> -->
			<!-- <l-echart class="my-chart" ref="chart" id="aaa"></l-echart> -->
			<LEchart class="my-chart" ref="chart" id="aaa"></LEchart>
			</view>
	</view>
</template>

<script setup lang="ts">
// import { defineComponent, ref, onMounted } from 'vue-demi';
// import useECharts  from 'vue-echarts';
// import * as echarts from 'echarts'
import * as echarts from 'echarts/core'
import { LineChart, BarChart, PieChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  ToolboxComponent
} from 'echarts/components'
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'
import { onMounted, reactive, ref } from 'vue'
import LEchart from '@/uni_modules/lime-echart/components/l-echart/l-echart.vue'

echarts.use([
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LineChart,
  BarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  ToolboxComponent,
  PieChart
])

const props = defineProps({
  titleText: {
    type: String
  },
  data: {
    type: Array
  }
})
const chart = ref(null)
const colorList = reactive([
  '#4A79FF',
  '#14D58A',
  '#FFD264',
  '#FF7683',
  '#9F99FF',
  '#56B5FF',
  '#80EF98'
])
const option= ref({
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow' 
        },
        confine: true
    },
    legend: {
        data: ['热度', '正面', '负面']
    },
    grid: {
        left: 20,
        right: 20,
        bottom: 15,
        top: 40,
        containLabel: true
    },
    xAxis: [
        {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: '#999999'
                }
            },
            axisLabel: {
                color: '#666666'
            }
        }
    ],
    yAxis: [
        {
            type: 'category',
            axisTick: { show: false },
            data: ['汽车之家', '今日头条', '百度贴吧', '一点资讯', '微信', '微博', '知乎'],
            axisLine: {
                lineStyle: {
                    color: '#999999'
                }
            },
            axisLabel: {
                color: '#666666'
            }
        }
    ],
    series: [
        {
            name: '热度',
            type: 'bar',
            label: {
                normal: {
                    show: true,
                    position: 'inside'
                }
            },
            data: [300, 270, 340, 344, 300, 320, 310],
        },
        {
            name: '正面',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true
                }
            },
            data: [120, 102, 141, 174, 190, 250, 220]
        },
        {
            name: '负面',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'left'
                }
            },
            data: [-20, -32, -21, -34, -90, -130, -110]
        }
    ]
});
onMounted(() => {
  chart.value.init(echarts, (chart) => {
    chart.setOption(option.value)
  })
})
const indexHelloNum = ref('欢迎使用智能水培农场')


</script>


<style scoped lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.text-area{
			display: flex;
			justify-content: center;
			height: 30vh;
			.welcome-img{
				position: fixed;
				width: 100vw;
				z-index: -1;
			}
			.title {
				font-size: $uni-img-size-mytitle;
				color: $uni-bg-color;
				font-weight: bolder;
				display: flex;
				align-items: center;
			}
		}
		.vedio{
			height: 20vh;
			width: 80vw;
			background-color: black;
		}
		.my-chart {
		  width: 60vw;
		  height: 40vh;
		  background-color: #ffaaff;
		}
	}


	
</style>
