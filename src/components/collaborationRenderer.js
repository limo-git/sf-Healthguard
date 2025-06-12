export class CollaborationRenderer {
  renderPlatform(user, location) {
    return `
      <div class="collaboration-platform">
        ${this.renderHeader(user, location)}
        <div class="collab-main">
          ${this.renderSidebar()}
          ${this.renderContent()}
        </div>
      </div>
    `
  }

  renderHeader(user, location) {
    return `
      <header class="collab-header">
        <div class="collab-header-content">
          <div>
            <h1 class="collab-title">
              <i class="fas fa-users"></i> HealthGuard Collaboration
            </h1>
            <p class="collab-subtitle">Connecting health officials, providers, and communities</p>
          </div>
          <div class="user-info">
            <img src="${user.avatar}" alt="${user.name}" class="user-avatar">
            <div class="user-details">
              <div class="user-name">${user.name}</div>
              <div class="user-type">${user.type.replace('_', ' ')}</div>
              <div class="user-location" id="current-location">
                <i class="fas fa-map-marker-alt"></i> 
                ${location ? `${location.city}, ${location.state}` : 'Location unavailable'}
              </div>
            </div>
            <button id="update-location" class="btn btn-secondary">
              <i class="fas fa-sync-alt"></i>
            </button>
          </div>
        </div>
      </header>
    `
  }

  renderSidebar() {
    return `
      <nav class="collab-sidebar">
        <ul class="nav-menu">
          <li class="nav-item active" data-tab="communication">
            <i class="fas fa-comments"></i>
            <span>Communication</span>
          </li>
          <li class="nav-item" data-tab="social-feed">
            <i class="fas fa-rss"></i>
            <span>Social Feed</span>
          </li>
          <li class="nav-item" data-tab="alerts">
            <i class="fas fa-exclamation-triangle"></i>
            <span>Alerts</span>
          </li>
          <li class="nav-item" data-tab="resources">
            <i class="fas fa-folder-open"></i>
            <span>Resources</span>
          </li>
          <li class="nav-item" data-tab="coordination">
            <i class="fas fa-project-diagram"></i>
            <span>Coordination</span>
          </li>
          <li class="nav-item" data-tab="analytics">
            <i class="fas fa-chart-bar"></i>
            <span>Analytics</span>
          </li>
        </ul>
      </nav>
    `
  }

  renderContent() {
    return `
      <div class="collab-content">
        ${this.renderCommunicationTab()}
        ${this.renderSocialFeedTab()}
        ${this.renderAlertsTab()}
        ${this.renderResourcesTab()}
        ${this.renderCoordinationTab()}
        ${this.renderAnalyticsTab()}
      </div>
    `
  }

  renderCommunicationTab() {
    return `
      <div id="communication-tab" class="tab-content active">
        <div class="content-header">
          <h2 class="content-title">Communication Hub</h2>
          <p class="content-description">Real-time messaging and coordination between health officials and providers</p>
        </div>
        <div class="content-body">
          <div class="communication-layout">
            <div class="messages-section">
              <div id="messages-container" class="messages-container">
                ${this.renderInitialMessages()}
              </div>
              <form id="message-form" class="message-form">
                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label">Channel</label>
                    <select id="channel-select" class="form-select">
                      <option value="general">General</option>
                      <option value="emergency">Emergency</option>
                      <option value="clinical">Clinical Updates</option>
                      <option value="logistics">Logistics</option>
                      <option value="public">Public Information</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Priority</label>
                    <select id="message-priority" class="form-select">
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label">Message</label>
                  <textarea id="message-input" class="form-textarea" placeholder="Type your message here..." required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">
                  <i class="fas fa-paper-plane"></i> Send Message
                </button>
              </form>
            </div>
            <div class="online-users">
              ${this.renderOnlineUsers()}
            </div>
          </div>
        </div>
      </div>
    `
  }

  renderSocialFeedTab() {
    return `
      <div id="social-feed-tab" class="tab-content">
        <div class="content-header">
          <h2 class="content-title">Social Media Intelligence</h2>
          <p class="content-description">Location-based social media monitoring powered by Tavily</p>
        </div>
        <div class="content-body">
          <div id="social-media-feed" class="social-media-feed">
            <div class="loading">
              <div class="spinner"></div>
              <p>Loading social media content...</p>
            </div>
          </div>
        </div>
      </div>
    `
  }

  renderAlertsTab() {
    return `
      <div id="alerts-tab" class="tab-content">
        <div class="content-header">
          <h2 class="content-title">Alert Management</h2>
          <p class="content-description">Create and manage health alerts for your community</p>
        </div>
        <div class="content-body">
          <form id="alert-form" class="message-form">
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Alert Title</label>
                <input type="text" id="alert-title" class="form-input" placeholder="Enter alert title" required>
              </div>
              <div class="form-group">
                <label class="form-label">Alert Level</label>
                <select id="alert-level" class="form-select">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Location (Optional)</label>
              <input type="text" id="alert-location" class="form-input" placeholder="Specific location or leave blank for current location">
            </div>
            <div class="form-group">
              <label class="form-label">Description</label>
              <textarea id="alert-description" class="form-textarea" placeholder="Detailed alert description" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">
              <i class="fas fa-bell"></i> Create Alert
            </button>
          </form>
          <div id="alerts-container" class="alerts-container">
            ${this.renderInitialAlerts()}
          </div>
        </div>
      </div>
    `
  }

  renderResourcesTab() {
    return `
      <div id="resources-tab" class="tab-content">
        <div class="content-header">
          <h2 class="content-title">Resource Sharing</h2>
          <p class="content-description">Share and access important health resources and documents</p>
        </div>
        <div class="content-body">
          <form id="resource-form" class="message-form">
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Resource Title</label>
                <input type="text" id="resource-title" class="form-input" placeholder="Enter resource title" required>
              </div>
              <div class="form-group">
                <label class="form-label">Resource Type</label>
                <select id="resource-type" class="form-select">
                  <option value="guideline">Guideline</option>
                  <option value="protocol">Protocol</option>
                  <option value="form">Form</option>
                  <option value="report">Report</option>
                  <option value="training">Training Material</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Description</label>
              <textarea id="resource-description" class="form-textarea" placeholder="Brief description of the resource"></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">URL (Optional)</label>
              <input type="url" id="resource-url" class="form-input" placeholder="https://example.com/resource">
            </div>
            <button type="submit" class="btn btn-primary">
              <i class="fas fa-share"></i> Share Resource
            </button>
          </form>
          <div id="resources-container" class="resources-container">
            ${this.renderInitialResources()}
          </div>
        </div>
      </div>
    `
  }

  renderCoordinationTab() {
    return `
      <div id="coordination-tab" class="tab-content">
        <div class="content-header">
          <h2 class="content-title">Response Coordination</h2>
          <p class="content-description">Coordinate emergency response efforts and resource allocation</p>
        </div>
        <div class="content-body">
          <div class="coordination-grid">
            <div class="coordination-card">
              <h3><i class="fas fa-ambulance"></i> Emergency Response</h3>
              <div class="response-status">
                <div class="status-item">
                  <span class="status-label">Active Incidents:</span>
                  <span class="status-value">3</span>
                </div>
                <div class="status-item">
                  <span class="status-label">Response Teams:</span>
                  <span class="status-value">12 Available</span>
                </div>
                <div class="status-item">
                  <span class="status-label">Average Response Time:</span>
                  <span class="status-value">8.5 min</span>
                </div>
              </div>
            </div>
            <div class="coordination-card">
              <h3><i class="fas fa-hospital"></i> Hospital Capacity</h3>
              <div class="capacity-grid">
                <div class="capacity-item">
                  <span class="capacity-label">General Beds:</span>
                  <div class="capacity-bar">
                    <div class="capacity-fill" style="width: 68%"></div>
                  </div>
                  <span class="capacity-value">68%</span>
                </div>
                <div class="capacity-item">
                  <span class="capacity-label">ICU Beds:</span>
                  <div class="capacity-bar">
                    <div class="capacity-fill critical" style="width: 85%"></div>
                  </div>
                  <span class="capacity-value">85%</span>
                </div>
                <div class="capacity-item">
                  <span class="capacity-label">Ventilators:</span>
                  <div class="capacity-bar">
                    <div class="capacity-fill" style="width: 42%"></div>
                  </div>
                  <span class="capacity-value">42%</span>
                </div>
              </div>
            </div>
            <div class="coordination-card">
              <h3><i class="fas fa-truck"></i> Supply Chain</h3>
              <div class="supply-list">
                <div class="supply-item">
                  <span class="supply-name">PPE Supplies</span>
                  <span class="supply-status adequate">Adequate</span>
                </div>
                <div class="supply-item">
                  <span class="supply-name">Testing Kits</span>
                  <span class="supply-status low">Low Stock</span>
                </div>
                <div class="supply-item">
                  <span class="supply-name">Medications</span>
                  <span class="supply-status adequate">Adequate</span>
                </div>
                <div class="supply-item">
                  <span class="supply-name">Vaccines</span>
                  <span class="supply-status adequate">Adequate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }

  renderAnalyticsTab() {
    return `
      <div id="analytics-tab" class="tab-content">
        <div class="content-header">
          <h2 class="content-title">Communication Analytics</h2>
          <p class="content-description">Track communication effectiveness and platform usage</p>
        </div>
        <div class="content-body">
          <div class="analytics-grid">
            <div class="analytics-card">
              <h3>Message Volume</h3>
              <div class="metric-value">1,247</div>
              <div class="metric-change positive">+12% from last week</div>
            </div>
            <div class="analytics-card">
              <h3>Active Users</h3>
              <div class="metric-value">89</div>
              <div class="metric-change positive">+5 new users</div>
            </div>
            <div class="analytics-card">
              <h3>Response Time</h3>
              <div class="metric-value">4.2 min</div>
              <div class="metric-change negative">+0.8 min slower</div>
            </div>
            <div class="analytics-card">
              <h3>Alert Effectiveness</h3>
              <div class="metric-value">94%</div>
              <div class="metric-change positive">+2% improvement</div>
            </div>
          </div>
          <div class="usage-chart">
            <h3>Platform Usage Over Time</h3>
            <div class="chart-placeholder">
              <p>Interactive usage charts would be displayed here</p>
            </div>
          </div>
        </div>
      </div>
    `
  }
  renderInitialMessages() {
    return (
      <>
        <div className="message-item priority-high">
          <div className="message-header">
            <div className="message-sender">
              <img
                src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg"
                alt="Dr. Sarah Chen"
                className="sender-avatar"
              />
              <div>
                <div className="sender-name">Dr. Sarah Chen</div>
                <div className="sender-type">Health Official</div>
              </div>
            </div>
            <div className="message-time">2 hours ago</div>
          </div>
          <div className="message-content">
            Updated COVID-19 testing protocols are now available. Please review the new guidelines for contact tracing procedures.
          </div>
          <div className="message-channel">Channel: clinical</div>
        </div>

        <div className="message-item priority-normal">
          <div className="message-header">
            <div className="message-sender">
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                alt="Nurse Michael Rodriguez"
                className="sender-avatar"
              />
              <div>
                <div className="sender-name">Nurse Michael Rodriguez</div>
                <div className="sender-type">Healthcare Provider</div>
              </div>
            </div>
            <div className="message-time">4 hours ago</div>
          </div>
          <div className="message-content">
            Hospital capacity update: We have 15 available beds in the general ward and 3 in ICU.
          </div>
          <div className="message-channel">Channel: logistics</div>
        </div>
      </>
    );
  }


  renderInitialAlerts() {
    return `
      <div class="alert-item alert-medium">
        <div class="alert-header">
          <div class="alert-title">Increased Emergency Room Visits</div>
          <div class="alert-level">MEDIUM</div>
        </div>
        <div class="alert-description">Local hospitals reporting 25% increase in respiratory-related emergency visits over the past 48 hours.</div>
        <div class="alert-meta">
          <span><i class="fas fa-map-marker-alt"></i> Downtown Medical District</span>
          <span><i class="fas fa-user"></i> Dr. Sarah Chen</span>
          <span><i class="fas fa-clock"></i> 3 hours ago</span>
        </div>
      </div>
      <div class="alert-item alert-low">
        <div class="alert-header">
          <div class="alert-title">Supply Delivery Scheduled</div>
          <div class="alert-level">LOW</div>
        </div>
        <div class="alert-description">PPE supply delivery scheduled for tomorrow morning. All departments should prepare receiving areas.</div>
        <div class="alert-meta">
          <span><i class="fas fa-map-marker-alt"></i> Regional Medical Center</span>
          <span><i class="fas fa-user"></i> Supply Coordinator</span>
          <span><i class="fas fa-clock"></i> 6 hours ago</span>
        </div>
      </div>
    `
  }

  renderInitialResources() {
    return `
      <div class="resource-item">
        <div class="resource-header">
          <div class="resource-title">COVID-19 Contact Tracing Guidelines</div>
          <div class="resource-type">GUIDELINE</div>
        </div>
        <div class="resource-description">Updated guidelines for effective contact tracing procedures including digital tools and privacy considerations.</div>
        <div class="resource-meta">
          <span><i class="fas fa-user"></i> CDC Health Department</span>
          <span><i class="fas fa-clock"></i> 1 day ago</span>
          <a href="#" class="resource-link"><i class="fas fa-external-link-alt"></i> View Resource</a>
        </div>
      </div>
      <div class="resource-item">
        <div class="resource-header">
          <div class="resource-title">Emergency Response Protocol</div>
          <div class="resource-type">PROTOCOL</div>
        </div>
        <div class="resource-description">Step-by-step emergency response procedures for health emergencies and outbreak situations.</div>
        <div class="resource-meta">
          <span><i class="fas fa-user"></i> Emergency Management</span>
          <span><i class="fas fa-clock"></i> 2 days ago</span>
          <a href="#" class="resource-link"><i class="fas fa-external-link-alt"></i> View Resource</a>
        </div>
      </div>
    `
  }

  renderOnlineUsers() {
    return `
      <div class="online-users-section">
        <h3>Online Users (12)</h3>
        <div class="users-list">
          <div class="user-item">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=user1" alt="User" class="user-avatar-small">
            <div class="user-info-small">
              <div class="user-name-small">Dr. Emily Johnson</div>
              <div class="user-status online">Online</div>
            </div>
          </div>
          <div class="user-item">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=user2" alt="User" class="user-avatar-small">
            <div class="user-info-small">
              <div class="user-name-small">Nurse Patricia Williams</div>
              <div class="user-status online">Online</div>
            </div>
          </div>
          <div class="user-item">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=user3" alt="User" class="user-avatar-small">
            <div class="user-info-small">
              <div class="user-name-small">Chief Robert Taylor</div>
              <div class="user-status away">Away</div>
            </div>
          </div>
        </div>
      </div>
    `
  }
}