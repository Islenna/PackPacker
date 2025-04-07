import os
from sqlalchemy import text, create_engine
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)

# Read your raw SQL file
with open("Database.sql", "r", encoding="utf-8") as file:
    sql_script = file.read()

# Execute the SQL
with engine.connect() as conn:
    for statement in sql_script.split(";"):
        stmt = statement.strip()
        if stmt:
            try:
                conn.execute(text(stmt))
            except Exception as e:
                print(f"⚠️ Skipping statement due to error:\n{stmt}\nError: {e}")
