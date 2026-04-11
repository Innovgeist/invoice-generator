/**
 * Quotation Studio - Professional Quotation Maker
 * A clean, elegant solution for creating beautiful quotations
 */

class QuotationGenerator {
    constructor() {
        this.services = [];
        this.currency = '$';
        this.taxRate = 0;
        this.discountRate = 0;
        this.logoDataUrl = '../logo.png';
        this.signatureDataUrl = null;

        // Client history configuration (shared with Invoice Studio)
        this.savedClients = [];
        this.STORAGE_KEY = 'invoiceStudio_clients';
        this.MAX_CLIENTS = 10;

        // Default columns configuration
        this.columns = [
            { id: 'description', title: 'Description', type: 'text', align: 'left', width: '40%' },
            { id: 'qty', title: 'Qty', type: 'number', align: 'right', width: '10%' },
            { id: 'rate', title: 'Rate', type: 'number', align: 'right', width: '15%' },
            { id: 'amount', title: 'Amount', type: 'calculated', align: 'right', width: '15%' }
        ];

        this.init();
    }

    init() {
        this.cacheElements();
        this.bindEvents();
        this.setDefaultDates();
        this.setDefaultLogo();
        this.loadSavedClients();
        this.renderTableHeaders();
        this.addService();
        this.updatePreview();
    }

    setDefaultLogo() {
        this.logoPreview.src = '../logo.png';
        this.logoPreview.style.display = 'block';
        this.uploadPlaceholder.style.display = 'none';
    }

    cacheElements() {
        // Company inputs
        this.companyNameInput = document.getElementById('companyName');
        this.companyEmailInput = document.getElementById('companyEmail');
        this.companyPhoneInput = document.getElementById('companyPhone');
        this.companyAddressInput = document.getElementById('companyAddress');

        // Client inputs
        this.clientNameInput = document.getElementById('clientName');
        this.clientEmailInput = document.getElementById('clientEmail');
        this.clientPhoneInput = document.getElementById('clientPhone');
        this.clientAddressInput = document.getElementById('clientAddress');

        // Quotation details
        this.quotationNumberInput = document.getElementById('quotationNumber');
        this.quotationDateInput = document.getElementById('quotationDate');
        this.validUntilInput = document.getElementById('validUntil');
        this.quotationRefInput = document.getElementById('quotationRef');
        this.currencySelect = document.getElementById('currency');
        this.taxRateInput = document.getElementById('taxRate');
        this.discountRateInput = document.getElementById('discountRate');

        // Notes
        this.notesInput = document.getElementById('notes');
        this.termsInput = document.getElementById('terms');

        // Logo
        this.logoUpload = document.getElementById('logoUpload');
        this.logoInput = document.getElementById('logoInput');
        this.logoPreview = document.getElementById('logoPreview');
        this.uploadPlaceholder = document.getElementById('uploadPlaceholder');

        // Display elements
        this.displayCompanyName = document.getElementById('displayCompanyName');
        this.displayCompanyEmail = document.getElementById('displayCompanyEmail');
        this.displayCompanyPhone = document.getElementById('displayCompanyPhone');
        this.displayCompanyAddress = document.getElementById('displayCompanyAddress');
        this.displayClientName = document.getElementById('displayClientName');
        this.displayClientEmail = document.getElementById('displayClientEmail');
        this.displayClientPhone = document.getElementById('displayClientPhone');
        this.displayClientAddress = document.getElementById('displayClientAddress');
        this.displayQuotationNumber = document.getElementById('displayQuotationNumber');
        this.displayQuotationDate = document.getElementById('displayQuotationDate');
        this.displayValidUntil = document.getElementById('displayValidUntil');
        this.displayQuotationRef = document.getElementById('displayQuotationRef');
        this.refRow = document.getElementById('refRow');
        this.displayNotes = document.getElementById('displayNotes');
        this.displayTerms = document.getElementById('displayTerms');
        this.invoiceLogo = document.getElementById('invoiceLogo');

        // Totals
        this.subtotalEl = document.getElementById('subtotal');
        this.discountRowEl = document.getElementById('discountRow');
        this.discountPercentEl = document.getElementById('discountPercent');
        this.discountAmountEl = document.getElementById('discountAmount');
        this.taxRowEl = document.getElementById('taxRow');
        this.taxPercentEl = document.getElementById('taxPercent');
        this.taxAmountEl = document.getElementById('taxAmount');
        this.grandTotalEl = document.getElementById('grandTotal');

        // Services
        this.servicesBody = document.getElementById('servicesBody');
        this.headerRow = document.getElementById('headerRow');
        this.addServiceBtn = document.getElementById('addServiceBtn');

        // Print
        this.printBtn = document.getElementById('printBtn');

        // Currency Converter
        this.convertAmount = document.getElementById('convertAmount');
        this.convertFrom = document.getElementById('convertFrom');
        this.convertTo = document.getElementById('convertTo');
        this.convertBtn = document.getElementById('convertBtn');
        this.convertResult = document.getElementById('convertResult');

        // Signature
        this.signatureUpload = document.getElementById('signatureUpload');
        this.signatureInput = document.getElementById('signatureInput');
        this.signaturePreview = document.getElementById('signaturePreview');
        this.signatureUploadPlaceholder = document.getElementById('signatureUploadPlaceholder');
        this.clearSignatureBtn = document.getElementById('clearSignatureBtn');
        this.displaySignature = document.getElementById('displaySignature');

        // Client history
        this.saveClientBtn = document.getElementById('saveClientBtn');
        this.clientHistorySelect = document.getElementById('clientHistory');
    }

