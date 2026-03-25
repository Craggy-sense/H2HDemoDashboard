# H2H Transaction Dashboards DEMO

A comprehensive suite of Host-to-Host (H2H) transaction processing dashboards designed for monitoring and managing financial transactions between external institutions and internal systems.

## 🚀 Key Features

- **Multi-Version Workflow**:
  - **Landing Page (`landing.html`)**: A gateway to select between the standard and full-suite dashboard versions.
  - **Full Suite Dashboard (`index.html`)**: Features collapsible sidebar navigation, reports, enquiries, and a detailed recent transactions table.
  - **Plain Dashboard (`dashboard_v1.html`)**: A streamlined, single-screen overview focusing on core KPIs and 7-day trends.
- **Real-Time Monitoring**: Live clock, date, and "Live" status indicators for synchronized transaction tracking.
- **Interactive Analytics**: Dynamic line charts visualizing transaction volumes (Success vs. Failed) across different timeframes (Today, 7D, 30D, 1Q).
- **Data Export**: Built-in CSV export functionality for transaction reports based on active filters.
- **Advanced Filtering**: Search and filter transactions by type (EFT, RTGS, Mpesa, etc.), status, and date range.
- **Drill-Down Details**: In-depth modal views for individual transaction details and KPI specific performance trends.


> [!NOTE]
> **Framework Choice**: This project was intentionally built using **Vanilla JavaScript, HTML5, and CSS3** to fulfill a requirement for a lightweight, simple, and dependency-free frontend design. While the current implementation is optimized for speed and portability, I am fully capable of migrating this to a **React** (or similar framework) project if the requirements evolve to include more complex state management or component scalability.



## 🛠️ Technology Stack

This project is built using modern web standards without heavy external frameworks, ensuring high performance and ease of maintenance.

- **Frontend Core**:
  - **HTML5**: Semantic structure for accessibility and SEO.
  - **CSS3 (Vanilla)**: Custom design system using CSS Variables, Flexbox, and CSS Grid for a responsive, premium UI.
  - **JavaScript (ES6+)**: Vanilla JS for all interactive logic, DOM manipulation, data filtering, and CSV processing.

- **Data Visualization**:
  - **[Chart.js](https://www.chartjs.org/) (v4.4.0)**: Used for rendering high-performance, interactive trend lines and performance metrics.

- **Typography & Icons**:
  - **Google Fonts**: [Outfit](https://fonts.google.com/specimen/Outfit) (Headers) and [Inter](https://fonts.google.com/specimen/Inter) (Body) for a modern, readable aesthetic.
  - **Lucide-style Icons**: Iconography implemented via SVG and specialized font weights.
  - **Faulu Kenya Brand Palette**: Custom implementation of corporate identity (Purple and Orange 60-30-10 palette).

## 📂 Project Structure

- `landing.html`: Entry point for dashboard selection.
- `index.html`: Main dashboard implementation (Version 2).
- `dashboard_v1.html`: Streamlined dashboard implementation (Version 1).
- `.vscode/`: Workspace configuration.
- `.git/`: Version control history.

## 🖥️ How to Run

Simply open `landing.html` in any modern web browser to start exploring the dashboards. No build step or server is required for development/viewing.

---
&copy; 2026 **DEMO ** | *H2H Transaction Processing System*
