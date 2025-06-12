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
  if (!zoneDataArray || zoneDataArray.length === 0) {
    return {};
  }

  // 1. Aggregate new_cases by date
  const dailyTotalsMap = zoneDataArray.reduce((acc, { date, new_cases }) => {
    acc[date] = (acc[date] || 0) + new_cases;
    return acc;
  }, {});

  // 2. Convert to sorted array of { date, total }
  const sortedDates = Object.keys(dailyTotalsMap)
    .sort((a, b) => new Date(a) - new Date(b));
  const dailyData = sortedDates.map(date => ({
    date,
    total: dailyTotalsMap[date]
  }));

  // 3. Identify today and yesterday entries
  const lastIndex = dailyData.length - 1;
  const todayEntry = dailyData[lastIndex];
  const yesterdayEntry = dailyData[lastIndex - 1] || { total: 0 };

  const newCases24h = todayEntry.total;
  const newCasesYesterday = yesterdayEntry.total;

  // 4. Percent change vs. yesterday
  const changePercent = ((newCases24h - newCasesYesterday) / (newCasesYesterday || 1)) * 100;
  const newCasesChange = `${changePercent > 0 ? '+' : ''}${changePercent.toFixed(1)}% from yesterday`;

  // 5. Active cases = sum over last 14 days
  const last14 = dailyData.slice(-14);
  const activeCases = last14.reduce((sum, { total }) => sum + total, 0);

  // 6. Past week total (last 7 days)
  const pastweek = dailyData
    .slice(-7)
    .reduce((sum, { total }) => sum + total, 0);

  // 7. R‑Number status (compare today vs. three days ago)
  const threeDaysAgoEntry = dailyData[lastIndex - 3] || { total: 0 };
  const rNumberStatus = todayEntry.total > threeDaysAgoEntry.total
    ? 'Above threshold'
    : 'Stable';

  // 8. Build the final summary object
  return {
    newCases24h,
    newCasesChange,
    activeCases,
    changePercent,
    activeCasesDescription: 'Total over last 14 days',
    pastweek,
    rNumberStatus,
    positivityRate: null,
    positivityRateDescription: null,
    hospitalizationsDescription: null,
    pastday: null,
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
}



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
  // alongside your other useState calls
const [zoneDistData, setZoneDistData] = useState([]);




  // ──────────────────────────────────────────────────────
// 1. New state hooks (alongside your existing ones)
// ──────────────────────────────────────────────────────
const [everyDayData, setEveryDayData]       = useState([]);
const [dailyCaseCounts, setDailyCaseCounts] = useState([]);
const [genderDistData, setGenderDistData]   = useState([]);
const [ageDistData, setAgeDistData]         = useState([]);