    bindEvents() {
        // Company info updates
        const companyInputs = [
            this.companyNameInput,
            this.companyEmailInput,
            this.companyPhoneInput,
            this.companyAddressInput
        ];
        companyInputs.forEach(input => {
            input.addEventListener('input', () => this.updateCompanyInfo());
        });

        // Client info updates
        const clientInputs = [
            this.clientNameInput,
            this.clientEmailInput,
            this.clientPhoneInput,
            this.clientAddressInput
        ];
        clientInputs.forEach(input => {
            input.addEventListener('input', () => this.updateClientInfo());
        });

        // Quotation details updates
        this.quotationNumberInput.addEventListener('input', () => this.updateQuotationDetails());
        this.quotationDateInput.addEventListener('input', () => this.updateQuotationDetails());
        this.validUntilInput.addEventListener('input', () => this.updateQuotationDetails());
        this.quotationRefInput.addEventListener('input', () => this.updateQuotationDetails());
        this.currencySelect.addEventListener('change', () => {
            this.currency = this.currencySelect.value;
            this.updateAllAmounts();
        });

        // Tax & Discount
        this.taxRateInput.addEventListener('input', () => {
            this.taxRate = parseFloat(this.taxRateInput.value) || 0;
            this.calculateTotals();
        });
        this.discountRateInput.addEventListener('input', () => {
            this.discountRate = parseFloat(this.discountRateInput.value) || 0;
            this.calculateTotals();
        });

        // Notes
        this.notesInput.addEventListener('input', () => this.updateNotes());
        this.termsInput.addEventListener('input', () => this.updateNotes());

        // Logo upload
        this.logoUpload.addEventListener('click', () => this.logoInput.click());
        this.logoInput.addEventListener('change', (e) => this.handleLogoUpload(e));

        // Add service
        this.addServiceBtn.addEventListener('click', () => this.addService());

        // Print
        this.printBtn.addEventListener('click', () => this.printQuotation());

        // Currency Converter
        this.convertBtn.addEventListener('click', () => this.convertCurrency());
        this.convertAmount.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.convertCurrency();
        });

        // Signature upload
        this.signatureUpload.addEventListener('click', () => this.signatureInput.click());
        this.signatureInput.addEventListener('change', (e) => this.handleSignatureUpload(e));
        this.clearSignatureBtn.addEventListener('click', () => this.clearSignature());

        // Client history
        this.saveClientBtn.addEventListener('click', () => this.saveCurrentClient());
        this.clientHistorySelect.addEventListener('change', (e) => this.handleClientSelect(e));
    }

    setDefaultDates() {
        const today = new Date();
        const validUntil = new Date(today);
        validUntil.setDate(validUntil.getDate() + 30);

        this.quotationDateInput.value = this.formatDateForInput(today);
        this.validUntilInput.value = this.formatDateForInput(validUntil);
        this.updateQuotationDetails();
    }

    formatDateForInput(date) {
        return date.toISOString().split('T')[0];
    }

    formatDateForDisplay(dateString) {
        if (!dateString) return '—';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    updatePreview() {
        this.updateCompanyInfo();
        this.updateClientInfo();
        this.updateQuotationDetails();
        this.updateNotes();
    }

    updateCompanyInfo() {
        const name = this.companyNameInput.value || 'Your Company';
        this.displayCompanyName.textContent = name;
        this.displayCompanyEmail.textContent = this.companyEmailInput.value;
        this.displayCompanyPhone.textContent = this.companyPhoneInput.value;
        this.displayCompanyAddress.textContent = this.companyAddressInput.value;
    }

    updateClientInfo() {
        this.displayClientName.textContent = this.clientNameInput.value || 'Client Name';
        this.displayClientEmail.textContent = this.clientEmailInput.value;
        this.displayClientPhone.textContent = this.clientPhoneInput.value;
        this.displayClientAddress.textContent = this.clientAddressInput.value;
    }

    updateQuotationDetails() {
        this.displayQuotationNumber.textContent = this.quotationNumberInput.value || 'QUO-001';
        this.displayQuotationDate.textContent = this.formatDateForDisplay(this.quotationDateInput.value);
        this.displayValidUntil.textContent = this.formatDateForDisplay(this.validUntilInput.value);

        const ref = this.quotationRefInput.value.trim();
        this.displayQuotationRef.textContent = ref || '—';
        this.refRow.style.display = ref ? 'flex' : 'none';
    }

    updateNotes() {
        this.displayNotes.textContent = this.notesInput.value;
        this.displayTerms.textContent = this.termsInput.value;

        // Show/hide sections based on content
        document.getElementById('notesSection').style.display =
            this.notesInput.value.trim() ? 'block' : 'none';
        document.getElementById('termsSection').style.display =
            this.termsInput.value.trim() ? 'block' : 'none';
    }

    handleLogoUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            this.logoDataUrl = e.target.result;

            // Update sidebar preview
            this.logoPreview.src = this.logoDataUrl;
            this.logoPreview.style.display = 'block';
            this.uploadPlaceholder.style.display = 'none';

            // Update quotation logo
            const invoiceLogoImg = document.getElementById('invoiceLogoImg');
            invoiceLogoImg.src = this.logoDataUrl;
        };
        reader.readAsDataURL(file);
    }

    handleSignatureUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            this.signatureDataUrl = e.target.result;

            // Update sidebar preview
            this.signaturePreview.src = this.signatureDataUrl;
            this.signaturePreview.style.display = 'block';
            this.signatureUploadPlaceholder.style.display = 'none';
            this.clearSignatureBtn.style.display = 'block';

            // Update quotation signature
            this.displaySignature.src = this.signatureDataUrl;
            this.displaySignature.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }

    clearSignature() {
        this.signatureDataUrl = null;
        this.signatureInput.value = '';

        // Reset sidebar preview
        this.signaturePreview.style.display = 'none';
        this.signatureUploadPlaceholder.style.display = 'flex';
        this.clearSignatureBtn.style.display = 'none';

        // Reset quotation signature
        this.displaySignature.style.display = 'none';
    }

    // Client History Management
    loadSavedClients() {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            this.savedClients = stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.error('Failed to load saved clients:', e);
            this.savedClients = [];
        }
        this.renderClientDropdown();
    }

    saveCurrentClient() {
        const name = this.clientNameInput.value.trim();
        const email = this.clientEmailInput.value.trim();
        const phone = this.clientPhoneInput.value.trim();
        const address = this.clientAddressInput.value.trim();

        if (!name) {
            alert('Please enter a client name before saving.');
            return;
        }

        const client = {
            id: Date.now(),
            name,
            email,
            phone,
            address,
            savedAt: Date.now()
        };

        // Check if client with same name exists
        const existingIndex = this.savedClients.findIndex(c => c.name.toLowerCase() === name.toLowerCase());
        if (existingIndex !== -1) {
            // Update existing client
            this.savedClients[existingIndex] = { ...client, id: this.savedClients[existingIndex].id };
        } else {
            // Add new client
            this.savedClients.unshift(client);

            // Keep only MAX_CLIENTS
            if (this.savedClients.length > this.MAX_CLIENTS) {
                this.savedClients = this.savedClients.slice(0, this.MAX_CLIENTS);
            }
        }

        this.persistClients();
        this.renderClientDropdown();

        // Visual feedback
        const originalHTML = this.saveClientBtn.innerHTML;
        this.saveClientBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
            </svg>
            Saved
        `;
        this.saveClientBtn.classList.add('saved');
        setTimeout(() => {
            this.saveClientBtn.innerHTML = originalHTML;
            this.saveClientBtn.classList.remove('saved');
        }, 1500);
    }

    applyClient(clientId) {
        const client = this.savedClients.find(c => c.id === clientId);
        if (!client) return;

        this.clientNameInput.value = client.name || '';
        this.clientEmailInput.value = client.email || '';
        this.clientPhoneInput.value = client.phone || '';
        this.clientAddressInput.value = client.address || '';

        this.updateClientInfo();
    }

    deleteClient(clientId) {
        this.savedClients = this.savedClients.filter(c => c.id !== clientId);
        this.persistClients();
        this.renderClientDropdown();
    }

    renderClientDropdown() {
        this.clientHistorySelect.innerHTML = '<option value="">Load saved client...</option>';

        this.savedClients.forEach(client => {
            const option = document.createElement('option');
            option.value = client.id;
            option.textContent = client.name;
            option.dataset.clientId = client.id;
            this.clientHistorySelect.appendChild(option);
        });
    }

    handleClientSelect(e) {
        const clientId = parseInt(e.target.value);
        if (clientId) {
            this.applyClient(clientId);
        }
        e.target.value = '';
    }

    persistClients() {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.savedClients));
        } catch (e) {
            console.error('Failed to save clients:', e);
        }
    }

    // Column Management
    renderTableHeaders() {
        this.headerRow.innerHTML = '';

        this.columns.forEach((col, index) => {
            const th = document.createElement('th');
            th.style.width = col.width;
            th.className = col.align === 'right' ? 'text-right' : '';

            if (col.type === 'calculated') {
                th.innerHTML = `<span class="header-text">${col.title}</span>`;
            } else {
                th.innerHTML = `
                    <div class="header-content">
                        <textarea class="header-input ${col.align === 'right' ? 'text-right' : ''}"
                               rows="1"
                               data-col-index="${index}">${col.title}</textarea>
                        <button class="btn-delete-column no-print" data-col-index="${index}" title="Delete column">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"/>
                                <line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                        </button>
                    </div>
                `;

                const input = th.querySelector('.header-input');
                input.addEventListener('input', (e) => {
                    this.columns[index].title = e.target.value;
                    e.target.style.height = 'auto';
                    e.target.style.height = Math.min(e.target.scrollHeight, 80) + 'px';
                });

                const deleteBtn = th.querySelector('.btn-delete-column');
                deleteBtn.addEventListener('click', () => this.deleteColumn(index));
            }

            this.headerRow.appendChild(th);
        });

        // Add action column for row delete
        const actionTh = document.createElement('th');
        actionTh.className = 'col-action no-print';
        actionTh.style.width = '50px';
        this.headerRow.appendChild(actionTh);
    }

    addColumn() {
        const newId = 'custom_' + Date.now();
        const newColumn = {
            id: newId,
            title: 'New Column',
            type: 'text',
            align: 'left',
            width: '15%'
        };

        const amountIndex = this.columns.findIndex(c => c.type === 'calculated');
        if (amountIndex !== -1) {
            this.columns.splice(amountIndex, 0, newColumn);
        } else {
            this.columns.push(newColumn);
        }

        this.services.forEach(service => {
            service[newId] = '';
        });

        this.renderTableHeaders();
        this.rerenderAllServices();
    }

    deleteColumn(index) {
        if (this.columns.length <= 2) {
            alert('Cannot delete: minimum 2 columns required');
            return;
        }

        const col = this.columns[index];
        if (col.type === 'calculated') {
            alert('Cannot delete the Amount column');
            return;
        }

        this.columns.splice(index, 1);

        this.services.forEach(service => {
            delete service[col.id];
        });

        this.renderTableHeaders();
        this.rerenderAllServices();
    }

    rerenderAllServices() {
        this.servicesBody.innerHTML = '';
        this.services.forEach(service => {
            this.renderServiceRow(service);
        });
        this.calculateTotals();
    }

    addService() {
        const id = Date.now();
        const service = { id };

        this.columns.forEach(col => {
            if (col.type === 'number') {
                service[col.id] = col.id === 'qty' ? 1 : 0;
            } else if (col.type !== 'calculated') {
                service[col.id] = '';
            }
        });

        this.services.push(service);
        this.renderServiceRow(service);
        this.calculateTotals();
    }

    renderServiceRow(service) {
        const row = document.createElement('tr');
        row.dataset.id = service.id;

        this.columns.forEach(col => {
            const td = document.createElement('td');

            if (col.type === 'calculated') {
                td.className = 'col-amount';
                const qty = service.qty || 0;
                const rate = service.rate || 0;
                td.innerHTML = `<span class="amount-display">${this.formatCurrency(qty * rate)}</span>`;
            } else {
                const inputType = col.type === 'number' ? 'number' : 'text';
                const value = service[col.id] || '';
                const placeholder = col.type === 'number' ? '0' : `Enter ${col.title.toLowerCase()}...`;

                td.innerHTML = `
                    <input type="${inputType}"
                           class="${col.align === 'right' ? 'text-right' : ''}"
                           placeholder="${placeholder}"
                           value="${value}"
                           ${col.type === 'number' ? 'min="0" step="0.01"' : ''}
                           data-field="${col.id}">
                `;

                const input = td.querySelector('input');
                input.addEventListener('input', (e) => {
                    const value = col.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value;
                    this.updateService(service.id, col.id, value);
                });
            }

            row.appendChild(td);
        });

        // Action column
        const actionTd = document.createElement('td');
        actionTd.className = 'col-action no-print';
        actionTd.innerHTML = `
            <button class="btn-remove-service" title="Remove row">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>
        `;
        row.appendChild(actionTd);

        row.querySelector('.btn-remove-service').addEventListener('click', () => {
            this.removeService(service.id);
        });

        this.servicesBody.appendChild(row);
    }

    updateService(id, field, value) {
        const service = this.services.find(s => s.id === id);
        if (service) {
            service[field] = value;

            const row = this.servicesBody.querySelector(`tr[data-id="${id}"]`);
            const amountDisplay = row.querySelector('.amount-display');
            const qty = service.qty || 0;
            const rate = service.rate || 0;
            amountDisplay.textContent = this.formatCurrency(qty * rate);

            this.calculateTotals();
        }
    }

    removeService(id) {
        this.services = this.services.filter(s => s.id !== id);
        const row = this.servicesBody.querySelector(`tr[data-id="${id}"]`);
        if (row) {
            row.style.opacity = '0';
            row.style.transform = 'translateX(-20px)';
            row.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                row.remove();
                this.calculateTotals();
            }, 300);
        }
    }

    updateAllAmounts() {
        this.services.forEach(service => {
            const row = this.servicesBody.querySelector(`tr[data-id="${service.id}"]`);
            if (row) {
                const amountDisplay = row.querySelector('.amount-display');
                if (amountDisplay) {
                    const qty = service.qty || 0;
                    const rate = service.rate || 0;
                    amountDisplay.textContent = this.formatCurrency(qty * rate);
                }
            }
        });
        this.calculateTotals();
    }

    calculateTotals() {
        const subtotal = this.services.reduce((sum, service) => {
            const qty = service.qty || 0;
            const rate = service.rate || 0;
            return sum + (qty * rate);
        }, 0);

        const discountAmount = subtotal * (this.discountRate / 100);
        const afterDiscount = subtotal - discountAmount;
        const taxAmount = afterDiscount * (this.taxRate / 100);
        const grandTotal = afterDiscount + taxAmount;

        this.subtotalEl.textContent = this.formatCurrency(subtotal);

        if (this.discountRate > 0) {
            this.discountRowEl.style.display = 'flex';
            this.discountPercentEl.textContent = this.discountRate;
            this.discountAmountEl.textContent = `-${this.formatCurrency(discountAmount)}`;
        } else {
            this.discountRowEl.style.display = 'none';
        }

        if (this.taxRate > 0) {
            this.taxRowEl.style.display = 'flex';
            this.taxPercentEl.textContent = this.taxRate;
            this.taxAmountEl.textContent = this.formatCurrency(taxAmount);
        } else {
            this.taxRowEl.style.display = 'none';
        }

        this.grandTotalEl.textContent = this.formatCurrency(grandTotal);
    }

    formatCurrency(amount) {
        const formatted = amount.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        return `${this.currency}${formatted}`;
    }

    async convertCurrency() {
        const amount = parseFloat(this.convertAmount.value);
        const from = this.convertFrom.value;
        const to = this.convertTo.value;

        if (!amount || amount <= 0) {
            this.convertResult.innerHTML = 'Please enter an amount';
            this.convertResult.className = 'convert-result error';
            return;
        }

        if (from === to) {
            this.convertResult.innerHTML = `<span class="converted-value">${amount.toFixed(2)} ${to}</span>`;
            this.convertResult.className = 'convert-result';
            return;
        }

        this.convertResult.innerHTML = 'Converting...';
        this.convertResult.className = 'convert-result loading';

        try {
            const response = await fetch(
                `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
            );

            if (!response.ok) {
                throw new Error('API error');
            }

            const data = await response.json();
            const convertedAmount = data.rates[to];

            this.convertResult.innerHTML = `
                <span>${amount.toFixed(2)} ${from} = </span>
                <span class="converted-value">${convertedAmount.toFixed(2)} ${to}</span>
            `;
            this.convertResult.className = 'convert-result';
        } catch (error) {
            console.error('Currency conversion failed:', error);
            this.convertResult.innerHTML = 'Conversion failed. Try again.';
            this.convertResult.className = 'convert-result error';
        }
    }

    printQuotation() {
        const printStyles = `
            @media print {
                body * { visibility: hidden; }
                .invoice, .invoice * { visibility: visible; }
                .invoice {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    padding: 20px;
                    box-shadow: none !important;
                }
                .no-print { display: none !important; }
                .signature-image { display: block !important; }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.id = 'print-styles';
        styleSheet.textContent = printStyles;
        document.head.appendChild(styleSheet);

        window.print();

        setTimeout(() => {
            const ps = document.getElementById('print-styles');
            if (ps) ps.remove();
        }, 1000);
    }
}

// Add spin animation
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    .spin {
        animation: spin 1s linear infinite;
    }
`;
document.head.appendChild(style);

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    window.quotationGenerator = new QuotationGenerator();
});
