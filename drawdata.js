function createChartJson(csvUrl, titleText, subtitleText, yAxisText, tooltipText, dataSeries) {
     
        return {
                chart: {
                    type: 'line',
                    scrollablePlotArea: {
                        minWidth: 700
                    }
                },
                data: {
                    csvURL: csvUrl,
                    beforeParse: function (csv) {
                        return csv.replace(/\n\n/g, '\n');
                    }
                },
                title: {
                    text: titleText
                },
                subtitle: {
                    text: subtitleText
                },
                xAxis: {
                    type: 'datetime',
                    tickInterval: 7 * 24 * 3600 * 1000, // one week
                    //tickWidth: 0,
                    gridLineWidth: 1,
                    labels: {
                        align: 'left',
                        x: 3,
                        y: -3
                    }
                },
                yAxis: [{ // left y axis
                    title: {
                        text: yAxisText
                    },
                    labels: {
                        align: 'left',
                        x: 3,
                        y: 16,
                        format: '{value:.,0f}'
                    },
                    showFirstLabel: false
                }, { // right y axis
                    linkedTo: 0,
                    gridLineWidth: 0,
                    opposite: true,
                    title: {
                        text: null
                    },
                    labels: {
                        align: 'right',
                        x: -3,
                        y: 16,
                        format: '{value:.,0f}'
                    },
                    showFirstLabel: false
                }],

                legend: {
                    align: 'left',
                    verticalAlign: 'top',
                    borderWidth: 0
                },

                tooltip: {
                    shared: true,
                    crosshairs: true
                },

                plotOptions: {
                    series: {
                        selected: false,
                        showCheckbox: false,
                        cursor: 'none',
                        point: {
                            events: {
                                click: function (e) {
                                    hs.htmlExpand(null, {
                                        pageOrigin: {
                                            x: e.pageX || e.clientX,
                                            y: e.pageY || e.clientY
                                        },
                                        headingText: this.series.name,
                                        maincontentText: Highcharts.dateFormat('%A, %b %e, %Y', this.x) + ':<br/> ' +
                                        this.y + tooltipText,
                                        width: 200
                                    });
                                }
                            }
                        },
                        lineWidth: 3,
                        marker: {
                            lineWidth: 5,
                            enabled: false
                            
                        },    
                    }
                },
                series: dataSeries

                
            };
}
function worldData() {
    Highcharts.chart('container', createChartJson('https://vishnuvp.in/covid19/covid19-data.csv',
        'CoVid19 India Focus',
        'Data sources: github.com/CSSEGISandData/COVID-19, mohfw.gov.in',
        'Confirmed Cases',
        ' confirmed cases',
        [{visible: true, zIndex:999},
                {visible: false},{visible: false},{visible: false},{visible: false},
                {visible: false},{visible: false},{visible: false},{visible: false},{visible: false},
                {visible: false},{visible: false},{visible: false},{visible: false},{visible: false},
                {visible: false},{visible: false},{visible: false},{visible: false},{visible: false}
        ])
    );

}

function indiaData() {
    var seriesJson = []
    $.ajax({
    type:"GET", 
    url: "https://vishnuvp.in/covid19/covid19-india.json", 
    success: function(data) {
            console.log(data)
            seriesJson = data
            Highcharts.chart('container', {
                title: {
                    text: 'CoVid-19 India - State Focus'
                },
                xAxis: {
                    categories: seriesJson['categories']
                },
                yAxis: [{
                        title: {
                            text: "Number of Cases"
                        },
                        allowDecimals: false
                    }],
                labels: {
                    items: [{
                        html: 'COVID-19 India - Statewise Focus',
                        style: {
                            left: '50px',
                            top: '18px',
                            color: ( // theme
                                Highcharts.defaultOptions.title.style &&
                                Highcharts.defaultOptions.title.style.color
                            ) || 'black'
                        }
                    }]
                },
                series: seriesJson['series']
            });
        }, 
    error: function(jqXHR, textStatus, errorThrown) {
            seriesJson = []
        },
    dataType: "json"
    });

}

$(document).ready(function(){
    $(".display-chart").hide()
    $("#gcontainer3").fadeIn()
    $(".category-item").click(function(){
        if ($(this).attr('id') == 'category-item-all-countries') {
            $(".display-chart").fadeOut(function(){
                $('#container').show()
            })
            
            worldData()
        }

        if ($(this).attr('id') == 'category-item-states') {
            $(".display-chart").fadeOut(function(){
                $('#container').show()
            indiaData()
            })
            
        }
        if ($(this).attr('id') == 'category-item-india') {
            //$('#container').slideUp()
            $(".display-chart").fadeOut(function(){
                $("#gcontainer").fadeIn()
            })
            

        }
        if ($(this).attr('id') == 'category-item-delta') {
            //$('#container').slideUp()
            $(".display-chart").fadeOut(function(){
                $("#gcontainer2").fadeIn()
            })
            

        }
        if ($(this).attr('id') == 'category-item-flat') {
            //$('#container').slideUp()
            $(".display-chart").fadeOut(function(){
                $("#gcontainer3").fadeIn()
            })
            

        }

    });
});