// ──────────────────────────────────────────────────────
// 2. New useEffect: fetch + parse your every_day_chart.csv
// ──────────────────────────────────────────────────────
useEffect(() => {
  fetch('/data/every_day_data.csv')
    .then(res => {
      if (!res.ok) throw new Error(`every_day_chart load error: ${res.status}`);
      return res.text();
    })
    .then(csvText => {
      // Parse rows
      const rows = csvText.trim().split('\n').slice(1);
      const parsed = rows.map(row => {
        const [, date, zone, gender, age] = row.split(',');
        return { date, zone, gender, age: Number(age) };
      });
      setEveryDayData(parsed);

      // 2.1 Aggregate daily case counts
      const countsMap = parsed.reduce((map, { date }) => {
        map[date] = (map[date] || 0) + 1;
        return map;
      }, {});
      setDailyCaseCounts(
        Object.entries(countsMap).map(([date, count]) => ({ date, Cases: count }))
      );

      // 2.2 Gender distribution for PieChart
      const genderMap = parsed.reduce((map, { gender }) => {
        map[gender] = (map[gender] || 0) + 1;
        return map;
      }, {});
      setGenderDistData(
        Object.entries(genderMap).map(([name, value]) => ({ name, value }))
      );

      // 2.3 Age bins for BarChart
      const bins = { '0-18': 0, '19-35': 0, '36-60': 0, '60+': 0 };
      parsed.forEach(({ age }) => {
        if (age <= 18) bins['0-18']++;
        else if (age <= 35) bins['19-35']++;
        else if (age <= 60) bins['36-60']++;
        else bins['60+']++;
      });
      setAgeDistData(
        Object.entries(bins).map(([name, value]) => ({ name, value }))
      );

      // 2.4 Zone breakdown
const zoneCountMap = parsed.reduce((acc, { zone }) => {
  acc[zone] = (acc[zone] || 0) + 1;
  return acc;
}, {});
setZoneDistData(
  Object.entries(zoneCountMap).map(([name, value]) => ({ name, value }))
);

    })
    .catch(err => console.error(err));
}, []);


  
useEffect(() => {
  setLoading(true);

  // Step 1: Fetch & parse CSV
  fetch('/data/data.csv')
    .then(res => {
      if (!res.ok) throw new Error(`CSV load error: ${res.status}`);
      return res.text();
    })
    .then(csvText => {
      const rows = csvText.trim().split('\n').slice(1);
      const parsedData = rows.map(row => {
        const [, date, zone, new_cases] = row.split(',');
        return { date, zone, new_cases: Number(new_cases) };
      });
      setData(parsedData);

      // Step 2: Build zoneStats
      const zoneStats = {};
      parsedData.forEach(({ zone, new_cases }) => {
        if (!zoneStats[zone]) {
          zoneStats[zone] = { total_cases: 0, max_cases: 0, count: 0 };
        }
        zoneStats[zone].total_cases += new_cases;
        zoneStats[zone].max_cases = Math.max(zoneStats[zone].max_cases, new_cases);
        zoneStats[zone].count++;
      });

      // Step 3: Generate analytics & time‑series
      const analytics = generateAnalyticsData(parsedData);
      setOverviewData(analytics);
      setEpidemiologicalTrendsData(analytics.epidemiologicalData);
      setClinicalChartData(analytics.clinicalData);
      setMobilityChartData(analytics.mobilityData);
      setEnvironmentalChartData(analytics.environmentalData);
      setDemographicsChartData(analytics.demographicsData);
      setSocialMediaChartData(analytics.socialMediaData);
      setActiveAlerts(analytics.activeAlerts);

      const timeSeriesMap = {};
      parsedData.forEach(({ date, zone, new_cases }) => {
        timeSeriesMap[date] = timeSeriesMap[date] || {};
        timeSeriesMap[date][zone] = new_cases;
      });
      setTimeSeriesData(
        Object.entries(timeSeriesMap).map(([date, zones]) => ({ date, ...zones }))
      );

      // Step 4: Fetch & normalize prediction API
      return fetch('http://localhost:5000/prediction')
        .then(res => {
          if (!res.ok) throw new Error(`Prediction API error: ${res.status}`);
          return res.json();
        })
        .then(raw => {
          console.log('Raw prediction payload:', raw);

          // Normalize whatever envelope your API uses
          let predictionArray;
          if (Array.isArray(raw)) {
            predictionArray = raw;
          } else if (Array.isArray(raw.data)) {
            predictionArray = raw.data;
          } else if (Array.isArray(raw.predictions)) {
            predictionArray = raw.predictions;
          } else {
            predictionArray = Object.entries(raw).map(([zone, info]) => ({
              zone,
              population: info.population,
              outbreak:   info.outbreak,
              epidemic:   info.epidemic
            }));
          }

          console.log('Normalized predictionArray:', predictionArray);

          // Build lookup map
          const predMap = predictionArray.reduce((m, { zone, population, outbreak, epidemic }) => {
            m[zone] = { population, outbreak, epidemic };
            return m;
          }, {});

          console.log('Prediction lookup map:', predMap);

          // Step 5: Merge stats + predictions
          const zoneDataArray = Object.entries(zoneStats).map(([zone, stats]) => {
            const { population = 0, outbreak = null, epidemic = null } = predMap[zone] || {};
            return {
              zone,
              total_cases: stats.total_cases,
              max_cases:   stats.max_cases,
              population,
              avg_cases:   Math.round(stats.total_cases / stats.count),
              outbreak,
              epidemic,
              lat:  ZONE_COORDINATES[zone]?.lat  || 0,
              long: ZONE_COORDINATES[zone]?.long || 0,
            };
          });
          setZoneData(zoneDataArray);

          // Step 6: Build heatmap from API 'outbreak' field
          const maxOutbreak = Math.max(
            ...predictionArray.map(p => (typeof p.outbreak === 'number' ? p.outbreak : 0))
          );
          const heatmapPoints = predictionArray.map(({ zone, outbreak }) => ({
            zone,
            lat:       ZONE_COORDINATES[zone]?.lat  || 0,
            long:      ZONE_COORDINATES[zone]?.long || 0,
            radius:    calculateRadius(outbreak || 0),
            intensity: (outbreak || 0) / (maxOutbreak || 1),
          }));
          setHeatmapData(heatmapPoints);
          console.log('Heatmap data (from API):', heatmapPoints);

          setLoading(false);
        });
    })
    .catch(err => {
      console.error('Data load error:', err);
      setLoading(false);
    });
}, []);
const [historicalData, setHistoricalData] = useState([]);

