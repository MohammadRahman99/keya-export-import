import { Injectable, signal, computed } from '@angular/core';

export interface CurrencyRate {
  code: string;
  name: string;
  symbol: string;
  rate: number;
  flag: string;
}

export type UserRole = 'Admin' | 'Export Manager' | 'Import Manager' | 'Accounts' | 'Warehouse' | 'Management';

export interface UserRoleProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  department: string;
  permissions: string[];
}

export interface Division {
  id: string;
  name: string;
  tagline: string;
  established: number;
  annualExportUSD: number;
  mainProducts: string[];
  exportDestinations: string[];
  capacityPerMonth: string;
  certifications: string[];
  icon: string;
  image: string;
}

export interface Shipment {
  id: string;
  bolNumber: string;
  lcNumber: string;
  type: 'EXPORT' | 'IMPORT';
  division: string;
  clientOrSupplier: string;
  originPort: string;
  destinationPort: string;
  containerId: string;
  containerSize: '20FT FCL' | '40FT HC' | 'LCL';
  itemsDescription: string;
  quantityUnits: string;
  valueUSD: number;
  status: 'In Transit' | 'Port Customs Clear' | 'Loaded at Sea' | 'Delivered' | 'Documentation Pending';
  progressPercentage: number;
  eta: string;
  departureDate: string;
  vesselName: string;
}

export interface ComplianceCertificate {
  id: string;
  title: string;
  issuer: string;
  division: string;
  validUntil: string;
  certificateNo: string;
  status: 'Active & Verified' | 'Renewal Pending';
  pdfLink: string;
  category: 'Environmental' | 'Social Compliance' | 'Quality Management' | 'Halal & Safety';
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: 'Knitwear' | 'Yarn' | 'Cosmetics & Toiletries' | 'Raw Cotton & Fiber';
  unit: 'Pcs' | 'Kg' | 'Metric Tons' | 'Cartons' | 'Bales';
  supplierId: string;
  supplierName: string;
  countryOfOrigin: string;
  hsCode: string;
  unitPriceUSD: number;
  stockLevel: number;
}

export interface Supplier {
  id: string;
  name: string;
  country: string;
  contactPerson: string;
  email: string;
  phone: string;
  rating: number;
  totalTransactionsUSD: number;
  suppliedProducts: string[];
  status: 'Active' | 'Under Review';
}

export interface Customer {
  id: string;
  companyName: string;
  country: string;
  contactPerson: string;
  email: string;
  totalOrdersUSD: number;
  creditLimitUSD: number;
}

export interface ImportPO {
  poNumber: string;
  piNumber: string;
  lcNumber: string;
  supplierName: string;
  productName: string;
  quantity: number;
  unit: string;
  unitPriceUSD: number;
  totalValueUSD: number;
  currency: string;
  expectedArrival: string;
  status: 'PO Issued' | 'PI Confirmed' | 'LC Opened' | 'In Transit' | 'Received at Port';
}

export interface ShipmentDetails {
  containerNumber: string;
  vesselName: string;
  originPort: string;
  destinationPort: string;
  etd: string;
  eta: string;
  shippingLine: string;
  blAwbNumber: string;
  containerStatus: 'Loading' | 'At Sea' | 'Customs Clearing' | 'Delivered to Warehouse';
  type: 'EXPORT' | 'IMPORT';
}

export interface CustomsDoc {
  docId: string;
  type: 'Commercial Invoice' | 'Packing List' | 'Bill of Lading' | 'Certificate of Origin' | 'Customs Declaration';
  refNumber: string;
  dutyTaxUSD: number;
  clearanceStatus: 'Passed' | 'Under Audit' | 'Duty Paid';
  issueDate: string;
}

export interface WarehouseItem {
  id: string;
  productName: string;
  sku: string;
  importedQty: number;
  receivedQty: number;
  damagedQty: number;
  currentStock: number;
  unit: string;
  warehouseLocation: 'Gazipur Central Hub' | 'Chattogram Bonded Yard' | 'Konabari Yarn Depot';
}

