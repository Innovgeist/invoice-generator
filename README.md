# Invoice Studio

A modern, professional invoice generator built with vanilla HTML, CSS, and JavaScript. Create beautiful, customizable invoices with live preview and export to PDF.

**Live Demo:** [invoice.innovgeist.com](https://invoice.innovgeist.com)

![Invoice Studio](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Website](https://img.shields.io/badge/website-invoice.innovgeist.com-black.svg)

## Features

### Company Branding
- **Custom Logo Upload** - Upload your company logo (PNG, JPG, SVG supported)
- **Company Details** - Add company name, email, phone, and address
- **Default Configuration** - Pre-configured with your business details

### Client Management
- **Client Information** - Capture client name, email, phone, and address
- **Client History** - Save up to 10 clients in localStorage for quick reuse
- **Quick Load** - Select saved clients from dropdown to auto-fill form
- **Auto-formatting** - Clean display of client details on invoice

### Invoice Configuration
- **Invoice Numbering** - Custom invoice number support
- **Date Management** - Issue date and due date with date picker
- **Multi-Currency Support** - 9 currencies supported:
  - USD ($)
  - EUR (€)
  - GBP (£)
  - INR (₹)
  - JPY (¥)
  - CAD (C$)
  - AUD (A$)
  - CHF (Fr)
  - CNY (¥)

### Financial Calculations
- **Tax Rate** - Configurable tax percentage (0-100%)
- **Discount Rate** - Apply discounts as percentage
- **Auto-calculation** - Real-time subtotal, tax, discount, and grand total

### Currency Converter
- **Built-in Converter** - Convert between 9 major currencies
- **Real-time Rates** - Powered by Frankfurter API (free, no API key required)
- **Quick Reference** - Helpful for international invoicing

### Services Table
- **Editable Column Headers** - Customize column titles with text wrapping
- **Dynamic Rows** - Add/remove service line items
- **Flexible Columns** - Description, Quantity, Rate, and Amount
- **Delete Columns** - Remove unwanted columns (minimum 2 required)
- **Auto-calculation** - Amount = Quantity × Rate

### Notes & Terms
- **Custom Notes** - Add personalized messages to clients
- **Payment Terms** - Specify payment conditions and methods

### Digital Signature
- **Signature Upload** - Add your signature as an image
- **Clear Option** - Remove signature when needed
- **Professional Touch** - Signature appears above signature line

### Export & Print
- **Print / Save PDF** - Browser-based print with "Save as PDF" option
- **Clean Output** - All UI elements hidden in print view
- **Full Page** - Optimized for A4 paper size

### User Interface
- **Live Preview** - See changes in real-time
- **Black & White Theme** - Professional, clean aesthetic
- **Responsive Design** - Works on desktop and tablet
- **Smooth Animations** - Polished user experience

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Flexbox, Grid
- **Vanilla JavaScript** - ES6+ classes, async/await
- **Google Fonts** - Instrument Serif & DM Sans

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server required - runs entirely in the browser

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/invoice-studio.git
```

2. Navigate to the project folder:
```bash
cd invoice-studio
```

3. Open `index.html` in your browser:
```bash
# On macOS
open index.html

# On Windows
start index.html

# On Linux
xdg-open index.html
```

Or simply double-click the `index.html` file.

## Usage

### Creating an Invoice

1. **Add Company Details**
   - Upload your logo (optional)
   - Fill in company name, email, phone, and address

2. **Enter Client Information**
   - Add client's name and contact details
   - Click "Save Client" to save for future use
   - Or select a previously saved client from the dropdown

3. **Configure Invoice**
   - Set invoice number
   - Select issue and due dates
   - Choose currency

4. **Add Services**
   - Click "Add Row" to add line items
   - Enter description, quantity, and rate
   - Amount calculates automatically

5. **Apply Tax & Discount** (optional)
   - Enter tax percentage
   - Enter discount percentage

6. **Add Notes & Signature**
   - Write custom notes and payment terms
   - Upload your signature image

7. **Export**
   - Click "Print / Save PDF"
   - Select "Save as PDF" as destination
   - Click Save

### Customizing Column Headers

- Click on any column header to edit the title
- Headers support multi-line text (auto-wrap)
- Hover over a header to see the delete button
- Cannot delete the Amount column

## Project Structure

```
invoice-studio/
├── index.html      # Main HTML file
├── styles.css      # All styles and responsive design
├── script.js       # Application logic
├── logo.png        # Default company logo
└── README.md       # Documentation
```

## Browser Support

| Browser | Version |
|---------|---------|
| Chrome  | 80+     |
| Firefox | 75+     |
| Safari  | 13+     |
| Edge    | 80+     |

## API Reference

### Client History Storage

Client data is stored in the browser's localStorage:
- **Key**: `invoiceStudio_clients`
- **Format**: JSON array of client objects
- **Limit**: Maximum 10 clients (oldest removed when exceeded)
- **Persistence**: Data persists across browser sessions

### Currency Converter

The currency converter uses the [Frankfurter API](https://www.frankfurter.app/):
- **Free to use** - No API key required
- **Real-time rates** - Updated daily
- **Supported currencies** - EUR, USD, GBP, INR, JPY, CAD, AUD, CHF, CNY

## Customization

### Changing Default Company Details

Edit the values in `index.html`:
```html
<input type="text" id="companyName" value="Your Company Name">
<input type="text" id="companyEmail" value="your@email.com">
```

### Changing Color Theme

Modify CSS variables in `styles.css`:
```css
:root {
    --ink: #000000;
    --paper: #ffffff;
    --accent: #000000;
    /* ... */
}
```

### Adding New Currencies

Update the currency select in `index.html`:
```html
<select id="currency">
    <option value="₿">BTC (₿)</option>
    <!-- Add more currencies -->
</select>
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Google Fonts](https://fonts.google.com/) - Typography
- [Frankfurter API](https://www.frankfurter.app/) - Currency exchange rates
- Design inspired by modern invoice templates

## Support

For support, please open an issue in the GitHub repository.

---

Made with care by [Innovgeist](https://innovgeist.com)
