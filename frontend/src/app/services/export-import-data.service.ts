import { Injectable, signal, computed } from '@angular/core';

export interface CurrencyRate {
  code: string;
  name: string;
  symbol: string;
  rate: number;
  flag: string;
}

export type UserRole = 'Admin' | 'Investigating Officer' | 'Operator';

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

// B2B Trade & Bidding Models
export interface B2bProduct {
  id: string;
  productCode: string;
  title: string;
  category: string;
  moq: string;
  fobPriceRange: string;
  fobPriceMinUSD: number;
  fobPriceMaxUSD: number;
  supplyCapacity: string;
  sellerName: string;
  sellerVerificationTier: 'Platinum Verified' | 'Gold Verified' | 'Verified Exporter';
  country: string;
  imageUrl: string;
  hsCode: string;
  portOfLoading: string;
}

export interface BuyLead {
  id: string;
  leadCode: string;
  title: string;
  category: string;
  quantityNeeded: string;
  targetUnitPriceUSD: number;
  destinationCountry: string;
  buyerName: string;
  companyName: string;
  buyerEmail: string;
  buyerPhone: string;
  status: 'New RFQ' | 'Active Buy Lead' | 'Active Procurement Tender' | 'Closed';
  expiryDate: string;
  specifications: string;
  type: 'BUYER_RFQ' | 'KEYA_TENDER';
}

export interface SupplierBid {
  id: string;
  bidCode: string;
  tenderCode: string;
  supplierCompanyName: string;
  offeredUnitPriceUSD: number;
  totalBidValueUSD: number;
  deliveryLeadTimeDays: number;
  proposalDetails: string;
  contactEmail: string;
  contactPhone: string;
  status: 'Submitted' | 'Under Review' | 'Accepted' | 'Rejected';
}

export interface TradeInquiry {
  id: string;
  inquiryCode: string;
  subject: string;
  message: string;
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  targetProductOrLeadCode: string;
  status: string;
  dateSent: string;
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

  readonly currentCurrency = signal<CurrencyRate>(this.currencies()[0]);

  // Current Authenticated User Signal (null = logged out)
  readonly currentUser = signal<UserRoleProfile | null>(null);

  // Search & Filter Signals
  readonly searchQuery = signal<string>('');
  readonly selectedTypeFilter = signal<'ALL' | 'EXPORT' | 'IMPORT'>('ALL');
  readonly selectedDivisionFilter = signal<string>('ALL');
  readonly b2bSearchQuery = signal<string>('');

  // Pre-configured Registered Staff Users (3 Roles)
  readonly users = signal<UserRoleProfile[]>([
    {
      id: 'USR-ADM-01',
      name: 'Abdul Khaleque Pathan',
      email: 'admin@keyagroupbd.com',
      role: 'Admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      department: 'Executive Board & Systems Admin',
      permissions: ['ALL_ACCESS', 'MANAGE_USERS', 'EXECUTIVE_REPORTS', 'LC_APPROVAL']
    },
    {
      id: 'USR-INV-02',
      name: 'Major Saifuddin Ahmed',
      email: 'investigator@keyagroupbd.com',
      role: 'Investigating Officer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      department: 'Customs, Duty & Compliance Audit',
      permissions: ['CUSTOMS_AUDIT', 'DUTY_INSPECTION', 'CERTIFICATE_VERIFY', 'LANDED_COST_AUDIT']
    },
    {
      id: 'USR-OPR-03',
      name: 'Tariqul Islam',
      email: 'operator@keyagroupbd.com',
      role: 'Operator',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      department: 'Gazipur Central Warehouse & PO Entry',
      permissions: ['WAREHOUSE_BIN', 'PO_ENTRY', 'EXPORT_STATUS_UPDATE', 'FREIGHT_CALC']
    }
  ]);

