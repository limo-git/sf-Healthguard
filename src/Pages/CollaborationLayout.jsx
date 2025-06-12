import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { cn } from '@/lib/utils';

const CollaborationLayout = () => {
  const [activeTab, setActiveTab] = useState('communication');

  const navItems = [
    { name: 'Communication', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V3a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ), path: 'communication' },
    { name: 'Social Feed', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <path d="M2 17v3h-1v-3a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v3h-1v-3a2 2 0 0 1-2-2z" />
        <circle cx="4" cy="9" r="2" />
        <circle cx="18" cy="6" r="2" />
      </svg>
    ), path: 'social-feed' },
    { name: 'Alerts', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ), path: 'alerts' },
    { name: 'Resources', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ), path: 'resources' },
    { name: 'Coordination', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 6.2 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0-.33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 6.2a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a2 2 0 0 1 2-2v-.09A1.65 1.65 0 0 0 12.8 2.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0 .33 1.82V9a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ), path: 'coordination' },
    { name: 'Analytics', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M3 3v18h18M18 10V3M13 14V3M8 18V3" />
      </svg>
    ), path: 'analytics' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white p-6 shadow-md">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-blue-800">HealthGuard Collaboration</h1>
          <p className="text-sm text-gray-600">Connecting health officials, providers, and communities</p>
        </div>
        <nav>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={`/collaboration/${item.path}`}
                  className={cn(
                    "flex items-center space-x-3 p-3 rounded-lg",
                    activeTab === item.path ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'
                  )}
                  onClick={() => setActiveTab(item.path)}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="flex items-center justify-between bg-white p-6 rounded-lg shadow-md mb-8">
          <h1 className="text-3xl font-bold text-gray-800">{navItems.find(item => item.path === activeTab)?.name}</h1>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-lg font-semibold">Coordinator Sam Lee</p>
              <p className="text-sm text-gray-600">Emergency Responder</p>
              <p className="text-xs text-gray-500">Austin, Texas</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
              SL
            </div>
            <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-700"><path d="M21.5 2v-4a2 2 0 0 0-2-2H2.5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2H7a2 2 0 0 0 2-2v-4h3.5l4-4-4-4z"/></svg>
            </button>
          </div>
        </header>

        {/* Content Outlet */}
        <Outlet />
      </main>
    </div>
  );
};

export default CollaborationLayout; 