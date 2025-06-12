import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress"; // Assuming a progress component exists or needs to be created

const ResponseCoordination = () => {
  const emergencyResponseData = {
    activeIncidents: 3,
    responseTeams: 12,
    teamsAvailable: 8,
    averageResponseTime: '8.5 min',
  };

  const hospitalCapacityData = [
    { label: 'General Beds', current: 68, max: 100, color: 'bg-green-500' },
    { label: 'ICU Beds', current: 85, max: 100, color: 'bg-red-500' },
    { label: 'Ventilators', current: 42, max: 100, color: 'bg-yellow-500' },
  ];

  const supplyChainData = [
    { item: 'PPE Supplies', status: 'ADEQUATE', color: 'text-green-600' },
    { item: 'Testing Kits', status: 'LOW STOCK', color: 'text-red-600' },
    { item: 'Medications', status: 'ADEQUATE', color: 'text-green-600' },
    { item: 'Vaccines', status: 'ADEQUATE', color: 'text-green-600' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Emergency Response</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-blue-600">
              <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
              <polyline points="13 2 13 9 20 9" />
            </svg>
            <div>
              <p className="text-lg font-semibold">Active Incidents</p>
              <p className="text-2xl font-bold">{emergencyResponseData.activeIncidents}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-blue-600">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <div>
              <p className="text-lg font-semibold">Response Teams</p>
              <p className="text-2xl font-bold">{emergencyResponseData.responseTeams} / {emergencyResponseData.teamsAvailable} Available</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-blue-600">
              <path d="M2 12h20" />
              <path d="M16 4h-4v8H8" />
              <path d="M12 20h4V12H8" />
            </svg>
            <div>
              <p className="text-lg font-semibold">Average Response Time</p>
              <p className="text-2xl font-bold">{emergencyResponseData.averageResponseTime}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Hospital Capacity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {hospitalCapacityData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{item.label}</span>
                  <span className="text-sm text-muted-foreground">{item.current}%</span>
                </div>
                <Progress value={item.current} className={item.color} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Supply Chain</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {supplyChainData.map((item, index) => (
              <div key={index} className="flex justify-between items-center border-b pb-2 last:border-b-0">
                <span className="font-medium">{item.item}</span>
                <span className={`font-bold ${item.color}`}>{item.status}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResponseCoordination; 