import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportImportDataService } from '../../services/export-import-data.service';

@Component({
  selector: 'app-supplier-management',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-6">
      
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-emerald-700">Global Supply & Buyer Directory</span>
          <h3 class="text-xl font-extrabold text-slate-900">Supplier & Customer Management</h3>
          <p class="text-xs text-slate-500 mt-0.5">Manage international raw material suppliers, buyer accounts, contacts, and transaction histories.</p>
        </div>
      </div>

      <!-- Suppliers Grid -->
      <div class="space-y-4">
        <h4 class="text-xs font-bold text-slate-700 uppercase tracking-wider">Raw Material Import Suppliers</h4>
        <div class="grid md:grid-cols-3 gap-4">
          @for (sup of dataService.suppliers(); track sup.id) {
            <div class="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div class="flex items-start justify-between">
                <div>
                  <span class="text-[10px] font-mono text-emerald-700 font-bold uppercase">ID: {{ sup.id }}</span>
                  <h4 class="text-base font-bold text-slate-900 mt-0.5">{{ sup.name }}</h4>
                </div>
                <span class="px-2 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-bold rounded">
                  ★ {{ sup.rating }}
                </span>
              </div>

              <div class="space-y-1 text-xs text-slate-700">
                <div class="flex justify-between"><span class="text-slate-500">Country:</span><span class="font-medium">🌐 {{ sup.country }}</span></div>
                <div class="flex justify-between"><span class="text-slate-500">Contact:</span><span class="font-medium">{{ sup.contactPerson }}</span></div>
                <div class="flex justify-between"><span class="text-slate-500">Email:</span><span class="font-medium text-emerald-700">{{ sup.email }}</span></div>
                <div class="flex justify-between"><span class="text-slate-500">Total Volume:</span><span class="font-mono font-bold text-emerald-700">{{ dataService.formatValue(sup.totalTransactionsUSD) }}</span></div>
              </div>
            </div>
          }
        </div>
      </div>

      <!-- Customers Grid -->
      <div class="space-y-4 pt-4">
        <h4 class="text-xs font-bold text-slate-700 uppercase tracking-wider">International Export Buyer Accounts</h4>
        <div class="grid md:grid-cols-3 gap-4">
          @for (cust of dataService.customers(); track cust.id) {
            <div class="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div class="flex items-start justify-between">
                <div>
                  <span class="text-[10px] font-mono text-blue-700 font-bold uppercase">ID: {{ cust.id }}</span>
                  <h4 class="text-base font-bold text-slate-900 mt-0.5">{{ cust.companyName }}</h4>
                </div>
                <span class="px-2 py-0.5 bg-blue-100 text-blue-800 border border-blue-200 text-[10px] font-bold rounded">
                  🌐 {{ cust.country }}
                </span>
              </div>

              <div class="space-y-1 text-xs text-slate-700">
                <div class="flex justify-between"><span class="text-slate-500">Buyer Rep:</span><span class="font-medium">{{ cust.contactPerson }}</span></div>
                <div class="flex justify-between"><span class="text-slate-500">Email:</span><span class="font-medium text-blue-700">{{ cust.email }}</span></div>
                <div class="flex justify-between"><span class="text-slate-500">Lifetime Orders:</span><span class="font-mono font-bold text-emerald-700">{{ dataService.formatValue(cust.totalOrdersUSD) }}</span></div>
                <div class="flex justify-between"><span class="text-slate-500">LC Credit Limit:</span><span class="font-mono font-bold text-amber-700">{{ dataService.formatValue(cust.creditLimitUSD) }}</span></div>
              </div>
            </div>
          }
        </div>
      </div>

    </div>
  `
})
export class SupplierManagementComponent {
  dataService = inject(ExportImportDataService);
}
