"""Generate compact timeline envelopes from the committed MP3 recordings (requires FFmpeg)."""

import array
import hashlib
import json
import math
from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
BINS = 512
waveforms = {}

for source in sorted((ROOT / "src/assets/media").glob("*-demo.mp3")):
    decoded = subprocess.run(
        ["ffmpeg", "-v", "error", "-i", str(source), "-ac", "1", "-ar", "8000", "-f", "f32le", "pipe:1"],
        check=True,
        capture_output=True,
    ).stdout
    samples = array.array("f")
    samples.frombytes(decoded)
    if sys.byteorder != "little":
        samples.byteswap()
    levels = []
    for index in range(BINS):
        start = index * len(samples) // BINS
        end = (index + 1) * len(samples) // BINS
        levels.append(math.sqrt(sum(value * value for value in samples[start:end]) / (end - start)))
    maximum = max(levels)
    waveforms[source.stem.removesuffix("-demo")] = {
        "sourceSha256": hashlib.sha256(source.read_bytes()).hexdigest(),
        "levels": [round(level / maximum, 4) for level in levels],
    }

output = ROOT / "src/data/demo-waveforms.json"
output.write_text(json.dumps(waveforms, separators=(",", ":")) + "\n")
print(f"Generated {BINS} RMS samples for each of {len(waveforms)} recordings: {output.relative_to(ROOT)}")
