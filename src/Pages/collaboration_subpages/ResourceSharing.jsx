import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ResourceSharing = () => {
  const [resourceTitle, setResourceTitle] = useState('');
  const [resourceType, setResourceType] = useState('guideline');
  const [resourceDescription, setResourceDescription] = useState('');
  const [resourceUrl, setResourceUrl] = useState('');

  const resources = [
    {
      id: 1,
      title: 'COVID-19 Contact Tracing Guidelines',
      type: 'GUIDELINE',
      description: 'Updated guidelines for effective contact tracing procedures including digital tools and privacy considerations.',
      source: 'CDC Health Department',
      time: '1 day ago',
      url: 'https://example.com/contact-tracing-guidelines',
    },
    {
      id: 2,
      title: 'Emergency Response Protocol',
      type: 'PROTOCOL',
      description: 'Step-by-step emergency response procedures for health emergencies and outbreak situations.',
      source: 'Emergency Management',
      time: '2 days ago',
      url: 'https://example.com/emergency-protocol',
    },
  ];

  const resourceTypes = ['guideline', 'protocol', 'form', 'report', 'training', 'other'];

  const handleShareResource = () => {
    // Logic to handle resource sharing
    console.log({
      resourceTitle,
      resourceType,
      resourceDescription,
      resourceUrl,
    });
    // Reset form
    setResourceTitle('');
    setResourceType('guideline');
    setResourceDescription('');
    setResourceUrl('');
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Resource Sharing</CardTitle>
          <p className="text-sm text-muted-foreground">Share and access important health resources and documents</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="resource-title" className="block text-sm font-medium text-gray-700">Resource Title</label>
                <input
                  type="text"
                  id="resource-title"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                  placeholder="Enter resource title"
                  value={resourceTitle}
                  onChange={(e) => setResourceTitle(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="resource-type" className="block text-sm font-medium text-gray-700">Resource Type</label>
                <select
                  id="resource-type"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={resourceType}
                  onChange={(e) => setResourceType(e.target.value)}
                >
                  {resourceTypes.map((type) => (
                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="resource-description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                id="resource-description"
                rows="3"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                placeholder="Brief description of the resource"
                value={resourceDescription}
                onChange={(e) => setResourceDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label htmlFor="resource-url" className="block text-sm font-medium text-gray-700">URL (Optional)</label>
              <input
                type="url"
                id="resource-url"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                placeholder="https://example.com/resource"
                value={resourceUrl}
                onChange={(e) => setResourceUrl(e.target.value)}
              />
            </div>
            <button
              onClick={handleShareResource}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.38L3.25 14.542C2.79 15.006 2.5 15.63 2.5 16.273a2.76 2.76 0 00.81 1.954 2.76 2.76 0 001.954.81c.643 0 1.267-.29 1.731-.754l3.967-4.162M16.783 13.62l3.967-4.162c.464-.464.754-1.088.754-1.731a2.76 2.76 0 00-.81-1.954 2.76 2.76 0 00-1.954-.81c-.643 0-1.267.29-1.731.754L16.783 13.62zM7.5 7.5L16.5 16.5" />
              </svg>
              Share Resource
            </button>
          </div>
          <div className="mt-8 space-y-4">
            {resources.map((resource) => (
              <Card key={resource.id} className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg">{resource.title}</h3>
                  <span className="text-xs font-bold text-blue-600 uppercase">{resource.type}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                <div className="flex items-center text-xs text-gray-500 space-x-4">
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 mr-1"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    {resource.source}
                  </span>
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 mr-1"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    {resource.time}
                  </span>
                  {resource.url && (
                    <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 mr-1"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                      View Resource
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourceSharing; 