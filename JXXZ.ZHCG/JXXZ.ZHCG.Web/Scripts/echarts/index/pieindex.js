var op2 = {
    container: '#caseColumnright',
    bgColor: '',
    xValue: {
        textArray: ['一般案件', '违停案件', '重大案件', '简易案件'],
        valueArray: [180, 60, 110, 220],
        step: 10,
        color: [{
            color: '#48DA89'
        }, {
            value: 80,
            color: '#DBD450'
        }, {
            value: 130,
            color: '#E56653'
        }]
    },
    yValue: {
        minValue: 0,
        maxValue: 300,
        count: 5
    }
};
showHeapChat(op2, function () {

});