export interface ExportOrder {
  orderId: string;
  customerName: string;
  destinationCountry: string;
  salesOrderNo: string;
  exportInvoiceNo: string;
  exportQuantity: number;
  unit: string;
  exportValueUSD: number;
  status: 'Order Confirmed' | 'Customs Cleared' | 'Vessel Dispatched' | 'Delivered';
}

export interface LandedCostBreakdown {
  importId: string;
  productName: string;
  baseCostUSD: number;
  freightUSD: number;
  insuranceUSD: number;
  customsDutyUSD: number;
  portChargesUSD: number;
  cnfChargesUSD: number;
  otherExpensesUSD: number;
  totalLandedCostUSD: number;
  landedUnitCostUSD: number;
  quantity: number;
  projectedProfitMargin: number;
}

@Injectable({
  providedIn: 'root'
})
export class ExportImportDataService {
  // Available Currencies
  readonly currencies = signal<CurrencyRate[]>([
    { code: 'USD', name: 'US Dollar', symbol: '$', rate: 1.0, flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro', symbol: '€', rate: 0.92, flag: '🇪🇺' },
    { code: 'GBP', name: 'British Pound', symbol: '£', rate: 0.79, flag: '🇬🇧' },
    { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳', rate: 117.5, flag: '🇧🇩' },
    { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', rate: 3.67, flag: '🇦🇪' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥', rate: 154.2, flag: '🇯🇵' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$', rate: 1.36, flag: '🇨🇦' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', rate: 1.52, flag: '🇦🇺' }
  ]);

  // Selected Currency Signal
  readonly currentCurrency = signal<CurrencyRate>(this.currencies()[0]);

  // Active Role Signal
  readonly activeRole = signal<UserRole>('Admin');

  // Search & Filter Signals for Overview Tracker
  readonly searchQuery = signal<string>('');
  readonly selectedTypeFilter = signal<'ALL' | 'EXPORT' | 'IMPORT'>('ALL');
  readonly selectedDivisionFilter = signal<string>('ALL');

  // Industrial Divisions
  readonly divisions = signal<Division[]>([
    {
      id: 'knit-composite',
      name: 'Keya Knit Composite Ltd.',
      tagline: '100% Export Oriented Vertical Apparel & Knitwear Giant',
      established: 1996,
      annualExportUSD: 120000000,
      mainProducts: ['Single Jersey T-Shirts', 'Pique Polo Shirts', 'Fleece Hoodies', 'Heavyweight Sweatpants', 'Custom Dyed Fabrics'],
      exportDestinations: ['USA', 'Germany', 'UK', 'Spain', 'France', 'Canada', 'Australia', 'Japan'],
      capacityPerMonth: '4.5 Million Finished Garments',
      certifications: ['OEKO-TEX Standard 100 Class I', 'GOTS Organic Cotton', 'BSCI Social Compliance', 'WRAP Platinum', 'ISO 9001:2015'],
      icon: 'shirt',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'spinning',
      name: 'Keya Spinning Mills Ltd.',
      tagline: 'Precision Ring Spun & Combed Cotton Yarn Manufacturer',
      established: 2003,
      annualExportUSD: 45000000,
      mainProducts: ['100% Combed Cotton Yarn (Ne 20/1 to 80/1)', 'Slub & Melange Yarns', 'Organic GOTS Yarn', 'Carded Weaving Yarn'],
      exportDestinations: ['China', 'Vietnam', 'Turkey', 'Portugal', 'Italy', 'India'],
      capacityPerMonth: '3,800 Metric Tons Yarn',
      certifications: ['Uster Quality Benchmark Top 5%', 'Cotton USA Licensee', 'GOTS Yarn Certified', 'ISO 14001:2015'],
      icon: 'disc',
      image: 'https://images.unsplash.com/photo-1605289355680-75fb4526f652?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'cosmetics',
      name: 'Keya Cosmetics & Toiletries',
      tagline: 'Global Exporter of Beauty Soaps, Detergents & Personal Care',
      established: 1990,
      annualExportUSD: 30000000,
      mainProducts: ['Keya Beauty Soap Bar', 'Laundry Detergent Powder', 'Fluoride Toothpaste', 'Shaving Cream', 'Pure Petroleum Jelly', 'Cosmetic Glycerine'],
      exportDestinations: ['UAE (Dubai)', 'Saudi Arabia', 'Nepal', 'Bhutan', 'Kenya', 'Uganda', 'Malaysia'],
      capacityPerMonth: '12,000 Metric Tons Toiletries',
      certifications: ['GMP (Good Manufacturing Practice)', 'HALAL Certified (IsDB Standard)', 'ISO 22716 Cosmetics Safety'],
      icon: 'sparkles',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'cotton',
      name: 'Keya Cotton & Fiber Supply',
      tagline: 'International Raw Cotton Import Procurement & Logistics Hub',
      established: 2005,
      annualExportUSD: 25000000,
      mainProducts: ['US Pima Raw Cotton Bales', 'Australian Combing Cotton', 'West African Raw Cotton', 'Eco Recycled Cotton Fiber'],
      exportDestinations: ['Global Raw Material Imports -> Chattogram Port -> Gazipur Mills'],
      capacityPerMonth: '5,000 Bales Raw Cotton Imported / Month',
      certifications: ['ICA Cotton Rules Standard', 'Better Cotton Initiative (BCI)', 'Authorized Economic Operator (AEO) Customs'],
      icon: 'box',
      image: 'https://images.unsplash.com/photo-1594897030264-ab7d87efc473?auto=format&fit=crop&w=800&q=80'
    }
  ]);

  // Master Shipments List
  readonly shipments = signal<Shipment[]>([
    {
      id: 'SHP-EX-9921',
      bolNumber: 'MSCUBD8849201',
      lcNumber: 'LC-HSBC-2026-081',
      type: 'EXPORT',
      division: 'Keya Knit Composite Ltd.',
      clientOrSupplier: 'H&M Global Sourcing (Hamburg, Germany)',
      originPort: 'Chattogram Port (CGP), Bangladesh',
      destinationPort: 'Hamburg Port, Germany',
      containerId: 'MSCU7729104',
      containerSize: '40FT HC',
      itemsDescription: '100% Organic Cotton Men\'s Pique Polo Shirts (Hs Code: 6105.10)',
      quantityUnits: '42,500 Pcs',
      valueUSD: 212500,
      status: 'Loaded at Sea',
      progressPercentage: 65,
      eta: '2026-08-28',
      departureDate: '2026-08-10',
      vesselName: 'MSC Isabella (Voyage 402W)'
    },
    {
      id: 'SHP-EX-9922',
      bolNumber: 'MAEU91028472',
      lcNumber: 'LC-CITI-2026-114',
      type: 'EXPORT',
      division: 'Keya Knit Composite Ltd.',
      clientOrSupplier: 'Target Corporation (Minneapolis, USA)',
      originPort: 'Chattogram Port (CGP), Bangladesh',
      destinationPort: 'Port of Los Angeles (LAX), USA',
      containerId: 'MAEU4419208',
      containerSize: '40FT HC',
      itemsDescription: 'Fleece Pullover Hoodies & Sweatpants (Hs Code: 6110.20)',
      quantityUnits: '38,000 Pcs',
      valueUSD: 342000,
      status: 'In Transit',
      progressPercentage: 40,
      eta: '2026-09-02',
      departureDate: '2026-08-12',
      vesselName: 'Maersk Mc-Kinney (Voyage 881E)'
    },
    {
      id: 'SHP-IM-3041',
      bolNumber: 'CMAU30948172',
      lcNumber: 'LC-EBL-2026-099',
      type: 'IMPORT',
      division: 'Keya Cotton & Fiber Supply',
      clientOrSupplier: 'Queensland Cotton Corp (Brisbane, Australia)',
      originPort: 'Port of Brisbane, Australia',
      destinationPort: 'Chattogram Port (CGP), Bangladesh',
      containerId: 'CMAU8810293',
      containerSize: '40FT HC',
      itemsDescription: 'High Grade Raw Australian Cotton Bales (Hs Code: 5201.00)',
      quantityUnits: '1,200 Bales (260 MT)',
      valueUSD: 468000,
      status: 'Port Customs Clear',
      progressPercentage: 90,
      eta: '2026-08-18',
      departureDate: '2026-07-28',
      vesselName: 'CMA CGM Antoine (Voyage 129N)'
    }
  ]);

  // Certificates List
  readonly certificates = signal<ComplianceCertificate[]>([
    { id: 'CERT-OEKO-2026', title: 'OEKO-TEX Standard 100 (Class I Baby Safe)', issuer: 'TESTEX AG Zurich, Switzerland', division: 'Keya Knit Composite Ltd.', validUntil: '2027-06-30', certificateNo: '18.HBD.49201', status: 'Active & Verified', pdfLink: '#', category: 'Environmental' },
    { id: 'CERT-GOTS-881', title: 'Global Organic Textile Standard (GOTS v7.0)', issuer: 'Control Union Certifications, Netherlands', division: 'Keya Knit Composite & Spinning', validUntil: '2027-03-15', certificateNo: 'CU-8849201-ORG', status: 'Active & Verified', pdfLink: '#', category: 'Environmental' },
    { id: 'CERT-BSCI-2026', title: 'BSCI Social Compliance Audit (Grade A)', issuer: 'amfori BSCI Brussels', division: 'Keya Group Garments Hub', validUntil: '2026-12-31', certificateNo: 'BSCI-ID-391029', status: 'Active & Verified', pdfLink: '#', category: 'Social Compliance' },
    { id: 'CERT-HALAL-771', title: 'IsDB International HALAL Certification', issuer: 'Islamic Development Bank & BSTI', division: 'Keya Cosmetics Ltd.', validUntil: '2027-11-20', certificateNo: 'HALAL-BD-2026-78', status: 'Active & Verified', pdfLink: '#', category: 'Halal & Safety' },
    { id: 'CERT-ISO-9001', title: 'ISO 9001:2015 Quality Management System', issuer: 'SGS International', division: 'All Group Divisions', validUntil: '2028-01-10', certificateNo: 'SGS-BD-QMS-4029', status: 'Active & Verified', pdfLink: '#', category: 'Quality Management' }
  ]);

  // Computed Filtered Shipments
  readonly filteredShipments = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const typeFilter = this.selectedTypeFilter();
    const divisionFilter = this.selectedDivisionFilter();

    return this.shipments().filter(shp => {
      const matchesType = typeFilter === 'ALL' || shp.type === typeFilter;
      const matchesDivision = divisionFilter === 'ALL' || shp.division.toLowerCase().includes(divisionFilter.toLowerCase());
      
      const matchesQuery = !query || 
        shp.id.toLowerCase().includes(query) ||
        shp.bolNumber.toLowerCase().includes(query) ||
        shp.lcNumber.toLowerCase().includes(query) ||
        shp.containerId.toLowerCase().includes(query) ||
        shp.clientOrSupplier.toLowerCase().includes(query) ||
        shp.itemsDescription.toLowerCase().includes(query) ||
        shp.destinationPort.toLowerCase().includes(query);

      return matchesType && matchesDivision && matchesQuery;
    });
  });

