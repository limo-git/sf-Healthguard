import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { scaleLinear } from "d3-scale";
import { interpolateRdYlBu } from "d3-scale-chromatic";
import L from 'leaflet'; // Import Leaflet
import CollaborationPage from './CollaborationPage'; // Import the new CollaborationPage

// Fix for default Leaflet icon not showing
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF6B6B', '#4ECDC4', '#45B7D1'];

const calculateRadius = (cases) => {
  // Base sizes for different case ranges
  if (cases > 1000) return 50;
  if (cases > 500) return 40;
  if (cases > 200) return 30;
  if (cases > 100) return 25;
  if (cases > 50) return 20;
  if (cases > 20) return 15;
  return 10;
};

// Zone coordinates mapping (example coordinates for 10 zones)
const ZONE_COORDINATES = {
  'zone_1': { lat: 28.6139, long: 77.2090 },  // Delhi
  'zone_2': { lat: 19.0760, long: 72.8777 },  // Mumbai
  'zone_3': { lat: 22.5726, long: 88.3639 },  // Kolkata
  'zone_4': { lat: 23.0225, long: 72.5714 },  // Gandhinagar
  'zone_5': { lat: 17.3850, long: 78.4867 },  // Hyderabad
  'zone_6': { lat: 12.9716, long: 77.5946 },  // Bengaluru
  'zone_7': { lat: 25.5941, long: 85.1376 },  // Patna
  'zone_8': { lat: 21.2514, long: 81.6296 },  // Raipur, Chhattisgarh
  'zone_9': { lat: 26.9124, long: 75.7873 },  // Jaipur
  'zone_10': { lat: 15.9129, long: 79.7400 }, // Guntur
};

// Function to determine color based on outbreak and epidemic status
const getZoneColor = (outbreak, epidemic) => {
  if (outbreak && epidemic) return '#8B0000'; // Dark red for both
  if (epidemic) return '#FF0000'; // Red for epidemic
  if (outbreak) return '#FFA500'; // Orange for outbreak
  return '#00FF00'; // Green for normal
};

// Function to get zone data by coordinates
const getZoneDataByCoordinates = (lat, long, zoneData) => {
  // Find the closest zone based on coordinates
  let closestZone = null;
  let minDistance = Infinity;

  Object.entries(ZONE_COORDINATES).forEach(([zoneId, coords]) => {
    const distance = Math.sqrt(
      Math.pow(coords.lat - lat, 2) + Math.pow(coords.long - long, 2)
    );
    if (distance < minDistance) {
      minDistance = distance;
      closestZone = zoneId;
    }
  });

  return zoneData.find(zone => zone.zone === closestZone);
};
const generateAnalyticsData = (zoneDataArray) => {
  if (!zoneDataArray || zoneDataArray.length === 0) return {};
  console.log(zoneDataArray[0]);

  // Sort zoneDataArray by date (latest last)
  const sortedData = zoneDataArray;
  const todayEntry = sortedData[sortedData.length - 1];
  const yesterdayEntry = sortedData[sortedData.length - 2];

  const getTotalCases = (entry) =>
    Object.keys(entry)
      .filter(key => key.startsWith("zone_"))
      .reduce((sum, key) => sum + (entry[key] || 0), 0);

  // 1. Total new cases for today
  const newCases24h = getTotalCases(todayEntry);
  console.log(newCases24h);
  console.log(todayEntry);

  // 2. Total new cases for yesterday
  const newCasesYesterday = getTotalCases(yesterdayEntry);

  // 3. New case percentage change
  const changePercent = ((newCases24h - newCasesYesterday) / (newCasesYesterday || 1)) * 100;
  const newCasesChange = `${changePercent > 0 ? '+' : ''}${changePercent.toFixed(1)}% from yesterday`;

  // 4. Active cases = sum of all cases in the last 14 days
  const last14 = sortedData.slice(-14);
  const activeCases = last14.reduce((total, entry) => total + getTotalCases(entry), 0);

  // 5. Past week total (last 7 days)
  const last7 = sortedData.slice(-7);
  const pastweek = last7.reduce((total, entry) => total + getTotalCases(entry), 0);

  // 6. R Number status (example logic: rising if more today than 3 days ago)
  const threeDaysAgoEntry = sortedData[sortedData.length - 4];
  const rNumberStatus = (getTotalCases(todayEntry) > getTotalCases(threeDaysAgoEntry))
    ? 'Above threshold' : 'Stable';

  return {
    newCases24h,
    newCasesChange,
    activeCases,
    activeCasesDescription: 'Total over last 14 days',
    pastweek,
    rNumberStatus,
    // Removed fake/random values
    positivityRate: null,
    positivityRateDescription: null,
    hospitalizationsDescription: null,
    pastday: null,
    // Removed charts: You can add if needed
    epidemiologicalData: [],
    clinicalData: [],
    mobilityData: [],
    environmentalData: [],
    demographicsData: [],
    socialMediaData: [],
    activeAlerts: [
      {
        type: 'New Cases',
        message: `Today reported ${newCases24h} new cases.`
      },
      {
        type: 'Weekly Trend',
        message: `Last 7 days total: ${pastweek} cases.`
      },
      {
        type: 'R Number',
        message: `Trend is ${rNumberStatus.toLowerCase()}.`
      }
    ]
  };
};


