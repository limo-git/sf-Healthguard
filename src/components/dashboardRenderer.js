export class DashboardRenderer {
  renderDashboard(data) {
    const stats = this.getStatsFromData(data)
    
    return `
      <div class="dashboard">
        ${this.renderHeader()}
        <main class="main-content">
          ${this.renderStatsGrid(stats)}
          ${this.renderChartsGrid()}
          ${this.renderAlertsSection(data.alerts)}
        </main>
      </div>
    `
  }

  renderHeader() {
    return `
      <header class="header">
        <div class="header-content">
          <h1><i class="fas fa-chart-line"></i> Health Analytics Dashboard</h1>
          <div class="last-updated">Last updated: ${new Date().toLocaleTimeString()}</div>
        </div>
      </header>
    `
  }

  getStatsFromData(data) {
    const latest = data.epidemiological.newCases.slice(-1)[0]
    const previous = data.epidemiological.newCases.slice(-2, -1)[0]
    const latestActive = data.epidemiological.activeCases.slice(-1)[0]
    const latestHosp = data.clinical.hospitalizations.slice(-1)[0]
    const latestR = data.epidemiological.reproductionRate.slice(-1)[0]
    const latestPos = data.epidemiological.positivityRate.slice(-1)[0]

    return [
      {
        key: 'newCases',
        title: 'New Cases (24h)',
        value: latest.value.toLocaleString(),
        change: `${previous ? ((latest.value - previous.value) / previous.value * 100).toFixed(1) : '0'}% from yesterday`,
        trend: latest.value > (previous?.value || 0) ? 'increase' : 'decrease',
        icon: 'fas fa-virus',
        iconBg: '#fef2f2',
        iconColor: '#ef4444'
      },
      {
        key: 'activeCases',
        title: 'Active Cases',
        value: latestActive.value.toLocaleString(),
        change: 'Currently infected',
        trend: 'stable',
        icon: 'fas fa-users',
        iconBg: '#eff6ff',
        iconColor: '#3b82f6'
      },
      {
        key: 'hospitalizations',
        title: 'Hospitalizations',
        value: latestHosp.value.toLocaleString(),
        change: 'Current admissions',
        trend: 'stable',
        icon: 'fas fa-hospital',
        iconBg: '#f0f9ff',
        iconColor: '#0ea5e9'
      },
      {
        key: 'reproductionRate',
        title: 'R Number',
        value: latestR.value,
        change: latestR.value > 1 ? 'Above threshold' : 'Under control',
        trend: latestR.value > 1 ? 'increase' : 'decrease',
        icon: 'fas fa-chart-line',
        iconBg: latestR.value > 1 ? '#fef2f2' : '#f0fdf4',
        iconColor: latestR.value > 1 ? '#ef4444' : '#10b981'
      },
      {
        key: 'positivityRate',
        title: 'Positivity Rate',
        value: `${latestPos.value}%`,
        change: 'Test positivity',
        trend: latestPos.value > 10 ? 'increase' : 'stable',
        icon: 'fas fa-vial',
        iconBg: '#fefce8',
        iconColor: '#eab308'
      }
    ]
  }

  renderStatsGrid(stats) {
    return `
      <div class="stats-grid">
        ${stats.map(stat => this.renderStatCard(stat)).join('')}
      </div>
    `
  }

  renderStatCard(stat) {
    return `
      <div class="stat-card" data-stat="${stat.key}">
        <div class="stat-header">
          <span class="stat-title">${stat.title}</span>
          <div class="stat-icon" style="background-color: ${stat.iconBg}; color: ${stat.iconColor}">
            <i class="${stat.icon}"></i>
          </div>
        </div>
        <div class="stat-value">${stat.value}</div>
        <div class="stat-change ${stat.trend}">${stat.change}</div>
      </div>
    `
  }

  renderChartsGrid() {
    return `
      <div class="charts-grid">
        <div class="chart-card">
          <div class="chart-header">
            <div>
              <h3 class="chart-title">Epidemiological Trends</h3>
              <p class="chart-subtitle">Daily new cases and active infections</p>
            </div>
          </div>
          <div class="chart-container">
            <canvas id="epidemiologicalChart"></canvas>
          </div>
        </div>

        <div class="chart-card">
          <div class="chart-header">
            <div>
              <h3 class="chart-title">Clinical Data</h3>
              <p class="chart-subtitle">Hospital admissions and ICU occupancy</p>
            </div>
          </div>
          <div class="chart-container">
            <canvas id="clinicalChart"></canvas>
          </div>
        </div>

        <div class="chart-card">
          <div class="chart-header">
            <div>
              <h3 class="chart-title">Mobility Patterns</h3>
              <p class="chart-subtitle">Changes in movement compared to baseline</p>
            </div>
          </div>
          <div class="chart-container">
            <canvas id="mobilityChart"></canvas>
          </div>
        </div>

        <div class="chart-card">
          <div class="chart-header">
            <div>
              <h3 class="chart-title">Environmental Factors</h3>
              <p class="chart-subtitle">Temperature, humidity, and air quality</p>
            </div>
          </div>
          <div class="chart-container">
            <canvas id="environmentalChart"></canvas>
          </div>
        </div>

        <div class="chart-card">
          <div class="chart-header">
            <div>
              <h3 class="chart-title">Demographics</h3>
              <p class="chart-subtitle">Age distribution of cases</p>
            </div>
          </div>
          <div class="chart-container">
            <canvas id="demographicsChart"></canvas>
          </div>
        </div>

        <div class="chart-card">
          <div class="chart-header">
            <div>
              <h3 class="chart-title">Social Media Sentiment</h3>
              <p class="chart-subtitle">Public sentiment and health mentions</p>
            </div>
          </div>
          <div class="chart-container">
            <canvas id="socialMediaChart"></canvas>
          </div>
        </div>
      </div>
    `
  }

  renderAlertsSection(alerts) {
    return `
      <div class="alerts-section">
        <div class="alerts-header">
          <h3 class="alerts-title">
            <i class="fas fa-bell"></i> Active Alerts
          </h3>
        </div>
        ${alerts.map(alert => this.renderAlert(alert)).join('')}
      </div>
    `
  }

  renderAlert(alert) {
    const timeAgo = this.getTimeAgo(new Date(alert.timestamp))
    
    return `
      <div class="alert-item alert-${alert.level}">
        <i class="alert-icon ${alert.icon}" style="color: ${this.getAlertColor(alert.level)}"></i>
        <div class="alert-content">
          <div class="alert-title">${alert.title}</div>
          <div class="alert-description">${alert.description} • ${timeAgo}</div>
        </div>
      </div>
    `
  }

  getAlertColor(level) {
    const colors = {
      high: '#ef4444',
      medium: '#f59e0b',
      low: '#10b981'
    }
    return colors[level] || '#64748b'
  }

  getTimeAgo(date) {
    const now = new Date()
    const diff = now - date
    const hours = Math.floor(diff / (1000 * 60 * 60))
    
    if (hours < 1) return 'Less than 1 hour ago'
    if (hours === 1) return '1 hour ago'
    return `${hours} hours ago`
  }
}