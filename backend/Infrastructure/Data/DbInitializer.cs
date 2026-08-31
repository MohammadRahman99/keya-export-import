using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KeyaExportImport.Api.Core.Entities;

namespace KeyaExportImport.Api.Infrastructure.Data
{
    public static class DbInitializer
    {
        public static async Task SeedAsync(ApplicationDbContext context)
        {
            await context.Database.EnsureCreatedAsync();

            // Seed Products
            if (!context.Products.Any())
            {
                var products = new List<Product>
                {
                    new Product { ProductId = "PRD-101", Name = "100% Cotton Pique Polo Shirt", Sku = "KEYA-KNIT-POLO-01", Category = "Knitwear", Unit = "Pcs", SupplierId = "SUP-01", SupplierName = "Queensland Cotton Corp", CountryOfOrigin = "Bangladesh", HsCode = "6105.10", UnitPriceUSD = 5.0m, StockLevel = 85000 },
                    new Product { ProductId = "PRD-102", Name = "Basic Cotton Crewneck T-Shirt", Sku = "KEYA-KNIT-TSH-02", Category = "Knitwear", Unit = "Pcs", SupplierId = "SUP-01", SupplierName = "Queensland Cotton Corp", CountryOfOrigin = "Bangladesh", HsCode = "6109.10", UnitPriceUSD = 2.80m, StockLevel = 140000 },
                    new Product { ProductId = "PRD-103", Name = "Combed Ring Spun Yarn Ne 30/1", Sku = "KEYA-SPIN-YRN-30", Category = "Yarn", Unit = "Kg", SupplierId = "SUP-02", SupplierName = "Uster Cotton Fiber Inc", CountryOfOrigin = "USA", HsCode = "5205.22", UnitPriceUSD = 4.50m, StockLevel = 45000 },
                    new Product { ProductId = "PRD-104", Name = "Keya Beauty Soap Bar 100g", Sku = "KEYA-COS-SOAP-100", Category = "Cosmetics & Toiletries", Unit = "Cartons", SupplierId = "SUP-03", SupplierName = "Archroma Dyestuffs GmbH", CountryOfOrigin = "Bangladesh", HsCode = "3401.11", UnitPriceUSD = 14.40m, StockLevel = 12500 },
                    new Product { ProductId = "PRD-105", Name = "Australian Raw Cotton Bales", Sku = "KEYA-COT-BAL-AU", Category = "Raw Cotton & Fiber", Unit = "Bales", SupplierId = "SUP-01", SupplierName = "Queensland Cotton Corp", CountryOfOrigin = "Australia", HsCode = "5201.00", UnitPriceUSD = 390.00m, StockLevel = 3200 }
                };
                await context.Products.AddRangeAsync(products);
            }

            // Seed Suppliers
            if (!context.Suppliers.Any())
            {
                var suppliers = new List<Supplier>
                {
                    new Supplier { SupplierCode = "SUP-01", Name = "Queensland Cotton Corp", Country = "Australia", ContactPerson = "John Donaldson", Email = "j.donaldson@qldcotton.au", Phone = "+61 7 3000 8888", Rating = 4.9m, TotalTransactionsUSD = 42000000m, SuppliedProductsJson = "[\"Raw Cotton Bales\",\"Combing Fiber\"]", Status = "Active" },
                    new Supplier { SupplierCode = "SUP-02", Name = "Uster Cotton Fiber Inc", Country = "USA", ContactPerson = "Mark Vance", Email = "mvance@usterfiber.us", Phone = "+1 901 555 0192", Rating = 4.8m, TotalTransactionsUSD = 28000000m, SuppliedProductsJson = "[\"Pima Raw Cotton\",\"Combed Yarn\"]", Status = "Active" },
                    new Supplier { SupplierCode = "SUP-03", Name = "Archroma Dyestuffs GmbH", Country = "Switzerland", ContactPerson = "Dr. Hans Weber", Email = "h.weber@archroma.ch", Phone = "+41 61 716 1111", Rating = 4.95m, TotalTransactionsUSD = 18500000m, SuppliedProductsJson = "[\"Reactive Dyes\",\"Auxiliary Chemicals\"]", Status = "Active" }
                };
                await context.Suppliers.AddRangeAsync(suppliers);
            }

            // Seed Customers
            if (!context.Customers.Any())
            {
                var customers = new List<Customer>
                {
                    new Customer { CustomerCode = "CUST-01", CompanyName = "H&M Global Sourcing GmbH", Country = "Germany", ContactPerson = "Emma Lindqvist", Email = "sourcing@hm.com", TotalOrdersUSD = 65000000m, CreditLimitUSD = 10000000m },
                    new Customer { CustomerCode = "CUST-02", CompanyName = "Target Sourcing Services", Country = "USA", ContactPerson = "Michael Miller", Email = "apparel.import@target.com", TotalOrdersUSD = 48000000m, CreditLimitUSD = 8000000m },
                    new Customer { CustomerCode = "CUST-03", CompanyName = "Al-Madina Hypermarkets", Country = "UAE", ContactPerson = "Tariq Al-Mansoor", Email = "trade@almadinauae.com", TotalOrdersUSD = 12000000m, CreditLimitUSD = 3000000m }
                };
                await context.Customers.AddRangeAsync(customers);
            }

            // Seed ImportPOs
            if (!context.ImportPOs.Any())
            {
                var pos = new List<ImportPO>
                {
                    new ImportPO { PoNumber = "PO-IMP-2026-081", PiNumber = "PI-QLD-8820", LcNumber = "LC-HSBC-2026-081", SupplierName = "Queensland Cotton Corp", ProductName = "Australian Raw Cotton Bales", Quantity = 1200, Unit = "Bales", UnitPriceUSD = 390.0m, TotalValueUSD = 468000m, Currency = "USD", ExpectedArrival = DateTime.UtcNow.AddDays(10), Status = "In Transit" },
                    new ImportPO { PoNumber = "PO-IMP-2026-089", PiNumber = "PI-ARCH-3041", LcNumber = "LC-EBL-2026-099", SupplierName = "Archroma Dyestuffs GmbH", ProductName = "Eco Reactive Dyes", Quantity = 22, Unit = "Metric Tons", UnitPriceUSD = 6000.0m, TotalValueUSD = 132000m, Currency = "EUR", ExpectedArrival = DateTime.UtcNow.AddDays(15), Status = "LC Opened" }
                };
                await context.ImportPOs.AddRangeAsync(pos);
            }

            // Seed ExportOrders
            if (!context.ExportOrders.Any())
            {
                var exports = new List<ExportOrder>
                {
                    new ExportOrder { OrderId = "EXP-SO-8812", CustomerName = "H&M Global Sourcing GmbH", DestinationCountry = "Germany", SalesOrderNo = "SO-KEYA-2026-44", ExportInvoiceNo = "EXP-INV-8812", ExportQuantity = 42500, Unit = "Pcs", ExportValueUSD = 212500m, Status = "Vessel Dispatched" },
                    new ExportOrder { OrderId = "EXP-SO-8815", CustomerName = "Target Sourcing Services", DestinationCountry = "USA", SalesOrderNo = "SO-KEYA-2026-50", ExportInvoiceNo = "EXP-INV-8815", ExportQuantity = 38000, Unit = "Pcs", ExportValueUSD = 342000m, Status = "Customs Cleared" }
                };
                await context.ExportOrders.AddRangeAsync(exports);
            }

            // Seed Shipments
            if (!context.Shipments.Any())
            {
                var shipments = new List<Shipment>
                {
                    new Shipment { ShipmentCode = "SHP-EX-9921", BolNumber = "MSCUBD8849201", LcNumber = "LC-HSBC-2026-081", Type = "EXPORT", Division = "Keya Knit Composite Ltd.", ClientOrSupplier = "H&M Global Sourcing (Hamburg, Germany)", OriginPort = "Chattogram Port (CGP), Bangladesh", DestinationPort = "Hamburg Port, Germany", ContainerId = "MSCU7729104", ContainerSize = "40FT HC", ItemsDescription = "100% Organic Cotton Men's Pique Polo Shirts (Hs Code: 6105.10)", QuantityUnits = "42,500 Pcs", ValueUSD = 212500m, Status = "Loaded at Sea", ProgressPercentage = 65, DepartureDate = DateTime.UtcNow.AddDays(-10), Eta = DateTime.UtcNow.AddDays(12), VesselName = "MSC Isabella (Voyage 402W)" },
                    new Shipment { ShipmentCode = "SHP-IM-3041", BolNumber = "CMAU30948172", LcNumber = "LC-EBL-2026-099", Type = "IMPORT", Division = "Keya Cotton & Fiber Supply", ClientOrSupplier = "Queensland Cotton Corp (Brisbane, Australia)", OriginPort = "Port of Brisbane, Australia", DestinationPort = "Chattogram Port (CGP), Bangladesh", ContainerId = "CMAU8810293", ContainerSize = "40FT HC", ItemsDescription = "High Grade Raw Australian Cotton Bales (Hs Code: 5201.00)", QuantityUnits = "1,200 Bales (260 MT)", ValueUSD = 468000m, Status = "Port Customs Clear", ProgressPercentage = 90, DepartureDate = DateTime.UtcNow.AddDays(-18), Eta = DateTime.UtcNow.AddDays(2), VesselName = "CMA CGM Antoine (Voyage 129N)" }
                };
                await context.Shipments.AddRangeAsync(shipments);
            }

            // Seed CustomsDocs
            if (!context.CustomsDocs.Any())
            {
                var docs = new List<CustomsDoc>
                {
                    new CustomsDoc { DocId = "DOC-CI-9921", Type = "Commercial Invoice", RefNumber = "INV-KEYA-2026-092", DutyTaxUSD = 0m, ClearanceStatus = "Passed", IssueDate = DateTime.UtcNow.AddDays(-5) },
                    new CustomsDoc { DocId = "DOC-CUST-301", Type = "Customs Declaration", RefNumber = "C-NO-CGP-2026-9041", DutyTaxUSD = 42120m, ClearanceStatus = "Duty Paid", IssueDate = DateTime.UtcNow.AddDays(-2) }
                };
                await context.CustomsDocs.AddRangeAsync(docs);
            }

            // Seed WarehouseItems
            if (!context.WarehouseItems.Any())
            {
                var items = new List<WarehouseItem>
                {
                    new WarehouseItem { ItemCode = "WH-01", ProductName = "100% Cotton Pique Polo Shirt", Sku = "KEYA-KNIT-POLO-01", ImportedQty = 90000, ReceivedQty = 88500, DamagedQty = 1500, CurrentStock = 85000, Unit = "Pcs", WarehouseLocation = "Gazipur Central Hub" },
                    new WarehouseItem { ItemCode = "WH-02", ProductName = "Combed Ring Spun Yarn Ne 30/1", Sku = "KEYA-SPIN-YRN-30", ImportedQty = 50000, ReceivedQty = 49800, DamagedQty = 200, CurrentStock = 45000, Unit = "Kg", WarehouseLocation = "Konabari Yarn Depot" }
                };
                await context.WarehouseItems.AddRangeAsync(items);
            }

            // Seed LandedCosts
            if (!context.LandedCosts.Any())
            {
                var costs = new List<LandedCost>
                {
                    new LandedCost { ImportId = "IMP-COST-301", ProductName = "Australian Raw Cotton Bales", BaseCostUSD = 390.0m, FreightUSD = 24.5m, InsuranceUSD = 3.8m, CustomsDutyUSD = 35.1m, PortChargesUSD = 8.2m, CnfChargesUSD = 5.4m, OtherExpensesUSD = 3.0m, TotalLandedCostUSD = 470.0m, LandedUnitCostUSD = 470.0m, Quantity = 1200, ProjectedProfitMargin = 24.5m }
                };
                await context.LandedCosts.AddRangeAsync(costs);
            }

            // Seed UserRoleProfiles
            if (!context.UserRoles.Any())
            {
                var users = new List<UserRoleProfile>
                {
                    new UserRoleProfile { UserCode = "USR-01", Name = "Abdul Khaleque Pathan", Email = "chairman@keyagroupbd.com", Role = "Management", Department = "Executive Board", PermissionsJson = "[\"ALL_ACCESS\",\"EXECUTIVE_REPORTS\"]" },
                    new UserRoleProfile { UserCode = "USR-02", Name = "Rahim Chowdhury", Email = "admin@keyagroupbd.com", Role = "Admin", Department = "IT System Admin", PermissionsJson = "[\"USER_MANAGE\",\"SYSTEM_CONFIG\"]" },
                    new UserRoleProfile { UserCode = "USR-03", Name = "Sarah Jenkins", Email = "export@keyagroupbd.com", Role = "Export Manager", Department = "International Garments Export", PermissionsJson = "[\"EXPORT_ORDER\",\"INVOICE_GEN\"]" }
                };
                await context.UserRoles.AddRangeAsync(users);
            }

            await context.SaveChangesAsync();
        }
    }
}
