from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
parts_root = root / "work" / "fullshot-parts"
out = root / "outputs" / "claimflow-final-polish" / "screenshots"
specs = {
    "desktop": (8162, "desktop-1440-full.png"),
    "tablet": (10228, "tablet-768-full.png"),
    "mobile390": (11350, "mobile-390-full.png"),
    "mobile320": (11910, "mobile-320-full.png"),
}

for folder, (page_height, output_name) in specs.items():
    files = sorted((parts_root / folder).glob("*.png"))
    if not files:
        raise RuntimeError(f"No screenshot parts for {folder}")
    first = Image.open(files[0]).convert("RGB")
    canvas = Image.new("RGB", (first.width, page_height), "white")
    for path in files:
        y = int(path.stem.split("-")[-1])
        part = Image.open(path).convert("RGB")
        remaining = min(part.height, page_height - y)
        if remaining > 0:
            canvas.paste(part.crop((0, 0, part.width, remaining)), (0, y))
    canvas.save(out / output_name, optimize=True)
    print(out / output_name)
