import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportImportDataService, UserRole } from './services/export-import-data.service';

// Modules
import { ErpDashboardComponent } from './components/erp-dashboard/erp-dashboard.component';
import { RoleManagementComponent } from './components/role-management/role-management.component';
import { ProductManagementComponent } from './components/product-management/product-management.component';
import { SupplierManagementComponent } from './components/supplier-management/supplier-management.component';
import { ImportManagementComponent } from './components/import-management/import-management.component';
import { ShipmentTrackerComponent } from './components/shipment-tracker/shipment-tracker.component';
import { CustomsDocsComponent } from './components/customs-docs/customs-docs.component';
import { WarehouseInventoryComponent } from './components/warehouse-inventory/warehouse-inventory.component';
import { ExportManagementComponent } from './components/export-management/export-management.component';
import { AccountsCostingComponent } from './components/accounts-costing/accounts-costing.component';
import { RfqCalculatorComponent } from './components/rfq-calculator/rfq-calculator.component';

export type SidebarTab = 
  | 'dashboard'
  | 'roles' 
  | 'products' 
  | 'suppliers' 
  | 'imports' 
  | 'shipments' 
  | 'customs' 
  | 'warehouse' 
  | 'exports' 
  | 'accounts'
  | 'calculator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ErpDashboardComponent,
    RoleManagementComponent,
    ProductManagementComponent,
    SupplierManagementComponent,
    ImportManagementComponent,
    ShipmentTrackerComponent,
    CustomsDocsComponent,
    WarehouseInventoryComponent,
    ExportManagementComponent,
    AccountsCostingComponent,
    RfqCalculatorComponent
  ],
  template: `
    <div class="min-h-screen bg-slate-50 text-slate-900 flex overflow-hidden">
      
      <!-- Left Fixed Admin Sidebar -->
      <aside class="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0 h-screen sticky top-0 text-slate-200">
        
        <div class="p-4 space-y-6 overflow-y-auto">
          <!-- App Header Branding -->
          <div class="flex items-center gap-3 px-2 py-1">
            <div class="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-black text-white text-base shadow">
              K
            </div>
            <div>
              <h1 class="font-extrabold text-sm text-white tracking-wide">KEYA GROUP ERP</h1>
              <p class="text-[10px] text-slate-400 font-mono">Enterprise Admin Portal</p>
            </div>
          </div>

          <!-- Active User Profile Box -->
          <div class="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <div class="flex items-center justify-between text-xs">
              <span class="text-slate-400 text-[11px]">Active Staff:</span>
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <div class="text-xs font-bold text-white truncate">{{ getCurrentUser().name }}</div>
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-semibold">
                {{ dataService.activeRole() }}
              </span>
            </div>
          </div>

          <!-- Sidebar Navigation Links -->
          <nav class="space-y-1 text-xs">
            <div class="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Main Operations</div>
            
            <button 
              (click)="activeTab.set('dashboard')"
              [class]="activeTab() === 'dashboard' ? 'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-emerald-600 text-white font-bold transition shadow-sm' : 'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white font-medium transition text-left'">
              <span class="text-base">📊</span>
              <span>Dashboard & BI</span>
            </button>

            <button 
              (click)="activeTab.set('imports')"
              [class]="activeTab() === 'imports' ? 'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-emerald-600 text-white font-bold transition shadow-sm' : 'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white font-medium transition text-left'">
              <span class="text-base">📥</span>
              <span>Import PO & LC Desk</span>
            </button>

            <button 
              (click)="activeTab.set('exports')"
              [class]="activeTab() === 'exports' ? 'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-emerald-600 text-white font-bold transition shadow-sm' : 'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white font-medium transition text-left'">
              <span class="text-base">📤</span>
              <span>Export Sales Orders</span>
            </button>

            <button 
              (click)="activeTab.set('shipments')"
              [class]="activeTab() === 'shipments' ? 'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-emerald-600 text-white font-bold transition shadow-sm' : 'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white font-medium transition text-left'">
              <span class="text-base">🚢</span>
              <span>Vessel Logistics</span>
            </button>

            <button 
              (click)="activeTab.set('customs')"
              [class]="activeTab() === 'customs' ? 'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-emerald-600 text-white font-bold transition shadow-sm' : 'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white font-medium transition text-left'">
              <span class="text-base">📑</span>
              <span>Customs & Duty</span>
            </button>

            <button 
              (click)="activeTab.set('warehouse')"
              [class]="activeTab() === 'warehouse' ? 'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-emerald-600 text-white font-bold transition shadow-sm' : 'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white font-medium transition text-left'">
              <span class="text-base">🏬</span>
              <span>Warehouse Stock</span>
            </button>

            <div class="px-2 pt-4 pb-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Master Setup</div>

            <button 
              (click)="activeTab.set('products')"
              [class]="activeTab() === 'products' ? 'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-emerald-600 text-white font-bold transition shadow-sm' : 'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white font-medium transition text-left'">
              <span class="text-base">📦</span>
              <span>Product Master SKU</span>
            </button>

            <button 
              (click)="activeTab.set('suppliers')"
              [class]="activeTab() === 'suppliers' ? 'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-emerald-600 text-white font-bold transition shadow-sm' : 'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white font-medium transition text-left'">
              <span class="text-base">🏢</span>
              <span>Suppliers & Buyers</span>
            </button>

            <button 
              (click)="activeTab.set('accounts')"
              [class]="activeTab() === 'accounts' ? 'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-emerald-600 text-white font-bold transition shadow-sm' : 'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white font-medium transition text-left'">
              <span class="text-base">💰</span>
              <span>Landed Costing</span>
            </button>

            <button 
              (click)="activeTab.set('calculator')"
              [class]="activeTab() === 'calculator' ? 'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-emerald-600 text-white font-bold transition shadow-sm' : 'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white font-medium transition text-left'">
              <span class="text-base">🧮</span>
              <span>Container Load Calc</span>
            </button>

            <button 
              (click)="activeTab.set('roles')"
              [class]="activeTab() === 'roles' ? 'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-emerald-600 text-white font-bold transition shadow-sm' : 'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white font-medium transition text-left'">
              <span class="text-base">👥</span>
              <span>User & Role Security</span>
            </button>
          </nav>
        </div>

        <!-- Sidebar Footer -->
        <div class="p-4 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
          <div class="flex justify-between"><span>Database Status:</span><span class="text-emerald-400 font-bold">Online</span></div>
          <div class="flex justify-between"><span>Version:</span><span class="font-mono">v2.4.0 ERP</span></div>
        </div>

      </aside>

      <!-- Right Work Area Column (White / Light Background Theme) -->
      <div class="flex-1 flex flex-col h-screen overflow-y-auto">
        
        <!-- Top Admin Header (Clean White) -->
        <header class="bg-white border-b border-slate-200 py-3 px-6 sticky top-0 z-30 flex items-center justify-between shadow-sm">
          
          <!-- Active Breadcrumb -->
          <div class="flex items-center gap-3">
            <span class="text-xs font-mono text-slate-500">KEYA ERP /</span>
            <h2 class="text-base font-bold text-slate-900 uppercase tracking-wide">{{ getTabTitle() }}</h2>
          </div>

          <!-- Header Right Utilities -->
          <div class="flex items-center gap-4">
            
            <!-- Global Currency Selector -->
            <div class="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 text-xs">
              <span class="text-slate-600 font-medium">Trade Currency:</span>
              <select 
                [value]="dataService.currentCurrency().code"
                (change)="onCurrencySelect($event)"
                class="bg-transparent text-emerald-700 font-bold font-mono focus:outline-none cursor-pointer">
                @for (c of dataService.currencies(); track c.code) {
                  <option [value]="c.code" class="bg-white text-slate-900">{{ c.flag }} {{ c.code }} ({{ c.symbol }})</option>
                }
              </select>
            </div>

            <!-- Role Switcher Selector -->
            <div class="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 text-xs">
              <span class="text-slate-600 font-medium">Active Role:</span>
              <select 
                [value]="dataService.activeRole()"
                (change)="onRoleSelect($event)"
                class="bg-transparent text-slate-900 font-bold focus:outline-none cursor-pointer">
                <option value="Admin" class="bg-white text-slate-900">Admin</option>
                <option value="Export Manager" class="bg-white text-slate-900">Export Manager</option>
                <option value="Import Manager" class="bg-white text-slate-900">Import Manager</option>
                <option value="Accounts" class="bg-white text-slate-900">Accounts</option>
                <option value="Warehouse" class="bg-white text-slate-900">Warehouse</option>
                <option value="Management" class="bg-white text-slate-900">Executive Management</option>
              </select>
            </div>

          </div>

        </header>

        <!-- Dynamic Main Operational View Area (Light Theme Background) -->
        <main class="p-6 flex-1 bg-slate-50">
          @if (activeTab() === 'dashboard') {
            <app-erp-dashboard></app-erp-dashboard>
          }
          @if (activeTab() === 'roles') {
            <app-role-management></app-role-management>
          }
          @if (activeTab() === 'products') {
            <app-product-management></app-product-management>
          }
          @if (activeTab() === 'suppliers') {
            <app-supplier-management></app-supplier-management>
          }
          @if (activeTab() === 'imports') {
            <app-import-management></app-import-management>
          }
          @if (activeTab() === 'shipments') {
            <app-shipment-tracker></app-shipment-tracker>
          }
          @if (activeTab() === 'customs') {
            <app-customs-docs></app-customs-docs>
          }
          @if (activeTab() === 'warehouse') {
            <app-warehouse-inventory></app-warehouse-inventory>
          }
          @if (activeTab() === 'exports') {
            <app-export-management></app-export-management>
          }
          @if (activeTab() === 'accounts') {
            <app-accounts-costing></app-accounts-costing>
          }
          @if (activeTab() === 'calculator') {
            <app-rfq-calculator></app-rfq-calculator>
          }
        </main>

        <!-- Footer -->
        <footer class="bg-white border-t border-slate-200 py-3 px-6 text-xs text-slate-500 flex items-center justify-between">
          <span>© 2026 Keya Group Bangladesh. Internal ERP System.</span>
          <span class="font-mono text-emerald-700 font-bold">⚡ Angular 18 + Tailwind CSS</span>
        </footer>

      </div>

    </div>
  `
})
export class AppComponent {
  dataService = inject(ExportImportDataService);
  activeTab = signal<SidebarTab>('dashboard');

  getCurrentUser() {
    const role = this.dataService.activeRole();
    const found = this.dataService.users().find(u => u.role === role);
    return found || this.dataService.users()[0];
  }

  getTabTitle(): string {
    const titles: Record<SidebarTab, string> = {
      dashboard: 'Executive Dashboard & BI Reports',
      roles: 'User & Role Access Management',
      products: 'Product Master Catalog & SKU Data',
      suppliers: 'Supplier & Buyer Directory',
      imports: 'Import Purchase Orders & LC Lifecycle',
      shipments: 'Vessel Cargo & Container Tracking',
      customs: 'Customs Declarations & Duty Clearance',
      warehouse: 'Warehouse Stock Balance & Bin Management',
      exports: 'Export Sales Orders & Commercial Invoicing',
      accounts: 'Accounts & Landed Costing Engine',
      calculator: 'Container Load Capacity Calculator'
    };
    return titles[this.activeTab()];
  }

  onCurrencySelect(event: Event) {
    const code = (event.target as HTMLSelectElement).value;
    this.dataService.setCurrency(code);
  }

  onRoleSelect(event: Event) {
    const role = (event.target as HTMLSelectElement).value as UserRole;
    this.dataService.setRole(role);
  }
}
