import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportImportDataService, UserRole } from './services/export-import-data.service';

// Public Home Portal Component
import { PublicHomeComponent } from './components/public-home/public-home.component';

// Dedicated Staff Sign-In Page Component
import { SignInComponent } from './components/sign-in/sign-in.component';

// ERP Core Modules
import { ErpDashboardComponent } from './components/erp-dashboard/erp-dashboard.component';
import { RoleManagementComponent } from './components/role-management/role-management.component';
import { ImportManagementComponent } from './components/import-management/import-management.component';
import { ExportManagementComponent } from './components/export-management/export-management.component';
import { CalculatorsComponent } from './components/calculators/calculators.component';

export type AdminSidebarTab = 
  | 'dashboard'
  | 'employees'
  | 'imports' 
  | 'exports'
  | 'calculators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    PublicHomeComponent,
    SignInComponent,
    ErpDashboardComponent,
    RoleManagementComponent,
    ImportManagementComponent,
    ExportManagementComponent,
    CalculatorsComponent
  ],
  template: `
    <div class="min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-slate-950 font-sans">
      
      <!-- View 1: Dedicated Staff Sign-In Page (URL: /sign-in) -->
      @if (currentRoute() === 'SIGN_IN' && !dataService.currentUser()) {
        <app-sign-in 
          (onLoginSuccess)="onStaffLoginSuccess()" 
          (onBackToPublic)="navigateTo('PUBLIC')">
        </app-sign-in>
      }

      <!-- View 2: Keya Group Public Sourcing & B2B Trade Home Page (Clean Public Navbar) -->
      @if (currentRoute() === 'PUBLIC' && !dataService.currentUser()) {
        <app-public-home></app-public-home>
      }

      <!-- View 3: Role-Tailored Staff ERP Admin Workspace -->
      @if (dataService.currentUser()) {
        <div class="flex overflow-hidden h-screen">
          
          <!-- Streamlined Left Sidebar with Official Logo -->
          <aside class="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0 h-screen sticky top-0 text-slate-200">
            
            <div class="p-5 space-y-6 overflow-y-auto">
              
              <!-- ERP App Header Branding with Official Logo -->
              <div class="flex items-center gap-3 px-1 py-1">
                <img src="assets/logo/keya-logo.png" alt="Keya Group Logo" class="h-9 w-auto object-contain">
                <div>
                  <h1 class="font-black text-sm text-white tracking-wide">KEYA ERP PORTAL</h1>
                  <p class="text-[10px] text-slate-400 font-mono">Role: {{ getUserRole() }}</p>
                </div>
              </div>

              <!-- Logged User Info Box -->
              <div class="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <div class="flex items-center justify-between text-xs">
                  <span class="text-slate-400 text-[11px]">Active Session:</span>
                  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>
                <div class="font-bold text-white text-xs truncate">{{ dataService.currentUser()?.name }}</div>
                <div class="text-[11px] text-slate-400 truncate">{{ dataService.currentUser()?.department }}</div>
                <div class="flex items-center justify-between pt-1">
                  <span [class]="getRoleBadgeClass()">
                    {{ getUserRole() }}
                  </span>
                  <button (click)="logout()" class="text-[11px] text-red-400 hover:text-red-300 font-bold">Sign Out</button>
                </div>
              </div>

              <!-- DYNAMIC NAVIGATION MENU FILTERED BY ROLE -->
              <nav class="space-y-2 text-xs">
                <div class="px-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                  {{ getUserRole() }} Navigation
                </div>

                <!-- Tab 1: Overview Dashboard (All Roles) -->
                <button 
                  (click)="adminTab.set('dashboard')"
                  [class]="adminTab() === 'dashboard' ? 'w-full flex items-center gap-3 px-3.5 py-3 rounded-xl bg-emerald-600 text-white font-extrabold transition shadow-md' : 'w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white font-semibold transition text-left'">
                  <span class="text-lg">📊</span>
                  <span>Overview Dashboard</span>
                </button>

                <!-- Tab 2: Employee Management (ONLY Admin!) -->
                @if (getUserRole() === 'Admin') {
                  <button 
                    (click)="adminTab.set('employees')"
                    [class]="adminTab() === 'employees' ? 'w-full flex items-center gap-3 px-3.5 py-3 rounded-xl bg-amber-600 text-white font-extrabold transition shadow-md' : 'w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-amber-300 hover:bg-slate-800 hover:text-white font-semibold transition text-left'">
                    <span class="text-lg">👥</span>
                    <span>Employee Management</span>
                  </button>
                }

                <!-- Tab 3: Import Operations / Audit (All Roles) -->
                <button 
                  (click)="adminTab.set('imports')"
                  [class]="adminTab() === 'imports' ? 'w-full flex items-center gap-3 px-3.5 py-3 rounded-xl bg-blue-700 text-white font-extrabold transition shadow-md' : 'w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white font-semibold transition text-left'">
                  <span class="text-lg">📥</span>
                  <span>{{ isInvestigatingOfficer() ? 'Import Audit & PDF' : 'Import Operations' }}</span>
                </button>

                <!-- Tab 4: Export Operations / Audit (All Roles) -->
                <button 
                  (click)="adminTab.set('exports')"
                  [class]="adminTab() === 'exports' ? 'w-full flex items-center gap-3 px-3.5 py-3 rounded-xl bg-emerald-600 text-white font-extrabold transition shadow-md' : 'w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white font-semibold transition text-left'">
                  <span class="text-lg">📤</span>
                  <span>{{ isInvestigatingOfficer() ? 'Export Audit & PDF' : 'Export Operations' }}</span>
                </button>

                <!-- Tab 5: Trade Calculators (Import Landed Cost & Export Profit Margin Engine) -->
                <button 
                  (click)="adminTab.set('calculators')"
                  [class]="adminTab() === 'calculators' ? 'w-full flex items-center gap-3 px-3.5 py-3 rounded-xl bg-teal-600 text-white font-extrabold transition shadow-md' : 'w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white font-semibold transition text-left'">
                  <span class="text-lg">🧮</span>
                  <span>Import & Export Calculators</span>
                </button>
              </nav>

            </div>

            <!-- Sidebar Footer -->
            <div class="p-4 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div class="flex justify-between"><span>Role Mode:</span><span class="text-emerald-400 font-bold">{{ isInvestigatingOfficer() ? 'READ ONLY (PDF)' : 'FULL ACCESS' }}</span></div>
              <div class="flex justify-between"><span>System:</span><span class="font-mono">Keya RBAC v4.2</span></div>
            </div>

          </aside>

          <!-- Right Content Workspace -->
          <div class="flex-1 flex flex-col h-screen overflow-y-auto">
            
            <!-- Top Header Bar -->
            <header class="bg-white border-b border-slate-200 py-3.5 px-6 sticky top-0 z-30 flex items-center justify-between shadow-sm">
              <div class="flex items-center gap-3">
                <span class="text-xs font-mono text-slate-500">KEYA {{ getUserRole() }} PORTAL /</span>
                <h2 class="text-base font-black text-slate-900 uppercase tracking-wide">{{ getAdminTabTitle() }}</h2>
              </div>

              <div class="flex items-center gap-4">
                
                <!-- Currency Selector -->
                <div class="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 text-xs">
                  <span class="text-slate-600 font-medium">Currency:</span>
                  <select 
                    [value]="dataService.currentCurrency().code"
                    (change)="onCurrencySelect($event)"
                    class="bg-transparent text-emerald-700 font-bold font-mono focus:outline-none cursor-pointer">
                    @for (c of dataService.currencies(); track c.code) {
                      <option [value]="c.code" class="bg-white text-slate-900">{{ c.flag }} {{ c.code }} ({{ c.symbol }})</option>
                    }
                  </select>
                </div>

                <!-- Sign Out Button -->
                <button 
                  (click)="logout()"
                  class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs rounded-xl transition shadow-sm">
                  Sign Out
                </button>

              </div>
            </header>

            <!-- Dynamic Workspace Content View -->
            <main class="p-6 flex-1 bg-slate-50">
              @if (adminTab() === 'dashboard') { <app-erp-dashboard></app-erp-dashboard> }
              @if (adminTab() === 'employees' && getUserRole() === 'Admin') { <app-role-management></app-role-management> }
              @if (adminTab() === 'imports') { <app-import-management></app-import-management> }
              @if (adminTab() === 'exports') { <app-export-management></app-export-management> }
              @if (adminTab() === 'calculators') { <app-calculators></app-calculators> }
            </main>

          </div>

        </div>
      }

    </div>
  `
})
export class AppComponent implements OnInit {
  dataService = inject(ExportImportDataService);
  
