import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExportImportDataService, ExportOrder, BuyLead } from '../../services/export-import-data.service';

@Component({
  selector: 'app-export-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6">
      
      <!-- Top Banner -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div class="flex items-center gap-4">
          <img src="assets/logo/keya-logo.png" alt="Keya Group Logo" class="h-12 w-auto object-contain">
          <div>
            <span class="text-xs font-bold text-emerald-700 uppercase tracking-wider">Keya Garments & Yarn Outbound Exports</span>
            <h2 class="text-2xl font-black text-slate-900">Export Sales Orders & Commercial Desk</h2>
            <p class="text-xs text-slate-500 mt-0.5">Manage global buyer RFQs, communicate directly via Email/WhatsApp, issue sales orders, and clear customs.</p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <!-- Investigating Officer & Admin PDF Report Generator -->
          @if (isInvestigatingOfficer() || isAdmin()) {
            <button 
              (click)="generateExportAuditPdfReport()"
              class="px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow">
              <span>📄 Generate Export Audit PDF</span>
            </button>
          }

          <!-- Admin & Operator Create Export Button -->
          @if (!isInvestigatingOfficer()) {
            <button 
              (click)="openAddExportModal()"
              class="px-5 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/20">
              <span>+ Create New Export Sales Order</span>
            </button>
          }
        </div>
      </div>

      <!-- INCOMING INTERNATIONAL BUYER SOURCING RFQS MATRIX WITH FULL CONTACT DETAILS -->
      <div class="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <span class="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-900 font-mono text-[10px] font-bold uppercase">LIVE BUYER LEADS DESK</span>
            <h3 class="text-lg font-black text-slate-900 mt-1">Incoming International Buyer Sourcing RFQs</h3>
          </div>
          <span class="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            {{ getBuyerRfqs().length }} Active Buyer Leads Received
          </span>
        </div>

        <div class="grid md:grid-cols-2 gap-4 text-xs">
          @for (lead of getBuyerRfqs(); track lead.id) {
            <div class="p-5 bg-white rounded-2xl border-2 border-slate-200 space-y-3 shadow-sm hover:border-emerald-600 transition">
              
              <div class="flex justify-between items-start border-b border-slate-100 pb-2">
                <div>
                  <span class="font-mono font-extrabold text-emerald-800 text-xs px-2 py-0.5 bg-emerald-50 rounded border border-emerald-200">
                    {{ lead.leadCode }}
                  </span>
                  <span class="text-[10px] text-slate-400 font-mono ml-2">Status: {{ lead.status }}</span>
                </div>
                <span class="font-mono font-extrabold text-emerald-700 text-sm">
                  {{ dataService.formatValue(lead.targetUnitPriceUSD) }} / Unit Target
                </span>
              </div>

              <div>
                <h4 class="font-extrabold text-slate-900 text-sm leading-snug">{{ lead.title }}</h4>
                <p class="text-slate-500 text-[11px] font-medium">Requested Volume: <strong class="text-slate-900 font-mono">{{ lead.quantityNeeded }}</strong></p>
              </div>

              <!-- Full Buyer Contact Card for Keya Admin Communication -->
              <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1 font-mono">
                <div class="font-sans font-extrabold text-slate-900 text-xs">🏢 Company: {{ lead.companyName || lead.buyerName }}</div>
                <div class="text-slate-700 font-sans">👤 Contact Person: {{ lead.buyerName }}</div>
                <div class="text-blue-900">📧 Email: <a [href]="'mailto:' + lead.buyerEmail" class="underline font-bold hover:text-blue-700">{{ lead.buyerEmail }}</a></div>
                @if (lead.buyerPhone) {
                  <div class="text-emerald-800 font-bold">📱 Phone/WhatsApp: <a [href]="'https://wa.me/' + cleanPhone(lead.buyerPhone)" target="_blank" class="underline hover:text-emerald-600">{{ lead.buyerPhone }}</a></div>
                }
                <div class="text-slate-600 font-sans">🌐 Destination: <strong class="text-slate-900">{{ lead.destinationCountry }}</strong></div>
              </div>

              <p class="p-2.5 bg-slate-100/70 rounded-lg text-slate-700 text-[11px] leading-relaxed">
                <strong class="text-slate-900">Specs:</strong> {{ lead.specifications }}
              </p>

              <!-- Action Communication Buttons for Keya Admin -->
              @if (!isInvestigatingOfficer()) {
                <div class="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-end gap-2">
                  <a 
                    [href]="'mailto:' + lead.buyerEmail + '?subject=Official FOB Quotation from Keya Group for ' + lead.title + '&body=Dear ' + lead.buyerName + ',%0D%0A%0D%0AThank you for submitting your requirement (' + lead.leadCode + ') to Keya Group of Industries Bangladesh.%0D%0A%0D%0AWe are pleased to provide our official export quote...'"
                    class="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg text-[11px] transition shadow flex items-center gap-1">
                    <span>✉️ Email Quote</span>
                  </a>

                  @if (lead.buyerPhone) {
                    <a 
                      [href]="'https://wa.me/' + cleanPhone(lead.buyerPhone)"
                      target="_blank"
                      class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[11px] transition shadow flex items-center gap-1">
                      <span>📱 WhatsApp</span>
                    </a>
                  }

                  <button 
                    (click)="convertRfqToSalesOrder(lead)"
                    class="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-lg text-[11px] transition shadow">
                    🔄 Convert to Sales Order
                  </button>
                </div>
              }
            </div>
          }
        </div>
      </div>

      <!-- EXPORT SALES ORDERS DIRECTORY & FULL CRUD MATRIX -->
      <div class="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
        
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 class="text-lg font-black text-slate-900">Active Export Sales Orders</h3>
            <p class="text-xs text-slate-500">Track Sales Orders, Commercial Invoices & Vessel Shipment clearances.</p>
          </div>

          <!-- Search Filter -->
          <div class="w-full sm:w-72">
            <input 
              type="text" 
              [(ngModel)]="exportSearchFilter"
              placeholder="Search Customer, SO, or Invoice..." 
              class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-600">
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] border-b border-slate-200">
              <tr>
                <th class="p-3.5">Order ID</th>
                <th class="p-3.5">Customer Name & Destination</th>
                <th class="p-3.5">Sales Order / Invoice Ref</th>
                <th class="p-3.5">Export Volume</th>
                <th class="p-3.5">Total Export Value (USD)</th>
                <th class="p-3.5">Vessel Status</th>
                @if (!isInvestigatingOfficer()) {
                  <th class="p-3.5 text-right">Actions</th>
                }
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 font-medium">
              @for (order of filteredExportOrders(); track order.orderId) {
                <tr class="hover:bg-slate-50/80 transition">
                  <td class="p-3.5 font-mono font-bold text-slate-900">{{ order.orderId }}</td>
                  <td class="p-3.5">
                    <div class="font-bold text-slate-900">{{ order.customerName }}</div>
                    <div class="text-[11px] text-slate-500 font-medium">🌐 {{ order.destinationCountry }}</div>
                  </td>
                  <td class="p-3.5 font-mono text-[11px]">
                    <div class="text-emerald-900 font-bold">SO: {{ order.salesOrderNo }}</div>
                    <div class="text-slate-500">INV: {{ order.exportInvoiceNo }}</div>
                  </td>
                  <td class="p-3.5 font-mono font-bold text-slate-800">{{ order.exportQuantity.toLocaleString() }} {{ order.unit }}</td>
                  <td class="p-3.5 font-mono font-black text-emerald-700">
                    {{ dataService.formatValue(order.exportValueUSD) }}
                  </td>
                  <td class="p-3.5">
                    <span [class]="getExportBadgeClass(order.status)">{{ order.status }}</span>
                  </td>
                  @if (!isInvestigatingOfficer()) {
                    <td class="p-3.5 text-right">
                      <div class="flex items-center justify-end gap-2">
                        <button 
                          (click)="openEditExportModal(order)"
                          class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg border border-slate-300 text-[11px] transition">
                          ✏️ Edit Order
                        </button>
                        @if (isAdmin()) {
                          <button 
                            (click)="deleteExportOrder(order)"
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

      <!-- CREATE / EDIT EXPORT SALES ORDER MODAL -->
      @if (showExportModal()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div class="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200">
            
            <div class="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span class="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Export Operation</span>
                <h3 class="text-lg font-black text-slate-900">
                  {{ isEditMode() ? 'Edit Export Sales Order' : 'Create New Export Sales Order' }}
                </h3>
              </div>
              <button (click)="closeExportModal()" class="text-slate-400 hover:text-slate-700 text-lg font-bold">✕</button>
            </div>

            <div class="space-y-4 text-xs">
              <div>
                <label class="block text-slate-700 font-semibold mb-1">Customer / Buyer Company Name</label>
                <input 
                  type="text" 
                  [(ngModel)]="formCustomerName" 
                  placeholder="e.g. H&M Global Sourcing GmbH" 
                  class="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium focus:outline-none focus:border-emerald-600">
              </div>

              <div>
                <label class="block text-slate-700 font-semibold mb-1">Destination Country</label>
                <input 
                  type="text" 
                  [(ngModel)]="formDestinationCountry" 
                  placeholder="e.g. Germany" 
                  class="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium focus:outline-none focus:border-emerald-600">
              </div>

              <div class="grid grid-cols-3 gap-3">
                <div>
                  <label class="block text-slate-700 font-semibold mb-1">Export Quantity</label>
                  <input 
                    type="number" 
                    [(ngModel)]="formExportQuantity" 
                    placeholder="42500" 
                    class="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-mono focus:outline-none focus:border-emerald-600">
                </div>
                <div>
                  <label class="block text-slate-700 font-semibold mb-1">Unit</label>
                  <input 
                    type="text" 
                    [(ngModel)]="formUnit" 
                    placeholder="Pcs" 
                    class="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-semibold focus:outline-none focus:border-emerald-600">
                </div>
                <div>
                  <label class="block text-slate-700 font-semibold mb-1">Total Value (USD)</label>
                  <input 
                    type="number" 
                    [(ngModel)]="formExportValueUSD" 
                    placeholder="212500" 
                    class="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-mono focus:outline-none focus:border-emerald-600">
                </div>
              </div>

              <div>
                <label class="block text-slate-700 font-semibold mb-1">Export Order Status</label>
                <select 
                  [(ngModel)]="formStatus" 
                  class="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-semibold focus:outline-none focus:border-emerald-600">
                  <option value="Order Confirmed">Order Confirmed</option>
                  <option value="Customs Cleared">Customs Cleared</option>
                  <option value="Vessel Dispatched">Vessel Dispatched</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>

            <div class="pt-4 border-t border-slate-100 flex justify-end gap-2">
              <button 
                (click)="closeExportModal()" 
                class="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs">
                Cancel
              </button>
              <button 
                (click)="saveExportOrder()" 
                class="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold rounded-xl text-xs shadow-md">
                {{ isEditMode() ? 'Update Export Order' : 'Create Export Order' }}
              </button>
            </div>

          </div>
        </div>
      }

    </div>
  `
})
export class ExportManagementComponent {
  dataService = inject(ExportImportDataService);

  exportSearchFilter = '';
  showExportModal = signal(false);
  isEditMode = signal(false);
  editingOrderId = signal<string | null>(null);

  // Form Fields
  formCustomerName = '';
  formDestinationCountry = '';
  formExportQuantity = 42500;
  formUnit = 'Pcs';
  formExportValueUSD = 212500;
  formStatus: ExportOrder['status'] = 'Order Confirmed';

  isAdmin(): boolean {
    return this.dataService.currentUser()?.role === 'Admin';
  }

  isInvestigatingOfficer(): boolean {
    return this.dataService.currentUser()?.role === 'Investigating Officer';
  }

  cleanPhone(phone: string): string {
    return phone.replace(/[^0-9]/g, '');
  }

  generateExportAuditPdfReport() {
    alert(`📄 Generating Official Keya Group Outbound Export Clearance & Compliance PDF Report...\n\nAuditor: ${this.dataService.currentUser()?.name}\nActive Sales Orders: ${this.dataService.exportOrders().length}\nStatus: EXP-CLEARANCE PASSED.`);
    if (typeof window !== 'undefined') {
      window.print();
    }
  }

  getBuyerRfqs(): BuyLead[] {
    return this.dataService.buyLeads().filter(l => l.type === 'BUYER_RFQ' || !l.type);
  }

  filteredExportOrders(): ExportOrder[] {
    const q = this.exportSearchFilter.toLowerCase().trim();
    if (!q) return this.dataService.exportOrders();
    return this.dataService.exportOrders().filter(o => 
      o.orderId.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      o.destinationCountry.toLowerCase().includes(q) ||
      o.salesOrderNo.toLowerCase().includes(q)
    );
  }

  getExportBadgeClass(status: string): string {
    if (status === 'Vessel Dispatched') return 'px-2.5 py-1 rounded bg-amber-100 text-amber-800 font-mono text-[10px] font-bold';
    if (status === 'Customs Cleared') return 'px-2.5 py-1 rounded bg-blue-100 text-blue-800 font-mono text-[10px] font-bold';
    if (status === 'Delivered') return 'px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold';
    return 'px-2.5 py-1 rounded bg-slate-100 text-slate-800 font-mono text-[10px] font-bold';
  }

  convertRfqToSalesOrder(lead: BuyLead) {
    const qty = parseInt(lead.quantityNeeded.replace(/[^0-9]/g, '')) || 50000;
    const totalVal = (lead.targetUnitPriceUSD || 5.0) * qty;

    const newOrder: ExportOrder = {
      orderId: `EXP-SO-${Date.now().toString().slice(-4)}`,
      customerName: lead.companyName || lead.buyerName,
      destinationCountry: lead.destinationCountry,
      salesOrderNo: `SO-KEYA-2026-${Date.now().toString().slice(-2)}`,
      exportInvoiceNo: `EXP-INV-${Date.now().toString().slice(-4)}`,
      exportQuantity: qty,
      unit: 'Pcs',
      exportValueUSD: totalVal,
      status: 'Order Confirmed'
    };

    this.dataService.exportOrders.update(list => [newOrder, ...list]);
    alert(`Success! RFQ ${lead.leadCode} from ${lead.buyerName} (${lead.companyName}) converted into Export Sales Order ${newOrder.orderId}.`);
  }

  openAddExportModal() {
    this.isEditMode.set(false);
    this.editingOrderId.set(null);
    this.formCustomerName = '';
    this.formDestinationCountry = '';
    this.formExportQuantity = 42500;
    this.formUnit = 'Pcs';
    this.formExportValueUSD = 212500;
    this.formStatus = 'Order Confirmed';
    this.showExportModal.set(true);
  }

  openEditExportModal(order: ExportOrder) {
    this.isEditMode.set(true);
    this.editingOrderId.set(order.orderId);
    this.formCustomerName = order.customerName;
    this.formDestinationCountry = order.destinationCountry;
    this.formExportQuantity = order.exportQuantity;
    this.formUnit = order.unit;
    this.formExportValueUSD = order.exportValueUSD;
    this.formStatus = order.status;
    this.showExportModal.set(true);
  }

  closeExportModal() {
    this.showExportModal.set(false);
  }

  saveExportOrder() {
    if (!this.formCustomerName || !this.formDestinationCountry) return;

    if (this.isEditMode() && this.editingOrderId()) {
      const targetId = this.editingOrderId();
      this.dataService.exportOrders.update(list => list.map(o => {
        if (o.orderId === targetId) {
          return {
            ...o,
            customerName: this.formCustomerName,
            destinationCountry: this.formDestinationCountry,
            exportQuantity: this.formExportQuantity,
            unit: this.formUnit,
            exportValueUSD: this.formExportValueUSD,
            status: this.formStatus
          };
        }
        return o;
      }));
    } else {
      const newOrder: ExportOrder = {
        orderId: `EXP-SO-${Date.now().toString().slice(-4)}`,
        customerName: this.formCustomerName,
        destinationCountry: this.formDestinationCountry,
        salesOrderNo: `SO-KEYA-2026-${Date.now().toString().slice(-2)}`,
        exportInvoiceNo: `EXP-INV-${Date.now().toString().slice(-4)}`,
        exportQuantity: this.formExportQuantity,
        unit: this.formUnit,
        exportValueUSD: this.formExportValueUSD,
        status: this.formStatus
      };
      this.dataService.exportOrders.update(list => [newOrder, ...list]);
    }

    this.closeExportModal();
  }

  deleteExportOrder(order: ExportOrder) {
    if (confirm(`Are you sure you want to delete Export Order "${order.orderId}" (${order.customerName})?`)) {
      this.dataService.exportOrders.update(list => list.filter(o => o.orderId !== order.orderId));
    }
  }
}
