import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const SocialMediaIntelligence = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data for development
  const mockPosts = [
    {
      id: 1,
      platform: 'twitter',
      time: '2h ago',
      content: 'Feeling feverish and having a dry cough in Hyderabad. Should I get tested for COVID? #Hyderabad #COVID19',
      location: 'Hyderabad, India',
      sentiment: -0.3,
      interactions: 45,
    },
    {
      id: 2,
      platform: 'facebook',
      time: '3h ago',
      content: 'Local hospital in Hyderabad reporting increased cases of respiratory symptoms. Stay safe everyone!',
      location: 'Hyderabad, India',
      sentiment: -0.2,
      interactions: 128,
    },
    {
      id: 3,
      platform: 'instagram',
      time: '4h ago',
      content: 'Just got my COVID test results - negative! But still feeling under the weather. Taking extra precautions.',
      location: 'Hyderabad, India',
      sentiment: 0.1,
      interactions: 89,
    },
    {
      id: 4,
      platform: 'twitter',
      time: '5h ago',
      content: 'Important: New COVID testing center opened in Secunderabad. Free testing available for symptomatic patients.',
      location: 'Hyderabad, India',
      sentiment: 0.8,
      interactions: 234,
    },
  ];

  useEffect(() => {
    // For development, use mock data
    setPosts(mockPosts);
    setLoading(false);

    // TODO: Uncomment when API is properly configured
    /*
    fetch('/api/social/search', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_TAVILY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: 'COVID symptoms Hyderabad India',
        limit: 10,
      }),
    })
      .then(res => {
        if (!res.ok) throw new Error('API request failed');
        return res.json();
      })
      .then(data => {
        setPosts(data.results);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setError('Failed to load social media data');
        setLoading(false);
      });
    */
  }, []);

  const getSentimentColor = (sentiment) => {
    if (sentiment > 0.5) return 'text-green-500';
    if (sentiment > 0) return 'text-gray-500';
    return 'text-red-500';
  };

  if (loading) return (
    <Card className="w-full">
      <CardContent className="flex items-center justify-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </CardContent>
    </Card>
  );

  if (error) return (
    <Card className="w-full">
      <CardContent className="flex items-center justify-center h-32 text-red-500">
        {error}
      </CardContent>
    </Card>
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Social Media Intelligence</CardTitle>
        <p className="text-sm text-muted-foreground">Location-based social media monitoring for COVID symptoms in Hyderabad</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="border-b pb-4 last:border-b-0">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg capitalize">{post.platform}</span>
                <span className="text-sm text-muted-foreground">{post.time}</span>
              </div>
              {post.location && (
                <span className="text-xs text-muted-foreground flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 mr-1"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>
                  {post.location}
                </span>
              )}
            </div>
            <p className="text-gray-800 mb-2">{post.content}</p>
            <div className="flex items-center space-x-4 text-sm">
              <span className={cn("font-semibold", getSentimentColor(post.sentiment))}>
                Sentiment: {(post.sentiment * 100).toFixed(0)}%
              </span>
              <span className="text-muted-foreground flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-1"><path d="M2 12s3 4 10 4 10-4 10-4-3-4-10-4-10 4-10 4z"/><circle cx="12" cy="12" r="3"/></svg>
                {post.interactions} interactions
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SocialMediaIntelligence; 