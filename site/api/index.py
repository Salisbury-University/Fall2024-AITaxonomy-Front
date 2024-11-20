from fastapi import FastAPI
from dotenv import load_dotenv
import os
# from academic_metrics.runners import PipelineRunner

# load_dotenv()
# openai_api_key = os.getenv("OPENAI_API_KEY")
# mongodb_url = os.getenv("MONGODB_URL")

### Create FastAPI instance with custom docs and openapi url
app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")

@app.get("/api/py/helloFastApi")
def hello_fast_api():
    return {"message": "Hello from FastAPI"}

# @app.get("/api/py/academicMetricsPipeline")
# def run_academic_metrics_pipeline(
#     from_year: int, 
#     to_year: int, 
#     affiliation: str = "Salisbury University"
# ):
#     try:
#         pipeline_runner = PipelineRunner(
#             ai_api_key=openai_api_key,
#             crossref_affiliation=affiliation,
#             data_from_year=from_year,
#             data_to_year=to_year,
#             mongodb_url=mongodb_url
#         )
#         pipeline_runner.run()
#         return {
#             "success": True,
#             "message": "Pipeline run complete, check MongoDB for results"
#         }
#     except Exception as e:
#         return {
#             "success": False,
#             "message": str(e)
#         }