  // User Profiles
  readonly users = signal<UserRoleProfile[]>([
    { id: 'USR-01', name: 'Abdul Khaleque Pathan', email: 'chairman@keyagroupbd.com', role: 'Management', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', department: 'Executive Board', permissions: ['ALL_ACCESS', 'EXECUTIVE_REPORTS'] },
    { id: 'USR-02', name: 'Rahim Chowdhury', email: 'admin@keyagroupbd.com', role: 'Admin', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', department: 'IT System Admin', permissions: ['USER_MANAGE', 'SYSTEM_CONFIG'] },
    { id: 'USR-03', name: 'Sarah Jenkins', email: 'export@keyagroupbd.com', role: 'Export Manager', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80', department: 'International Garments Export', permissions: ['EXPORT_ORDER', 'INVOICE_GEN'] },
    { id: 'USR-04', name: 'Tanvir Hossain', email: 'import@keyagroupbd.com', role: 'Import Manager', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80', department: 'Raw Material Procurement', permissions: ['PO_CREATE', 'LC_MANAGE'] },
    { id: 'USR-05', name: 'Nusrat Jahan', email: 'accounts@keyagroupbd.com', role: 'Accounts', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80', department: 'Corporate Finance & Costing', permissions: ['LANDED_COST', 'DUTY_TAX'] },
    { id: 'USR-06', name: 'Kalam Miah', email: 'warehouse@keyagroupbd.com', role: 'Warehouse', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80', department: 'Gazipur Central Warehouse', permissions: ['STOCK_RECEIVE', 'DAMAGE_REPORT'] }
  ]);

  // Product Master
  readonly products = signal<Product[]>([
    { id: 'PRD-101', name: '100% Cotton Pique Polo Shirt', sku: 'KEYA-KNIT-POLO-01', category: 'Knitwear', unit: 'Pcs', supplierId: 'SUP-01', supplierName: 'Queensland Cotton Corp', countryOfOrigin: 'Bangladesh', hsCode: '6105.10', unitPriceUSD: 5.0, stockLevel: 85000 },
    { id: 'PRD-102', name: 'Basic Cotton Crewneck T-Shirt', sku: 'KEYA-KNIT-TSH-02', category: 'Knitwear', unit: 'Pcs', supplierId: 'SUP-01', supplierName: 'Queensland Cotton Corp', countryOfOrigin: 'Bangladesh', hsCode: '6109.10', unitPriceUSD: 2.80, stockLevel: 140000 },
    { id: 'PRD-103', name: 'Combed Ring Spun Yarn Ne 30/1', sku: 'KEYA-SPIN-YRN-30', category: 'Yarn', unit: 'Kg', supplierId: 'SUP-02', supplierName: 'Uster Cotton Fiber Inc', countryOfOrigin: 'USA', hsCode: '5205.22', unitPriceUSD: 4.50, stockLevel: 45000 },
    { id: 'PRD-104', name: 'Keya Beauty Soap Bar 100g', sku: 'KEYA-COS-SOAP-100', category: 'Cosmetics & Toiletries', unit: 'Cartons', supplierId: 'SUP-03', supplierName: 'Archroma Dyestuffs GmbH', countryOfOrigin: 'Bangladesh', hsCode: '3401.11', unitPriceUSD: 14.40, stockLevel: 12500 },
    { id: 'PRD-105', name: 'Australian Raw Cotton Bales', sku: 'KEYA-COT-BAL-AU', category: 'Raw Cotton & Fiber', unit: 'Bales', supplierId: 'SUP-01', supplierName: 'Queensland Cotton Corp', countryOfOrigin: 'Australia', hsCode: '5201.00', unitPriceUSD: 390.00, stockLevel: 3200 }
  ]);

  // Supplier Master
  readonly suppliers = signal<Supplier[]>([
    { id: 'SUP-01', name: 'Queensland Cotton Corp', country: 'Australia', contactPerson: 'John Donaldson', email: 'j.donaldson@qldcotton.au', phone: '+61 7 3000 8888', rating: 4.9, totalTransactionsUSD: 42000000, suppliedProducts: ['Raw Cotton Bales', 'Combing Fiber'], status: 'Active' },
    { id: 'SUP-02', name: 'Uster Cotton Fiber Inc', country: 'USA', contactPerson: 'Mark Vance', email: 'mvance@usterfiber.us', phone: '+1 901 555 0192', rating: 4.8, totalTransactionsUSD: 28000000, suppliedProducts: ['Pima Raw Cotton', 'Combed Yarn'], status: 'Active' },
    { id: 'SUP-03', name: 'Archroma Dyestuffs GmbH', country: 'Switzerland', contactPerson: 'Dr. Hans Weber', email: 'h.weber@archroma.ch', phone: '+41 61 716 1111', rating: 4.95, totalTransactionsUSD: 18500000, suppliedProducts: ['Reactive Dyes', 'Auxiliary Chemicals'], status: 'Active' }
  ]);

  // Customer / Buyer Master
  readonly customers = signal<Customer[]>([
    { id: 'CUST-01', companyName: 'H&M Global Sourcing GmbH', country: 'Germany', contactPerson: 'Emma Lindqvist', email: 'sourcing@hm.com', totalOrdersUSD: 65000000, creditLimitUSD: 10000000 },
    { id: 'CUST-02', companyName: 'Target Sourcing Services', country: 'USA', contactPerson: 'Michael Miller', email: 'apparel.import@target.com', totalOrdersUSD: 48000000, creditLimitUSD: 8000000 },
    { id: 'CUST-03', companyName: 'Al-Madina Hypermarkets', country: 'UAE', contactPerson: 'Tariq Al-Mansoor', email: 'trade@almadinauae.com', totalOrdersUSD: 12000000, creditLimitUSD: 3000000 }
  ]);

  // Import PO / LC Data
  readonly importPOs = signal<ImportPO[]>([
    { poNumber: 'PO-IMP-2026-081', piNumber: 'PI-QLD-8820', lcNumber: 'LC-HSBC-2026-081', supplierName: 'Queensland Cotton Corp', productName: 'Australian Raw Cotton Bales', quantity: 1200, unit: 'Bales', unitPriceUSD: 390.0, totalValueUSD: 468000, currency: 'USD', expectedArrival: '2026-08-25', status: 'In Transit' },
    { poNumber: 'PO-IMP-2026-089', piNumber: 'PI-ARCH-3041', lcNumber: 'LC-EBL-2026-099', supplierName: 'Archroma Dyestuffs GmbH', productName: 'Eco Reactive Dyes', quantity: 22, unit: 'Metric Tons', unitPriceUSD: 6000.0, totalValueUSD: 132000, currency: 'EUR', expectedArrival: '2026-08-30', status: 'LC Opened' },
    { poNumber: 'PO-IMP-2026-094', piNumber: 'PI-UST-1029', lcNumber: 'LC-SCB-2026-114', supplierName: 'Uster Cotton Fiber Inc', productName: 'Pima Raw Cotton', quantity: 800, unit: 'Bales', unitPriceUSD: 420.0, totalValueUSD: 336000, currency: 'USD', expectedArrival: '2026-09-10', status: 'PI Confirmed' }
  ]);

  // Customs Documents Data
  readonly customsDocs = signal<CustomsDoc[]>([
    { docId: 'DOC-CI-9921', type: 'Commercial Invoice', refNumber: 'INV-KEYA-2026-092', dutyTaxUSD: 0, clearanceStatus: 'Passed', issueDate: '2026-08-10' },
    { docId: 'DOC-PL-9921', type: 'Packing List', refNumber: 'PKL-KEYA-2026-092', dutyTaxUSD: 0, clearanceStatus: 'Passed', issueDate: '2026-08-10' },
    { docId: 'DOC-BL-8841', type: 'Bill of Lading', refNumber: 'MSCUBD8849201', dutyTaxUSD: 0, clearanceStatus: 'Passed', issueDate: '2026-08-11' },
    { docId: 'DOC-COO-402', type: 'Certificate of Origin', refNumber: 'EPB-COO-2026-771', dutyTaxUSD: 0, clearanceStatus: 'Passed', issueDate: '2026-08-11' },
    { docId: 'DOC-CUST-301', type: 'Customs Declaration', refNumber: 'C-NO-CGP-2026-9041', dutyTaxUSD: 42120, clearanceStatus: 'Duty Paid', issueDate: '2026-08-15' }
  ]);

  // Warehouse Inventory Data
  readonly warehouseStock = signal<WarehouseItem[]>([
    { id: 'WH-01', productName: '100% Cotton Pique Polo Shirt', sku: 'KEYA-KNIT-POLO-01', importedQty: 90000, receivedQty: 88500, damagedQty: 1500, currentStock: 85000, unit: 'Pcs', warehouseLocation: 'Gazipur Central Hub' },
    { id: 'WH-02', productName: 'Combed Ring Spun Yarn Ne 30/1', sku: 'KEYA-SPIN-YRN-30', importedQty: 50000, receivedQty: 49800, damagedQty: 200, currentStock: 45000, unit: 'Kg', warehouseLocation: 'Konabari Yarn Depot' },
    { id: 'WH-03', productName: 'Australian Raw Cotton Bales', sku: 'KEYA-COT-BAL-AU', importedQty: 3500, receivedQty: 3480, damagedQty: 20, currentStock: 3200, unit: 'Bales', warehouseLocation: 'Chattogram Bonded Yard' }
  ]);

  // Export Sales Orders Data
  readonly exportOrders = signal<ExportOrder[]>([
    { orderId: 'EXP-SO-8812', customerName: 'H&M Global Sourcing GmbH', destinationCountry: 'Germany', salesOrderNo: 'SO-KEYA-2026-44', exportInvoiceNo: 'EXP-INV-8812', exportQuantity: 42500, unit: 'Pcs', exportValueUSD: 212500, status: 'Vessel Dispatched' },
    { orderId: 'EXP-SO-8815', customerName: 'Target Sourcing Services', destinationCountry: 'USA', salesOrderNo: 'SO-KEYA-2026-50', exportInvoiceNo: 'EXP-INV-8815', exportQuantity: 38000, unit: 'Pcs', exportValueUSD: 342000, status: 'Customs Cleared' },
    { orderId: 'EXP-SO-8820', customerName: 'Al-Madina Hypermarkets', destinationCountry: 'UAE', salesOrderNo: 'SO-KEYA-2026-61', exportInvoiceNo: 'EXP-INV-8820', exportQuantity: 1800, unit: 'Cartons', exportValueUSD: 86400, status: 'Delivered' }
  ]);

  // Landed Cost Breakdowns Data
  readonly landedCosts = signal<LandedCostBreakdown[]>([
    { importId: 'IMP-COST-301', productName: 'Australian Raw Cotton Bales', baseCostUSD: 390.0, freightUSD: 24.5, insuranceUSD: 3.8, customsDutyUSD: 35.1, portChargesUSD: 8.2, cnfChargesUSD: 5.4, otherExpensesUSD: 3.0, totalLandedCostUSD: 470.0, landedUnitCostUSD: 470.0, quantity: 1200, projectedProfitMargin: 24.5 },
    { importId: 'IMP-COST-302', productName: 'Eco Reactive Dyes', baseCostUSD: 6000.0, freightUSD: 380.0, insuranceUSD: 60.0, customsDutyUSD: 720.0, portChargesUSD: 140.0, cnfChargesUSD: 90.0, otherExpensesUSD: 50.0, totalLandedCostUSD: 7440.0, landedUnitCostUSD: 7440.0, quantity: 22, projectedProfitMargin: 31.0 }
  ]);

  // Executive Metrics
  readonly metrics = computed(() => {
    const rate = this.currentCurrency().rate;
    const symbol = this.currentCurrency().symbol;

    const totalExports = 220000000;
    const totalImports = 75000000;
    const pendingShipmentsCount = 14;
    const arrivedShipmentsCount = 134;

    return {
      totalExportsFormatted: `${symbol}${(totalExports * rate / 1000000).toFixed(1)}M`,
      totalImportsFormatted: `${symbol}${(totalImports * rate / 1000000).toFixed(1)}M`,
      exportsFormatted: `${symbol}${(totalExports * rate / 1000000).toFixed(1)}M`,
      importsFormatted: `${symbol}${(totalImports * rate / 1000000).toFixed(1)}M`,
      activeContainers: 148,
      pendingShipmentsCount,
      arrivedShipmentsCount,
      currencyCode: this.currentCurrency().code,
      currencySymbol: symbol
    };
  });

  // Currency Converter Helper
  formatValue(amountUSD: number): string {
    const cur = this.currentCurrency();
    const val = amountUSD * cur.rate;
    if (val >= 1000000) {
      return `${cur.symbol}${(val / 1000000).toFixed(2)}M`;
    }
    return `${cur.symbol}${val.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
  }

  setCurrency(code: string) {
    const found = this.currencies().find(c => c.code === code);
    if (found) {
      this.currentCurrency.set(found);
    }
  }

  setRole(role: UserRole) {
    this.activeRole.set(role);
  }
}