const Analytics = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [zoneData, setZoneData] = useState([]);
  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const [heatmapData, setHeatmapData] = useState([]);

  const [overviewData, setOverviewData] = useState(null);
  const [epidemiologicalTrendsData, setEpidemiologicalTrendsData] = useState([]);
  const [clinicalChartData, setClinicalChartData] = useState([]);
  const [mobilityChartData, setMobilityChartData] = useState([]);
  const [environmentalChartData, setEnvironmentalChartData] = useState([]);
  const [demographicsChartData, setDemographicsChartData] = useState([]);
  const [socialMediaChartData, setSocialMediaChartData] = useState([]);
  const [activeAlerts, setActiveAlerts] = useState([]);

  useEffect(() => {
    // Generate dummy data for overview section
    var dummyData = {};


    // Fetch and process the CSV data (existing logic)
    fetch('/data/data.csv')
      .then(response => response.text())
      .then(csvText => {
        const rows = csvText.split('\n').slice(1); // Skip header
        const parsedData = rows.map(row => {
          const [, date, zone, new_cases] = row.split(',');
          return {
            date,
            zone,
            new_cases: parseInt(new_cases)
          };
        });
        console.log("here");
        setData(parsedData);
        
        // Process data for zone-based visualization
        const zoneStats = {};
        
        parsedData.forEach(item => {
          if (!zoneStats[item.zone]) {
            zoneStats[item.zone] = {
              population:0,
              total_cases: 0,
              max_cases: 0,
              avg_cases: 0,
              count: 0
            };
          }
          zoneStats[item.zone].total_cases += item.new_cases;
          zoneStats[item.zone].max_cases = Math.max(zoneStats[item.zone].max_cases, item.new_cases);
          zoneStats[item.zone].count++;
        });

        // Calculate averages and format data
        const zoneDataArray = Object.entries(zoneStats).map(([zone, stats]) => ({
          zone,
          total_cases: stats.total_cases,
          max_cases: stats.max_cases,
          population:stats.population,
          avg_cases: Math.round(stats.total_cases / stats.count),
          lat: ZONE_COORDINATES[zone]?.lat || 0,
          long: ZONE_COORDINATES[zone]?.long || 0,
        }));

        dummyData = generateAnalyticsData(zoneDataArray);
        
        setOverviewData(dummyData);
        setEpidemiologicalTrendsData(dummyData.epidemiologicalData);
        setClinicalChartData(dummyData.clinicalData);
        setMobilityChartData(dummyData.mobilityData);
        setEnvironmentalChartData(dummyData.environmentalData);
        setDemographicsChartData(dummyData.demographicsData);
        setSocialMediaChartData(dummyData.socialMediaData);
        setActiveAlerts(dummyData.activeAlerts);
        setZoneData(zoneDataArray);

        // Process time series data
        const timeSeries = {};
        parsedData.forEach(item => {
          if (!timeSeries[item.date]) {
            timeSeries[item.date] = {};
          }
          timeSeries[item.date][item.zone] = item.new_cases;
        });

        const timeSeriesArray = Object.entries(timeSeries).map(([date, zones]) => ({
          date,
          ...zones
        }));

        setTimeSeriesData(timeSeriesArray);

        // Generate heatmap data
        const maxCases = Math.max(...zoneDataArray.map(z => z.total_cases || 0));
        const heatmapPoints = zoneDataArray.map(zone => {
          const totalCases = zone.total_cases || 0;
          return {
            ...zone,
            radius: calculateRadius(totalCases),
            intensity: totalCases / (maxCases || 1)
          };
        });

        setHeatmapData(heatmapPoints);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading data:', error);
        setLoading(false);
      });

    const fetchData = async () => {
      try {
        // Fetch data from the new /prediction route
        const response = await fetch('/prediction');
        const result = await response.json();
        // Assuming the response structure is { data: [...] }
        setZoneData(result.data); 
      } catch (error) {
        console.error('Error fetching zone data:', error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  const colorScale = scaleLinear()
    .domain([0, Math.max(...heatmapData.map(d => d.total_cases || 0))])
    .range([0.2, 1]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="heatmap">World Heatmap</TabsTrigger>
          <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
        <Card>
            <CardHeader>
              <CardTitle>Cases Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    {Object.keys(ZONE_COORDINATES).map((zone, index) => (
                      <Line
                        key={zone}
                        type="monotone"
                        dataKey={zone}
                        stroke={COLORS[index % COLORS.length]}
                        name={`Zone ${zone.split('_')[1]}`}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <div className="grid gap-4 md:grid-cols-4">
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">NEW CASES (24H)</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{overviewData?.newCases24h}</div>
                <p className="text-xs text-muted-foreground">
                  {overviewData?.newCasesChange}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">ACTIVE CASES</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{overviewData?.activeCases}</div>
                <p className="text-xs text-muted-foreground">
                  {overviewData?.activeCasesDescription}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Changes from the past week</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M18 10H6M18 14H6M2 12h20M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2M7 3v2a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{overviewData?.pastweek}</div>
                <p className="text-xs text-muted-foreground">
                  {overviewData?.hospitalizationsDescription}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Changes from the past day</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{overviewData?.rNumber}</div>
                <p className="text-xs text-muted-foreground">
                  {overviewData?.pastday}
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-1">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">POSITIVITY RATE</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M5 20v-4h4v4zm6-2h4v2h-4zm6-4h4v4h-4zm-6-4h4v4h-4zm-6-4h4v4H5zm6-4h4v4h-4z" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{overviewData?.positivityRate}</div>
                <p className="text-xs text-muted-foreground">
                  {overviewData?.positivityRateDescription}
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Epidemiological Trends</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={epidemiologicalTrendsData}
                    margin={{
                      top: 5,
                      right: 10,
                      left: 10,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <RechartsTooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="New Cases" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line yAxisId="right" type="monotone" dataKey="Active Cases" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Clinical Data</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={clinicalChartData}
                    margin={{
                      top: 5,
                      right: 10,
                      left: 10,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="Hospitalizations" fill="#8884d8" />
                    <Bar dataKey="ICU Occupancy" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Mobility Patterns</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={mobilityChartData}
                    margin={{
                      top: 5,
                      right: 10,
                      left: 10,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Public Transport" stroke="#8884d8" />
                    <Line type="monotone" dataKey="Retail & Recreation" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="Workplace" stroke="#ffc658" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Environmental Factors</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={environmentalChartData}
                    margin={{
                      top: 5,
                      right: 10,
                      left: 10,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="temp" />
                    <YAxis yAxisId="humidity" orientation="right" />
                    <RechartsTooltip />
                    <Legend />
                    <Line yAxisId="temp" type="monotone" dataKey="Temperature (°C)" stroke="#ff7300" />
                    <Line yAxisId="humidity" type="monotone" dataKey="Humidity (%)" stroke="#387900" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Demographics</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={demographicsChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {demographicsChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Social Media Sentiment</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={socialMediaChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="mentions" />
                    <YAxis yAxisId="sentiment" orientation="right" domain={[-1, 1]} />
                    <RechartsTooltip />
                    <Legend />
                    <Bar yAxisId="mentions" dataKey="Health Mentions" fill="#8884d8" />
                    <Line yAxisId="sentiment" type="monotone" dataKey="Sentiment Score" stroke="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-1">
            <Card>
              <CardHeader>
                <CardTitle>Active Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                {activeAlerts.map((alert, index) => (
                  <div key={index} className="flex items-center space-x-2 py-2 border-b last:border-b-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-5 w-5 text-red-500"
                    >
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                    <div>
                      <p className="font-semibold">{alert.type}</p>
                      <p className="text-sm text-muted-foreground">{alert.message}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="zones" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Zone Performance Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={zoneData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="zone" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="max_cases" fill="#FF8042" name="Maximum Cases" />
                    <Bar dataKey="avg_cases" fill="#00C49F" name="Average Cases" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">

        </TabsContent>

        <TabsContent value="heatmap" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>World Heatmap of Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[600px] w-full relative">
                <MapContainer 
                  center={[20.5937, 78.9629]} 
                  zoom={5} 
                  zoomControl={false}
                  scrollWheelZoom={false}
                  doubleClickZoom={false}
                  touchZoom={false}
                  dragging={false}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {zoneData.map((zone, index) => {
                    const coords = ZONE_COORDINATES[zone.zone];
                    if (!coords) return null;

                    const color = getZoneColor(zone.outbreak, zone.epidemic);
                    const radius = calculateRadius(zone.population);

                    return (
                      <CircleMarker
                        key={index}
                        center={[coords.lat, coords.long]}
                        radius={radius}
                        pathOptions={{
                          fillColor: color,
                          color: color,
                          fillOpacity: 0.7,
                          weight: 1
                        }}
                      >
                        <Tooltip>
                          <div className="p-2">
                            <h3 className="font-bold">{zone.zone}</h3>
                            <p>Population: {zone.population.toLocaleString()}</p>
                            <p>Status: {zone.outbreak ? 'Outbreak' : 'Normal'}</p>
                            <p>Epidemic: {zone.epidemic ? 'Yes' : 'No'}</p>
                          </div>
                        </Tooltip>
                      </CircleMarker>
                    );
                  })}
                </MapContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="collaboration" className="space-y-4">
          <CollaborationPage />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics; 