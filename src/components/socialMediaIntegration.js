export class SocialMediaIntegration {
  constructor() {
    this.apiKey = 'demo_key' // In production, this would be a real Tavily API key
    this.baseUrl = 'https://api.tavily.com/search'
    this.mockData = this.generateMockSocialData()
  }

  async getLocationBasedContent(location) {
    try {
      // In a real implementation, this would make an actual API call to Tavily
      // For demo purposes, we'll simulate the API response
      return await this.simulateTavilyAPI(location)
    } catch (error) {
      console.error('Failed to fetch social media content:', error)
      return this.getFallbackContent(location)
    }
  }

  async simulateTavilyAPI(location) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const healthKeywords = [
      'covid', 'vaccine', 'hospital', 'health', 'symptoms', 'outbreak', 
      'testing', 'quarantine', 'mask', 'social distancing', 'flu', 'illness'
    ]
    
    const platforms = ['twitter', 'facebook', 'instagram', 'reddit']
    const sentiments = [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8]
    
    const mockResults = []
    
    for (let i = 0; i < 15; i++) {
      const platform = platforms[Math.floor(Math.random() * platforms.length)]
      const keyword = healthKeywords[Math.floor(Math.random() * healthKeywords.length)]
      const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)]
      
      mockResults.push({
        id: `social_${Date.now()}_${i}`,
        platform: platform,
        content: this.generateMockContent(keyword, location),
        timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
        location: location ? `${location.city}, ${location.state}` : 'Unknown Location',
        sentiment: sentiment,
        engagement: Math.floor(Math.random() * 500) + 10,
        priority: this.calculatePriority(sentiment, keyword),
        keywords: [keyword],
        author: this.generateMockAuthor(),
        verified: Math.random() > 0.7
      })
    }
    
    return mockResults.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  }

  generateMockContent(keyword, location) {
    const templates = {
      covid: [
        `Just tested positive for COVID. Staying home and following protocols. #COVID19 #StaySafe`,
        `Local COVID numbers seem to be rising again. Everyone please be careful! #PublicHealth`,
        `Got my booster shot today at the community center. Quick and easy process! #Vaccine`,
        `Reminder: masks are still recommended in crowded indoor spaces #COVID19Prevention`
      ],
      vaccine: [
        `Vaccination clinic at the community center was well organized. Great job to the staff!`,
        `Just got my flu shot. Important to stay protected this season! #FluShot #Prevention`,
        `PSA: Free vaccines available at the health department. No appointment needed!`,
        `Grateful for our healthcare workers administering vaccines every day 💉`
      ],
      hospital: [
        `Emergency room wait times are longer than usual today. Plan accordingly if not urgent.`,
        `Shoutout to the amazing nurses at Regional Medical Center! They're doing incredible work.`,
        `Hospital parking is full - they must be really busy today. Hope everyone is okay.`,
        `New wing of the hospital is opening next month. Great news for our community!`
      ],
      health: [
        `Reminder to wash your hands frequently and stay hydrated! Basic health tips that work.`,
        `Mental health is just as important as physical health. Check on your friends and family.`,
        `Local health fair this weekend at the park. Free screenings and health information!`,
        `Don't ignore symptoms - better to get checked out than wait. Your health matters!`
      ],
      symptoms: [
        `Feeling under the weather today. Staying home to rest and recover. #SickDay`,
        `Anyone else experiencing seasonal allergies? The pollen count must be high today.`,
        `Headache and fatigue - probably just need more sleep and water. Taking it easy today.`,
        `If you're feeling sick, please stay home. Let's keep our community healthy!`
      ],
      outbreak: [
        `Heard there might be a stomach bug going around the schools. Parents, be aware!`,
        `Food poisoning outbreak at the downtown restaurant. Health dept is investigating.`,
        `Several people in my office called in sick today. Hope it's not contagious!`,
        `Local health officials are monitoring the situation. Stay informed through official channels.`
      ]
    }
    
    const keywordTemplates = templates[keyword] || templates.health
    const template = keywordTemplates[Math.floor(Math.random() * keywordTemplates.length)]
    
    // Add location context occasionally
    if (location && Math.random() > 0.7) {
      return template + ` #${location.city.replace(/\s+/g, '')}`
    }
    
    return template
  }

  generateMockAuthor() {
    const firstNames = ['Alex', 'Jordan', 'Taylor', 'Casey', 'Morgan', 'Riley', 'Avery', 'Quinn']
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis']
    
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    
    return {
      name: `${firstName} ${lastName}`,
      username: `@${firstName.toLowerCase()}${lastName.toLowerCase()}${Math.floor(Math.random() * 100)}`,
      verified: Math.random() > 0.8
    }
  }

  calculatePriority(sentiment, keyword) {
    const highPriorityKeywords = ['outbreak', 'emergency', 'hospital', 'symptoms']
    const isHighPriorityKeyword = highPriorityKeywords.includes(keyword)
    const isNegativeSentiment = sentiment < 0.4
    
    if (isHighPriorityKeyword && isNegativeSentiment) return 'high'
    if (isHighPriorityKeyword || isNegativeSentiment) return 'medium'
    return 'normal'
  }

  getFallbackContent(location) {
    // Return cached/mock data if API fails
    return this.mockData.map(item => ({
      ...item,
      location: location ? `${location.city}, ${location.state}` : item.location
    }))
  }

  generateMockSocialData() {
    return [
      {
        id: 'mock_1',
        platform: 'twitter',
        content: 'Just got my flu shot at the local clinic. Quick and professional service! #FluShot #PublicHealth',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        location: 'Springfield, IL',
        sentiment: 0.8,
        engagement: 45,
        priority: 'normal',
        keywords: ['vaccine', 'health'],
        author: { name: 'Sarah Johnson', username: '@sarahj_health', verified: false }
      },
      {
        id: 'mock_2',
        platform: 'facebook',
        content: 'PSA: The emergency room at Regional Medical is experiencing longer wait times today. If not urgent, consider urgent care.',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        location: 'Springfield, IL',
        sentiment: 0.3,
        engagement: 127,
        priority: 'medium',
        keywords: ['hospital', 'emergency'],
        author: { name: 'Springfield Community', username: '@springfieldcommunity', verified: true }
      },
      {
        id: 'mock_3',
        platform: 'twitter',
        content: 'Grateful for our healthcare workers who are working tirelessly to keep us safe and healthy. Thank you! 🙏',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        location: 'Springfield, IL',
        sentiment: 0.9,
        engagement: 89,
        priority: 'normal',
        keywords: ['healthcare', 'appreciation'],
        author: { name: 'Mike Rodriguez', username: '@mike_r_local', verified: false }
      }
    ]
  }

  async searchByKeyword(keyword, location, limit = 20) {
    try {
      // Simulate keyword-specific search
      const results = await this.simulateTavilyAPI(location)
      return results
        .filter(item => item.keywords.some(k => k.toLowerCase().includes(keyword.toLowerCase())))
        .slice(0, limit)
    } catch (error) {
      console.error('Keyword search failed:', error)
      return []
    }
  }

  async getTrendingTopics(location) {
    // Simulate trending health topics for the location
    const trends = [
      { keyword: 'flu shot', mentions: 234, sentiment: 0.7, change: '+15%' },
      { keyword: 'covid booster', mentions: 189, sentiment: 0.6, change: '+8%' },
      { keyword: 'hospital capacity', mentions: 156, sentiment: 0.4, change: '+22%' },
      { keyword: 'mental health', mentions: 143, sentiment: 0.5, change: '+5%' },
      { keyword: 'air quality', mentions: 98, sentiment: 0.3, change: '+45%' }
    ]
    
    return trends
  }

  async getSentimentAnalysis(location, timeframe = '24h') {
    // Simulate sentiment analysis for health-related content
    return {
      overall: 0.6,
      positive: 45,
      neutral: 35,
      negative: 20,
      trending: 'stable',
      keyTopics: [
        { topic: 'vaccination', sentiment: 0.8 },
        { topic: 'hospital services', sentiment: 0.5 },
        { topic: 'public health measures', sentiment: 0.4 }
      ]
    }
  }

  formatContentForDisplay(content) {
    // Format social media content for display
    return {
      ...content,
      formattedTime: this.formatTimeAgo(new Date(content.timestamp)),
      sentimentLabel: this.getSentimentLabel(content.sentiment),
      priorityColor: this.getPriorityColor(content.priority)
    }
  }

  formatTimeAgo(date) {
    const now = new Date()
    const diff = now - date
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  getSentimentLabel(sentiment) {
    if (sentiment >= 0.7) return 'Very Positive'
    if (sentiment >= 0.5) return 'Positive'
    if (sentiment >= 0.3) return 'Neutral'
    return 'Negative'
  }

  getPriorityColor(priority) {
    const colors = {
      high: '#ef4444',
      medium: '#f59e0b',
      normal: '#10b981',
      low: '#64748b'
    }
    return colors[priority] || colors.normal
  }
}