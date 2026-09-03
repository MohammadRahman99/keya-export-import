import { Component, inject, signal, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExportImportDataService } from '../../services/export-import-data.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-slate-100 text-slate-800 flex items-center justify-center p-4 font-sans">
      
      <div class="w-full max-w-md bg-white border-2 border-slate-300 rounded-xl p-8 space-y-6 shadow-xl">
        
        <!-- Header Branding with Official Logo & Classic Keya Border -->
        <div class="text-center space-y-3 border-b border-slate-200 pb-4">
          <div class="bg-slate-50 p-2 rounded border border-slate-200 inline-block">
            <img src="assets/logo/keya-logo.png" alt="Keya Group Official Logo" class="h-16 w-auto mx-auto object-contain">
          </div>
          <div>
            <h2 class="text-xl font-extrabold tracking-tight text-slate-900">KEYA GROUP ERP PORTAL</h2>
            <p class="text-xs text-slate-500 font-mono">Corporate Staff Sign-In Portal (URL: /sign-in)</p>
          </div>
        </div>

        <!-- Error Feedback -->
        @if (loginError()) {
          <div class="p-3 bg-red-50 border border-red-200 text-red-700 rounded text-xs flex items-center gap-2">
            <span>⚠️</span>
            <span>{{ loginError() }}</span>
          </div>
        }

        <!-- Credentials Form -->
        <form (ngSubmit)="performLogin()" class="space-y-4 text-xs">
          <div>
            <label class="block text-slate-700 font-bold mb-1">Corporate Email Address</label>
            <input 
              type="email" 
              [(ngModel)]="loginEmail" 
              name="loginEmail"
              placeholder="admin&#64;keyagroupbd.com" 
              required
              class="w-full bg-slate-50 border border-slate-300 rounded p-3 text-slate-900 font-mono focus:outline-none focus:border-blue-700">
          </div>

          <div>
            <label class="block text-slate-700 font-bold mb-1">Password</label>
            <input 
              type="password" 
              [(ngModel)]="loginPassword" 
              name="loginPassword"
              placeholder="••••••••" 
              required
              class="w-full bg-slate-50 border border-slate-300 rounded p-3 text-slate-900 font-mono focus:outline-none focus:border-blue-700">
          </div>

          <button 
            type="submit"
            class="w-full py-3 bg-blue-800 hover:bg-blue-900 text-white font-extrabold rounded text-xs transition shadow-md">
            Sign In to Staff Workspace
          </button>
        </form>

        <!-- Quick Demo Staff Accounts -->
        <div class="pt-4 border-t border-slate-200 space-y-2">
          <span class="text-[11px] font-bold text-slate-500 uppercase tracking-wider block text-center">Quick Demo Staff Accounts:</span>
          
          <div class="space-y-2 text-xs">
            <button 
              (click)="quickDemoLogin('admin@keyagroupbd.com', 'admin123')"
              class="w-full p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded flex items-center justify-between text-left transition">
              <div>
                <div class="font-bold text-emerald-800">👑 Admin (Executive Board)</div>
                <div class="text-[10px] text-slate-500 font-mono">admin&#64;keyagroupbd.com</div>
              </div>
              <span class="text-[10px] text-slate-700 font-bold">Sign In →</span>
            </button>

            <button 
              (click)="quickDemoLogin('investigator@keyagroupbd.com', 'audit123')"
              class="w-full p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded flex items-center justify-between text-left transition">
              <div>
                <div class="font-bold text-blue-800">🔍 Investigating Officer (Customs Audit)</div>
                <div class="text-[10px] text-slate-500 font-mono">investigator&#64;keyagroupbd.com</div>
              </div>
              <span class="text-[10px] text-slate-700 font-bold">Sign In →</span>
            </button>

            <button 
              (click)="quickDemoLogin('operator@keyagroupbd.com', 'oper123')"
              class="w-full p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded flex items-center justify-between text-left transition">
              <div>
                <div class="font-bold text-amber-800">🏭 Operator (Warehouse & PO Entry)</div>
                <div class="text-[10px] text-slate-500 font-mono">operator&#64;keyagroupbd.com</div>
              </div>
              <span class="text-[10px] text-slate-700 font-bold">Sign In →</span>
            </button>
          </div>
        </div>

        <div class="text-center pt-2">
          <button (click)="onBackToPublic.emit()" class="text-xs text-slate-500 hover:text-slate-800 font-semibold">
            ← Back to Public Website
          </button>
        </div>

      </div>

    </div>
  `
})
export class SignInComponent {
  dataService = inject(ExportImportDataService);
  onLoginSuccess = output<void>();
  onBackToPublic = output<void>();

  loginEmail = '';
  loginPassword = '';
  loginError = signal('');

  performLogin() {
    this.loginError.set('');
    const success = this.dataService.login(this.loginEmail, this.loginPassword);
    if (success) {
      this.onLoginSuccess.emit();
    } else {
      this.loginError.set('Invalid credentials! Try demo account: admin@keyagroupbd.com / admin123');
    }
  }

  quickDemoLogin(email: string, pass: string) {
    this.loginEmail = email;
    this.loginPassword = pass;
    this.performLogin();
  }
}
