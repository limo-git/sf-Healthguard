export class CommunicationManager {
  constructor() {
    this.messages = []
    this.alerts = []
    this.resources = []
    this.channels = ['general', 'emergency', 'clinical', 'logistics', 'public']
  }

  sendMessage(message) {
    this.messages.unshift(message)
    
    // Simulate real-time message broadcasting
    this.broadcastMessage(message)
    
    // Store in local storage for persistence
    this.saveToStorage('messages', this.messages.slice(0, 100)) // Keep last 100 messages
    
    return message
  }

  createAlert(alert) {
    this.alerts.unshift(alert)
    
    // Simulate alert broadcasting
    this.broadcastAlert(alert)
    
    // Store in local storage
    this.saveToStorage('alerts', this.alerts.slice(0, 50)) // Keep last 50 alerts
    
    return alert
  }

  shareResource(resource) {
    this.resources.unshift(resource)
    
    // Simulate resource sharing notification
    this.broadcastResource(resource)
    
    // Store in local storage
    this.saveToStorage('resources', this.resources.slice(0, 100)) // Keep last 100 resources
    
    return resource
  }

  broadcastMessage(message) {
    // In a real implementation, this would use WebSockets or Server-Sent Events
    console.log('Broadcasting message:', message)
    
    // Simulate notification for high priority messages
    if (message.priority === 'urgent' || message.priority === 'high') {
      this.showNotification(`New ${message.priority} priority message from ${message.sender.name}`, message.content)
    }
  }

  broadcastAlert(alert) {
    console.log('Broadcasting alert:', alert)
    
    // Show browser notification for alerts
    this.showNotification(`New ${alert.level.toUpperCase()} Alert: ${alert.title}`, alert.description)
  }

  broadcastResource(resource) {
    console.log('Broadcasting resource:', resource)
    
    // Notify about new resource
    this.showNotification(`New Resource Shared: ${resource.title}`, `Shared by ${resource.sharedBy.name}`)
  }

  showNotification(title, body) {
    // Check if browser supports notifications
    if ('Notification' in window) {
      // Request permission if not already granted
      if (Notification.permission === 'granted') {
        new Notification(title, {
          body: body,
          icon: '/vite.svg',
          badge: '/vite.svg'
        })
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification(title, {
              body: body,
              icon: '/vite.svg',
              badge: '/vite.svg'
            })
          }
        })
      }
    }
  }

  getMessages(channel = null, limit = 50) {
    let filteredMessages = this.messages
    
    if (channel) {
      filteredMessages = this.messages.filter(msg => msg.channel === channel)
    }
    
    return filteredMessages.slice(0, limit)
  }

  getAlerts(level = null, limit = 20) {
    let filteredAlerts = this.alerts
    
    if (level) {
      filteredAlerts = this.alerts.filter(alert => alert.level === level)
    }
    
    return filteredAlerts.slice(0, limit)
  }

  getResources(type = null, limit = 30) {
    let filteredResources = this.resources
    
    if (type) {
      filteredResources = this.resources.filter(resource => resource.type === type)
    }
    
    return filteredResources.slice(0, limit)
  }

  saveToStorage(key, data) {
    try {
      localStorage.setItem(`healthguard_${key}`, JSON.stringify(data))
    } catch (error) {
      console.error('Failed to save to localStorage:', error)
    }
  }

  loadFromStorage(key) {
    try {
      const data = localStorage.getItem(`healthguard_${key}`)
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error('Failed to load from localStorage:', error)
      return []
    }
  }

  initializeFromStorage() {
    this.messages = this.loadFromStorage('messages')
    this.alerts = this.loadFromStorage('alerts')
    this.resources = this.loadFromStorage('resources')
  }

  searchMessages(query) {
    return this.messages.filter(message => 
      message.content.toLowerCase().includes(query.toLowerCase()) ||
      message.sender.name.toLowerCase().includes(query.toLowerCase())
    )
  }

  searchAlerts(query) {
    return this.alerts.filter(alert => 
      alert.title.toLowerCase().includes(query.toLowerCase()) ||
      alert.description.toLowerCase().includes(query.toLowerCase())
    )
  }

  searchResources(query) {
    return this.resources.filter(resource => 
      resource.title.toLowerCase().includes(query.toLowerCase()) ||
      resource.description.toLowerCase().includes(query.toLowerCase())
    )
  }

  getChannelStats() {
    const stats = {}
    
    this.channels.forEach(channel => {
      const channelMessages = this.messages.filter(msg => msg.channel === channel)
      stats[channel] = {
        messageCount: channelMessages.length,
        lastActivity: channelMessages.length > 0 ? channelMessages[0].timestamp : null,
        activeUsers: [...new Set(channelMessages.map(msg => msg.sender.id))].length
      }
    })
    
    return stats
  }

  getUserActivity(userId) {
    const userMessages = this.messages.filter(msg => msg.sender.id === userId)
    const userAlerts = this.alerts.filter(alert => alert.creator.id === userId)
    const userResources = this.resources.filter(resource => resource.sharedBy.id === userId)
    
    return {
      messageCount: userMessages.length,
      alertCount: userAlerts.length,
      resourceCount: userResources.length,
      lastActivity: Math.max(
        userMessages.length > 0 ? new Date(userMessages[0].timestamp).getTime() : 0,
        userAlerts.length > 0 ? new Date(userAlerts[0].timestamp).getTime() : 0,
        userResources.length > 0 ? new Date(userResources[0].timestamp).getTime() : 0
      )
    }
  }
}