  currentRoute = signal<'PUBLIC' | 'SIGN_IN'>('PUBLIC');
  adminTab = signal<AdminSidebarTab>('dashboard');

  ngOnInit() {
    this.checkUrlRoute();
    if (typeof window !== 'undefined') {
      window.addEventListener('popstate', () => this.checkUrlRoute());
      window.addEventListener('hashchange', () => this.checkUrlRoute());
    }
  }

  checkUrlRoute() {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes('sign-in') || path.includes('login') || hash.includes('sign-in') || hash.includes('login')) {
        this.currentRoute.set('SIGN_IN');
      }
    }
  }

  navigateTo(route: 'PUBLIC' | 'SIGN_IN') {
    this.currentRoute.set(route);
  }

  onStaffLoginSuccess() {
    this.adminTab.set('dashboard');
  }

  logout() {
    this.dataService.logout();
    this.currentRoute.set('PUBLIC');
  }

  getUserRole(): UserRole {
    return this.dataService.currentUser()?.role || 'Operator';
  }

  isInvestigatingOfficer(): boolean {
    return this.getUserRole() === 'Investigating Officer';
  }

  getRoleBadgeClass(): string {
    const role = this.getUserRole();
    if (role === 'Admin') return 'px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/30';
    if (role === 'Investigating Officer') return 'px-2.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-mono text-[10px] font-bold border border-blue-500/30';
    return 'px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-400 font-mono text-[10px] font-bold border border-amber-500/30';
  }

  getAdminTabTitle(): string {
    const titles: Record<AdminSidebarTab, string> = {
      dashboard: 'Overview Dashboard & Trade Statistics',
      employees: 'Keya Employee CRUD Management (Admin Only)',
      imports: this.isInvestigatingOfficer() ? 'Import Customs Audit & PDF Report Studio' : 'Import Operations Desk (Supplier Bids, POs & LCs)',
      exports: this.isInvestigatingOfficer() ? 'Export Clearance Audit & PDF Report Studio' : 'Export Operations Desk (Buyer RFQs & Vessel Orders)',
      calculators: 'Import Landed Cost & Export Profit Margin Calculators'
    };
    return titles[this.adminTab()];
  }

  onCurrencySelect(event: Event) {
    const code = (event.target as HTMLSelectElement).value;
    this.dataService.setCurrency(code);
  }
}
