import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExportImportDataService } from '../../services/export-import-data.service';

@Component({
  selector: 'app-calculators',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-8">
      
      <!-- Top Banner -->
      <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span class="text-xs font-bold text-emerald-700 uppercase tracking-wider">Financial & Trade Logistics Analytics</span>
          <h2 class="text-2xl font-black text-slate-900">Keya Trade Calculation Suite</h2>
          <p class="text-xs text-slate-500 mt-1">Landed Cost Engine for Imports, Net Export Profitability Calculator & Container Freight Load CBM Calculator.</p>
        </div>

        <div class="p-1 bg-slate-100 rounded-xl flex text-xs font-bold flex-wrap gap-1">
          <button 
            (click)="activeCalc.set('IMPORT_COST')"
            [class]="activeCalc() === 'IMPORT_COST' ? 'px-3.5 py-2 rounded-lg bg-blue-800 text-white shadow' : 'px-3.5 py-2 text-slate-700 hover:text-slate-900'">
            📥 1. Import Landed Cost
          </button>
          <button 
            (click)="activeCalc.set('EXPORT_PROFIT')"
            [class]="activeCalc() === 'EXPORT_PROFIT' ? 'px-3.5 py-2 rounded-lg bg-emerald-700 text-white shadow' : 'px-3.5 py-2 text-slate-700 hover:text-slate-900'">
            📤 2. Export Profit Margin
          </button>
          <button 
            (click)="activeCalc.set('CONTAINER_LOAD')"
            [class]="activeCalc() === 'CONTAINER_LOAD' ? 'px-3.5 py-2 rounded-lg bg-amber-600 text-white shadow' : 'px-3.5 py-2 text-slate-700 hover:text-slate-900'">
            📦 3. Container Capacity Calculator
          </button>
        </div>
      </div>

      <!-- CALCULATOR 1: IMPORT LANDED COST CALCULATOR -->
      @if (activeCalc() === 'IMPORT_COST') {
        <div class="grid lg:grid-cols-12 gap-6 text-xs">
          
          <!-- Inputs Column (7 Cols) -->
          <div class="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <div class="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <span class="px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-mono text-[10px] font-bold">RAW MATERIAL IMPORT</span>
                <h3 class="text-base font-extrabold text-slate-900 mt-1">Import Landed Cost Calculation Inputs</h3>
              </div>
              <span class="text-xs font-mono font-bold text-slate-400">CIF Chattogram Port</span>
            </div>

            <div class="space-y-3">
              <div>
                <label class="block text-slate-700 font-semibold mb-1">Imported Product / Raw Material Name</label>
                <input type="text" [(ngModel)]="impName" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-medium">
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-slate-700 font-semibold mb-1">Import Volume Quantity</label>
                  <input type="number" [(ngModel)]="impQty" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-mono">
                </div>
                <div>
                  <label class="block text-slate-700 font-semibold mb-1">Unit Type (Bales/Kg/MT)</label>
                  <input type="text" [(ngModel)]="impUnit" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-semibold">
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-slate-700 font-semibold mb-1">Base FOB Price Per Unit (USD)</label>
                  <input type="number" [(ngModel)]="impFobPrice" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-mono">
                </div>
                <div>
                  <label class="block text-slate-700 font-semibold mb-1">Ocean Vessel Freight Per Unit ($)</label>
                  <input type="number" [(ngModel)]="impFreight" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-mono">
                </div>
              </div>

              <div class="grid grid-cols-3 gap-3">
                <div>
                  <label class="block text-slate-700 font-semibold mb-1">Marine Insurance ($)</label>
                  <input type="number" [(ngModel)]="impInsurance" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-mono">
                </div>
                <div>
                  <label class="block text-slate-700 font-semibold mb-1">Customs Duty % (CD/RD)</label>
                  <input type="number" [(ngModel)]="impDutyPercent" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-mono">
                </div>
                <div>
                  <label class="block text-slate-700 font-semibold mb-1">Port & C&F Charges ($)</label>
                  <input type="number" [(ngModel)]="impPortCnf" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-mono">
                </div>
              </div>
            </div>
          </div>

          <!-- Calculation Outputs Column (5 Cols) -->
          <div class="lg:col-span-5 space-y-4">
            
            <div class="bg-slate-900 text-white rounded-2xl p-6 space-y-4 shadow-xl border border-slate-800">
              <div class="text-xs text-slate-400 font-mono uppercase tracking-wider">Landed Cost Calculation Results</div>

              <div class="space-y-1">
                <div class="text-slate-400 text-xs">Total Landed Import Cost:</div>
                <div class="text-3xl font-black text-emerald-400 font-mono">
                  {{ dataService.formatValue(getImportTotalLandedCost()) }}
                </div>
              </div>

              <div class="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 font-mono text-xs">
                <div class="flex justify-between"><span class="text-slate-400">Base FOB Price:</span><span class="font-bold text-white">{{ dataService.formatValue(impFobPrice * impQty) }}</span></div>
                <div class="flex justify-between"><span class="text-slate-400">Ocean Freight:</span><span class="font-bold text-white">{{ dataService.formatValue(impFreight * impQty) }}</span></div>
                <div class="flex justify-between"><span class="text-slate-400">Marine Insurance:</span><span class="font-bold text-white">{{ dataService.formatValue(impInsurance * impQty) }}</span></div>
                <div class="flex justify-between"><span class="text-slate-400">Customs Duty ({{ impDutyPercent }}%):</span><span class="font-bold text-amber-400">{{ dataService.formatValue(getImportDutyCost()) }}</span></div>
                <div class="flex justify-between"><span class="text-slate-400">Port & C&F Expenses:</span><span class="font-bold text-white">{{ dataService.formatValue(impPortCnf * impQty) }}</span></div>
              </div>

              <div class="pt-2 border-t border-slate-800 flex justify-between items-center font-mono">
                <span class="text-slate-300 text-xs">Landed Unit Price / {{ impUnit }}:</span>
                <span class="text-xl font-extrabold text-blue-400">{{ dataService.formatValue(getImportLandedUnitPrice()) }}</span>
              </div>
            </div>

          </div>

        </div>
      }

      <!-- CALCULATOR 2: EXPORT PROFIT MARGIN CALCULATOR -->
      @if (activeCalc() === 'EXPORT_PROFIT') {
        <div class="grid lg:grid-cols-12 gap-6 text-xs">
          
          <!-- Inputs Column (7 Cols) -->
          <div class="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <div class="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-mono text-[10px] font-bold">GARMENTS EXPORT PROFIT</span>
                <h3 class="text-base font-extrabold text-slate-900 mt-1">Export Profit Margin Calculation Inputs</h3>
              </div>
              <span class="text-xs font-mono font-bold text-slate-400">FOB Commercial Invoice</span>
            </div>

            <div class="space-y-3">
              <div>
                <label class="block text-slate-700 font-semibold mb-1">Export Garment / Yarn Order Description</label>
                <input type="text" [(ngModel)]="expOrderTitle" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-medium">
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-slate-700 font-semibold mb-1">Total Export Order Quantity</label>
                  <input type="number" [(ngModel)]="expQty" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-mono">
                </div>
                <div>
                  <label class="block text-slate-700 font-semibold mb-1">Selling FOB Price Per Unit ($)</label>
                  <input type="number" [(ngModel)]="expSellingFob" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-mono">
                </div>
              </div>

              <div class="grid grid-cols-3 gap-3">
                <div>
                  <label class="block text-slate-700 font-semibold mb-1">Raw Cotton/Yarn Cost ($/Unit)</label>
                  <input type="number" [(ngModel)]="expYarnCost" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-mono">
                </div>
                <div>
                  <label class="block text-slate-700 font-semibold mb-1">CMT Manufacturing Labor ($)</label>
                  <input type="number" [(ngModel)]="expCmtCost" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-mono">
                </div>
                <div>
                  <label class="block text-slate-700 font-semibold mb-1">Freight & Clearing ($/Unit)</label>
                  <input type="number" [(ngModel)]="expFreightCost" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-mono">
                </div>
              </div>
            </div>
          </div>

          <!-- Calculation Outputs Column (5 Cols) -->
          <div class="lg:col-span-5 space-y-4">
            
            <div class="bg-slate-900 text-white rounded-2xl p-6 space-y-4 shadow-xl border border-slate-800">
              <div class="text-xs text-slate-400 font-mono uppercase tracking-wider">Export Profitability Results</div>

              <div class="space-y-1">
                <div class="text-slate-400 text-xs">Total Gross Export Sales Revenue:</div>
                <div class="text-3xl font-black text-white font-mono">
                  {{ dataService.formatValue(getExportTotalRevenue()) }}
                </div>
              </div>

              <div class="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 font-mono text-xs">
                <div class="flex justify-between"><span class="text-slate-400">Total Production Cost:</span><span class="font-bold text-red-400">{{ dataService.formatValue(getExportTotalProductionCost()) }}</span></div>
                <div class="flex justify-between"><span class="text-slate-400">Net Profit Amount (USD):</span><span class="font-bold text-emerald-400">{{ dataService.formatValue(getExportNetProfit()) }}</span></div>
              </div>

              <div class="pt-2 border-t border-slate-800 flex justify-between items-center font-mono">
                <span class="text-slate-300 text-xs">Net Export Profit Margin (%):</span>
                <span class="text-2xl font-black text-emerald-400">+{{ getExportProfitMarginPercent().toFixed(1) }}%</span>
              </div>
            </div>

          </div>

        </div>
      }

      <!-- CALCULATOR 3: CONTAINER CAPACITY & FREIGHT LOAD CALCULATOR -->
      @if (activeCalc() === 'CONTAINER_LOAD') {
        <div class="grid lg:grid-cols-12 gap-6 text-xs">
          
          <!-- Explanation Banner -->
          <div class="lg:col-span-12 bg-amber-50 p-4 rounded-xl border border-amber-300 text-amber-950 text-xs space-y-1">
            <h4 class="font-bold text-sm">💡 কন্টেইনার ক্যাফাসিটি (CBM) ক্যালকুলেটর কী এবং কেন ব্যবহার করা হয়?</h4>
            <p class="leading-relaxed">
              শিপমেন্টের আগে আপনার মোট কার্টন বা মালপত্র শিপিং কন্টেইনারে আঁটবে কিনা (উদা: ২০-ফিট বা ৪০-ফিট হাই-কিউব কন্টেইনার) তা নিখুঁতভাবে হিসেব করার জন্য এই ক্যালকুলেটর ব্যবহৃত হয়। কার্টনের দৈর্ঘ্য, প্রস্থ ও উচ্চতা সেন্টিমিটারে দিলে মোট <strong>CBM (Cubic Meter)</strong> এবং কন্টেইনারের কত % জায়গা দখল হবে তা জানা যায়।
            </p>
          </div>

          <!-- Inputs Column (7 Cols) -->
          <div class="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <div class="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <span class="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-mono text-[10px] font-bold">CONTAINER FREIGHT LOGISTICS</span>
                <h3 class="text-base font-extrabold text-slate-900 mt-1">Export Carton Dimensions & Quantity</h3>
              </div>
              <span class="text-xs font-mono font-bold text-slate-400">CBM Calculator</span>
            </div>

            <div class="space-y-3">
              <div>
                <label class="block text-slate-700 font-semibold mb-1">Target Shipping Container Type</label>
                <select [(ngModel)]="containerType" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-semibold">
                  <option value="20FT">20FT Standard FCL Container (33.2 CBM Max Capacity)</option>
                  <option value="40FT">40FT Standard FCL Container (67.7 CBM Max Capacity)</option>
                  <option value="40FTHC">40FT High Cube (40FT HC) Container (76.4 CBM Max Capacity)</option>
                </select>
              </div>

              <div>
                <label class="block text-slate-700 font-semibold mb-1">Total Number of Export Master Cartons</label>
                <input type="number" [(ngModel)]="cartonQty" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-mono">
              </div>

              <div class="grid grid-cols-3 gap-3">
                <div>
                  <label class="block text-slate-700 font-semibold mb-1">Length (cm)</label>
                  <input type="number" [(ngModel)]="cartonL" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-mono">
                </div>
                <div>
                  <label class="block text-slate-700 font-semibold mb-1">Width (cm)</label>
                  <input type="number" [(ngModel)]="cartonW" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-mono">
                </div>
                <div>
                  <label class="block text-slate-700 font-semibold mb-1">Height (cm)</label>
                  <input type="number" [(ngModel)]="cartonH" class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-mono">
                </div>
              </div>
            </div>
          </div>

          <!-- Output Column (5 Cols) -->
          <div class="lg:col-span-5 space-y-4">
            
            <div class="bg-slate-900 text-white rounded-2xl p-6 space-y-4 shadow-xl border border-slate-800">
              <div class="text-xs text-slate-400 font-mono uppercase tracking-wider">Container Utilization Results</div>

              <div class="space-y-1">
                <div class="text-slate-400 text-xs">Total Calculated Shipment Volume (CBM):</div>
                <div class="text-3xl font-black text-amber-400 font-mono">
                  {{ getCalculatedCbm().toFixed(2) }} CBM
                </div>
              </div>

              <div class="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 font-mono text-xs">
                <div class="flex justify-between"><span class="text-slate-400">Selected Container:</span><span class="font-bold text-white">{{ getContainerName() }}</span></div>
                <div class="flex justify-between"><span class="text-slate-400">Max Container Vol:</span><span class="font-bold text-white">{{ getContainerMaxCbm() }} CBM</span></div>
                <div class="flex justify-between"><span class="text-slate-400">Per Carton Vol:</span><span class="font-bold text-white">{{ (getCalculatedCbm() / (cartonQty || 1)).toFixed(3) }} CBM</span></div>
                <div class="flex justify-between"><span class="text-slate-400">Est. Freight Mode:</span><span class="font-bold text-emerald-400">{{ getFreightModeRecommendation() }}</span></div>
              </div>

              <div class="pt-2 border-t border-slate-800 space-y-1">
                <div class="flex justify-between text-xs font-mono">
                  <span class="text-slate-300">Container Fill Percentage:</span>
                  <span class="font-bold text-amber-400">{{ getContainerUtilizationPercent().toFixed(1) }}%</span>
                </div>
                
                <!-- Visual Utilization Progress Bar -->
                <div class="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div 
                    [style.width.%]="getContainerUtilizationPercent() > 100 ? 100 : getContainerUtilizationPercent()"
                    [class]="getContainerUtilizationPercent() > 100 ? 'h-full bg-red-500' : 'h-full bg-amber-500'">
                  </div>
                </div>
                @if (getContainerUtilizationPercent() > 100) {
                  <p class="text-[10px] text-red-400 font-mono pt-1">⚠️ Warning: Cargo volume exceeds 1 container capacity! Additional container required.</p>
                }
              </div>
            </div>

          </div>

        </div>
      }

    </div>
  `
})
export class CalculatorsComponent {
  dataService = inject(ExportImportDataService);

  activeCalc = signal<'IMPORT_COST' | 'EXPORT_PROFIT' | 'CONTAINER_LOAD'>('IMPORT_COST');

  // Import Landed Cost Model
  impName = 'Australian High Combing Raw Cotton Bales';
  impQty = 1200;
  impUnit = 'Bales';
  impFobPrice = 390.0;
  impFreight = 24.5;
  impInsurance = 3.8;
  impDutyPercent = 9.0;
  impPortCnf = 13.6;

  // Export Profit Model
  expOrderTitle = '100% Organic Pique Polo Shirts (Order #EXP-SO-8812)';
  expQty = 42500;
  expSellingFob = 5.00;
  expYarnCost = 2.40;
  expCmtCost = 1.10;
  expFreightCost = 0.30;

  // Container Load Model
  containerType = '40FTHC';
  cartonQty = 800;
  cartonL = 60;
  cartonW = 40;
  cartonH = 40;

  getImportDutyCost(): number {
    return (this.impFobPrice * this.impQty) * (this.impDutyPercent / 100);
  }

  getImportTotalLandedCost(): number {
    const base = (this.impFobPrice + this.impFreight + this.impInsurance + this.impPortCnf) * this.impQty;
    return base + this.getImportDutyCost();
  }

  getImportLandedUnitPrice(): number {
    return this.getImportTotalLandedCost() / (this.impQty || 1);
  }

  getExportTotalRevenue(): number {
    return this.expSellingFob * this.expQty;
  }

  getExportTotalProductionCost(): number {
    return (this.expYarnCost + this.expCmtCost + this.expFreightCost) * this.expQty;
  }

  getExportNetProfit(): number {
    return this.getExportTotalRevenue() - this.getExportTotalProductionCost();
  }

  getExportProfitMarginPercent(): number {
    const rev = this.getExportTotalRevenue();
    if (!rev) return 0;
    return (this.getExportNetProfit() / rev) * 100;
  }

  // Container Load Helper Methods
  getCalculatedCbm(): number {
    return (this.cartonL * this.cartonW * this.cartonH * this.cartonQty) / 1000000;
  }

  getContainerMaxCbm(): number {
    if (this.containerType === '20FT') return 33.2;
    if (this.containerType === '40FT') return 67.7;
    return 76.4; // 40FT HC
  }

  getContainerName(): string {
    if (this.containerType === '20FT') return '20FT Standard FCL';
    if (this.containerType === '40FT') return '40FT Standard FCL';
    return '40FT High Cube (40FT HC)';
  }

  getContainerUtilizationPercent(): number {
    const max = this.getContainerMaxCbm();
    return (this.getCalculatedCbm() / max) * 100;
  }

  getFreightModeRecommendation(): string {
    const cbm = this.getCalculatedCbm();
    if (cbm <= 15) return 'LCL (Less than Container Load)';
    if (cbm <= 33) return '1x 20FT FCL Container';
    if (cbm <= 76) return '1x 40FT HC Container';
    const count = Math.ceil(cbm / 76.4);
    return `${count}x 40FT HC Containers Required`;
  }
}
