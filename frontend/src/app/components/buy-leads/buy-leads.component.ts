import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportImportDataService } from '../../services/export-import-data.service';

@Component({
  selector: 'app-buy-leads',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-6">
      
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-amber-700">TradeWheel Live RFQ Board</span>
          <h3 class="text-xl font-extrabold text-slate-900">Active Buy Leads & Buyer Demands</h3>
          <p class="text-xs text-slate-500 mt-0.5">International buyer sourcing requirements. Exporters and manufacturers can quote directly.</p>
        </div>
      </div>

      <!-- Buy Leads Grid -->
      <div class="space-y-4">
        @for (lead of dataService.buyLeads(); track lead.id) {
          <div class="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3 hover:border-amber-500/40 transition">
            
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-200 pb-3">
              <div class="flex items-center gap-3">
                <span class="px-2.5 py-1 rounded bg-amber-100 text-amber-800 font-mono text-[10px] font-extrabold border border-amber-200">
                  {{ lead.leadCode }}
                </span>
                <div>
                  <h4 class="text-base font-extrabold text-slate-900">{{ lead.title }}</h4>
                  <p class="text-[11px] text-slate-500 font-medium">Buyer: {{ lead.buyerName }} (🌐 {{ lead.destinationCountry }})</p>
                </div>
              </div>
              <div class="text-right font-mono text-xs">
                <span class="text-emerald-700 font-extrabold text-sm">{{ dataService.formatValue(lead.targetUnitPriceUSD) }} / Unit Target</span>
                <div class="text-slate-500 text-[11px]">Expires: {{ lead.expiryDate }}</div>
              </div>
            </div>

            <div class="grid md:grid-cols-3 gap-3 text-xs">
              <div>
                <span class="text-slate-500 block text-[11px]">Category:</span>
                <span class="font-bold text-slate-900">{{ lead.category }}</span>
              </div>
              <div>
                <span class="text-slate-500 block text-[11px]">Quantity Required:</span>
                <span class="font-mono font-bold text-blue-700">{{ lead.quantityNeeded }}</span>
              </div>
              <div>
                <span class="text-slate-500 block text-[11px]">Destination Port:</span>
                <span class="font-bold text-slate-800">Port of {{ lead.destinationCountry }}</span>
              </div>
            </div>

            <div class="p-3 bg-white rounded-lg border border-slate-200 text-xs space-y-1">
              <span class="text-slate-500 font-bold">Buyer Specifications:</span>
              <p class="text-slate-700 leading-relaxed">{{ lead.specifications }}</p>
            </div>

            <div class="pt-2 flex justify-end">
              <button 
                (click)="sendQuoteResponse(lead.leadCode)"
                class="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-lg transition shadow-sm">
                Submit Quotation to Buyer
              </button>
            </div>

          </div>
        }
      </div>

    </div>
  `
})
export class BuyLeadsComponent {
  dataService = inject(ExportImportDataService);

  sendQuoteResponse(code: string) {
    alert(`TradeWheel Quote Engine: Opening direct negotiation line to submit FOB quotation for ${code}.`);
  }
}
