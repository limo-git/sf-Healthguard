import { Chart } from 'chart.js/auto'

export class ChartManager {
  constructor() {
    this.charts = {}
  }

  initializeCharts(data) {
    this.createEpidemiologicalChart(data.epidemiological)
    this.createClinicalChart(data.clinical)
    this.createMobilityChart(data.mobility)
    this.createEnvironmentalChart(data.environmental)
    this.createDemographicsChart(data.demographics)
    this.createSocialMediaChart(data.socialMedia)
  }

  createEpidemiologicalChart(data) {
    const ctx = document.getElementById('epidemiologicalChart')
    if (!ctx) return

    this.charts.epidemiological = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.newCases.map(item => new Date(item.date).toLocaleDateString()),
        datasets: [
          {
            label: 'New Cases',
            data: data.newCases.map(item => item.value),
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: 'Active Cases',
            data: data.activeCases.map(item => item.value),
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: 'New Cases'
            }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
              display: true,
              text: 'Active Cases'
            },
            grid: {
              drawOnChartArea: false,
            },
          }
        },
        plugins: {
          legend: {
            position: 'top',
          }
        }
      }
    })
  }

  createClinicalChart(data) {
    const ctx = document.getElementById('clinicalChart')
    if (!ctx) return

    this.charts.clinical = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.hospitalizations.map(item => new Date(item.date).toLocaleDateString()),
        datasets: [
          {
            label: 'Hospitalizations',
            data: data.hospitalizations.map(item => item.value),
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
            borderColor: '#3b82f6',
            borderWidth: 1
          },
          {
            label: 'ICU Occupancy',
            data: data.icuOccupancy.map(item => item.value),
            backgroundColor: 'rgba(239, 68, 68, 0.8)',
            borderColor: '#ef4444',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Patients'
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
          }
        }
      }
    })
  }

  createMobilityChart(data) {
    const ctx = document.getElementById('mobilityChart')
    if (!ctx) return

    this.charts.mobility = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.publicTransport.map(item => new Date(item.date).toLocaleDateString()),
        datasets: [
          {
            label: 'Public Transport',
            data: data.publicTransport.map(item => item.value),
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            tension: 0.4
          },
          {
            label: 'Retail & Recreation',
            data: data.retail.map(item => item.value),
            borderColor: '#f59e0b',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            tension: 0.4
          },
          {
            label: 'Workplace',
            data: data.workplace.map(item => item.value),
            borderColor: '#8b5cf6',
            backgroundColor: 'rgba(139, 92, 246, 0.1)',
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            title: {
              display: true,
              text: '% Change from Baseline'
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
          }
        }
      }
    })
  }

  createEnvironmentalChart(data) {
    const ctx = document.getElementById('environmentalChart')
    if (!ctx) return

    this.charts.environmental = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.temperature.map(item => new Date(item.date).toLocaleDateString()),
        datasets: [
          {
            label: 'Temperature (°C)',
            data: data.temperature.map(item => item.value),
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            tension: 0.4,
            yAxisID: 'y'
          },
          {
            label: 'Humidity (%)',
            data: data.humidity.map(item => item.value),
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: 'Temperature (°C)'
            }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
              display: true,
              text: 'Humidity (%)'
            },
            grid: {
              drawOnChartArea: false,
            },
          }
        },
        plugins: {
          legend: {
            position: 'top',
          }
        }
      }
    })
  }

  createDemographicsChart(data) {
    const ctx = document.getElementById('demographicsChart')
    if (!ctx) return

    this.charts.demographics = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: Object.keys(data.ageGroups),
        datasets: [{
          data: Object.values(data.ageGroups),
          backgroundColor: [
            '#ef4444',
            '#f59e0b',
            '#10b981',
            '#3b82f6',
            '#8b5cf6'
          ],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
          }
        }
      }
    })
  }

  createSocialMediaChart(data) {
    const ctx = document.getElementById('socialMediaChart')
    if (!ctx) return

    this.charts.socialMedia = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.mentions.map(item => new Date(item.date).toLocaleDateString()),
        datasets: [
          {
            label: 'Health Mentions',
            data: data.mentions.map(item => item.value),
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
            borderColor: '#3b82f6',
            borderWidth: 1,
            yAxisID: 'y'
          },
          {
            label: 'Sentiment Score',
            data: data.sentiment.map(item => item.value),
            type: 'line',
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            tension: 0.4,
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: 'Mentions Count'
            }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
              display: true,
              text: 'Sentiment (0-1)'
            },
            min: 0,
            max: 1,
            grid: {
              drawOnChartArea: false,
            },
          }
        },
        plugins: {
          legend: {
            position: 'top',
          }
        }
      }
    })
  }

  updateCharts(data) {
    // Update all charts with new data
    Object.keys(this.charts).forEach(chartKey => {
      const chart = this.charts[chartKey]
      if (chart && data[chartKey]) {
        // Update chart data based on type
        this.updateChartData(chart, data[chartKey], chartKey)
      }
    })
  }

  updateChartData(chart, newData, dataType) {
    switch (dataType) {
      case 'epidemiological':
        chart.data.labels = newData.newCases.map(item => new Date(item.date).toLocaleDateString())
        chart.data.datasets[0].data = newData.newCases.map(item => item.value)
        chart.data.datasets[1].data = newData.activeCases.map(item => item.value)
        break
      // Add more cases as needed
    }
    chart.update('none') // Update without animation for real-time feel
  }

  destroyCharts() {
    Object.values(this.charts).forEach(chart => {
      if (chart) {
        chart.destroy()
      }
    })
    this.charts = {}
  }
}