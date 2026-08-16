import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportImportDataService } from '../../services/export-import-data.service';

@Component({
  selector: 'app-customs-docs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-6">
      
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-teal-700">Port & Tariff Clearance</span>
          <h3 class="text-xl font-extrabold text-slate-900">Customs & Documentation Vault</h3>
          <p class="text-xs text-slate-500 mt-0.5">Commercial Invoice, Packing List, Bill of Lading, Certificate of Origin (COO), Customs Declaration, and Duty Payment status.</p>
        </div>
      </div>

      <!-- Customs Documents Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        @for (doc of dataService.customsDocs(); track doc.docId) {
          <div class="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            
            <div class="flex items-start justify-between">
              <span class="px-2.5 py-1 rounded bg-teal-100 text-teal-800 border border-teal-200 text-[10px] font-bold">
                {{ doc.type }}
              </span>
              <span class="text-xs font-mono text-slate-500">{{ doc.docId }}</span>
            </div>

            <div class="space-y-1">
              <div class="text-xs text-slate-500">Reference Number:</div>
              <div class="text-sm font-mono font-bold text-slate-900">{{ doc.refNumber }}</div>
            </div>

            <div class="p-3 bg-white rounded-lg border border-slate-200 text-xs space-y-1">
              <div class="flex justify-between">
                <span class="text-slate-500">Issue Date:</span>
                <span class="font-mono text-slate-700">📅 {{ doc.issueDate }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-500">Customs Duty & Taxes:</span>
                <span class="font-mono font-bold text-emerald-700">
                  {{ doc.dutyTaxUSD > 0 ? dataService.formatValue(doc.dutyTaxUSD) : 'Exempt (Export)' }}
                </span>
              </div>
            </div>

            <div class="pt-2 flex items-center justify-between">
              <span class="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                <span class="w-2 h-2 rounded-full bg-emerald-600"></span> {{ doc.clearanceStatus }}
              </span>
              <button 
                (click)="downloadDoc(doc.type, doc.refNumber)"
                class="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-md transition">
                Inspect Doc
              </button>
            </div>

          </div>
        }
      </div>

    </div>
  `
})
export class CustomsDocsComponent {
  dataService = inject(ExportImportDataService);

  downloadDoc(type: string, ref: string) {
    alert(`Customs Inspection Vault: Accessing official verified electronic copy of ${type} (${ref}).`);
  }
}
