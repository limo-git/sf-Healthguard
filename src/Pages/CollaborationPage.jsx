import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CommunicationHub from "@/Pages/collaboration_subpages/CommunicationHub";
import SocialMediaIntelligence from "@/Pages/collaboration_subpages/SocialMediaIntelligence";
import AlertManagement from "@/Pages/collaboration_subpages/AlertManagement";
import ResourceSharing from "@/Pages/collaboration_subpages/ResourceSharing";
import ResponseCoordination from "@/Pages/collaboration_subpages/ResponseCoordination";

const CollaborationPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Collaboration Dashboard</h1>
      <Tabs defaultValue="communication" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="response">Response</TabsTrigger>
        </TabsList>
        <TabsContent value="communication">
          <CommunicationHub />
        </TabsContent>
        <TabsContent value="social">
          <SocialMediaIntelligence />
        </TabsContent>
        <TabsContent value="alerts">
          <AlertManagement />
        </TabsContent>
        <TabsContent value="resources">
          <ResourceSharing />
        </TabsContent>
        <TabsContent value="response">
          <ResponseCoordination />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CollaborationPage; 