import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AlertManagement = () => {
  const [alertTitle, setAlertTitle] = useState('');
  const [alertLevel, setAlertLevel] = useState('low');
  const [alertLocation, setAlertLocation] = useState('');
  const [alertDescription, setAlertDescription] = useState('');

  const alerts = [
    {
      id: 1,
      title: 'Supply Chain Update',
      level: 'LOW',
      message: 'PPE shipment delayed by 24 hours',
      location: 'Austin',
      source: 'System Alert',
      time: 'Just now',
    },
    {
      id: 2,
      title: 'Increased Emergency Room Visits',
      level: 'MEDIUM',
      message: 'Local hospitals reporting 25% increase in respiratory-related emergency visits over the past 48 hours.',
      location: 'Downtown Medical District',
      source: 'Dr. Sarah Chen',
      time: '3 hours ago',
    },
    {
      id: 3,
      title: 'Supply Delivery Scheduled',
      level: 'LOW',
      message: 'PPE supply delivery scheduled for tomorrow morning. All departments should prepare receiving areas.',
      location: 'Regional Medical Center',
      source: 'Supply Coordinator',
      time: '6 hours ago',
    },
  ];

  const alertLevels = ['low', 'medium', 'high', 'critical'];

  const handleCreateAlert = () => {
    // Logic to handle alert creation
    console.log({
      alertTitle,
      alertLevel,
      alertLocation,
      alertDescription,
    });
    // Reset form
    setAlertTitle('');
    setAlertLevel('low');
    setAlertLocation('');
    setAlertDescription('');
  };

  const getLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-orange-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Alert Management</CardTitle>
          <p className="text-sm text-muted-foreground">Create and manage health alerts for your community</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="alert-title" className="block text-sm font-medium text-gray-700">Alert Title</label>
                <input
                  type="text"
                  id="alert-title"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                  placeholder="Enter alert title"
                  value={alertTitle}
                  onChange={(e) => setAlertTitle(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="alert-level" className="block text-sm font-medium text-gray-700">Alert Level</label>
                <select
                  id="alert-level"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={alertLevel}
                  onChange={(e) => setAlertLevel(e.target.value)}
                >
                  {alertLevels.map((level) => (
                    <option key={level} value={level}>{level.charAt(0).toUpperCase() + level.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="alert-location" className="block text-sm font-medium text-gray-700">Location (Optional)</label>
              <input
                type="text"
                id="alert-location"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                placeholder="Specific location or leave blank for current location"
                value={alertLocation}
                onChange={(e) => setAlertLocation(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="alert-description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                id="alert-description"
                rows="3"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                placeholder="Detailed alert description"
                value={alertDescription}
                onChange={(e) => setAlertDescription(e.target.value)}
              ></textarea>
            </div>
            <button
              onClick={handleCreateAlert}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              Create Alert
            </button>
          </div>
          <div className="mt-8 space-y-4">
            {alerts.map((alert) => (
              <Card key={alert.id} className="p-4 flex items-start space-x-4">
                <div className={`flex-shrink-0 w-3 h-3 rounded-full mt-1 ${getLevelColor(alert.level)}`}></div>
                <div className="flex-grow">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg">{alert.title}</h3>
                    <span className="text-xs text-muted-foreground">{alert.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    <span className={`font-bold ${getLevelColor(alert.level).replace('bg', 'text')}`}>{alert.level}</span> {alert.message}
                  </p>
                  <div className="flex items-center text-xs text-gray-500 space-x-2">
                    {alert.location && (
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 mr-1"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>
                        {alert.location}
                      </span>
                    )}
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 mr-1"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      {alert.source}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlertManagement; 