from flask import Flask, request, Response, abort
import requests

app = Flask(__name__)

@app.route("/api/Jago.m3u8")
def serve_m3u8():
    channel_id = request.args.get("id")
    if not channel_id:
        return abort(400, "Missing ?id=")

    origin_url = f"https://app24.jagobd.com.bd/c3VydmVyX8RpbEU9Mi8xNy8yMFDDEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFsaWRtaW51aiPhnPTI2/{channel_id}.stream/playlist.m3u8"

    try:
        r = requests.get(origin_url, timeout=5)
        if r.status_code != 200:
            return abort(404, "Stream not found or offline")
    except Exception as e:
        return abort(500, f"Error fetching stream: {e}")

    return Response(r.text, content_type="application/vnd.apple.mpegurl")
  
