# AI Investment Research Agent - API Testing Guide

This guide details instructions on starting up the application, making test requests, inspecting expected outputs, and diagnosing common failure states.

## 1. Project Startup

First, configure your environment variables inside the `server/.env` file:
```env
PORT=5000
FMP_API_KEY=your_fmp_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
```

To install dependencies and start the Express server in development mode:
```bash
# Navigate to the server folder
cd server

# Install any required dependencies
npm install

# Start the server in development mode
npm run dev
```

---

## 2. API Request Structure

### Endpoint
`POST http://localhost:5000/api/investment/analyze`

### Content-Type
`application/json`

### Body (JSON)
```json
{
  "company": "NVIDIA"
}
```

---

## 3. Expected Response Shape (200 OK)

When both the Financial Modeling Prep (FMP) and Gemini API calls complete successfully, you will receive a `200 OK` status with the following body:

```json
{
  "success": true,
  "message": "Investment analysis completed successfully",
  "data": {
    "recommendation": "Invest",
    "confidence": 85,
    "companySummary": "NVIDIA Corporation designs graphics processing units (GPUs) for the gaming and professional markets, as well as system on a chip units (SoCs) for the mobile computing and automotive market...",
    "strengths": [
      "Dominant market share in AI computing hardware and enterprise GPU platforms.",
      "Robust revenue growth and high profit margins driven by data center acceleration demands."
    ],
    "weaknesses": [
      "High valuation multiple relative to historical earnings average.",
      "Customer concentration risk with a few key hyper-scalers making up a large percentage of sales."
    ],
    "opportunities": [
      "Expansion into enterprise software suites and computing as a service models.",
      "Automotive driving assistants and edge computing device integration."
    ],
    "risks": [
      "Geopolitical export restrictions impacting major consumer markets.",
      "Intensifying competition from customized silicon solutions and AMD."
    ],
    "reasoning": "NVIDIA represents a solid investment due to its strong leadership position in AI accelerator market. The company shows top-tier balance sheet strength with high Return on Equity and low debt-to-equity ratio, backed by consistent cash flows. While the PE valuation remains high, the projected earnings growth offsets valuation headwinds. A hold or buy recommendation is warranted with high confidence."
  }
}
```

---

## 4. Example cURL Command

```bash
curl -X POST http://localhost:5000/api/investment/analyze \
  -H "Content-Type: application/json" \
  -d '{"company":"NVIDIA"}'
```

---

## 5. Common Failure Cases

Here are the expected HTTP status codes and JSON response bodies for various error scenarios.

### Case A: Missing Company Ticker / Query
- **Trigger**: Request body lacks `"company"` or the field is empty.
- **HTTP Status Code**: `400 Bad Request`
- **JSON Response**:
```json
{
  "success": false,
  "message": "Company name or ticker symbol is required inside the \"company\" parameter of the request body."
}
```

### Case B: Invalid Ticker / Company Profile Not Found
- **Trigger**: The ticker symbol does not exist or FMP returns an empty profile.
- **HTTP Status Code**: `500 Internal Server Error`
- **JSON Response**:
```json
{
  "success": false,
  "message": "[Node: Company] Failed: Company profile not found for symbol \"INVALID\"."
}
```

### Case C: FMP API Failure (e.g. Unauthorized / Invalid Key)
- **Trigger**: FMP API Key is incorrect, missing, or has reached limits (HTTP 401/403).
- **HTTP Status Code**: `500 Internal Server Error`
- **JSON Response**:
```json
{
  "success": false,
  "message": "[Node: Company] Failed: Request failed with status code 401"
}
```

### Case D: Gemini AI API Failure
- **Trigger**: `GEMINI_API_KEY` is invalid, quota-blocked, or the AI service fails.
- **HTTP Status Code**: `500 Internal Server Error`
- **JSON Response**:
```json
{
  "success": false,
  "message": "Investment analysis service failed: News filtering service failed: Gemini returned an empty or invalid response."
}
```

### Case E: LangGraph Workflow Node Exception
- **Trigger**: Any logic inside a graph node throws an error (e.g., failed to fetch stock quote).
- **HTTP Status Code**: `500 Internal Server Error`
- **JSON Response**:
```json
{
  "success": false,
  "message": "[Node: Stock] Failed: Request failed with status code 401"
}
```
