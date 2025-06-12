import './style.css'
import { DataGenerator } from './data/dataGenerator.js'
import { DashboardRenderer } from './components/dashboardRenderer.js'
import { ChartManager } from './components/chartManager.js'

class HealthDashboard {
  constructor() {
    this.dataGenerator = new DataGenerator()
    this.dashboardRenderer = new DashboardRenderer()
    this.chartManager = new ChartManager()
    this.data = null
    this.updateInterval = null
  }

  async init() {
    try {
      // Generate initial data
      this.data = this.dataGenerator.generateAllData()
      
      // Render dashboard
      this.render()
      
      // Start real-time updates
      this.startRealTimeUpdates()
      
      console.log('Health Analytics Dashboard initialized successfully')
    } catch (error) {
      console.error('Failed to initialize dashboard:', error)
      this.renderError()
    }
  }

  render() {
    const app = document.querySelector('#app')
    app.innerHTML = this.dashboardRenderer.renderDashboard(this.data)
    
    // Initialize all charts
    this.chartManager.initializeCharts(this.data)
  }

  startRealTimeUpdates() {
    // Update every 30 seconds
    this.updateInterval = setInterval(() => {
      this.updateData()
    }, 30000)
  }

  updateData() {
    // Generate new data point and update existing data
    this.data = this.dataGenerator.updateData(this.data)
    
    // Update stats cards
    this.updateStatsCards()
    
    // Update charts
    this.chartManager.updateCharts(this.data)
    
    // Update last updated time
    this.updateLastUpdatedTime()
  }

  updateStatsCards() {
    const statsData = this.dataGenerator.getLatestStats(this.data)
    
    Object.entries(statsData).forEach(([key, stat]) => {
      const valueElement = document.querySelector(`[data-stat="${key}"] .stat-value`)
      const changeElement = document.querySelector(`[data-stat="${key}"] .stat-change`)
      
      if (valueElement) {
        valueElement.textContent = stat.value
      }
      
      if (changeElement) {
        changeElement.textContent = stat.change
        changeElement.className = `stat-change ${stat.trend}`
      }
    })
  }

  updateLastUpdatedTime() {
    const lastUpdatedElement = document.querySelector('.last-updated')
    if (lastUpdatedElement) {
      lastUpdatedElement.textContent = `Last updated: ${new Date().toLocaleTimeString()}`
    }
  }

  renderError() {
    const app = document.querySelector('#app')
    app.innerHTML = `
      <div class="error-container">
        <h1>Dashboard Error</h1>
        <p>Failed to load the health analytics dashboard. Please refresh the page.</p>
      </div>
    `
  }

  destroy() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval)
    }
    this.chartManager.destroyCharts()
  }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const dashboard = new HealthDashboard()
  dashboard.init()
  
  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    dashboard.destroy()
  })
})