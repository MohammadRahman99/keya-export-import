const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock Exchange Rates against USD base
const EXCHANGE_RATES = {
  USD: 1.0,
  EUR: 0.92,
  GBP: 0.79,
  BDT: 117.5,
  AED: 3.67,
  JPY: 154.2,
  CAD: 1.36,
  AUD: 1.52
};

// Mock Keya Group Enterprise Divisions
const DIVISIONS = [
  {
    id: 'knit-composite',
    name: 'Keya Knit Composite Ltd.',
    tagline: '100% Export Oriented Vertical Apparel Manufacturing',
    established: 1996,
    annualExportUSD: 120000000,
    mainProducts: ['Knitwear', 'T-Shirts', 'Polo Shirts', 'Sweatshirts', 'Fleece Jackets', 'Dyed Fabrics'],
    exportDestinations: ['USA', 'Germany', 'UK', 'France', 'Spain', 'Canada', 'Australia'],
    capacityPerMonth: '4.5 Million Pieces',
    certifications: ['OEKO-TEX Standard 100', 'GOTS (Organic Textile)', 'BSCI Social Compliance', 'WRAP Platinum', 'ISO 9001:2015']
  },
  {
    id: 'spinning',
    name: 'Keya Spinning Mills Ltd.',
    tagline: 'High Count Combed & Carded Ring Spun Yarns',
    established: 2003,
    annualExportUSD: 45000000,
    mainProducts: ['100% Cotton Yarn', 'Melange Yarn', 'Slub Yarn', 'Rotor Spun Yarn', 'Organic Certified Cotton Yarn'],
    exportDestinations: ['China', 'Vietnam', 'Turkey', 'Portugal', 'Italy', 'India'],
    capacityPerMonth: '3,800 Metric Tons',
    certifications: ['Uster Quality Certified', 'Cotton USA Licensee', 'GOTS Yarn Certification', 'ISO 14001:2015']
  },
  {
    id: 'cosmetics',
    name: 'Keya Cosmetics Ltd.',
    tagline: 'Consumer Toiletries & Personal Care Products Export',
    established: 1990,
    annualExportUSD: 30000000,
    mainProducts: ['Keya Toilet Soap', 'Beauty Soaps', 'Detergent Powder', 'Toothpaste', 'Shaving Cream', 'Petroleum Jelly', 'Glycerine'],
    exportDestinations: ['Middle East (UAE, KSA)', 'Nepal', 'Bhutan', 'East Africa (Kenya, Uganda)', 'Malaysia'],
    capacityPerMonth: '12,000 Metric Tons',
    certifications: ['GMP Certified (Good Manufacturing Practice)', 'HALAL Certified (IsDB Approved)', 'ISO 22716 Cosmetics']
  },
  {
    id: 'cotton',
    name: 'Keya Cotton & Fiber Imports',
    tagline: 'Raw Material Procurement & Fiber Logistics',
    established: 2005,
    annualExportUSD: 25000000,
    mainProducts: ['Raw Australian Cotton Bales', 'US Pima Cotton', 'West African Raw Cotton', 'Synthetic Fiber Imports'],
    exportDestinations: ['Global Import Supply Chain to Bangladesh Industrial Units'],
    capacityPerMonth: '5,000 Bales Imported / Month',
    certifications: ['ICA Cotton Standard', 'Better Cotton Initiative (BCI)', 'Customs AEO Certified']
  }
];

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'Keya Group Import Export Enterprise API',
    timestamp: new Date().toISOString()
  });
});

// Get Exchange Rates
app.get('/api/currencies', (req, res) => {
  res.json({
    base: 'USD',
    rates: EXCHANGE_RATES,
    updatedAt: new Date().toISOString()
  });
});

// Get Divisions
app.get('/api/divisions', (req, res) => {
  res.json(DIVISIONS);
});

app.listen(PORT, () => {
  console.log(`Keya Group Backend Server running on port ${PORT}`);
});
