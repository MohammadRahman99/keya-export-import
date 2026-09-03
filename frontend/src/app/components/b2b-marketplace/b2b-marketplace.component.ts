import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExportImportDataService, B2bProduct } from '../../services/export-import-data.service';

@Component({
  selector: 'app-b2b-marketplace',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6">
      
      <!-- B2B Hero Search & Global Trade Banner (TradeWheel Style) -->
      <div class="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6 shadow-lg">
        
        <div class="max-w-3xl space-y-2">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold">
            🌐 World TradeWheel B2B Directory
          </div>
          <h2 class="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Global B2B Sourcing & Export Marketplace
          </h2>
          <p class="text-xs sm:text-sm text-slate-300">
            Connect directly with verified manufacturers, exporters, and international buyers for apparel, yarn, raw cotton, and cosmetics.
          </p>
        </div>

        <!-- B2B Global Search Bar -->
        <div class="bg-white p-2 rounded-xl text-slate-900 flex flex-col md:flex-row gap-2 shadow-2xl">
          
          <div class="flex-1 flex items-center gap-2 px-3 bg-slate-50 rounded-lg border border-slate-200">
            <span class="text-slate-400 text-base">🔍</span>
            <input 
              type="text" 
              [ngModel]="dataService.b2bSearchQuery()"
              (ngModelChange)="dataService.b2bSearchQuery.set($event)"
              placeholder="Search by Product name, HS Code (6105.10), or Manufacturer..."
              class="w-full bg-transparent py-2.5 text-xs text-slate-900 font-medium focus:outline-none">
          </div>

          <div class="w-full md:w-48 bg-slate-50 rounded-lg border border-slate-200 px-3 py-2 text-xs">
            <select 
              [value]="dataService.b2bCategoryFilter()"
              (change)="onCategorySelect($event)"
              class="w-full bg-transparent font-semibold text-slate-700 focus:outline-none cursor-pointer">
              <option value="ALL">All B2B Categories</option>
              <option value="Knitwear & Apparel">Knitwear & Apparel</option>
              <option value="Raw Cotton & Fiber">Raw Cotton & Fiber</option>
              <option value="Cosmetics & Toiletries">Cosmetics & Toiletries</option>
            </select>
          </div>

          <button 
            (click)="showPostRfqModal.set(true)"
            class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 shadow">
            <span>+ Post Buy Lead / RFQ</span>
          </button>

        </div>

      </div>

      <!-- Hot Trade Categories Cards -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        
        <button 
          (click)="filterCategory('ALL')"
          [class]="dataService.b2bCategoryFilter() === 'ALL' ? 'p-4 rounded-xl border-2 border-emerald-600 bg-white shadow-sm font-bold text-left text-slate-900' : 'p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 text-left text-slate-700 font-medium'">
          <div class="text-lg mb-1">📦</div>
          <div class="font-bold text-sm">All Products</div>
          <div class="text-[11px] text-slate-500">Master Catalog</div>
        </button>

        <button 
          (click)="filterCategory('Knitwear & Apparel')"
          [class]="dataService.b2bCategoryFilter() === 'Knitwear & Apparel' ? 'p-4 rounded-xl border-2 border-emerald-600 bg-white shadow-sm font-bold text-left text-slate-900' : 'p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 text-left text-slate-700 font-medium'">
          <div class="text-lg mb-1">👕</div>
          <div class="font-bold text-sm">Apparel & Knitwear</div>
          <div class="text-[11px] text-slate-500">Polo Shirts, Hoodies, Tees</div>
        </button>

        <button 
          (click)="filterCategory('Raw Cotton & Fiber')"
          [class]="dataService.b2bCategoryFilter() === 'Raw Cotton & Fiber' ? 'p-4 rounded-xl border-2 border-emerald-600 bg-white shadow-sm font-bold text-left text-slate-900' : 'p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 text-left text-slate-700 font-medium'">
          <div class="text-lg mb-1">🌾</div>
          <div class="font-bold text-sm">Raw Cotton & Yarn</div>
          <div class="text-[11px] text-slate-500">Combed Yarn, Cotton Bales</div>
        </button>

        <button 
          (click)="filterCategory('Cosmetics & Toiletries')"
          [class]="dataService.b2bCategoryFilter() === 'Cosmetics & Toiletries' ? 'p-4 rounded-xl border-2 border-emerald-600 bg-white shadow-sm font-bold text-left text-slate-900' : 'p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 text-left text-slate-700 font-medium'">
          <div class="text-lg mb-1">✨</div>
          <div class="font-bold text-sm">Cosmetics & Toiletries</div>
          <div class="text-[11px] text-slate-500">Soaps, Glycerine, Detergent</div>
        </button>

      </div>

      <!-- Verified Sellers Directory Showcase -->
      <div class="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
        <div class="flex items-center justify-between border-b border-slate-100 pb-2">
          <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider">Featured Verified B2B Suppliers</h3>
          <span class="text-[11px] text-emerald-700 font-bold font-mono">Trade Guarantee Verified</span>
        </div>

        <div class="grid md:grid-cols-2 gap-4 text-xs">
          @for (seller of dataService.sellerProfiles(); track seller.id) {
            <div class="p-4 bg-slate-50 rounded-lg border border-slate-200 flex items-start justify-between">
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <span class="font-extrabold text-slate-900 text-sm">{{ seller.companyName }}</span>
                  <span [class]="seller.verificationTier === 'Platinum Verified' ? 'px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-mono text-[10px] font-bold border border-indigo-200' : 'px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-mono text-[10px] font-bold border border-amber-200'">
                    ✓ {{ seller.verificationTier }}
                  </span>
                </div>
                <div class="text-slate-500 font-medium">🌐 {{ seller.country }} • {{ seller.memberSinceYears }} Years Member</div>
                <div class="text-emerald-700 font-mono font-bold">Response Rate: {{ seller.responseRatePercentage }}%</div>
              </div>
              <div class="text-right font-mono font-bold text-amber-600">
                ★ {{ seller.rating }}
              </div>
            </div>
          }
        </div>
      </div>

      <!-- B2B Product Listing Grid -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-extrabold text-slate-900">B2B Trade Products Catalog</h3>
          <span class="text-xs text-slate-500 font-mono">Showing {{ dataService.filteredB2bProducts().length }} Verified Products</span>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          @for (prd of dataService.filteredB2bProducts(); track prd.id) {
            <div class="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:border-emerald-600 transition flex flex-col sm:flex-row">
              
              <!-- Image Preview -->
              <div class="sm:w-2/5 relative bg-slate-100 min-h-[160px]">
                <img [src]="prd.imageUrl" [alt]="prd.title" class="w-full h-full object-cover">
                <span class="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-900/80 text-white font-mono text-[10px] font-bold backdrop-blur-sm">
                  HS: {{ prd.hsCode }}
                </span>
              </div>

              <!-- Product Trade Details -->
              <div class="sm:w-3/5 p-5 flex flex-col justify-between space-y-3">
                <div class="space-y-1">
                  <div class="flex items-center justify-between text-[11px]">
                    <span class="text-slate-500 font-medium">🌐 {{ prd.country }}</span>
                    <span class="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 text-[10px]">
                      {{ prd.sellerVerificationTier }}
                    </span>
                  </div>
                  <h4 class="font-extrabold text-slate-900 text-sm leading-snug">{{ prd.title }}</h4>
                  <p class="text-[11px] text-slate-500 font-medium">Seller: {{ prd.sellerName }}</p>
                </div>

                <div class="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1 text-xs">
                  <div class="flex justify-between">
                    <span class="text-slate-500">FOB Price:</span>
                    <span class="font-mono font-extrabold text-emerald-700">{{ prd.fobPriceRange }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-slate-500">Min. Order (MOQ):</span>
                    <span class="font-mono font-bold text-slate-800">{{ prd.moq }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-slate-500">Port of Loading:</span>
                    <span class="font-mono text-slate-700">{{ prd.portOfLoading }}</span>
                  </div>
                </div>

                <div class="pt-1 flex items-center justify-between">
                  <span class="text-[11px] text-slate-500 font-mono">Code: {{ prd.productCode }}</span>
                  <button 
                    (click)="openInquiryModal(prd)"
                    class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition shadow-sm">
                    Inquire Now
                  </button>
                </div>

              </div>

            </div>
          }
        </div>
      </div>

      <!-- Post Buy Lead / RFQ Modal -->
      @if (showPostRfqModal()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div class="bg-white w-full max-w-lg rounded-xl border border-slate-200 p-6 space-y-4 shadow-2xl">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 class="text-base font-bold text-slate-900">Post Buying Lead / Request for Quotation (RFQ)</h3>
              <button (click)="showPostRfqModal.set(false)" class="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <div class="space-y-3 text-xs">
              <div>
                <label class="block text-slate-700 font-semibold mb-1">Requirement Title</label>
                <input type="text" [(ngModel)]="newLeadTitle" placeholder="e.g. Looking for 50,000 Pcs Cotton T-Shirts" class="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900">
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-slate-700 font-semibold mb-1">Category</label>
                  <select [(ngModel)]="newLeadCategory" class="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900">
                    <option value="Knitwear & Apparel">Knitwear & Apparel</option>
                    <option value="Raw Cotton & Fiber">Raw Cotton & Fiber</option>
                    <option value="Cosmetics & Toiletries">Cosmetics & Toiletries</option>
                  </select>
                </div>
                <div>
                  <label class="block text-slate-700 font-semibold mb-1">Quantity Needed</label>
                  <input type="text" [(ngModel)]="newLeadQty" placeholder="50,000 Pcs" class="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 font-mono">
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-slate-700 font-semibold mb-1">Target Price / Unit (USD)</label>
                  <input type="number" [(ngModel)]="newLeadPrice" placeholder="5.20" class="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 font-mono">
                </div>
                <div>
                  <label class="block text-slate-700 font-semibold mb-1">Destination Country</label>
                  <input type="text" [(ngModel)]="newLeadCountry" placeholder="Germany" class="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900">
                </div>
              </div>

              <div>
                <label class="block text-slate-700 font-semibold mb-1">Detailed Specifications</label>
                <textarea [(ngModel)]="newLeadSpecs" rows="3" placeholder="100% Organic Cotton, OEKO-TEX certified, custom packaging required..." class="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900"></textarea>
              </div>
            </div>

            <div class="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button (click)="showPostRfqModal.set(false)" class="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold">Cancel</button>
              <button (click)="submitBuyLead()" class="px-4 py-2 bg-emerald-600 text-white font-bold rounded-lg text-xs">Publish RFQ</button>
            </div>
          </div>
        </div>
      }

      <!-- Send Trade Inquiry Modal -->
      @if (showInquiryModal()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div class="bg-white w-full max-w-lg rounded-xl border border-slate-200 p-6 space-y-4 shadow-2xl">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 class="text-base font-bold text-slate-900">Send Direct Trade Inquiry</h3>
              <button (click)="showInquiryModal.set(false)" class="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            @if (selectedProductForInquiry()) {
              <div class="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1">
                <div class="font-bold text-slate-900">{{ selectedProductForInquiry()?.title }}</div>
                <div class="text-slate-500 font-mono">Supplier: {{ selectedProductForInquiry()?.sellerName }}</div>
              </div>
            }

            <div class="space-y-3 text-xs">
              <div>
                <label class="block text-slate-700 font-semibold mb-1">Your Name / Buyer Representative</label>
                <input type="text" [(ngModel)]="inquiryName" placeholder="e.g. Mark Vance (Target Sourcing)" class="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900">
              </div>

              <div>
                <label class="block text-slate-700 font-semibold mb-1">Email Address</label>
                <input type="email" [(ngModel)]="inquiryEmail" placeholder="m.vance@target.com" class="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 font-mono">
              </div>

              <div>
                <label class="block text-slate-700 font-semibold mb-1">Inquiry Message</label>
                <textarea [(ngModel)]="inquiryMessage" rows="4" placeholder="Hello, we are interested in placing a trial order of 5,000 units. Please send your FOB pricing..." class="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900"></textarea>
              </div>
            </div>

            <div class="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button (click)="showInquiryModal.set(false)" class="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold">Cancel</button>
              <button (click)="submitInquiry()" class="px-4 py-2 bg-emerald-600 text-white font-bold rounded-lg text-xs">Send Inquiry</button>
            </div>
          </div>
        </div>
      }

    </div>
  `
})
export class B2bMarketplaceComponent {
  dataService = inject(ExportImportDataService);

  showPostRfqModal = signal(false);
  showInquiryModal = signal(false);
  selectedProductForInquiry = signal<B2bProduct | null>(null);

  // New Lead Form State
  newLeadTitle = '';
  newLeadCategory = 'Knitwear & Apparel';
  newLeadQty = '';
  newLeadPrice = 0;
  newLeadCountry = '';
  newLeadSpecs = '';

  // Inquiry Form State
  inquiryName = '';
  inquiryEmail = '';
  inquiryMessage = '';

  filterCategory(cat: string) {
    this.dataService.b2bCategoryFilter.set(cat);
  }

  onCategorySelect(event: Event) {
    const val = (event.target as HTMLSelectElement).value;
    this.dataService.b2bCategoryFilter.set(val);
  }

  openInquiryModal(product: B2bProduct) {
    this.selectedProductForInquiry.set(product);
    this.showInquiryModal.set(true);
  }

  submitBuyLead() {
    if (!this.newLeadTitle) return;
    this.dataService.postBuyLead({
      title: this.newLeadTitle,
      category: this.newLeadCategory,
      quantityNeeded: this.newLeadQty || '10,000 Pcs',
      targetUnitPriceUSD: this.newLeadPrice || 5.0,
      destinationCountry: this.newLeadCountry || 'Germany',
      specifications: this.newLeadSpecs || 'Standard B2B Specifications'
    });
    this.showPostRfqModal.set(false);
    this.newLeadTitle = '';
  }

  submitInquiry() {
    if (!this.inquiryMessage) return;
    this.dataService.sendInquiry({
      subject: `Inquiry for ${this.selectedProductForInquiry()?.title || 'B2B Product'}`,
      message: this.inquiryMessage,
      senderName: this.inquiryName || 'Buyer Representative',
      senderEmail: this.inquiryEmail || 'buyer@trade.com',
      targetProductOrLeadCode: this.selectedProductForInquiry()?.productCode || 'B2B-101'
    });
    this.showInquiryModal.set(false);
    this.inquiryMessage = '';
  }
}
