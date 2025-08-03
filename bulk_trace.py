import json
from turmax import Carl

# Input list of proxy URLs
proxy_links = [
    "https://mxon-xtreme.vercel.app/live/110034.m3u8",
    "https://mxon-xtreme.vercel.app/live/110035.m3u8",
    "https://mxon-xtreme.vercel.app/live/110036.m3u8"
]

# Output dictionary
results = {}

print("Tracing original URLs...\n")

for url in proxy_links:
    try:
        c = Carl(url)
        original = c.trace()
        results[url] = original
        print(f"[✔] {url} → {original}")
    except Exception as e:
        results[url] = f"Error: {str(e)}"
        print(f"[✘] {url} → Error: {str(e)}")

# Save to JSON
with open("output.json", "w") as f:
    json.dump(results, f, indent=4)

print("\n✅ Done! Results saved to output.json")
