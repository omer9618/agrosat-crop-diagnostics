# AgroSat — AI-Powered Satellite Crop Diagnostics Dashboard

A full-stack showcase project demonstrating React.js + Python (FastAPI) skills in Agri-Tech.

---

## Project Structure

```
Crop2x/
├── backend/
│   ├── main.py             # FastAPI app with NDVI mock data
│   └── requirements.txt    # Python dependencies
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── package.json
    └── src/
        ├── main.jsx
        ├── index.css
        ├── App.jsx                         # Root: landing vs dashboard routing
        └── components/
            ├── LandingPage.jsx             # Globe + agri landing page
            ├── Dashboard.jsx               # Main dashboard shell + data fetching
            ├── Sidebar.jsx                 # Field selector sidebar
            ├── MetricCards.jsx             # NDVI + crop metric cards
            ├── NdviChart.jsx               # Recharts AreaChart time-series
            ├── AiInsightsPanel.jsx         # AI Agronomist recommendations panel
            └── FieldMap.jsx                # Decorative SVG satellite field view
```

---

## Quick Start

### 1. Backend (FastAPI)

```bash
cd backend

# Create virtual environment (recommended)
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

pip install -r requirements.txt

uvicorn main:app --reload --port 8000
```

API will be live at: http://localhost:8000  
API docs (Swagger): http://localhost:8000/docs

### 2. Frontend (Vite + React)

```bash
cd frontend
npm install
npm run dev
```

App will be live at: http://localhost:5173

---

## API Endpoints

| Method | Endpoint                          | Description                          |
|--------|-----------------------------------|--------------------------------------|
| GET    | `/`                               | Health check                         |
| GET    | `/api/fields`                     | List all available fields            |
| GET    | `/api/crop-health/{field_id}`     | Get full diagnostics for a field     |

### Field IDs
- `field-alpha` — Wheat, Healthy, NDVI ~0.82
- `field-beta`  — Cotton, Warning (nitrogen deficiency), NDVI ~0.45
- `field-gamma` — Maize, Critical (moisture stress), NDVI ~0.28

### Example Response
```json
{
  "field_id": "field-alpha",
  "crop_type": "Wheat",
  "current_ndvi": 0.82,
  "historical_ndvi": [
    { "month": "Jan", "ndvi_score": 0.62 },
    ...
  ],
  "ai_insights": {
    "status": "Healthy",
    "recommendation": "Field Alpha is performing excellently..."
  }
}
```

---

## Design System

- **Style**: Dark Mode + Glassmorphism + Bento Grid — fits scientific B2B SaaS tools
- **Colors**: Emerald (healthy), Amber (warning), Rose (critical), Slate (background)
- **Typography**: Inter (body) + Space Grotesk (headings/numbers)
- **Charts**: Recharts AreaChart with gradient fills and custom tooltips
- **Icons**: Lucide React (consistent stroke style throughout)
