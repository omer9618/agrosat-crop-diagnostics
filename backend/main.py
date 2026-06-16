"""
AI-Powered Satellite Crop Diagnostics — FastAPI Backend
Simulates a satellite image-processing pipeline with mock NDVI data per field.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI(
    title="Satellite Crop Diagnostics API",
    description="Mock AI-powered satellite crop health diagnostics backend.",
    version="1.0.0",
)

# ── CORS ──────────────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Pydantic Models ────────────────────────────────────────────────────────────
class NdviDataPoint(BaseModel):
    month: str
    ndvi_score: float


class AiInsights(BaseModel):
    status: str          # "Healthy" | "Warning" | "Critical"
    recommendation: str


class CropHealthResponse(BaseModel):
    field_id: str
    crop_type: str
    current_ndvi: float
    historical_ndvi: List[NdviDataPoint]
    ai_insights: AiInsights


# ── Mock Field Database ────────────────────────────────────────────────────────
FIELD_DATA: dict[str, CropHealthResponse] = {
    "field-alpha": CropHealthResponse(
        field_id="field-alpha",
        crop_type="Wheat",
        current_ndvi=round(random.uniform(0.79, 0.86), 2),
        historical_ndvi=[
            NdviDataPoint(month="Jan", ndvi_score=0.62),
            NdviDataPoint(month="Feb", ndvi_score=0.67),
            NdviDataPoint(month="Mar", ndvi_score=0.71),
            NdviDataPoint(month="Apr", ndvi_score=0.75),
            NdviDataPoint(month="May", ndvi_score=0.79),
            NdviDataPoint(month="Jun", ndvi_score=0.82),
        ],
        ai_insights=AiInsights(
            status="Healthy",
            recommendation=(
                "Field Alpha is performing excellently. NDVI is on a steady upward trajectory "
                "indicating robust chlorophyll density and optimal biomass accumulation. "
                "Continue current irrigation schedule and maintain nitrogen levels. "
                "Projected yield is on track — no intervention required at this time."
            ),
        ),
    ),

    "field-beta": CropHealthResponse(
        field_id="field-beta",
        crop_type="Cotton",
        current_ndvi=round(random.uniform(0.41, 0.49), 2),
        historical_ndvi=[
            NdviDataPoint(month="Jan", ndvi_score=0.71),
            NdviDataPoint(month="Feb", ndvi_score=0.68),
            NdviDataPoint(month="Mar", ndvi_score=0.63),
            NdviDataPoint(month="Apr", ndvi_score=0.57),
            NdviDataPoint(month="May", ndvi_score=0.51),
            NdviDataPoint(month="Jun", ndvi_score=0.45),
        ],
        ai_insights=AiInsights(
            status="Warning",
            recommendation=(
                "Spectral analysis indicates a consistent 4-month NDVI decline in Field Beta. "
                "Pattern signature matches early-stage nitrogen deficiency stress in cotton. "
                "Recommend soil sampling within 48 hours and application of 40–60 kg/ha urea. "
                "Monitor leaf color (yellowing between veins) as a visual confirmation. "
                "Delay beyond 2 weeks risks a 15–20% yield reduction."
            ),
        ),
    ),

    "field-gamma": CropHealthResponse(
        field_id="field-gamma",
        crop_type="Maize",
        current_ndvi=round(random.uniform(0.24, 0.32), 2),
        historical_ndvi=[
            NdviDataPoint(month="Jan", ndvi_score=0.74),
            NdviDataPoint(month="Feb", ndvi_score=0.65),
            NdviDataPoint(month="Mar", ndvi_score=0.52),
            NdviDataPoint(month="Apr", ndvi_score=0.42),
            NdviDataPoint(month="May", ndvi_score=0.35),
            NdviDataPoint(month="Jun", ndvi_score=0.28),
        ],
        ai_insights=AiInsights(
            status="Critical",
            recommendation=(
                "CRITICAL ALERT — Field Gamma is experiencing severe moisture stress. "
                "The 46-point NDVI drop over 5 months indicates acute water deficit. "
                "Thermal infrared bands confirm canopy temperatures 8–12°C above baseline. "
                "Immediate action required: initiate emergency irrigation (25–30 mm) within 24 hours. "
                "Without intervention, irreversible cell damage and crop failure is projected within 5–7 days. "
                "Contact your agronomist and activate drought-response protocols now."
            ),
        ),
    ),
}


# ── Routes ─────────────────────────────────────────────────────────────────────
@app.get("/")
def root():
    return {"message": "Satellite Crop Diagnostics API is operational.", "version": "1.0.0"}


@app.get(
    "/api/crop-health/{field_id}",
    response_model=CropHealthResponse,
    summary="Get crop health diagnostics for a field",
)
def get_crop_health(field_id: str):
    """
    Returns AI-generated crop health diagnostics for the given field.

    Supported field IDs: `field-alpha`, `field-beta`, `field-gamma`
    """
    if field_id not in FIELD_DATA:
        raise HTTPException(
            status_code=404,
            detail=f"Field '{field_id}' not found. Valid options: field-alpha, field-beta, field-gamma",
        )
    return FIELD_DATA[field_id]


@app.get("/api/fields", summary="List available field IDs")
def list_fields():
    return {
        "fields": [
            {"id": "field-alpha", "label": "Field Alpha", "crop": "Wheat"},
            {"id": "field-beta",  "label": "Field Beta",  "crop": "Cotton"},
            {"id": "field-gamma", "label": "Field Gamma", "crop": "Maize"},
        ]
    }
