import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExportImportDataService, B2bProduct, BuyLead, SupplierBid } from '../../services/export-import-data.service';

@Component({
  selector: 'app-public-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-8 bg-slate-100 min-h-screen text-slate-800 font-sans pb-12">
      
      <!-- Classic Keya Group Corporate Top Navigation Bar (White Background) -->
      <header class="bg-white text-slate-900 border-b-2 border-slate-200 sticky top-0 z-40 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          
          <!-- Official Keya Group Logo & Conglomerate Header -->
          <div class="flex items-center gap-4 cursor-pointer" (click)="scrollToSection('hero')">
            <div class="p-1 rounded border border-slate-200">
              <img src="assets/logo/keya-logo.png" alt="Keya Group Logo" class="h-11 w-auto object-contain">
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="font-extrabold text-xl text-slate-900 tracking-tight">KEYA GROUP OF INDUSTRIES</span>
                <span class="px-2 py-0.5 text-[10px] font-bold bg-emerald-700 text-white rounded">100% EXPORT COMPLEX</span>
              </div>
              <p class="text-[11px] text-slate-600 font-medium">Composite Textiles, Spinning Mills, Apparel & Personal Care Toiletries</p>
            </div>
          </div>

          <!-- Public Corporate Navigation Links (Clean Dark Text on White Header) -->
          <div class="flex items-center gap-6 text-xs font-bold">
            <nav class="hidden md:flex items-center gap-6 text-slate-700">
              <button (click)="scrollToSection('hero')" class="hover:text-emerald-700 transition">Group Overview</button>
              <button (click)="scrollToSection('divisions')" class="hover:text-emerald-700 transition">Industrial Divisions</button>
              <button (click)="scrollToSection('products')" class="hover:text-emerald-700 transition">Export Products</button>
              <button (click)="scrollToSection('trade-hub')" class="hover:text-emerald-700 transition">Sourcing & Tenders</button>
              <button (click)="scrollToSection('calculator')" class="hover:text-emerald-700 transition">Container Calculator</button>
            </nav>
          </div>

        </div>
      </header>

      <!-- Classic Hero Showcase Banner -->
      <section id="hero" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-xl border-2 border-slate-300 p-8 sm:p-10 shadow-md relative overflow-hidden">
          
          <div class="grid lg:grid-cols-12 gap-8 items-center">
            
            <div class="lg:col-span-8 space-y-4">
              <div class="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded font-bold text-xs">
                🇧🇩 Bangladesh Premier Industrial Manufacturing Conglomerate
              </div>
              <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Global B2B Trade Sourcing & Raw Material Procurement Portal
              </h1>
              <p class="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                Serving top global brands across 35+ countries. International buyers can issue Buyer RFQs for custom garments and yarn, while global suppliers bid on raw cotton tenders.
              </p>

              <!-- Conglomerate Standard Statistics -->
              <div class="grid grid-cols-3 gap-4 pt-2 text-xs">
                <div class="p-3 bg-slate-50 rounded border border-slate-200">
                  <div class="text-slate-500 font-semibold">Annual Group Export</div>
                  <div class="text-lg font-bold text-emerald-700 font-mono">$220,000,000+</div>
                </div>
                <div class="p-3 bg-slate-50 rounded border border-slate-200">
                  <div class="text-slate-500 font-semibold">Monthly Garment Output</div>
                  <div class="text-lg font-bold text-blue-900 font-mono">4.5M Pcs / Month</div>
                </div>
                <div class="p-3 bg-slate-50 rounded border border-slate-200">
                  <div class="text-slate-500 font-semibold">Spinning Capacity</div>
                  <div class="text-lg font-bold text-amber-700 font-mono">3,800 MT Yarn</div>
                </div>
              </div>
            </div>

            <div class="lg:col-span-4 bg-slate-900 text-white rounded-xl p-6 border-t-4 border-amber-500 space-y-4 text-xs shadow-lg">
              <div class="font-bold text-sm text-amber-400 border-b border-slate-700 pb-2 uppercase tracking-wide">
                B2B Trade Quick Action
              </div>
              <p class="text-slate-300 text-[11px] leading-relaxed">
                Submit custom buying requirements or request direct FOB price quotes from Keya Group export sales team.
              </p>
              <button 
                (click)="showPostRfqModal.set(true)"
                class="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold rounded text-xs transition shadow">
                + Submit Buyer Requirement (RFQ)
              </button>
            </div>

          </div>

          <!-- B2B Search Bar -->
          <div class="mt-6 pt-5 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
            <div class="flex-1 flex items-center gap-2 px-3 bg-slate-50 rounded border border-slate-300 text-xs">
              <span class="text-slate-500">🔍</span>
              <input 
                type="text" 
                [ngModel]="dataService.b2bSearchQuery()"
                (ngModelChange)="dataService.b2bSearchQuery.set($event)"
                placeholder="Search Keya Products, HS Codes (e.g. 6105.10), or Raw Cotton Tenders..."
                class="w-full bg-transparent py-2.5 text-xs text-slate-900 font-medium focus:outline-none">
            </div>
          </div>

        </div>
      </section>

      <!-- Keya Group Industrial Divisions Section -->
      <section id="divisions" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div class="border-b border-slate-300 pb-2">
          <span class="text-xs font-bold uppercase text-emerald-700 tracking-wider">Manufacturing Infrastructure</span>
          <h2 class="text-2xl font-bold text-slate-900">Keya Industrial Divisions</h2>
        </div>

        <div class="grid md:grid-cols-2 gap-6 text-xs">
          
          <div class="p-6 bg-white rounded-xl border border-slate-300 shadow-sm space-y-3">
            <div class="flex items-start justify-between border-b border-slate-100 pb-2">
              <div>
                <span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">100% EXPORT APPAREL</span>
                <h3 class="text-lg font-bold text-slate-900 mt-1">Keya Knit Composite Ltd.</h3>
              </div>
              <span class="text-xs font-mono font-bold text-slate-500">Est. 1996</span>
            </div>
            <p class="text-slate-600">Vertical composite apparel manufacturing T-Shirts, Polo Shirts, Fleece Hoodies, and Sweatpants.</p>
            <div class="pt-2 flex justify-between font-mono text-slate-700 bg-slate-50 p-2.5 rounded">
              <span>Capacity: 4.5M Garments/Mo</span>
              <span class="font-bold text-emerald-700">Export: $120M/Year</span>
            </div>
          </div>

          <div class="p-6 bg-white rounded-xl border border-slate-300 shadow-sm space-y-3">
            <div class="flex items-start justify-between border-b border-slate-100 pb-2">
              <div>
                <span class="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold text-[10px]">RING SPUN YARN MILLS</span>
                <h3 class="text-lg font-bold text-slate-900 mt-1">Keya Spinning Mills Ltd.</h3>
              </div>
              <span class="text-xs font-mono font-bold text-slate-500">Est. 2003</span>
            </div>
            <p class="text-slate-600">Precision ring spun combed and carded cotton yarns (Ne 20/1 to 80/1) tested to Uster Top 5% benchmark.</p>
            <div class="pt-2 flex justify-between font-mono text-slate-700 bg-slate-50 p-2.5 rounded">
              <span>Capacity: 3,800 MT Yarn/Mo</span>
              <span class="font-bold text-blue-800">Export: $45M/Year</span>
            </div>
          </div>

          <div class="p-6 bg-white rounded-xl border border-slate-300 shadow-sm space-y-3">
            <div class="flex items-start justify-between border-b border-slate-100 pb-2">
              <div>
                <span class="px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-bold text-[10px]">PERSONAL CARE & SOAP</span>
                <h3 class="text-lg font-bold text-slate-900 mt-1">Keya Cosmetics & Toiletries</h3>
              </div>
              <span class="text-xs font-mono font-bold text-slate-500">Est. 1990</span>
            </div>
            <p class="text-slate-600">Global exporter of beauty soaps, glycerine, toothpaste, petroleum jelly, and laundry detergents.</p>
            <div class="pt-2 flex justify-between font-mono text-slate-700 bg-slate-50 p-2.5 rounded">
              <span>Capacity: 12,000 MT Soap/Mo</span>
              <span class="font-bold text-teal-800">Export: $30M/Year</span>
            </div>
          </div>

          <div class="p-6 bg-white rounded-xl border border-slate-300 shadow-sm space-y-3">
            <div class="flex items-start justify-between border-b border-slate-100 pb-2">
              <div>
                <span class="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px]">RAW MATERIAL SUPPLY</span>
                <h3 class="text-lg font-bold text-slate-900 mt-1">Keya Cotton & Fiber Supply</h3>
              </div>
              <span class="text-xs font-mono font-bold text-slate-500">Est. 2005</span>
            </div>
            <p class="text-slate-600">International raw cotton import procurement hub sourcing Australian Pima and US raw cotton bales.</p>
            <div class="pt-2 flex justify-between font-mono text-slate-700 bg-slate-50 p-2.5 rounded">
              <span>Capacity: 5,000 Bales Cotton/Mo</span>
              <span class="font-bold text-amber-800">Import: $25M/Year</span>
            </div>
          </div>

        </div>
      </section>

      <!-- Featured Export Products Catalog -->
      <section id="products" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div class="flex items-center justify-between border-b border-slate-300 pb-2">
          <div>
            <span class="text-xs font-bold uppercase text-emerald-700 tracking-wider">Product Showcase</span>
            <h2 class="text-2xl font-bold text-slate-900">Featured B2B Export Products</h2>
          </div>
          <span class="text-xs text-slate-500 font-mono font-semibold">{{ dataService.filteredB2bProducts().length }} Export Items Available</span>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          @for (prd of dataService.filteredB2bProducts(); track prd.id) {
            <div class="bg-white rounded-xl border border-slate-300 overflow-hidden shadow-sm flex flex-col sm:flex-row">
              <div class="sm:w-2/5 relative bg-slate-100 min-h-[160px]">
                <img [src]="prd.imageUrl" [alt]="prd.title" class="w-full h-full object-cover">
                <span class="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-900 text-white font-mono text-[10px] font-bold">
                  HS: {{ prd.hsCode }}
                </span>
              </div>
              <div class="sm:w-3/5 p-5 flex flex-col justify-between space-y-3 text-xs">
                <div>
                  <span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    {{ prd.sellerVerificationTier }}
                  </span>
                  <h4 class="font-bold text-slate-900 text-sm mt-1 leading-snug">{{ prd.title }}</h4>
                  <p class="text-slate-500 font-medium">Manufacturer: {{ prd.sellerName }}</p>
                </div>
                <div class="p-3 bg-slate-50 rounded border border-slate-200 space-y-1 font-mono">
                  <div class="flex justify-between"><span class="text-slate-500">FOB Price:</span><span class="font-bold text-emerald-700">{{ prd.fobPriceRange }}</span></div>
                  <div class="flex justify-between"><span class="text-slate-500">Min Order:</span><span class="font-bold text-slate-900">{{ prd.moq }}</span></div>
                </div>
                <button 
                  (click)="openInquiryModal(prd)"
                  class="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded text-xs transition shadow">
                  Inquire Now / Request Quotation
                </button>
              </div>
            </div>
          }
        </div>
      </section>

      <!-- 2-WAY B2B TRADE HUB: Buyer RFQs vs Keya Reverse Tenders -->
      <section id="trade-hub" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-300 pb-2">
          <div>
            <span class="text-xs font-bold uppercase text-blue-700 tracking-wider">Trade Engine</span>
            <h2 class="text-2xl font-bold text-slate-900">Sourcing RFQs & Supplier Reverse Tenders</h2>
          </div>

          <!-- Trade Mode Tabs -->
          <div class="p-1 bg-slate-200 rounded flex text-xs font-bold">
            <button 
              (click)="activeTradeTab.set('BUYER_RFQS')"
              [class]="activeTradeTab() === 'BUYER_RFQS' ? 'px-4 py-2 rounded bg-emerald-700 text-white shadow' : 'px-4 py-2 text-slate-700 hover:text-slate-900'">
              📥 Buyer Sourcing RFQs
            </button>
            <button 
              (click)="activeTradeTab.set('KEYA_TENDERS')"
              [class]="activeTradeTab() === 'KEYA_TENDERS' ? 'px-4 py-2 rounded bg-blue-800 text-white shadow' : 'px-4 py-2 text-slate-700 hover:text-slate-900'">
              📤 Keya Raw Material Tenders
            </button>
          </div>
        </div>

        <!-- Tab 1: Buyer RFQs -->
        @if (activeTradeTab() === 'BUYER_RFQS') {
          <div class="space-y-4">
            <div class="flex justify-between items-center bg-emerald-50 p-4 rounded border border-emerald-300 text-xs">
              <div class="text-emerald-950 font-semibold">
                🌐 International buyers: Submit custom garment buying requirements below. Keya Group Sales Team will contact you directly with full FOB quotes!
              </div>
              <button 
                (click)="showPostRfqModal.set(true)"
                class="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded text-xs shadow shrink-0">
                + Submit Buyer RFQ
              </button>
            </div>

            <div class="grid md:grid-cols-2 gap-4 text-xs">
              @for (lead of getBuyerRfqs(); track lead.id) {
                <div class="p-5 bg-white rounded-xl border border-slate-300 space-y-3 shadow-sm">
                  <div class="flex justify-between items-start">
                    <span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-mono font-bold text-[10px]">
                      {{ lead.leadCode }}
                    </span>
                    <span class="text-emerald-700 font-mono font-bold text-sm">
                      {{ dataService.formatValue(lead.targetUnitPriceUSD) }} / Target Unit
                    </span>
                  </div>
                  <h4 class="font-bold text-slate-900 text-sm leading-snug">{{ lead.title }}</h4>
                  
                  <!-- Full Buyer Contact Info Display -->
                  <div class="p-3 bg-slate-50 rounded border border-slate-200 text-xs space-y-1 font-mono">
                    <div class="font-sans font-bold text-slate-900 text-xs">🏢 Company: {{ lead.companyName || lead.buyerName }}</div>
                    <div class="text-slate-700 font-sans">👤 Contact Person: {{ lead.buyerName }}</div>
                    <div class="flex justify-between text-blue-900">
                      <span>📧 Email: {{ lead.buyerEmail }}</span>
                      <span>🌐 Country: {{ lead.destinationCountry }}</span>
                    </div>
                    @if (lead.buyerPhone) {
                      <div class="text-emerald-700 font-bold">📱 Phone/WhatsApp: {{ lead.buyerPhone }}</div>
                    }
                    <div class="text-slate-800 font-bold pt-1 font-sans">Qty Requested: {{ lead.quantityNeeded }}</div>
                  </div>

                  <p class="p-2.5 bg-white border border-slate-200 rounded text-slate-600 text-[11px]">
                    <strong class="text-slate-900">Specifications:</strong> {{ lead.specifications }}
                  </p>
                </div>
              }
            </div>
          </div>
        }

        <!-- Tab 2: Keya Group Procurement Tenders -->
        @if (activeTradeTab() === 'KEYA_TENDERS') {
          <div class="space-y-4">
            <div class="flex justify-between items-center bg-blue-50 p-4 rounded border border-blue-300 text-xs">
              <div class="text-blue-950 font-semibold">
                🔨 Raw Material Suppliers: View Keya Group procurement tenders below and submit your competitive pricing.
              </div>
            </div>

            <div class="space-y-4 text-xs">
              @for (tender of getKeyaTenders(); track tender.id) {
                <div class="p-6 bg-white rounded-xl border-2 border-blue-800 space-y-4 shadow-sm">
                  
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div class="flex items-center gap-3">
                      <span class="px-3 py-1 rounded bg-blue-100 text-blue-950 font-mono font-bold text-xs">
                        {{ tender.leadCode }}
                      </span>
                      <div>
                        <h4 class="text-base font-bold text-slate-900">{{ tender.title }}</h4>
                        <span class="text-slate-500">Issued by: Keya Raw Material Import Desk</span>
                      </div>
                    </div>

                    <div class="text-right font-mono">
                      <span class="text-xs text-slate-500">Target Budget:</span>
                      <div class="text-sm font-bold text-blue-800">{{ dataService.formatValue(tender.targetUnitPriceUSD) }} / Unit</div>
                    </div>
                  </div>

                  <div class="grid md:grid-cols-3 gap-4 bg-slate-50 p-3 rounded border border-slate-200">
                    <div><span class="text-slate-500 block">Volume Needed:</span><span class="font-bold font-mono text-slate-900">{{ tender.quantityNeeded }}</span></div>
                    <div><span class="text-slate-500 block">Port Delivery:</span><span class="font-bold text-slate-900">CIF Chattogram Port</span></div>
                    <div><span class="text-slate-500 block">Tender Deadline:</span><span class="font-bold font-mono text-amber-700">{{ tender.expiryDate }}</span></div>
                  </div>

                  <p class="text-slate-700"><strong class="text-slate-900">Specifications:</strong> {{ tender.specifications }}</p>

                  <div class="border-t border-slate-100 pt-3 space-y-2">
                    <div class="flex justify-between items-center">
                      <span class="font-bold text-slate-900 text-xs">Supplier Bids Received ({{ getBidsForTender(tender.leadCode).length }})</span>
                      <button 
                        (click)="openBidModal(tender)"
                        class="px-5 py-2 bg-blue-800 hover:bg-blue-900 text-white font-bold rounded text-xs shadow">
                        🔨 Place Supplier Bid / Submit Quote
                      </button>
                    </div>

                    <div class="grid md:grid-cols-2 gap-3">
                      @for (bid of getBidsForTender(tender.leadCode); track bid.id) {
                        <div class="p-3 bg-slate-50 rounded border border-slate-200 font-mono space-y-1">
                          <div class="flex justify-between">
                            <span class="font-bold text-slate-900 font-sans">{{ bid.supplierCompanyName }}</span>
                            <span class="text-emerald-700 font-bold">{{ dataService.formatValue(bid.offeredUnitPriceUSD) }} / Unit</span>
                          </div>
                          <div class="text-[11px] text-slate-500">Lead Time: {{ bid.deliveryLeadTimeDays }} Days • Status: {{ bid.status }}</div>
                        </div>
                      }
                    </div>
                  </div>

                </div>
              }
            </div>
          </div>
        }

      </section>

      <!-- Container Freight Calculator Section -->
      <section id="calculator" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div class="border-b border-slate-300 pb-2">
          <span class="text-xs font-bold uppercase text-blue-700 tracking-wider">Logistics Utility</span>
          <h2 class="text-2xl font-bold text-slate-900">Container Freight Capacity Calculator</h2>
        </div>
        <div class="p-6 bg-white rounded-xl border border-slate-300 shadow-sm">
          <div class="grid md:grid-cols-2 gap-6 text-xs">
            <div class="space-y-3">
              <div>
                <label class="block text-slate-700 font-semibold mb-1">Total Quantity (Cartons)</label>
                <input type="number" [(ngModel)]="calcQty" class="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-slate-900 font-mono">
              </div>
              <div class="grid grid-cols-3 gap-2">
                <div><label class="block text-slate-700 mb-1">L (cm)</label><input type="number" [(ngModel)]="calcL" class="w-full bg-slate-50 border border-slate-300 rounded p-2 font-mono"></div>
                <div><label class="block text-slate-700 mb-1">W (cm)</label><input type="number" [(ngModel)]="calcW" class="w-full bg-slate-50 border border-slate-300 rounded p-2 font-mono"></div>
                <div><label class="block text-slate-700 mb-1">H (cm)</label><input type="number" [(ngModel)]="calcH" class="w-full bg-slate-50 border border-slate-300 rounded p-2 font-mono"></div>
              </div>
            </div>
            <div class="p-5 bg-slate-900 text-white rounded-xl space-y-2 font-mono">
              <div class="text-slate-400 text-xs font-sans">Total Calculated Volume:</div>
              <div class="text-2xl font-bold text-emerald-400">{{ getCalcCbm().toFixed(2) }} CBM</div>
              <div class="text-xs text-slate-300">40FT HC Container Utilization: {{ (getCalcCbm() / 76.4 * 100).toFixed(1) }}%</div>
            </div>
          </div>
        </div>
      </section>

      <!-- POST BUYER REQUIREMENT (RFQ) MODAL WITH FULL CONTACT DETAILS -->
      @if (showPostRfqModal()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
          <div class="bg-white w-full max-w-lg rounded-xl p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-300 text-slate-900 my-8">
            
            <div class="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span class="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Keya Group Global Sourcing</span>
                <h3 class="text-lg font-bold text-slate-900">Post Custom Buyer Requirement (RFQ)</h3>
              </div>
              <button (click)="showPostRfqModal.set(false)" class="text-slate-400 hover:text-slate-700 font-bold text-lg">✕</button>
            </div>

            <p class="text-xs text-slate-600 bg-emerald-50 p-3 rounded border border-emerald-200">
              Please fill in your company and contact details below so Keya Group's Export Sales Desk can reach out to you directly with official pricing and samples.
            </p>

            <div class="space-y-3 text-xs">
              
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-slate-700 font-bold mb-1">Company Name *</label>
                  <input type="text" [(ngModel)]="newLeadCompanyName" placeholder="e.g. H&M Sourcing GmbH" class="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-slate-900">
                </div>
                <div>
                  <label class="block text-slate-700 font-bold mb-1">Contact Person Name *</label>
                  <input type="text" [(ngModel)]="newLeadBuyerName" placeholder="e.g. Johnathan Miller" class="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-slate-900">
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-slate-700 font-bold mb-1">Contact Email Address *</label>
                  <input type="email" [(ngModel)]="newLeadEmail" placeholder="j.miller&#64;hm-sourcing.de" class="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-slate-900 font-mono">
                </div>
                <div>
                  <label class="block text-slate-700 font-bold mb-1">Phone / WhatsApp No *</label>
                  <input type="text" [(ngModel)]="newLeadPhone" placeholder="+49 170 1234567" class="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-slate-900 font-mono">
                </div>
              </div>

              <div>
                <label class="block text-slate-700 font-bold mb-1">Requirement Title / Product *</label>
                <input type="text" [(ngModel)]="newLeadTitle" placeholder="e.g. 50,000 Pcs 100% Organic Pique Polo Shirts" class="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-slate-900">
              </div>

              <div class="grid grid-cols-3 gap-3">
                <div>
                  <label class="block text-slate-700 font-bold mb-1">Quantity Needed</label>
                  <input type="text" [(ngModel)]="newLeadQty" placeholder="50,000 Pcs" class="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-slate-900 font-mono">
                </div>
                <div>
                  <label class="block text-slate-700 font-bold mb-1">Target FOB ($)</label>
                  <input type="number" [(ngModel)]="newLeadTargetPrice" placeholder="5.20" class="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-slate-900 font-mono">
                </div>
                <div>
                  <label class="block text-slate-700 font-bold mb-1">Destination Country</label>
                  <input type="text" [(ngModel)]="newLeadCountry" placeholder="Germany" class="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-slate-900">
                </div>
              </div>

              <div>
                <label class="block text-slate-700 font-bold mb-1">Technical Specifications & Fabric Details</label>
                <textarea [(ngModel)]="newLeadSpecs" rows="3" placeholder="Specify GSM, Yarn Count, Dyeing parameters, Labelling, Delivery terms..." class="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-slate-900"></textarea>
              </div>

            </div>

            <div class="pt-3 border-t border-slate-200 flex justify-end gap-2">
              <button (click)="showPostRfqModal.set(false)" class="px-4 py-2.5 bg-slate-100 text-slate-700 rounded text-xs font-semibold">Cancel</button>
              <button (click)="submitBuyLead()" class="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded text-xs shadow-md">
                Publish RFQ & Send to Keya Sales Team
              </button>
            </div>

          </div>
        </div>
      }

      <!-- Place Supplier Bid Modal -->
      @if (showBidModal()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div class="bg-white w-full max-w-lg rounded-xl p-6 space-y-4 shadow-2xl">
            <div class="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span class="text-[10px] font-bold text-blue-800 uppercase">Keya Procurement Tender Bid</span>
                <h3 class="text-base font-bold text-slate-900">Submit Supplier Quote Proposal</h3>
              </div>
              <button (click)="showBidModal.set(false)" class="text-slate-400 hover:text-slate-700 font-bold">✕</button>
            </div>

            @if (selectedTenderForBid()) {
              <div class="p-3 bg-blue-50 rounded border border-blue-200 text-xs">
                <span class="font-bold text-blue-950">{{ selectedTenderForBid()?.title }}</span>
                <div class="text-slate-500 font-mono">Target Price: {{ dataService.formatValue(selectedTenderForBid()?.targetUnitPriceUSD || 0) }} / Unit</div>
              </div>
            }

            <div class="space-y-3 text-xs">
              <div>
                <label class="block text-slate-700 font-semibold mb-1">Your Supplier Company Name</label>
                <input type="text" [(ngModel)]="bidCompanyName" placeholder="e.g. Queensland Cotton Corp (Australia)" class="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-slate-900">
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-slate-700 font-semibold mb-1">Offered Unit Price (USD)</label>
                  <input type="number" [(ngModel)]="bidUnitPrice" placeholder="3.75" class="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-slate-900 font-mono">
                </div>
                <div>
                  <label class="block text-slate-700 font-semibold mb-1">Delivery Lead Time (Days)</label>
                  <input type="number" [(ngModel)]="bidLeadTime" placeholder="14" class="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-slate-900 font-mono">
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-slate-700 font-semibold mb-1">Contact Email</label>
                  <input type="email" [(ngModel)]="bidEmail" placeholder="supplier&#64;trade.com" class="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-slate-900 font-mono">
                </div>
                <div>
                  <label class="block text-slate-700 font-semibold mb-1">Contact Phone</label>
                  <input type="text" [(ngModel)]="bidPhone" placeholder="+61 7 3000 8888" class="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-slate-900 font-mono">
                </div>
              </div>

              <div>
                <label class="block text-slate-700 font-semibold mb-1">Proposal Details & Quality Compliance</label>
                <textarea [(ngModel)]="bidProposal" rows="3" placeholder="Specify quality parameters, ICA certificate, freight terms..." class="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-slate-900"></textarea>
              </div>
            </div>

            <div class="pt-3 border-t border-slate-200 flex justify-end gap-2">
              <button (click)="showBidModal.set(false)" class="px-4 py-2 bg-slate-100 text-slate-700 rounded text-xs font-semibold">Cancel</button>
              <button (click)="submitSupplierBid()" class="px-5 py-2 bg-blue-800 text-white font-bold rounded text-xs shadow">Submit Bid Proposal</button>
            </div>
          </div>
        </div>
      }

      <!-- Send Inquiry Modal -->
      @if (showInquiryModal()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div class="bg-white w-full max-w-lg rounded-xl p-6 space-y-4 shadow-2xl">
            <div class="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 class="text-base font-bold text-slate-900">Send Direct Trade Inquiry</h3>
              <button (click)="showInquiryModal.set(false)" class="text-slate-400 hover:text-slate-700 font-bold">✕</button>
            </div>
            <div class="space-y-3 text-xs">
              <div><label class="block text-slate-700 font-semibold mb-1">Your Name</label><input type="text" [(ngModel)]="inquiryName" placeholder="Buyer Rep" class="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-slate-900"></div>
              <div><label class="block text-slate-700 font-semibold mb-1">Email</label><input type="email" [(ngModel)]="inquiryEmail" placeholder="buyer&#64;trade.com" class="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-slate-900 font-mono"></div>
              <div><label class="block text-slate-700 font-semibold mb-1">Message</label><textarea [(ngModel)]="inquiryMessage" rows="3" placeholder="Please send FOB pricing quote..." class="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-slate-900"></textarea></div>
            </div>
            <div class="pt-3 border-t border-slate-200 flex justify-end gap-2">
              <button (click)="showInquiryModal.set(false)" class="px-4 py-2 bg-slate-100 text-slate-700 rounded text-xs font-semibold">Cancel</button>
              <button (click)="submitInquiry()" class="px-4 py-2 bg-emerald-700 text-white font-bold rounded text-xs">Send Inquiry</button>
            </div>
          </div>
        </div>
      }

    </div>
  `
})
export class PublicHomeComponent {
  dataService = inject(ExportImportDataService);

  activeTradeTab = signal<'BUYER_RFQS' | 'KEYA_TENDERS'>('BUYER_RFQS');

  showPostRfqModal = signal(false);
  showBidModal = signal(false);
  showInquiryModal = signal(false);

  selectedProductForInquiry = signal<B2bProduct | null>(null);
  selectedTenderForBid = signal<BuyLead | null>(null);

  // RFQ Form Detailed Buyer Contact Fields
  newLeadTitle = '';
  newLeadCompanyName = '';
  newLeadBuyerName = '';
  newLeadEmail = '';
  newLeadPhone = '';
  newLeadQty = '50,000 Pcs';
  newLeadTargetPrice = 5.20;
  newLeadCountry = 'Germany';
  newLeadSpecs = '';

  // Bid Form
  bidCompanyName = '';
  bidUnitPrice = 3.75;
  bidLeadTime = 14;
  bidEmail = '';
  bidPhone = '';
  bidProposal = '';

  // Inquiry Form
  inquiryName = '';
  inquiryEmail = '';
  inquiryMessage = '';

  // Calc Form
  calcQty = 800;
  calcL = 60;
  calcW = 40;
  calcH = 40;

  getBuyerRfqs(): BuyLead[] {
    return this.dataService.buyLeads().filter(l => l.type === 'BUYER_RFQ' || !l.type);
  }

  getKeyaTenders(): BuyLead[] {
    return this.dataService.buyLeads().filter(l => l.type === 'KEYA_TENDER');
  }

  getBidsForTender(tenderCode: string): SupplierBid[] {
    return this.dataService.supplierBids().filter(b => b.tenderCode === tenderCode);
  }

  getCalcCbm(): number {
    return (this.calcL * this.calcW * this.calcH * this.calcQty) / 1000000;
  }

  scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  openInquiryModal(product: B2bProduct) {
    this.selectedProductForInquiry.set(product);
    this.showInquiryModal.set(true);
  }

  openBidModal(tender: BuyLead) {
    this.selectedTenderForBid.set(tender);
    this.showBidModal.set(true);
  }

  submitBuyLead() {
    if (!this.newLeadTitle || !this.newLeadEmail) {
      alert('Please enter your Requirement Title and Email Address so Keya Group can contact you!');
      return;
    }

    this.dataService.postBuyLead({
      title: this.newLeadTitle,
      companyName: this.newLeadCompanyName || 'Global Sourcing Corp',
      buyerName: this.newLeadBuyerName || 'International Buyer Rep',
      buyerEmail: this.newLeadEmail,
      buyerPhone: this.newLeadPhone || '+1 555 0192',
      quantityNeeded: this.newLeadQty || '10,000 Pcs',
      targetUnitPriceUSD: this.newLeadTargetPrice || 5.0,
      destinationCountry: this.newLeadCountry || 'Germany',
      specifications: this.newLeadSpecs || 'Standard Export Quality'
    });

    alert(`Success! Your Buying Requirement (${this.newLeadTitle}) has been submitted. Keya Group Sales Team will contact you at ${this.newLeadEmail} / ${this.newLeadPhone}.`);
    
    this.showPostRfqModal.set(false);
    this.newLeadTitle = '';
    this.newLeadEmail = '';
    this.newLeadPhone = '';
  }

  submitSupplierBid() {
    if (!this.bidCompanyName) return;
    this.dataService.placeSupplierBid({
      tenderCode: this.selectedTenderForBid()?.leadCode || 'TENDER-801',
      supplierCompanyName: this.bidCompanyName,
      offeredUnitPriceUSD: this.bidUnitPrice || 3.75,
      deliveryLeadTimeDays: this.bidLeadTime || 14,
      proposalDetails: this.bidProposal || 'Full ICA Quality Compliance',
      contactEmail: this.bidEmail || 'supplier@trade.com',
      contactPhone: this.bidPhone || '+61 7 3000 8888'
    });
    this.showBidModal.set(false);
    this.bidCompanyName = '';
    this.bidProposal = '';
  }

  submitInquiry() {
    if (!this.inquiryMessage) return;
    this.dataService.sendInquiry({
      subject: `Inquiry for ${this.selectedProductForInquiry()?.title || 'Product'}`,
      message: this.inquiryMessage,
      senderName: this.inquiryName || 'Buyer Representative',
      senderEmail: this.inquiryEmail || 'buyer@trade.com'
    });
    this.showInquiryModal.set(false);
    this.inquiryMessage = '';
  }
}
