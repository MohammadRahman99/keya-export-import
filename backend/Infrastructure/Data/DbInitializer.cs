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

            try
            {
                var test = context.UserRoles.Any();
            }
            catch
            {
                await context.Database.EnsureDeletedAsync();
                await context.Database.EnsureCreatedAsync();
            }

            // Seed UserRoleProfiles with 3 User Types (Admin, Investigating Officer, Operator)
            if (!context.UserRoles.Any())
            {
                var users = new List<UserRoleProfile>
                {
                    new UserRoleProfile { UserCode = "USR-ADM-01", Name = "Abdul Khaleque Pathan", Email = "admin@keyagroupbd.com", Password = "admin123", Role = "Admin", Department = "Executive Board", PermissionsJson = "[\"ALL_ACCESS\",\"MANAGE_USERS\"]" },
                    new UserRoleProfile { UserCode = "USR-INV-02", Name = "Major Saifuddin Ahmed", Email = "investigator@keyagroupbd.com", Password = "audit123", Role = "Investigating Officer", Department = "Customs & Compliance Audit", PermissionsJson = "[\"CUSTOMS_AUDIT\",\"DUTY_INSPECTION\"]" },
                    new UserRoleProfile { UserCode = "USR-OPR-03", Name = "Tariqul Islam", Email = "operator@keyagroupbd.com", Password = "oper123", Role = "Operator", Department = "Gazipur Central Warehouse", PermissionsJson = "[\"WAREHOUSE_BIN\",\"PO_ENTRY\"]" }
                };
                await context.UserRoles.AddRangeAsync(users);
            }

            // Seed Products (ERP)
            if (!context.Products.Any())
            {
                var products = new List<Product>
                {
                    new Product { ProductId = "PRD-101", Name = "100% Cotton Pique Polo Shirt", Sku = "KEYA-KNIT-POLO-01", Category = "Knitwear", Unit = "Pcs", SupplierId = "SUP-01", SupplierName = "Queensland Cotton Corp", CountryOfOrigin = "Bangladesh", HsCode = "6105.10", UnitPriceUSD = 5.0m, StockLevel = 85000 },
                    new Product { ProductId = "PRD-102", Name = "Basic Cotton Crewneck T-Shirt", Sku = "KEYA-KNIT-TSH-02", Category = "Knitwear", Unit = "Pcs", SupplierId = "SUP-01", SupplierName = "Queensland Cotton Corp", CountryOfOrigin = "Bangladesh", HsCode = "6109.10", UnitPriceUSD = 2.80m, StockLevel = 140000 },
                    new Product { ProductId = "PRD-103", Name = "Combed Ring Spun Yarn Ne 30/1", Sku = "KEYA-SPIN-YRN-30", Category = "Yarn", Unit = "Kg", SupplierId = "SUP-02", SupplierName = "Uster Cotton Fiber Inc", CountryOfOrigin = "USA", HsCode = "5205.22", UnitPriceUSD = 4.50m, StockLevel = 45000 }
                };
                await context.Products.AddRangeAsync(products);
            }

            // Seed B2bProducts (TradeWheel Marketplace)
            if (!context.B2bProducts.Any())
            {
                var b2bProducts = new List<B2bProduct>
                {
                    new B2bProduct { ProductCode = "B2B-101", Title = "Custom Dyed Heavyweight Fleece Hoodies (GOTS Certified)", Category = "Knitwear & Apparel", Moq = "1,000 Pcs", FobPriceRange = "$8.50 - $11.00 / Pc", FobPriceMinUSD = 8.50m, FobPriceMaxUSD = 11.00m, SupplyCapacity = "150,000 Pcs / Month", SellerName = "Keya Knit Composite Ltd.", SellerVerificationTier = "Platinum Verified", Country = "Bangladesh", HsCode = "6110.20", ImageUrl = "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80", PortOfLoading = "Chattogram Port (CGP)" },
                    new B2bProduct { ProductCode = "B2B-102", Title = "Combed Ring Spun 100% Cotton Yarn Ne 30/1 - 40/1", Category = "Raw Cotton & Fiber", Moq = "5 Metric Tons", FobPriceRange = "$4.20 - $4.80 / Kg", FobPriceMinUSD = 4.20m, FobPriceMaxUSD = 4.80m, SupplyCapacity = "3,800 MT / Month", SellerName = "Keya Spinning Mills Ltd.", SellerVerificationTier = "Gold Verified", Country = "Bangladesh", HsCode = "5205.22", ImageUrl = "https://images.unsplash.com/photo-1605289355680-75fb4526f652?auto=format&fit=crop&w=800&q=80", PortOfLoading = "Chattogram Port (CGP)" }
                };
                await context.B2bProducts.AddRangeAsync(b2bProducts);
            }

            // Seed BuyLeads & Keya Tenders
            if (!context.BuyLeads.Any())
            {
                var buyLeads = new List<BuyLead>
                {
                    new BuyLead { LeadCode = "RFQ-901", Title = "Looking to Buy 50,000 Pcs Organic Pique Polo Shirts", Category = "Knitwear & Apparel", QuantityNeeded = "50,000 Pcs", TargetUnitPriceUSD = 5.20m, DestinationCountry = "Germany", BuyerName = "H&M Sourcing GmbH", BuyerEmail = "import@hm-sourcing.de", Status = "Active Buy Lead", ExpiryDate = DateTime.UtcNow.AddDays(25), Specifications = "100% GOTS Organic Cotton, OEKO-TEX Class 1, Custom Embroidery on Chest." },
                    new BuyLead { LeadCode = "TENDER-801", Title = "[KEYA PROCUREMENT TENDER] Procurement: 500 Metric Tons Raw Australian Cotton Bales", Category = "Raw Cotton & Fiber", QuantityNeeded = "500 MT (2,300 Bales)", TargetUnitPriceUSD = 3.80m, DestinationCountry = "Bangladesh (Chattogram Port)", BuyerName = "Keya Cotton & Fiber Supply", BuyerEmail = "procurement@keyagroupbd.com", Status = "Active Procurement Tender", ExpiryDate = DateTime.UtcNow.AddDays(20), Specifications = "Staple length 1-5/32 inch, Micronaire 3.8 - 4.2, CIF Chattogram Port." }
                };
                await context.BuyLeads.AddRangeAsync(buyLeads);
            }

            // Seed Supplier Bids
            if (!context.SupplierBids.Any())
            {
                var bids = new List<SupplierBid>
                {
                    new SupplierBid { BidCode = "BID-1001", TenderCode = "TENDER-801", SupplierCompanyName = "Queensland Cotton Corp (Australia)", OfferedUnitPriceUSD = 3.75m, TotalBidValueUSD = 1875000m, DeliveryLeadTimeDays = 14, ProposalDetails = "Premium High Combing Australian Raw Cotton Bales. Full ICA Quality Compliance Guarantee.", ContactEmail = "j.donaldson@qldcotton.au", ContactPhone = "+61 7 3000 8888", Status = "Under Review" },
                    new SupplierBid { BidCode = "BID-1002", TenderCode = "TENDER-801", SupplierCompanyName = "Uster Cotton Fiber Inc (USA)", OfferedUnitPriceUSD = 3.82m, TotalBidValueUSD = 1910000m, DeliveryLeadTimeDays = 18, ProposalDetails = "Memphis US Pima Raw Cotton Bales. Tested for HVI fiber strength.", ContactEmail = "mvance@usterfiber.us", ContactPhone = "+1 901 555 0192", Status = "Submitted" }
                };
                await context.SupplierBids.AddRangeAsync(bids);
            }

            // Seed SellerProfiles
            if (!context.SellerProfiles.Any())
            {
                var sellers = new List<SellerProfile>
                {
                    new SellerProfile { SellerCode = "SEL-01", CompanyName = "Keya Knit Composite Ltd.", VerificationTier = "Platinum Verified", Country = "Bangladesh", MemberSinceYears = 28, Rating = 4.9m, ResponseRatePercentage = 99.2m, MainExportProductsJson = "[\"Knitwear\",\"Polo Shirts\",\"Hoodies\"]" }
                };
                await context.SellerProfiles.AddRangeAsync(sellers);
            }

            // Seed Suppliers (ERP)
            if (!context.Suppliers.Any())
            {
                var suppliers = new List<Supplier>
                {
                    new Supplier { SupplierCode = "SUP-01", Name = "Queensland Cotton Corp", Country = "Australia", ContactPerson = "John Donaldson", Email = "j.donaldson@qldcotton.au", Phone = "+61 7 3000 8888", Rating = 4.9m, TotalTransactionsUSD = 42000000m, SuppliedProductsJson = "[\"Raw Cotton Bales\",\"Combing Fiber\"]", Status = "Active" }
                };
                await context.Suppliers.AddRangeAsync(suppliers);
            }

            // Seed Customers (ERP)
            if (!context.Customers.Any())
            {
                var customers = new List<Customer>
                {
                    new Customer { CustomerCode = "CUST-01", CompanyName = "H&M Global Sourcing GmbH", Country = "Germany", ContactPerson = "Emma Lindqvist", Email = "sourcing@hm.com", TotalOrdersUSD = 65000000m, CreditLimitUSD = 10000000m }
                };
                await context.Customers.AddRangeAsync(customers);
            }

            // Seed ImportPOs (ERP)
            if (!context.ImportPOs.Any())
            {
                var pos = new List<ImportPO>
                {
                    new ImportPO { PoNumber = "PO-IMP-2026-081", PiNumber = "PI-QLD-8820", LcNumber = "LC-HSBC-2026-081", SupplierName = "Queensland Cotton Corp", ProductName = "Australian Raw Cotton Bales", Quantity = 1200, Unit = "Bales", UnitPriceUSD = 390.0m, TotalValueUSD = 468000m, Currency = "USD", ExpectedArrival = DateTime.UtcNow.AddDays(10), Status = "In Transit" }
                };
                await context.ImportPOs.AddRangeAsync(pos);
            }

            // Seed ExportOrders (ERP)
            if (!context.ExportOrders.Any())
            {
                var exports = new List<ExportOrder>
                {
                    new ExportOrder { OrderId = "EXP-SO-8812", CustomerName = "H&M Global Sourcing GmbH", DestinationCountry = "Germany", SalesOrderNo = "SO-KEYA-2026-44", ExportInvoiceNo = "EXP-INV-8812", ExportQuantity = 42500, Unit = "Pcs", ExportValueUSD = 212500m, Status = "Vessel Dispatched" }
                };
                await context.ExportOrders.AddRangeAsync(exports);
            }

            // Seed Shipments (ERP)
            if (!context.Shipments.Any())
            {
                var shipments = new List<Shipment>
                {
                    new Shipment { ShipmentCode = "SHP-EX-9921", BolNumber = "MSCUBD8849201", LcNumber = "LC-HSBC-2026-081", Type = "EXPORT", Division = "Keya Knit Composite Ltd.", ClientOrSupplier = "H&M Global Sourcing (Hamburg, Germany)", OriginPort = "Chattogram Port (CGP), Bangladesh", DestinationPort = "Hamburg Port, Germany", ContainerId = "MSCU7729104", ContainerSize = "40FT HC", ItemsDescription = "100% Organic Cotton Men's Pique Polo Shirts", QuantityUnits = "42,500 Pcs", ValueUSD = 212500m, Status = "Loaded at Sea", ProgressPercentage = 65, DepartureDate = DateTime.UtcNow.AddDays(-10), Eta = DateTime.UtcNow.AddDays(12), VesselName = "MSC Isabella" }
                };
                await context.Shipments.AddRangeAsync(shipments);
            }

            // Seed CustomsDocs (ERP)
            if (!context.CustomsDocs.Any())
            {
                var docs = new List<CustomsDoc>
                {
                    new CustomsDoc { DocId = "DOC-CI-9921", Type = "Commercial Invoice", RefNumber = "INV-KEYA-2026-092", DutyTaxUSD = 0m, ClearanceStatus = "Passed", IssueDate = DateTime.UtcNow.AddDays(-5) }
                };
                await context.CustomsDocs.AddRangeAsync(docs);
            }

            // Seed WarehouseItems (ERP)
            if (!context.WarehouseItems.Any())
            {
                var items = new List<WarehouseItem>
                {
                    new WarehouseItem { ItemCode = "WH-01", ProductName = "100% Cotton Pique Polo Shirt", Sku = "KEYA-KNIT-POLO-01", ImportedQty = 90000, ReceivedQty = 88500, DamagedQty = 1500, CurrentStock = 85000, Unit = "Pcs", WarehouseLocation = "Gazipur Central Hub" }
                };
                await context.WarehouseItems.AddRangeAsync(items);
            }

            // Seed LandedCosts (ERP)
            if (!context.LandedCosts.Any())
            {
                var costs = new List<LandedCost>
                {
                    new LandedCost { ImportId = "IMP-COST-301", ProductName = "Australian Raw Cotton Bales", BaseCostUSD = 390.0m, FreightUSD = 24.5m, InsuranceUSD = 3.8m, CustomsDutyUSD = 35.1m, PortChargesUSD = 8.2m, CnfChargesUSD = 5.4m, OtherExpensesUSD = 3.0m, TotalLandedCostUSD = 470.0m, LandedUnitCostUSD = 470.0m, Quantity = 1200, ProjectedProfitMargin = 24.5m }
                };
                await context.LandedCosts.AddRangeAsync(costs);
            }

            await context.SaveChangesAsync();
        }
    }
}