  // Master Data Signals
  readonly b2bProducts = signal<B2bProduct[]>([
    { id: '1', productCode: 'B2B-101', title: 'Custom Dyed Heavyweight Fleece Hoodies (GOTS Certified)', category: 'Knitwear & Apparel', moq: '1,000 Pcs', fobPriceRange: '$8.50 - $11.00 / Pc', fobPriceMinUSD: 8.50, fobPriceMaxUSD: 11.00, supplyCapacity: '150,000 Pcs / Month', sellerName: 'Keya Knit Composite Ltd.', sellerVerificationTier: 'Platinum Verified', country: 'Bangladesh', hsCode: '6110.20', imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80', portOfLoading: 'Chattogram Port (CGP)' },
    { id: '2', productCode: 'B2B-102', title: 'Combed Ring Spun 100% Cotton Yarn Ne 30/1 - 40/1', category: 'Raw Cotton & Fiber', moq: '5 Metric Tons', fobPriceRange: '$4.20 - $4.80 / Kg', fobPriceMinUSD: 4.20, fobPriceMaxUSD: 4.80, supplyCapacity: '3,800 MT / Month', sellerName: 'Keya Spinning Mills Ltd.', sellerVerificationTier: 'Gold Verified', country: 'Bangladesh', hsCode: '5205.22', imageUrl: 'https://images.unsplash.com/photo-1605289355680-75fb4526f652?auto=format&fit=crop&w=800&q=80', portOfLoading: 'Chattogram Port (CGP)' }
  ]);

  readonly buyLeads = signal<BuyLead[]>([
    { 
      id: '1', 
      leadCode: 'RFQ-901', 
      title: 'Looking to Buy 50,000 Pcs Organic Pique Polo Shirts', 
      category: 'Knitwear & Apparel', 
      quantityNeeded: '50,000 Pcs', 
      targetUnitPriceUSD: 5.20, 
      destinationCountry: 'Germany', 
      buyerName: 'Johnathan Miller (Senior Sourcing Manager)',
      companyName: 'H&M European Sourcing GmbH', 
      buyerEmail: 'j.miller@hm-sourcing.de',
      buyerPhone: '+49 170 1234567', 
      status: 'New RFQ', 
      expiryDate: '2026-09-30', 
      specifications: '100% GOTS Organic Cotton, OEKO-TEX Class 1, Custom Embroidery on Chest. Target FOB Delivery to Hamburg.', 
      type: 'BUYER_RFQ' 
    },
    { 
      id: '2', 
      leadCode: 'RFQ-902', 
      title: 'Bulk Order Inquiry: 30,000 Pcs Fleece Crewneck Sweatshirts', 
      category: 'Knitwear & Apparel', 
      quantityNeeded: '30,000 Pcs', 
      targetUnitPriceUSD: 7.80, 
      destinationCountry: 'Spain', 
      buyerName: 'Carlos Rossi (Procurement Lead)',
      companyName: 'Zara Inditex Sourcing S.A.', 
      buyerEmail: 'c.rossi@inditex.es',
      buyerPhone: '+34 911 889900', 
      status: 'New RFQ', 
      expiryDate: '2026-10-10', 
      specifications: '320 GSM Brushed Back Fleece, Custom Polybag Packaging, Barcode labeling required.', 
      type: 'BUYER_RFQ' 
    },
    { 
      id: '3', 
      leadCode: 'TENDER-801', 
      title: '[KEYA PROCUREMENT TENDER] Procurement: 500 Metric Tons Raw Australian Cotton Bales', 
      category: 'Raw Cotton & Fiber', 
      quantityNeeded: '500 MT (2,300 Bales)', 
      targetUnitPriceUSD: 3.80, 
      destinationCountry: 'Bangladesh (Chattogram Port)', 
      buyerName: 'Keya Group Raw Material Desk',
      companyName: 'Keya Cotton & Fiber Supply', 
      buyerEmail: 'procurement@keyagroupbd.com',
      buyerPhone: '+880 2 9888888', 
      status: 'Active Procurement Tender', 
      expiryDate: '2026-09-25', 
      specifications: 'Staple length 1-5/32 inch, Micronaire 3.8 - 4.2, CIF Chattogram Port.', 
      type: 'KEYA_TENDER' 
    }
  ]);

  readonly supplierBids = signal<SupplierBid[]>([
    { id: '1', bidCode: 'BID-1001', tenderCode: 'TENDER-801', supplierCompanyName: 'Queensland Cotton Corp (Australia)', offeredUnitPriceUSD: 3.75, totalBidValueUSD: 1875000, deliveryLeadTimeDays: 14, proposalDetails: 'Premium High Combing Australian Raw Cotton Bales. Full ICA Quality Compliance Guarantee.', contactEmail: 'j.donaldson@qldcotton.au', contactPhone: '+61 7 3000 8888', status: 'Under Review' },
    { id: '2', bidCode: 'BID-1002', tenderCode: 'TENDER-801', supplierCompanyName: 'Uster Cotton Fiber Inc (USA)', offeredUnitPriceUSD: 3.82, totalBidValueUSD: 1910000, deliveryLeadTimeDays: 18, proposalDetails: 'Memphis US Pima Raw Cotton Bales. Tested for HVI fiber strength.', contactEmail: 'mvance@usterfiber.us', contactPhone: '+1 901 555 0192', status: 'Submitted' }
  ]);

  readonly tradeInquiries = signal<TradeInquiry[]>([
    { id: '1', inquiryCode: 'INQ-1001', subject: 'Inquiry regarding Fleece Hoodies Bulk Price & Lead Time', message: 'Hello Keya Team, we are interested in ordering 20,000 Pcs of custom hoodies. Please send your FOB quotation.', senderName: 'Mark Vance (Target Sourcing)', senderEmail: 'm.vance@target.com', senderPhone: '+1 612 555 0192', targetProductOrLeadCode: 'B2B-101', status: 'Quote Sent', dateSent: '2026-08-30' }
  ]);

  readonly shipments = signal<Shipment[]>([
    { id: 'SHP-EX-9921', bolNumber: 'MSCUBD8849201', lcNumber: 'LC-HSBC-2026-081', type: 'EXPORT', division: 'Keya Knit Composite Ltd.', clientOrSupplier: 'H&M Global Sourcing (Hamburg, Germany)', originPort: 'Chattogram Port (CGP), Bangladesh', destinationPort: 'Hamburg Port, Germany', containerId: 'MSCU7729104', containerSize: '40FT HC', itemsDescription: '100% Organic Cotton Men\'s Pique Polo Shirts', quantityUnits: '42,500 Pcs', valueUSD: 212500, status: 'Loaded at Sea', progressPercentage: 65, eta: '2026-08-28', departureDate: '2026-08-10', vesselName: 'MSC Isabella (Voyage 402W)' }
  ]);

  readonly filteredShipments = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const typeFilter = this.selectedTypeFilter();
    return this.shipments().filter(shp => {
      const matchesType = typeFilter === 'ALL' || shp.type === typeFilter;
      const matchesQuery = !query || shp.id.toLowerCase().includes(query) || shp.bolNumber.toLowerCase().includes(query);
      return matchesType && matchesQuery;
    });
  });

  readonly products = signal<Product[]>([
    { id: 'PRD-101', name: '100% Cotton Pique Polo Shirt', sku: 'KEYA-KNIT-POLO-01', category: 'Knitwear', unit: 'Pcs', supplierId: 'SUP-01', supplierName: 'Queensland Cotton Corp', countryOfOrigin: 'Bangladesh', hsCode: '6105.10', unitPriceUSD: 5.0, stockLevel: 85000 }
  ]);

  readonly suppliers = signal<Supplier[]>([
    { id: 'SUP-01', name: 'Queensland Cotton Corp', country: 'Australia', contactPerson: 'John Donaldson', email: 'j.donaldson@qldcotton.au', phone: '+61 7 3000 8888', rating: 4.9, totalTransactionsUSD: 42000000, suppliedProducts: ['Raw Cotton Bales', 'Combing Fiber'], status: 'Active' }
  ]);

  readonly customers = signal<Customer[]>([
    { id: 'CUST-01', companyName: 'H&M Global Sourcing GmbH', country: 'Germany', contactPerson: 'Emma Lindqvist', email: 'sourcing@hm.com', totalOrdersUSD: 65000000, creditLimitUSD: 10000000 }
  ]);

  readonly importPOs = signal<ImportPO[]>([
    { poNumber: 'PO-IMP-2026-081', piNumber: 'PI-QLD-8820', lcNumber: 'LC-HSBC-2026-081', supplierName: 'Queensland Cotton Corp', productName: 'Australian Raw Cotton Bales', quantity: 1200, unit: 'Bales', unitPriceUSD: 390.0, totalValueUSD: 468000, currency: 'USD', expectedArrival: '2026-08-25', status: 'In Transit' },
    { poNumber: 'PO-IMP-2026-082', piNumber: 'PI-UST-9901', lcNumber: 'LC-HSBC-2026-084', supplierName: 'Uster Cotton Fiber Inc', productName: 'Memphis US Pima Raw Cotton Bales', quantity: 1500, unit: 'Bales', unitPriceUSD: 382.0, totalValueUSD: 573000, currency: 'USD', expectedArrival: '2026-09-10', status: 'LC Opened' }
  ]);

  readonly customsDocs = signal<CustomsDoc[]>([
    { docId: 'DOC-CI-9921', type: 'Commercial Invoice', refNumber: 'INV-KEYA-2026-092', dutyTaxUSD: 0, clearanceStatus: 'Passed', issueDate: '2026-08-10' }
  ]);

  readonly warehouseStock = signal<WarehouseItem[]>([
    { id: 'WH-01', productName: '100% Cotton Pique Polo Shirt', sku: 'KEYA-KNIT-POLO-01', importedQty: 90000, receivedQty: 88500, damagedQty: 1500, currentStock: 85000, unit: 'Pcs', warehouseLocation: 'Gazipur Central Hub' }
  ]);

  readonly exportOrders = signal<ExportOrder[]>([
    { orderId: 'EXP-SO-8812', customerName: 'H&M Global Sourcing GmbH', destinationCountry: 'Germany', salesOrderNo: 'SO-KEYA-2026-44', exportInvoiceNo: 'EXP-INV-8812', exportQuantity: 42500, unit: 'Pcs', exportValueUSD: 212500, status: 'Vessel Dispatched' },
    { orderId: 'EXP-SO-8813', customerName: 'Zara Inditex Sourcing S.A.', destinationCountry: 'Spain', salesOrderNo: 'SO-KEYA-2026-45', exportInvoiceNo: 'EXP-INV-8813', exportQuantity: 65000, unit: 'Pcs', exportValueUSD: 357500, status: 'Customs Cleared' }
  ]);

  readonly landedCosts = signal<LandedCostBreakdown[]>([
    { importId: 'IMP-COST-301', productName: 'Australian Raw Cotton Bales', baseCostUSD: 390.0, freightUSD: 24.5, insuranceUSD: 3.8, customsDutyUSD: 35.1, portChargesUSD: 8.2, cnfChargesUSD: 5.4, otherExpensesUSD: 3.0, totalLandedCostUSD: 470.0, landedUnitCostUSD: 470.0, quantity: 1200, projectedProfitMargin: 24.5 }
  ]);

  readonly filteredB2bProducts = computed(() => {
    const query = this.b2bSearchQuery().toLowerCase().trim();
    return this.b2bProducts().filter(p => !query || p.title.toLowerCase().includes(query) || p.hsCode.toLowerCase().includes(query));
  });

  readonly metrics = computed(() => {
    const rate = this.currentCurrency().rate;
    const symbol = this.currentCurrency().symbol;
    const totalExports = 220000000;
    const totalImports = 75000000;

    return {
      totalExportsFormatted: `${symbol}${(totalExports * rate / 1000000).toFixed(1)}M`,
      totalImportsFormatted: `${symbol}${(totalImports * rate / 1000000).toFixed(1)}M`,
      exportsFormatted: `${symbol}${(totalExports * rate / 1000000).toFixed(1)}M`,
      importsFormatted: `${symbol}${(totalImports * rate / 1000000).toFixed(1)}M`,
      activeContainers: 148,
      pendingShipmentsCount: 14,
      arrivedShipmentsCount: 134,
      currencyCode: this.currentCurrency().code,
      currencySymbol: symbol
    };
  });

  // Authentication Actions
  login(email: string, password: string): boolean {
    const found = this.users().find(u => u.email.toLowerCase() === email.toLowerCase().trim());
    if (found) {
      this.currentUser.set(found);
      return true;
    }
    return false;
  }

  logout() {
    this.currentUser.set(null);
  }

  setCurrency(code: string) {
    const found = this.currencies().find(c => c.code === code);
    if (found) this.currentCurrency.set(found);
  }

  formatValue(amountUSD: number): string {
    const cur = this.currentCurrency();
    const val = amountUSD * cur.rate;
    if (val >= 1000000) {
      return `${cur.symbol}${(val / 1000000).toFixed(2)}M`;
    }
    return `${cur.symbol}${val.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
  }

  postBuyLead(lead: Partial<BuyLead>) {
    const newLead: BuyLead = {
      id: (this.buyLeads().length + 1).toString(),
      leadCode: `RFQ-${Date.now().toString().slice(-4)}`,
      title: lead.title || 'Buying Requirement',
      category: lead.category || 'Knitwear & Apparel',
      quantityNeeded: lead.quantityNeeded || '10,000 Pcs',
      targetUnitPriceUSD: lead.targetUnitPriceUSD || 5.0,
      destinationCountry: lead.destinationCountry || 'Germany',
      buyerName: lead.buyerName || 'International Buyer Rep',
      companyName: lead.companyName || 'Global Sourcing Corp',
      buyerEmail: lead.buyerEmail || 'buyer@trade.com',
      buyerPhone: lead.buyerPhone || '+1 555 0192',
      status: 'New RFQ',
      expiryDate: '2026-10-15',
      specifications: lead.specifications || 'Standard OEM Custom Packaging',
      type: 'BUYER_RFQ'
    };
    this.buyLeads.update(list => [newLead, ...list]);
  }

  placeSupplierBid(bid: Partial<SupplierBid>) {
    const newBid: SupplierBid = {
      id: (this.supplierBids().length + 1).toString(),
      bidCode: `BID-${Date.now().toString().slice(-4)}`,
      tenderCode: bid.tenderCode || 'TENDER-801',
      supplierCompanyName: bid.supplierCompanyName || 'External Raw Material Supplier',
      offeredUnitPriceUSD: bid.offeredUnitPriceUSD || 3.75,
      totalBidValueUSD: bid.totalBidValueUSD || 1875000,
      deliveryLeadTimeDays: bid.deliveryLeadTimeDays || 14,
      proposalDetails: bid.proposalDetails || 'Full Quality Assurance & ICA Standard Certified.',
      contactEmail: bid.contactEmail || 'supplier@cotton-trade.com',
      contactPhone: bid.contactPhone || '+61 7 0000 1111',
      status: 'Submitted'
    };
    this.supplierBids.update(list => [newBid, ...list]);
  }

  sendInquiry(inquiry: Partial<TradeInquiry>) {
    const newInquiry: TradeInquiry = {
      id: (this.tradeInquiries().length + 1).toString(),
      inquiryCode: `INQ-${Date.now().toString().slice(-4)}`,
      subject: inquiry.subject || 'Quotative Request',
      message: inquiry.message || 'Please send FOB unit price quote.',
      senderName: inquiry.senderName || 'Buyer Representative',
      senderEmail: inquiry.senderEmail || 'inquiry@buyer.com',
      senderPhone: inquiry.senderPhone || '+1 555 0192',
      targetProductOrLeadCode: inquiry.targetProductOrLeadCode || 'B2B-101',
      status: 'Sent to Seller',
      dateSent: new Date().toISOString().split('T')[0]
    };
    this.tradeInquiries.update(list => [newInquiry, ...list]);
  }
}
