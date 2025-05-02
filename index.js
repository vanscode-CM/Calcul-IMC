
document.addEventListener('DOMContentLoaded', function() {
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');
    const calculateBtn = document.getElementById('calculate-btn');
    const imcValue = document.getElementById('imc-value');
    const categoryText = document.getElementById('category-text');
    const resultCircle = document.getElementById('result-circle');
    const categoryIndicator = document.getElementById('category-indicator');
    const infoToggle = document.getElementById('info-toggle');
    const bodyShape = document.getElementById('body-shape');
    const headShape = document.getElementById('head-shape');
    const arms = document.getElementById('arms');
    const legs = document.getElementById('legs');
    const infoPanel = document.getElementById('info-panel');
    const toggleIcon = document.getElementById('toggle-icon');
    // Initialize chart
    const chartDom = document.getElementById('imc-chart');
    const myChart = echarts.init(chartDom);
    const option = {
    animation: false,
    tooltip: {
    trigger: 'axis',
    axisPointer: {
    type: 'shadow'
    },
    backgroundColor: 'rgba(30, 41, 59, 0.9)',
    textStyle: {
    color: '#e2e8f0'
    }
    },
    grid: {
    top: 10,
    right: 0,
    bottom: 30,
    left: 0,
    containLabel: true
    },
    xAxis: {
    type: 'category',
    data: ['Insuffisance', 'Normal', 'Surpoids', 'Obésité'],
    axisLine: {
    lineStyle: {
    color: 'rgba(255, 255, 255, 0.3)'
    }
    },
    axisLabel: {
    color: 'rgba(255, 255, 255, 0.8)'
    }
    },
    yAxis: {
    type: 'value',
    min: 0,
    max: 40,
    interval: 10,
    axisLine: {
    lineStyle: {
    color: 'rgba(255, 255, 255, 0.3)'
    }
    },
    axisLabel: {
    color: 'rgba(255, 255, 255, 0.8)'
    },
    splitLine: {
    lineStyle: {
    color: 'rgba(255, 255, 255, 0.1)'
    }
    }
    },
    series: [
    {
    name: 'Plage IMC',
    type: 'bar',
    data: [
    {
    value: 18.5,
    itemStyle: {
    color: 'rgba(87, 181, 231, 1)',
    borderRadius: [4, 4, 0, 0]
    }
    },
    {
    value: 6.4,
    itemStyle: {
    color: 'rgba(141, 211, 199, 1)',
    borderRadius: [4, 4, 0, 0]
    }
    },
    {
    value: 5,
    itemStyle: {
    color: 'rgba(251, 191, 114, 1)',
    borderRadius: [4, 4, 0, 0]
    }
    },
    {
    value: 10.1,
    itemStyle: {
    color: 'rgba(252, 141, 98, 1)',
    borderRadius: [4, 4, 0, 0]
    }
    }
    ],
    barWidth: '60%'
    },
    {
    name: 'Votre IMC',
    type: 'scatter',
    symbolSize: 15,
    data: [],
    itemStyle: {
    color: '#ffffff',
    borderColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 2
    }
    }
    ]
    };
    myChart.setOption(option);
    // Responsive chart
    window.addEventListener('resize', function() {
    myChart.resize();
    });
    // Calculate IMC
    calculateBtn.addEventListener('click', function() {
    const weight = parseFloat(weightInput.value);
    const height = parseFloat(heightInput.value);
    if (!weight || !height || weight <= 0 || height <= 0) {
    alert('Veuillez entrer des valeurs valides pour le poids et la taille.');
    return;
    }
    // Calculate IMC
    const heightInMeters = height / 100;
    const imc = weight / (heightInMeters * heightInMeters);
    const imcRounded = Math.round(imc * 10) / 10;
    // Update UI
    imcValue.textContent = imcRounded.toFixed(1);
    // Determine category
    let category, color, position;
    if (imc < 18.5) {
    category = 'Insuffisance pondérale';
    color = 'rgba(87, 181, 231, 1)';
    position = 0;
    } else if (imc < 25) {
    category = 'Corpulence normale';
    color = 'rgba(141, 211, 199, 1)';
    position = 1;
    } else if (imc < 30) {
    category = 'Surpoids';
    color = 'rgba(251, 191, 114, 1)';
    position = 2;
    } else {
    category = 'Obésité';
    color = 'rgba(252, 141, 98, 1)';
    position = 3;
    }
    // Update category text
    categoryText.textContent = category;
    // Update result circle color
    resultCircle.style.borderColor = color;
    resultCircle.style.boxShadow = `0 0 20px ${color}`;
    // Update morphology visualization
    const updateMorphology = (imc) => {
    let bodyWidth, bodyOpacity, armsWidth, legsSpread;
    if (imc < 18.5) {
    bodyWidth = '16px';
    bodyOpacity = '0.3';
    armsWidth = '4px';
    legsSpread = '16px';
    } else if (imc < 25) {
    bodyWidth = '20px';
    bodyOpacity = '0.4';
    armsWidth = '6px';
    legsSpread = '20px';
    } else if (imc < 30) {
    bodyWidth = '28px';
    bodyOpacity = '0.5';
    armsWidth = '8px';
    legsSpread = '24px';
    } else {
    bodyWidth = '36px';
    bodyOpacity = '0.6';
    armsWidth = '10px';
    legsSpread = '28px';
    }
    bodyShape.style.width = bodyWidth;
    bodyShape.style.backgroundColor = `rgba(255, 255, 255, ${bodyOpacity})`;
    headShape.style.backgroundColor = `rgba(255, 255, 255, ${bodyOpacity})`;
    const armElements = arms.querySelectorAll('div');
    armElements.forEach(arm => {
    arm.style.width = armsWidth;
    arm.style.backgroundColor = `rgba(255, 255, 255, ${bodyOpacity})`;
    });
    const legElements = legs.querySelectorAll('div');
    legElements.forEach(leg => {
    leg.style.width = armsWidth;
    leg.style.backgroundColor = `rgba(255, 255, 255, ${bodyOpacity})`;
    });
    legs.style.width = legsSpread;
    };
    updateMorphology(imc);
    // Show category indicator with animation
    categoryIndicator.classList.add('show');
    // Update chart
    const scatterData = [];
    scatterData[position] = imcRounded;
    myChart.setOption({
    series: [
    {},
    {
    data: scatterData
    }
    ]
    });
    // Add pulse animation to result
    resultCircle.classList.add('pulse');
    setTimeout(() => {
    resultCircle.classList.remove('pulse');
    }, 2000);
    });
    // Toggle info panel
    infoToggle.addEventListener('click', function() {
    infoPanel.classList.toggle('open');
    toggleIcon.classList.toggle('ri-arrow-down-s-line');
    toggleIcon.classList.toggle('ri-arrow-up-s-line');
    });
    // Input validation
    weightInput.addEventListener('input', function() {
    if (this.value && (parseFloat(this.value) < 20 || parseFloat(this.value) > 300)) {
    this.classList.add('border-red-500');
    } else {
    this.classList.remove('border-red-500');
    }
    });
    heightInput.addEventListener('input', function() {
    if (this.value && (parseFloat(this.value) < 50 || parseFloat(this.value) > 250)) {
    this.classList.add('border-red-500');
    } else {
    this.classList.remove('border-red-500');
    }
    });
    });