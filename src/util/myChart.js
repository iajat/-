import * as echarts from 'echarts';

const myChart = (dom,option) => {
    const chart = echarts.init(dom);

    chart.setOption(option)
}



export default myChart