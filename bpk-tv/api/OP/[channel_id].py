from flask import Flask, Response

app = Flask(__name__)

@app.route("/api/OP/<channel_id>.m3u8")
def generate_m3u8(channel_id):
    ts_url = f"http://xott.live:8080/3773747/7172737/{channel_id}.ts"
    m3u8_content = f"""#EXTM3U
#EXT-X-VERSION:3
#EXT-X-TARGETDURATION:5
#EXT-X-MEDIA-SEQUENCE:0
#EXTINF:5.0,
{ts_url}
#EXTINF:5.0,
{ts_url}
#EXTINF:5.0,
{ts_url}
#EXT-X-ENDLIST
"""
    return Response(m3u8_content, mimetype="application/vnd.apple.mpegurl")
