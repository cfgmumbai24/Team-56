import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

function Home() {
  // Sample data with datetime and different scores
  const data = [
    {
      datetime: '2023-01-01',
      literacyScore: 75,
      numeracyScore: 70,
      socioEmotionalScore: 65,
    },
    {
      datetime: '2023-02-01',
      literacyScore: 80,
      numeracyScore: 75,
      socioEmotionalScore: 70,
    },
    {
      datetime: '2023-03-01',
      literacyScore: 85,
      numeracyScore: 80,
      socioEmotionalScore: 75,
    },
    {
      datetime: '2023-04-01',
      literacyScore: 90,
      numeracyScore: 85,
      socioEmotionalScore: 80,
    },
    {
      datetime: '2023-05-01',
      literacyScore: 95,
      numeracyScore: 90,
      socioEmotionalScore: 85,
    },
    {
      datetime: '2023-06-01',
      literacyScore: 100,
      numeracyScore: 95,
      socioEmotionalScore: 90,
    },
  ];

  return (
    <main className='main-container'>
      <div className='charts'>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="datetime" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="literacyScore" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="numeracyScore" stroke="#82ca9d" />
            <Line type="monotone" dataKey="socioEmotionalScore" stroke="#ffc658" />
          </LineChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="datetime" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line type="monotone" dataKey="numeracyScore" stroke="#82ca9d" />
            <Line type="monotone" dataKey="socioEmotionalScore" stroke="#ffc658" />
          </LineChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="datetime" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="socioEmotionalScore" stroke="#ffc658" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default Home;
