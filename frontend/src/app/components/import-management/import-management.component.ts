import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExportImportDataService, ImportPO, SupplierBid, BuyLead } from '../../services/export-import-data.service';

export type AuditTimeframe = 'THIS_MONTH' | 'THIS_YEAR' | 'TARGETED_MONTH' | 'LIFETIME';

@Component({
  selector: 'app-import-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6">
      
      <!-- Top Banner -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div class="flex items-center gap-4">
          <img src="assets/logo/keya-logo.png" alt="Keya Group Logo" class="h-12 w-auto object-contain">
          <div>
            <span class="text-xs font-bold text-blue-600 uppercase tracking-wider">Keya Raw Material Imports</span>
            <h2 class="text-2xl font-black text-slate-900">Import Purchase Orders & Procurement Tenders Desk</h2>
            <p class="text-xs text-slate-500 mt-0.5">Post Keya Import Tenders for suppliers, evaluate incoming bids, issue POs, and open LCs.</p>
          </div>
        </div>

        <div class="flex items-center gap-2 flex-wrap">
          <!-- Investigating Officer & Admin PDF Report Generator Button -->
          @if (isInvestigatingOfficer() || isAdmin()) {
            <button 
              (click)="openPdfModal()"
              class="px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow">
              <span>📄 Generate Customized Audit PDF</span>
            </button>
          }

          <!-- Admin & Operator Buttons -->
          @if (!isInvestigatingOfficer()) {
            <!-- KEYA GROUP EMPLOYEE IMPORT TENDER POSTING BUTTON -->
            <button 
              (click)="openTenderModal()"
              class="px-4 py-3 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-amber-600/20">
              <span>📢 + Issue Keya Import Tender</span>
            </button>

            <button 
              (click)="openAddPoModal()"
              class="px-4 py-3 bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-blue-700/20">
              <span>+ Create New Import PO</span>
            </button>
          }
        </div>
      </div>

      <!-- KEYA GROUP ACTIVE IMPORT PROCUREMENT TENDERS ISSUED BY STAFF -->
      <div class="bg-white rounded-2xl border-2 border-amber-500 p-6 space-y-4 shadow-sm">
        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <span class="px-2.5 py-0.5 rounded bg-amber-100 text-amber-900 font-mono text-[10px] font-bold uppercase">KEYA IMPORT REQUIREMENTS DESK</span>
            <h3 class="text-lg font-black text-slate-900 mt-1">Keya Group Raw Material Import Tenders (Active on Public Website)</h3>
          </div>
          <span class="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            {{ getKeyaTenders().length }} Procurement Tenders Published
          </span>
        </div>

        <div class="grid md:grid-cols-2 gap-4 text-xs">
          @for (tender of getKeyaTenders(); track tender.id) {
            <div class="p-5 bg-white rounded-2xl border border-slate-200 space-y-3 shadow-sm hover:border-amber-500 transition">
              <div class="flex justify-between items-start">
                <span class="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-mono font-bold text-[10px]">
                  {{ tender.leadCode }}
                </span>
                <span class="font-mono font-bold text-amber-700 text-sm">
                  Budget: {{ dataService.formatValue(tender.targetUnitPriceUSD) }} / Unit
                </span>
              </div>

              <h4 class="font-extrabold text-slate-900 text-sm leading-snug">{{ tender.title }}</h4>

              <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1 font-mono">
                <div class="font-sans font-bold text-slate-900 text-xs">📦 Volume Needed: {{ tender.quantityNeeded }}</div>
                <div class="text-slate-600 font-sans">⚓ Delivery Term: CIF Chattogram Port</div>
                <div class="text-amber-800 font-bold">⏰ Tender Expiry Date: {{ tender.expiryDate }}</div>
              </div>

              <p class="p-2.5 bg-slate-100/70 rounded-lg text-slate-700 text-[11px] leading-relaxed">
                <strong class="text-slate-900">Specifications:</strong> {{ tender.specifications }}
              </p>
            </div>
          }
        </div>
      </div>

      <!-- Supplier Bids Evaluation Matrix -->
      <div class="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <span class="px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-mono text-[10px] font-bold">REVERSE TENDER ENGINE</span>
            <h3 class="text-lg font-black text-slate-900 mt-1">Live Supplier Bids Submitted for Keya Tenders</h3>
          </div>
          <span class="text-xs font-mono font-bold text-slate-500">{{ dataService.supplierBids().length }} Bids Received</span>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] border-b border-slate-200">
              <tr>
                <th class="p-3.5">Bid Code</th>
                <th class="p-3.5">Tender Code</th>
                <th class="p-3.5">Supplier Company</th>
                <th class="p-3.5">Offered Unit Price</th>
                <th class="p-3.5">Lead Time</th>
                <th class="p-3.5">Proposal Details</th>
                <th class="p-3.5">Status</th>
                @if (!isInvestigatingOfficer()) {
                  <th class="p-3.5 text-right">Action</th>
                }
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              @for (bid of dataService.supplierBids(); track bid.id) {
                <tr class="hover:bg-slate-50 transition">
                  <td class="p-3.5 font-mono font-bold text-blue-900">{{ bid.bidCode }}</td>
                  <td class="p-3.5 font-mono text-slate-500">{{ bid.tenderCode }}</td>
                  <td class="p-3.5">
                    <div class="font-bold text-slate-900">{{ bid.supplierCompanyName }}</div>
                    <div class="text-[10px] text-slate-500 font-mono">{{ bid.contactEmail }}</div>
                  </td>
                  <td class="p-3.5 font-mono font-extrabold text-emerald-700">
                    {{ dataService.formatValue(bid.offeredUnitPriceUSD) }} / Unit
                  </td>
                  <td class="p-3.5 font-mono font-bold text-slate-700">{{ bid.deliveryLeadTimeDays }} Days</td>
                  <td class="p-3.5 text-slate-600 max-w-xs truncate">{{ bid.proposalDetails }}</td>
                  <td class="p-3.5">
                    <span [class]="getBidBadgeClass(bid.status)">{{ bid.status }}</span>
                  </td>
                  @if (!isInvestigatingOfficer()) {
                    <td class="p-3.5 text-right">
                      <button 
                        (click)="acceptBidAndGeneratePo(bid)"
                        [disabled]="bid.status === 'Accepted'"
                        class="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-lg text-[11px] transition shadow">
                        {{ bid.status === 'Accepted' ? 'PO Generated' : 'Accept & Issue PO' }}
                      </button>
                    </td>
                  }
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      <!-- IMPORT PO DIRECTORY & MATRIX -->
      <div class="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
        
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 class="text-lg font-black text-slate-900">Active Import Purchase Orders (POs)</h3>
            <p class="text-xs text-slate-500">Track PO, PI & LC lifecycle statuses across raw material shipments.</p>
          </div>

          <!-- Search Filter -->
          <div class="w-full sm:w-72">
            <input 
              type="text" 
              [(ngModel)]="poSearchFilter"
              placeholder="Search PO, LC, or Supplier..." 
              class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600">
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] border-b border-slate-200">
              <tr>
                <th class="p-3.5">PO Ref</th>
                <th class="p-3.5">PI / LC Numbers</th>
                <th class="p-3.5">Supplier & Raw Material</th>
                <th class="p-3.5">Quantity</th>
                <th class="p-3.5">Total Value (USD)</th>
                <th class="p-3.5">ETA Date</th>
                <th class="p-3.5">Status</th>
                @if (!isInvestigatingOfficer()) {
                  <th class="p-3.5 text-right">Actions</th>
                }
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 font-medium">
              @for (po of filteredImportPOs(); track po.poNumber) {
                <tr class="hover:bg-slate-50/80 transition">
                  <td class="p-3.5 font-mono font-bold text-slate-900">{{ po.poNumber }}</td>
                  <td class="p-3.5 font-mono text-[11px]">
                    <div class="text-blue-900 font-bold">PI: {{ po.piNumber }}</div>
                    <div class="text-slate-500">LC: {{ po.lcNumber }}</div>
                  </td>
                  <td class="p-3.5">
                    <div class="font-bold text-slate-900">{{ po.supplierName }}</div>
                    <div class="text-slate-500 text-[11px]">{{ po.productName }}</div>
                  </td>
                  <td class="p-3.5 font-mono font-bold text-slate-800">{{ po.quantity.toLocaleString() }} {{ po.unit }}</td>
                  <td class="p-3.5 font-mono font-black text-emerald-700">
                    {{ dataService.formatValue(po.totalValueUSD) }}
                  </td>
                  <td class="p-3.5 font-mono text-slate-600">{{ po.expectedArrival }}</td>
                  <td class="p-3.5">
                    <span [class]="getPoBadgeClass(po.status)">{{ po.status }}</span>
                  </td>
                  @if (!isInvestigatingOfficer()) {
                    <td class="p-3.5 text-right">
                      <div class="flex items-center justify-end gap-2">
                        <button 
                          (click)="openEditPoModal(po)"
                          class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg border border-slate-300 text-[11px] transition">
                          ✏️ Edit PO
                        </button>
                        @if (isAdmin()) {
                          <button 
                            (click)="deletePo(po)"
                            class="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 font-bold rounded-lg border border-red-200 text-[11px] transition">
                            🗑️ Delete
                          </button>
                        }
                      </div>
                    </td>
                  }
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      <!-- KEYA GROUP EMPLOYEE POST IMPORT TENDER MODAL -->
      @if (showTenderModal()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div class="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200">
            
            <div class="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span class="text-[10px] font-bold text-amber-700 uppercase tracking-wider">Keya Raw Material Procurement</span>
                <h3 class="text-lg font-black text-slate-900">Issue Keya Import Procurement Tender</h3>
              </div>
              <button (click)="showTenderModal.set(false)" class="text-slate-400 hover:text-slate-700 text-lg font-bold">✕</button>
            </div>

            <p class="text-xs text-slate-600 bg-amber-50 p-3 rounded-xl border border-amber-200">
              Post an official Keya Group raw material import requirement (cotton, dyes, chemicals). Global suppliers will view this tender on the public portal and submit competitive bids.
            </p>

            <div class="space-y-4 text-xs">
              <div>
                <label class="block text-slate-700 font-bold mb-1">Tender Title / Material Name *</label>
                <input 
                  type="text" 
                  [(ngModel)]="tenderTitle" 
                  placeholder="e.g. Procurement: 500 MT Australian Raw Cotton Bales" 
                  class="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium">
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-slate-700 font-bold mb-1">Category</label>
                  <select [(ngModel)]="tenderCategory" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-semibold">
                    <option value="Raw Cotton & Fiber">Raw Cotton & Fiber</option>
                    <option value="Dyes & Chemicals">Dyes & Chemicals</option>
                    <option value="Packing Cartons">Packing Cartons</option>
                    <option value="Yarn Spinning Spare Parts">Yarn Spinning Spare Parts</option>
                  </select>
                </div>
                <div>
                  <label class="block text-slate-700 font-bold mb-1">Volume Needed</label>
                  <input 
                    type="text" 
                    [(ngModel)]="tenderQty" 
                    placeholder="500 MT (2,300 Bales)" 
                    class="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-mono">
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-slate-700 font-bold mb-1">Target Budget ($ / Unit)</label>
                  <input 
                    type="number" 
                    [(ngModel)]="tenderTargetPrice" 
                    placeholder="3.80" 
                    class="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-mono">
                </div>
                <div>
                  <label class="block text-slate-700 font-bold mb-1">Tender Expiry Date</label>
                  <input 
                    type="date" 
                    [(ngModel)]="tenderExpiry" 
                    class="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-mono">
                </div>
              </div>

              <div>
                <label class="block text-slate-700 font-bold mb-1">Technical Specifications & Terms</label>
                <textarea 
                  [(ngModel)]="tenderSpecs" 
                  rows="3" 
                  placeholder="Specify staple length, micronaire, CIF Chattogram Port delivery terms..." 
                  class="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900"></textarea>
              </div>
            </div>

            <div class="pt-4 border-t border-slate-100 flex justify-end gap-2">
              <button 
                (click)="showTenderModal.set(false)" 
                class="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs">
                Cancel
              </button>
              <button 
                (click)="saveImportTender()" 
                class="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-extrabold rounded-xl text-xs shadow-md">
                Publish Keya Procurement Tender
              </button>
            </div>

          </div>
        </div>
      }

      <!-- CUSTOMIZED AUDIT PDF REPORT GENERATOR MODAL -->
      @if (showPdfModal()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div class="bg-white w-full max-w-4xl rounded-3xl p-6 sm:p-10 space-y-6 shadow-2xl border border-slate-200 text-slate-900 my-8">
            
            <div class="flex items-center justify-between border-b border-slate-200 pb-4 print:hidden">
              <div class="flex items-center gap-3">
                <span class="px-2.5 py-1 rounded bg-slate-900 text-white font-mono text-xs font-bold">PDF GENERATOR</span>
                <h3 class="text-lg font-black text-slate-900">Customized Audit Report Studio</h3>
              </div>
              
              <div class="flex items-center gap-3">
                <button 
                  (click)="printPdfReport()"
                  class="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-extrabold rounded-xl text-xs flex items-center gap-2 shadow-lg">
                  <span>🖨️ Print / Save as PDF</span>
                </button>
                <button (click)="showPdfModal.set(false)" class="text-slate-400 hover:text-slate-700 text-xl font-bold">✕</button>
              </div>
            </div>

            <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 grid sm:grid-cols-2 gap-4 text-xs print:hidden">
              <div>
                <label class="block text-slate-700 font-bold mb-1">Target Timeframe / Date Filter</label>
                <select [(ngModel)]="pdfTimeframe" class="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 font-semibold focus:outline-none focus:border-blue-700">
                  <option value="THIS_MONTH">This Month (September 2026)</option>
                  <option value="THIS_YEAR">This Year (Annual 2026)</option>
                  <option value="TARGETED_MONTH">Targeted Custom Month (August 2026)</option>
                  <option value="LIFETIME">Lifetime Historical Audit Records</option>
                </select>
              </div>

              <div>
                <label class="block text-slate-700 font-bold mb-1">Audit Clearance Category</label>
                <select [(ngModel)]="pdfCategory" class="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 font-semibold focus:outline-none focus:border-blue-700">
                  <option value="CUSTOMS_DUTY">Customs Tariff & Duty Clearance Audit</option>
                  <option value="RAW_COTTON_LC">Raw Material LC & Supplier Bids Audit</option>
                  <option value="VESSEL_DISPATCH">Vessel Cargo & Container Dispatch Audit</option>
                </select>
              </div>
            </div>

            <!-- PRINTABLE AUDIT REPORT PAGE -->
            <div id="printable-audit-report" class="space-y-6 p-6 bg-white border border-slate-200 rounded-2xl">
              
              <div class="flex items-start justify-between border-b-2 border-slate-900 pb-4">
                <div class="flex items-center gap-4">
                  <img src="assets/logo/keya-logo.png" alt="Keya Group Official Logo" class="h-16 w-auto object-contain">
                  <div>
                    <h1 class="text-xl font-black text-slate-900 tracking-tight">KEYA GROUP OF INDUSTRIES</h1>
                    <p class="text-xs font-semibold text-slate-600">Customs, Duty & Commercial Audit Department</p>
                    <p class="text-[10px] text-slate-400 font-mono">Gazipur Industrial Complex, Dhaka, Bangladesh</p>
                  </div>
                </div>

                <div class="text-right font-mono text-xs">
                  <div class="px-3 py-1 rounded bg-slate-900 text-white font-bold inline-block mb-1">OFFICIAL AUDIT REPORT</div>
                  <div class="text-slate-500 text-[11px]">Audit Ref: AUD-KEYA-2026-9041</div>
                  <div class="text-slate-500 text-[11px]">Date Generated: {{ getReportGeneratedDate() }}</div>
                  <div class="text-blue-900 font-extrabold text-[11px]">Timeframe: {{ getTimeframeLabel() }}</div>
                </div>
              </div>

              <div class="grid grid-cols-4 gap-3 text-xs font-mono">
                <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div class="text-slate-500 text-[10px]">Total Audited Value</div>
                  <div class="text-base font-black text-slate-900">$2,448,000</div>
                </div>
                <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div class="text-slate-500 text-[10px]">Audited PO Items</div>
                  <div class="text-base font-black text-blue-900">{{ filteredImportPOs().length }} Orders</div>
                </div>
                <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div class="text-slate-500 text-[10px]">Customs Compliance</div>
                  <div class="text-base font-black text-emerald-700">100% Passed</div>
                </div>
                <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div class="text-slate-500 text-[10px]">Discrepancies / Flags</div>
                  <div class="text-base font-black text-emerald-600">0 Exceptions</div>
                </div>
              </div>

              <div class="space-y-2">
                <h4 class="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Audited Import Purchase Orders Detail ({{ getTimeframeLabel() }})</h4>
                
                <table class="w-full text-left text-xs border border-slate-200">
                  <thead class="bg-slate-100 text-slate-700 font-bold uppercase text-[10px] border-b border-slate-200">
                    <tr>
                      <th class="p-2 border-r">PO Ref</th>
                      <th class="p-2 border-r">PI / LC Ref</th>
                      <th class="p-2 border-r">Supplier & Raw Material</th>
                      <th class="p-2 border-r">Quantity</th>
                      <th class="p-2 border-r">Value (USD)</th>
                      <th class="p-2">Audit Status</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-200 font-mono text-[11px]">
                    @for (po of filteredImportPOs(); track po.poNumber) {
                      <tr>
                        <td class="p-2 border-r font-bold text-slate-900">{{ po.poNumber }}</td>
                        <td class="p-2 border-r">{{ po.lcNumber }}</td>
                        <td class="p-2 border-r font-sans">{{ po.supplierName }} ({{ po.productName }})</td>
                        <td class="p-2 border-r font-bold">{{ po.quantity }} {{ po.unit }}</td>
                        <td class="p-2 border-r font-bold text-emerald-700">{{ dataService.formatValue(po.totalValueUSD) }}</td>
                        <td class="p-2 font-sans font-bold text-emerald-700">✓ Audited & Verified</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>

              <div class="pt-6 border-t-2 border-slate-200 flex justify-between items-end text-xs">
                <div class="space-y-1">
                  <div class="w-24 h-24 rounded-full border-4 border-emerald-600/30 flex items-center justify-center font-black text-emerald-800 text-[10px] uppercase text-center p-2 transform -rotate-12 bg-emerald-50">
                    OFFICIALLY AUDITED & PASSED
                  </div>
                  <div class="text-[10px] text-slate-500 font-mono">Verified Stamp #KEYA-AUD-2026</div>
                </div>

                <div class="text-center space-y-1">
                  <div class="font-bold text-slate-900 border-b border-slate-900 pb-1 px-8">
                    {{ dataService.currentUser()?.name || 'Major Saifuddin Ahmed' }}
                  </div>
                  <div class="text-xs font-semibold text-slate-600">{{ dataService.currentUser()?.department || 'Investigating Officer & Lead Auditor' }}</div>
                  <div class="text-[10px] text-slate-400 font-mono">Keya Group Compliance Audit Board</div>
                </div>
              </div>

            </div>

          </div>
        </div>
      }

      <!-- CREATE / EDIT IMPORT PO MODAL -->
      @if (showPoModal()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div class="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200">
            
            <div class="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span class="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Import Operation</span>
                <h3 class="text-lg font-black text-slate-900">
                  {{ isEditMode() ? 'Edit Import PO Details' : 'Create New Import PO' }}
                </h3>
              </div>
              <button (click)="closePoModal()" class="text-slate-400 hover:text-slate-700 text-lg font-bold">✕</button>
            </div>

            <div class="space-y-4 text-xs">
              <div>
                <label class="block text-slate-700 font-semibold mb-1">Supplier Company Name</label>
                <input 
                  type="text" 
                  [(ngModel)]="formSupplierName" 
                  placeholder="e.g. Queensland Cotton Corp" 
                  class="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium focus:outline-none focus:border-blue-600">
              </div>

              <div>
                <label class="block text-slate-700 font-semibold mb-1">Import Raw Material Product</label>
                <input 
                  type="text" 
                  [(ngModel)]="formProductName" 
                  placeholder="e.g. Australian Raw Cotton Bales" 
                  class="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium focus:outline-none focus:border-blue-600">
              </div>

              <div class="grid grid-cols-3 gap-3">
                <div>
                  <label class="block text-slate-700 font-semibold mb-1">Quantity</label>
                  <input 
                    type="number" 
                    [(ngModel)]="formQuantity" 
                    placeholder="1200" 
                    class="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-mono focus:outline-none focus:border-blue-600">
                </div>
                <div>
                  <label class="block text-slate-700 font-semibold mb-1">Unit</label>
                  <input 
                    type="text" 
                    [(ngModel)]="formUnit" 
                    placeholder="Bales" 
                    class="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-semibold focus:outline-none focus:border-blue-600">
                </div>
                <div>
                  <label class="block text-slate-700 font-semibold mb-1">Unit Price (USD)</label>
                  <input 
                    type="number" 
                    [(ngModel)]="formUnitPrice" 
                    placeholder="390.0" 
                    class="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-mono focus:outline-none focus:border-blue-600">
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-slate-700 font-semibold mb-1">Lifecycle Status</label>
                  <select 
                    [(ngModel)]="formStatus" 
                    class="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-semibold focus:outline-none focus:border-blue-600">
                    <option value="PO Issued">PO Issued</option>
                    <option value="PI Confirmed">PI Confirmed</option>
                    <option value="LC Opened">LC Opened</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Received at Port">Received at Port</option>
                  </select>
                </div>

                <div>
                  <label class="block text-slate-700 font-semibold mb-1">Expected Arrival ETA</label>
                  <input 
                    type="date" 
                    [(ngModel)]="formEta" 
                    class="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-mono focus:outline-none focus:border-blue-600">
                </div>
              </div>
            </div>

            <div class="pt-4 border-t border-slate-100 flex justify-end gap-2">
              <button 
                (click)="closePoModal()" 
                class="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs">
                Cancel
              </button>
              <button 
                (click)="savePo()" 
                class="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-extrabold rounded-xl text-xs shadow-md">
                {{ isEditMode() ? 'Update Import PO' : 'Create Import PO' }}
              </button>
            </div>

          </div>
        </div>
      }

    </div>
  `
})
export class ImportManagementComponent {
  dataService = inject(ExportImportDataService);

  poSearchFilter = '';
  showPoModal = signal(false);
  showPdfModal = signal(false);
  showTenderModal = signal(false);
  isEditMode = signal(false);
  editingPoNumber = signal<string | null>(null);

  // PDF Generator Customizer Signals
  pdfTimeframe: AuditTimeframe = 'THIS_MONTH';
  pdfCategory = 'CUSTOMS_DUTY';

  // Import Tender Form Fields (Keya Staff Import Requirement)
  tenderTitle = '';
  tenderCategory = 'Raw Cotton & Fiber';
  tenderQty = '500 MT (2,300 Bales)';
  tenderTargetPrice = 3.80;
  tenderExpiry = '2026-10-15';
  tenderSpecs = 'Staple length 1-5/32 inch, Micronaire 3.8 - 4.2, CIF Chattogram Port.';

  // PO Form Fields
  formSupplierName = '';
  formProductName = '';
  formQuantity = 1200;
  formUnit = 'Bales';
  formUnitPrice = 390.0;
  formStatus: ImportPO['status'] = 'PO Issued';
  formEta = '2026-09-25';

  isAdmin(): boolean {
    return this.dataService.currentUser()?.role === 'Admin';
  }

  isInvestigatingOfficer(): boolean {
    return this.dataService.currentUser()?.role === 'Investigating Officer';
  }

  getKeyaTenders(): BuyLead[] {
    return this.dataService.buyLeads().filter(l => l.type === 'KEYA_TENDER');
  }

  openTenderModal() {
    this.tenderTitle = '';
    this.showTenderModal.set(true);
  }

  saveImportTender() {
    if (!this.tenderTitle) {
      alert('Please enter the Tender Title / Material Name!');
      return;
    }

    const newTender: BuyLead = {
      id: (this.dataService.buyLeads().length + 1).toString(),
      leadCode: `TENDER-${Date.now().toString().slice(-4)}`,
      title: this.tenderTitle,
      category: this.tenderCategory,
      quantityNeeded: this.tenderQty || '500 MT',
      targetUnitPriceUSD: this.tenderTargetPrice || 3.80,
      destinationCountry: 'Bangladesh (Chattogram Port)',
      buyerName: this.dataService.currentUser()?.name || 'Keya Import Procurement Desk',
      companyName: 'Keya Group of Industries',
      buyerEmail: this.dataService.currentUser()?.email || 'procurement@keyagroupbd.com',
      buyerPhone: '+880 2 9888888',
      status: 'Active Procurement Tender',
      expiryDate: this.tenderExpiry || '2026-10-15',
      specifications: this.tenderSpecs || 'CIF Chattogram Port Terms',
      type: 'KEYA_TENDER'
    };

    this.dataService.buyLeads.update(list => [newTender, ...list]);
    alert(`Success! Keya Import Tender "${newTender.title}" (${newTender.leadCode}) published. Suppliers can now submit bids on the public site.`);
    this.showTenderModal.set(false);
  }

  openPdfModal() {
    this.showPdfModal.set(true);
  }

  printPdfReport() {
    if (typeof window !== 'undefined') {
      window.print();
    }
  }

  getReportGeneratedDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  getTimeframeLabel(): string {
    const labels: Record<AuditTimeframe, string> = {
      THIS_MONTH: 'This Month (September 2026)',
      THIS_YEAR: 'Annual Fiscal Year 2026',
      TARGETED_MONTH: 'Targeted Custom Month (August 2026)',
      LIFETIME: 'Lifetime Historical Audit Data'
    };
    return labels[this.pdfTimeframe] || 'This Month';
  }

  filteredImportPOs(): ImportPO[] {
    const q = this.poSearchFilter.toLowerCase().trim();
    if (!q) return this.dataService.importPOs();
    return this.dataService.importPOs().filter(po => 
      po.poNumber.toLowerCase().includes(q) ||
      po.supplierName.toLowerCase().includes(q) ||
      po.productName.toLowerCase().includes(q) ||
      po.lcNumber.toLowerCase().includes(q)
    );
  }

  getBidBadgeClass(status: string): string {
    if (status === 'Accepted') return 'px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold';
    if (status === 'Under Review') return 'px-2.5 py-1 rounded bg-amber-100 text-amber-800 font-mono text-[10px] font-bold';
    return 'px-2.5 py-1 rounded bg-blue-100 text-blue-800 font-mono text-[10px] font-bold';
  }

  getPoBadgeClass(status: string): string {
    if (status === 'In Transit') return 'px-2.5 py-1 rounded bg-amber-100 text-amber-800 font-mono text-[10px] font-bold';
    if (status === 'LC Opened') return 'px-2.5 py-1 rounded bg-blue-100 text-blue-800 font-mono text-[10px] font-bold';
    if (status === 'Received at Port') return 'px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold';
    return 'px-2.5 py-1 rounded bg-slate-100 text-slate-800 font-mono text-[10px] font-bold';
  }

  acceptBidAndGeneratePo(bid: SupplierBid) {
    this.dataService.supplierBids.update(list => list.map(b => b.id === bid.id ? { ...b, status: 'Accepted' as const } : b));
    
    const newPo: ImportPO = {
      poNumber: `PO-IMP-2026-${Date.now().toString().slice(-3)}`,
      piNumber: `PI-${bid.bidCode}`,
      lcNumber: `LC-HSBC-2026-${Date.now().toString().slice(-3)}`,
      supplierName: bid.supplierCompanyName,
      productName: 'Raw Cotton Procurement Tender Bales',
      quantity: 1500,
      unit: 'Bales',
      unitPriceUSD: bid.offeredUnitPriceUSD,
      totalValueUSD: bid.offeredUnitPriceUSD * 1500,
      currency: 'USD',
      expectedArrival: '2026-09-28',
      status: 'LC Opened'
    };

    this.dataService.importPOs.update(list => [newPo, ...list]);
    alert(`Success! Bid ${bid.bidCode} accepted. Import PO ${newPo.poNumber} & LC generated.`);
  }

  openAddPoModal() {
    this.isEditMode.set(false);
    this.editingPoNumber.set(null);
    this.formSupplierName = '';
    this.formProductName = '';
    this.formQuantity = 1200;
    this.formUnit = 'Bales';
    this.formUnitPrice = 390.0;
    this.formStatus = 'PO Issued';
    this.formEta = '2026-09-25';
    this.showPoModal.set(true);
  }

  openEditPoModal(po: ImportPO) {
    this.isEditMode.set(true);
    this.editingPoNumber.set(po.poNumber);
    this.formSupplierName = po.supplierName;
    this.formProductName = po.productName;
    this.formQuantity = po.quantity;
    this.formUnit = po.unit;
    this.formUnitPrice = po.unitPriceUSD;
    this.formStatus = po.status;
    this.formEta = po.expectedArrival;
    this.showPoModal.set(true);
  }

  closePoModal() {
    this.showPoModal.set(false);
  }

  savePo() {
    if (!this.formSupplierName || !this.formProductName) return;
    const totalVal = this.formQuantity * this.formUnitPrice;

    if (this.isEditMode() && this.editingPoNumber()) {
      const targetNo = this.editingPoNumber();
      this.dataService.importPOs.update(list => list.map(p => {
        if (p.poNumber === targetNo) {
          return {
            ...p,
            supplierName: this.formSupplierName,
            productName: this.formProductName,
            quantity: this.formQuantity,
            unit: this.formUnit,
            unitPriceUSD: this.formUnitPrice,
            totalValueUSD: totalVal,
            status: this.formStatus,
            expectedArrival: this.formEta
          };
        }
        return p;
      }));
    } else {
      const newPo: ImportPO = {
        poNumber: `PO-IMP-2026-${Date.now().toString().slice(-3)}`,
        piNumber: `PI-KEYA-${Date.now().toString().slice(-3)}`,
        lcNumber: `LC-HSBC-2026-${Date.now().toString().slice(-3)}`,
        supplierName: this.formSupplierName,
        productName: this.formProductName,
        quantity: this.formQuantity,
        unit: this.formUnit,
        unitPriceUSD: this.formUnitPrice,
        totalValueUSD: totalVal,
        currency: 'USD',
        expectedArrival: this.formEta,
        status: this.formStatus
      };
      this.dataService.importPOs.update(list => [newPo, ...list]);
    }

    this.closePoModal();
  }

  deletePo(po: ImportPO) {
    if (confirm(`Are you sure you want to delete Import PO "${po.poNumber}" (${po.supplierName})?`)) {
      this.dataService.importPOs.update(list => list.filter(p => p.poNumber !== po.poNumber));
    }
  }
}
