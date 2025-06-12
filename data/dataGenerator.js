export class DataGenerator {
  constructor() {
    this.startDate = new Date()
    this.startDate.setDate(this.startDate.getDate() - 14) // 14 days ago
  }

  generateAllData() {
    const dates = this.generateDateRange()
    
    return {
      epidemiological: this.generateEpidemiologicalData(dates),
      clinical: this.generateClinicalData(dates),
      demographics: this.generateDemographicsData(dates),
      mobility: this.generateMobilityData(dates),
      environmental: this.generateEnvironmentalData(dates),
      socialMedia: this.generateSocialMediaData(dates),
      alerts: this.generateAlerts()
    }
  }

  generateDateRange() {
    const dates = []
    const currentDate = new Date(this.startDate)
    
    for (let i = 0; i < 14; i++) {
      dates.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }
    
    return dates
  }

  generateEpidemiologicalData(dates) {
    const baseInfections = 150
    const data = {
      newCases: [],
      activeCases: [],
      recoveries: [],
      deaths: [],
      reproductionRate: [],
      positivityRate: []
    }

    let cumulativeActive = 800
    
    dates.forEach((date, index) => {
      // Simulate outbreak progression
      const dayProgress = index / 13
      const outbreakFactor = Math.sin(dayProgress * Math.PI) * 0.5 + 0.5
      
      const newCases = Math.floor(baseInfections + (Math.random() - 0.5) * 50 + outbreakFactor * 100)
      const newRecoveries = Math.floor(newCases * 0.85 + (Math.random() - 0.5) * 20)
      const newDeaths = Math.floor(newCases * 0.02 + Math.random() * 3)
      
      cumulativeActive += newCases - newRecoveries - newDeaths
      cumulativeActive = Math.max(0, cumulativeActive)
      
      data.newCases.push({ date: date.toISOString().split('T')[0], value: newCases })
      data.activeCases.push({ date: date.toISOString().split('T')[0], value: cumulativeActive })
      data.recoveries.push({ date: date.toISOString().split('T')[0], value: newRecoveries })
      data.deaths.push({ date: date.toISOString().split('T')[0], value: newDeaths })
      data.reproductionRate.push({ 
        date: date.toISOString().split('T')[0], 
        value: +(1.2 + outbreakFactor * 0.8 + (Math.random() - 0.5) * 0.3).toFixed(2)
      })
      data.positivityRate.push({ 
        date: date.toISOString().split('T')[0], 
        value: +(8 + outbreakFactor * 12 + (Math.random() - 0.5) * 4).toFixed(1)
      })
    })

    return data
  }

  generateClinicalData(dates) {
    const data = {
      hospitalizations: [],
      icuOccupancy: [],
      ventilatorUsage: [],
      symptoms: this.generateSymptomsData(dates)
    }

    dates.forEach((date, index) => {
      const dayProgress = index / 13
      const severity = Math.sin(dayProgress * Math.PI) * 0.5 + 0.5
      
      const hospitalizations = Math.floor(50 + severity * 80 + (Math.random() - 0.5) * 20)
      const icuOccupancy = Math.floor(15 + severity * 25 + (Math.random() - 0.5) * 8)
      const ventilatorUsage = Math.floor(8 + severity * 15 + (Math.random() - 0.5) * 5)
      
      data.hospitalizations.push({ date: date.toISOString().split('T')[0], value: hospitalizations })
      data.icuOccupancy.push({ date: date.toISOString().split('T')[0], value: icuOccupancy })
      data.ventilatorUsage.push({ date: date.toISOString().split('T')[0], value: ventilatorUsage })
    })

    return data
  }

  generateSymptomsData(dates) {
    const symptoms = ['Fever', 'Cough', 'Fatigue', 'Headache', 'Sore Throat', 'Loss of Smell']
    const data = {}
    
    symptoms.forEach(symptom => {
      data[symptom] = dates.map(date => ({
        date: date.toISOString().split('T')[0],
        value: Math.floor(30 + Math.random() * 40)
      }))
    })
    
    return data
  }

  generateDemographicsData(dates) {
    return {
      ageGroups: {
        '0-18': Math.floor(15 + Math.random() * 10),
        '19-35': Math.floor(35 + Math.random() * 15),
        '36-50': Math.floor(25 + Math.random() * 10),
        '51-65': Math.floor(20 + Math.random() * 10),
        '65+': Math.floor(25 + Math.random() * 15)
      },
      genderDistribution: {
        'Male': Math.floor(48 + Math.random() * 4),
        'Female': Math.floor(48 + Math.random() * 4),
        'Other': Math.floor(1 + Math.random() * 2)
      },
      riskFactors: {
        'Diabetes': Math.floor(15 + Math.random() * 10),
        'Hypertension': Math.floor(20 + Math.random() * 10),
        'Respiratory': Math.floor(12 + Math.random() * 8),
        'Immunocompromised': Math.floor(8 + Math.random() * 5)
      }
    }
  }

  generateMobilityData(dates) {
    const data = {
      publicTransport: [],
      retail: [],
      workplace: [],
      residential: [],
      recreation: []
    }

    dates.forEach((date, index) => {
      const weekend = date.getDay() === 0 || date.getDay() === 6
      const baseReduction = weekend ? 0.7 : 0.85
      
      data.publicTransport.push({ 
        date: date.toISOString().split('T')[0], 
        value: Math.floor((baseReduction + (Math.random() - 0.5) * 0.2) * 100)
      })
      data.retail.push({ 
        date: date.toISOString().split('T')[0], 
        value: Math.floor(((weekend ? 1.1 : 0.9) + (Math.random() - 0.5) * 0.3) * 100)
      })
      data.workplace.push({ 
        date: date.toISOString().split('T')[0], 
        value: Math.floor((0.6 + (Math.random() - 0.5) * 0.2) * 100)
      })
      data.residential.push({ 
        date: date.toISOString().split('T')[0], 
        value: Math.floor((1.2 + (Math.random() - 0.5) * 0.1) * 100)
      })
      data.recreation.push({ 
        date: date.toISOString().split('T')[0], 
        value: Math.floor((0.8 + (Math.random() - 0.5) * 0.3) * 100)
      })
    })

    return data
  }

  generateEnvironmentalData(dates) {
    const data = {
      temperature: [],
      humidity: [],
      airQuality: [],
      uvIndex: []
    }

    dates.forEach((date, index) => {
      data.temperature.push({ 
        date: date.toISOString().split('T')[0], 
        value: Math.floor(18 + Math.random() * 15)
      })
      data.humidity.push({ 
        date: date.toISOString().split('T')[0], 
        value: Math.floor(40 + Math.random() * 40)
      })
      data.airQuality.push({ 
        date: date.toISOString().split('T')[0], 
        value: Math.floor(50 + Math.random() * 100)
      })
      data.uvIndex.push({ 
        date: date.toISOString().split('T')[0], 
        value: Math.floor(3 + Math.random() * 8)
      })
    })

    return data
  }

  generateSocialMediaData(dates) {
    const data = {
      sentiment: [],
      mentions: [],
      keywords: {
        'symptoms': [],
        'hospital': [],
        'vaccine': [],
        'lockdown': []
      }
    }

    dates.forEach(date => {
      data.sentiment.push({ 
        date: date.toISOString().split('T')[0], 
        value: +(0.3 + Math.random() * 0.4).toFixed(2)
      })
      data.mentions.push({ 
        date: date.toISOString().split('T')[0], 
        value: Math.floor(500 + Math.random() * 1000)
      })
      
      Object.keys(data.keywords).forEach(keyword => {
        data.keywords[keyword].push({
          date: date.toISOString().split('T')[0],
          value: Math.floor(50 + Math.random() * 200)
        })
      })
    })

    return data
  }

  generateAlerts() {
    return [
      {
        id: 1,
        level: 'high',
        icon: 'fas fa-exclamation-triangle',
        title: 'Rising Infection Rate',
        description: 'New cases increased by 23% in the last 3 days',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 2,
        level: 'medium',
        icon: 'fas fa-hospital',
        title: 'Hospital Capacity Alert',
        description: 'ICU occupancy at 78% - approaching critical threshold',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 3,
        level: 'low',
        icon: 'fas fa-chart-line',
        title: 'Mobility Increase',
        description: 'Public transport usage up 12% from last week',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString()
      }
    ]
  }

  getLatestStats(data) {
    const latest = data.epidemiological.newCases.slice(-1)[0]
    const previous = data.epidemiological.newCases.slice(-2, -1)[0]
    const latestActive = data.epidemiological.activeCases.slice(-1)[0]
    const latestHosp = data.clinical.hospitalizations.slice(-1)[0]
    const latestR = data.epidemiological.reproductionRate.slice(-1)[0]
    const latestPos = data.epidemiological.positivityRate.slice(-1)[0]

    return {
      newCases: {
        value: latest.value.toLocaleString(),
        change: `${previous ? ((latest.value - previous.value) / previous.value * 100).toFixed(1) : '0'}%`,
        trend: latest.value > (previous?.value || 0) ? 'increase' : 'decrease'
      },
      activeCases: {
        value: latestActive.value.toLocaleString(),
        change: 'Active infections',
        trend: 'stable'
      },
      hospitalizations: {
        value: latestHosp.value.toLocaleString(),
        change: 'Current admissions',
        trend: 'stable'
      },
      reproductionRate: {
        value: latestR.value,
        change: latestR.value > 1 ? 'Above threshold' : 'Under control',
        trend: latestR.value > 1 ? 'increase' : 'decrease'
      },
      positivityRate: {
        value: `${latestPos.value}%`,
        change: 'Test positivity',
        trend: latestPos.value > 10 ? 'increase' : 'stable'
      }
    }
  }

  updateData(existingData) {
    // Add new data point for real-time simulation
    const newDate = new Date()
    const dateStr = newDate.toISOString().split('T')[0]
    
    // Update epidemiological data
    const lastCases = existingData.epidemiological.newCases.slice(-1)[0].value
    const newCases = Math.max(0, lastCases + Math.floor((Math.random() - 0.5) * 20))
    
    existingData.epidemiological.newCases.push({
      date: dateStr,
      value: newCases
    })
    
    // Keep only last 14 days
    existingData.epidemiological.newCases = existingData.epidemiological.newCases.slice(-14)
    
    return existingData
  }
}