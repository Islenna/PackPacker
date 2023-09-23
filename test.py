import mysql.connector

db_user = "root"
db_password = "root"
db_host = "localhost"
db_name = "PackPacker"

try:
    connection = mysql.connector.connect(
        user=db_user,
        password=db_password,
        host=db_host,
        database=db_name
    )
    print("Connected to MySQL successfully!")
    connection.close()
except Exception as e:
    print(f"Error: {e}")
