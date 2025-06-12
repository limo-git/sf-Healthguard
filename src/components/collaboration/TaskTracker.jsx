import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TaskTracker = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This is the task tracker component.</p>
      </CardContent>
    </Card>
  );
};

export default TaskTracker; 