// ──────────────────────────────────────────────────────
// 2. Second useEffect: build first‑14‑day aggregation
// ──────────────────────────────────────────────────────
useEffect(() => {
  if (!timeSeriesData.length || !zoneData.length) return;

  // 2.1 Get the first 14 days from your existing timeSeriesData
  const first14 = timeSeriesData.slice(0, 14);

  // 2.2 Aggregate total cases per zone over those 14 days
  const agg = {};
  first14.forEach(day => {
    Object.entries(day).forEach(([key, value]) => {
      if (key === 'date') return;
      agg[key] = (agg[key] || 0) + (value || 0);
    });
  });

  // 2.3 Build the historicalData array
  const hist = Object.entries(agg).map(([zone, totalCases]) => {
    const { population = 0 } = zoneData.find(z => z.zone === zone) || {};
    const isOutbreak = totalCases > (population / 10);
    const coords     = ZONE_COORDINATES[zone] || { lat: 0, long: 0 };
    return {
      zone,
      totalCases,
      population,
      isOutbreak,
      lat:   coords.lat,
      long:  coords.long
    };
  });

  setHistoricalData(hist);
}, [timeSeriesData, zoneData]);


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
          <TabsTrigger value="history">History HeatMap Analysis</TabsTrigger>
          <TabsTrigger value="heatmap">Predicted World Heatmap</TabsTrigger>
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
                <div className="text-2xl font-bold">{overviewData?.changePercent.toFixed(2)}%</div>
                <p className="text-xs text-muted-foreground">
                  {overviewData?.pastday}
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
  {/* Weekly Trends → now shows daily case counts */}
  <Card>
    <CardHeader>
      <CardTitle>Daily Case Trends</CardTitle>
    </CardHeader>
    <CardContent className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={dailyCaseCounts} margin={{ top:5, right:10, left:10, bottom:5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <RechartsTooltip />
          <Legend />
          <Line type="monotone" dataKey="Cases" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>

  {/* Clinical Data → gender breakdown instead */}
  <Card>
    <CardHeader>
      <CardTitle>Gender Distribution</CardTitle>
    </CardHeader>
    <CardContent className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={genderDistData}
            cx="50%" cy="50%"
            outerRadius={80}
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name}: ${(percent*100).toFixed(0)}%`}
          >
            {genderDistData.map((_, idx) => (
              <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <RechartsTooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
</div>

<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
  {/* Mobility Patterns → Age Distribution bar chart */}
  <Card>
    <CardHeader>
      <CardTitle>Age Distribution</CardTitle>
    </CardHeader>
    <CardContent className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={ageDistData} margin={{ top:5, right:10, left:10, bottom:5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <RechartsTooltip />
          <Legend />
          <Bar dataKey="value" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>

  {/* Environmental Factors → you can repurpose for zone breakdown, etc. */}
<Card>
  <CardHeader>
    <CardTitle>Zone Case Breakdown</CardTitle>
  </CardHeader>
  <CardContent className="h-[300px]">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={zoneDistData} margin={{ top:5, right:10, left:10, bottom:5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <RechartsTooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
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

<TabsContent value="history" className="space-y-4">
  <Card>
    <CardHeader>
      <CardTitle>Historical Heatmap: First 14 Days</CardTitle>
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
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {historicalData.map((z, i) => (
            <CircleMarker
              key={i}
              center={[z.lat, z.long]}
              radius={calculateRadius(z.totalCases)}
              pathOptions={{
                fillColor: z.isOutbreak ? 'red' : 'green',
                color:     z.isOutbreak ? 'red' : 'green',
                fillOpacity: 0.7,
                weight:      1
              }}
            >
              <Tooltip>
                <div className="p-2">
                  <h3 className="font-bold">{z.zone}</h3>
                  <p>Total Cases (14d): {z.totalCases}</p>
                  <p>Population: {z.population.toLocaleString()}</p>
                  <p>
                    Status:{' '}
                    <span className={z.isOutbreak ? 'text-red-600' : 'text-green-600'}>
                      {z.isOutbreak ? 'Outbreak' : 'Normal'}
                    </span>
                  </p>
                </div>
              </Tooltip>
            </CircleMarker>
          ))}

        </MapContainer>
      </div>
    </CardContent>
  </Card>
</TabsContent>

        <TabsContent value="timeline" className="space-y-4">

        </TabsContent>

        <TabsContent value="heatmap" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Predicted World Heatmap of Cases for next two weeks</CardTitle>
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