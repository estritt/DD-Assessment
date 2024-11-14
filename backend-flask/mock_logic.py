def handle_query(query, data):
    if "highest altitude" in query.lower():
        highest = max(data, key=lambda x: x['altitude_m'])
        return {"highlight_rows": [highest["image_id"]]}
    return {"response": "Query not understood"}

# add more using re.search