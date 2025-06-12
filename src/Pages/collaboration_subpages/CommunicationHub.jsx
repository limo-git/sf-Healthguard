import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CommunicationHub = () => {
  const [message, setMessage] = useState('');
  const [channel, setChannel] = useState('General');
  const [priority, setPriority] = useState('Normal');

  const messages = [
    {
      id: 1,
      sender: 'Dr. Sarah Chen',
      role: 'Health Official',
      time: '2 hours ago',
      content: 'Updated COVID-19 testing protocols are now available. Please review the new guidelines for contact tracing procedures.',
      channel: 'clinical',
    },
    {
      id: 2,
      sender: 'Nurse Michael Rodriguez',
      role: 'Healthcare Provider',
      time: '4 hours ago',
      content: 'Hospital capacity update: We have 15 available beds in the general ward and 3 in ICU.',
      channel: 'logistics',
    },
  ];

  const onlineUsers = [
    { id: 1, name: 'Dr. Emily Johnson', status: 'ONLINE' },
    { id: 2, name: 'Nurse Patricia Williams', status: 'ONLINE' },
    { id: 3, name: 'Chief Robert Taylor', status: 'AWAY' },
  ];

  const channels = ['General', 'Clinical', 'Logistics', 'Emergency'];
  const priorities = ['Normal', 'High', 'Urgent'];

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log(`Sending message: "${message}" to channel: ${channel} with priority: ${priority}`);
      setMessage('');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Communication Hub</CardTitle>
            <p className="text-sm text-muted-foreground">Real-time messaging and coordination between health officials and providers</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className="flex space-x-4">
                <div className="flex-shrink-0">
                  <img src="https://via.placeholder.com/40" alt="Avatar" className="rounded-full w-10 h-10" />
                </div>
                <div className="flex-grow border-b pb-4">
                  <div className="flex justify-between items-center">
                    <div className="font-semibold flex items-center space-x-2">
                      <span>{msg.sender}</span>
                      <span className="text-sm text-gray-500">{msg.role}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{msg.time}</span>
                  </div>
                  <p className="mt-1 text-gray-700">{msg.content}</p>
                  <span className="text-xs text-blue-500">Channel: {msg.channel}</span>
                </div>
              </div>
            ))}

            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="channel" className="block text-sm font-medium text-gray-700">Channel</label>
                  <select
                    id="channel"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    value={channel}
                    onChange={(e) => setChannel(e.target.value)}
                  >
                    {channels.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
                  <select
                    id="priority"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    {priorities.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  id="message"
                  rows="3"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
              <button
                onClick={handleSendMessage}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
                Send Message
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Online Users ({onlineUsers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {onlineUsers.map((user) => (
                <li key={user.id} className="flex items-center space-x-3">
                  <img src="https://via.placeholder.com/30" alt="Avatar" className="rounded-full w-8 h-8" />
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <span className={`text-xs ${user.status === 'ONLINE' ? 'text-green-500' : 'text-gray-500'}`}>{user.status}</span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CommunicationHub; 