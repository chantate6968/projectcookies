"""Edit Lamsumsum logo photo: replace circular cookie-o with a clear U-shaped cookie."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

SRC = Path(r"c:\Users\Chan Tate\Desktop\projectcookie\public\brand\lamsumsum-logo-source.png")
OUTS = [
    Path(r"c:\Users\Chan Tate\Desktop\projectcookie\public\brand\lamsumsum-logo-vivid-u.png"),
    Path(r"c:\Users\Chan Tate\Desktop\projectcookie\docs\lamsumsum-logo-vivid-u.png"),
    Path(
        r"C:\Users\Chan Tate\.cursor\projects\c-Users-Chan-Tate-Desktop-projectcookie\assets\lamsumsum-logo-vivid-u.png"
    ),
]


def is_cream(px: tuple[int, int, int, int]) -> bool:
    r, g, b, a = px
    if a < 200:
        return False
    return r > 190 and g > 175 and b > 150 and (r + g + b) > 560 and abs(r - g) < 45


def is_chip(px: tuple[int, int, int, int]) -> bool:
    r, g, b, a = px
    if a < 200:
        return False
    return r < 120 and g < 90 and b < 80 and (r + g + b) < 240


def sample_cream_color(im: Image.Image) -> tuple[int, int, int]:
    pixels = im.load()
    w, h = im.size
    samples: list[tuple[int, int, int]] = []
    for y in range(h):
        for x in range(w // 2):  # left half = normal letters
            r, g, b, a = pixels[x, y]
            if is_cream((r, g, b, a)):
                samples.append((r, g, b))
    if not samples:
        return (244, 234, 216)
    n = len(samples)
    return (
        sum(s[0] for s in samples) // n,
        sum(s[1] for s in samples) // n,
        sum(s[2] for s in samples) // n,
    )


def main() -> None:
    im = Image.open(SRC).convert("RGBA")
    w, h = im.size
    pixels = im.load()
    cream_rgb = sample_cream_color(im)
    cream = (*cream_rgb, 255)

    cream_pts: list[tuple[int, int]] = []
    for y in range(h):
        for x in range(w):
            if is_cream(pixels[x, y]):
                cream_pts.append((x, y))

    xs = [p[0] for p in cream_pts]
    ys = [p[1] for p in cream_pts]
    min_x, max_x = min(xs), max(xs)
    min_y, max_y = min(ys), max(ys)
    letter_h = max_y - min_y + 1

    col_counts = [0] * w
    for x, y in cream_pts:
        col_counts[x] += 1

    segments: list[tuple[int, int]] = []
    x = min_x
    while x <= max_x:
        if col_counts[x] < letter_h * 0.08:
            x += 1
            continue
        start = x
        while x <= max_x and col_counts[x] >= letter_h * 0.08:
            x += 1
        segments.append((start, x - 1))

    cookie_seg = segments[-2]
    pad = max(6, letter_h // 16)
    cx0 = max(0, cookie_seg[0] - pad)
    cx1 = min(w - 1, cookie_seg[1] + pad)
    cy_vals = [y for xx, y in cream_pts if cx0 <= xx <= cx1]
    cy0 = max(0, min(cy_vals) - pad)
    cy1 = min(h - 1, max(cy_vals) + pad)

    bg_samples: list[tuple[int, int, int]] = []
    for y in range(cy0, cy1 + 1):
        for x in (max(0, cx0 - 10), min(w - 1, cx1 + 10)):
            r, g, b, a = pixels[x, y]
            if not is_cream((r, g, b, a)) and not is_chip((r, g, b, a)):
                bg_samples.append((r, g, b))
    br, bgc, bb = (
        (sum(c[0] for c in bg_samples) // len(bg_samples),
         sum(c[1] for c in bg_samples) // len(bg_samples),
         sum(c[2] for c in bg_samples) // len(bg_samples))
        if bg_samples
        else (75, 44, 32)
    )

    # Soft-erase old circular cookie
    erase = Image.new("RGBA", im.size, (0, 0, 0, 0))
    erase_draw = ImageDraw.Draw(erase)
    for y in range(cy0, cy1 + 1):
        for x in range(cx0, cx1 + 1):
            px = pixels[x, y]
            if is_cream(px) or is_chip(px):
                n = ((x * 17 + y * 31) % 7) - 3
                erase_draw.point(
                    (x, y),
                    fill=(
                        max(0, min(255, br + n)),
                        max(0, min(255, bgc + n)),
                        max(0, min(255, bb + n)),
                        255,
                    ),
                )
    # Feather erase edges
    erase = erase.filter(ImageFilter.GaussianBlur(radius=0.8))
    im = Image.alpha_composite(im, erase)

    # Build bubble-style U matching letter height
    box_w = cx1 - cx0 + 1
    box_h = cy1 - cy0 + 1
    u_h = int(box_h * 0.9)
    u_w = int(min(box_w * 0.95, u_h * 0.92))
    ox0 = cx0 + (box_w - u_w) // 2
    oy0 = cy0 + (box_h - u_h) // 2
    ox1 = ox0 + u_w
    oy1 = oy0 + u_h
    t = max(14, int(u_w * 0.36))

    cookie = Image.new("RGBA", im.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(cookie)

    # Left arm, right arm, bottom bowl — open top = unmistakable U
    d.rounded_rectangle([ox0, oy0, ox0 + t, oy1 - t // 3], radius=t // 2, fill=cream)
    d.rounded_rectangle([ox1 - t, oy0, ox1, oy1 - t // 3], radius=t // 2, fill=cream)
    d.pieslice([ox0, oy1 - 2 * t, ox1, oy1], start=0, end=180, fill=cream)

    # Clear inner trough so it cannot read as O
    clear = Image.new("L", im.size, 0)
    cd = ImageDraw.Draw(clear)
    cd.rounded_rectangle(
        [ox0 + t + 1, oy0 - 2, ox1 - t - 1, oy1 - t - 2],
        radius=max(4, t // 3),
        fill=255,
    )
    px = cookie.load()
    for y in range(oy0 - 3, oy1 + 3):
        for x in range(ox0 - 3, ox1 + 3):
            if 0 <= x < w and 0 <= y < h and clear.getpixel((x, y)) == 255:
                px[x, y] = (0, 0, 0, 0)

    # Bite scallops on outer top of RIGHT arm only
    bite_cx = ox1 - t // 2 + 2
    bite_cy = oy0 + 4
    for i, rr in enumerate((t // 4 + 1, t // 5, t // 6)):
        d.ellipse(
            [
                bite_cx + i * 3 - rr,
                bite_cy + i * 2 - rr,
                bite_cx + i * 3 + rr,
                bite_cy + i * 2 + rr,
            ],
            fill=(br, bgc, bb, 255),
        )

    # Chips / eyes — vivid but keep U readable
    chip = (63, 33, 21, 255)
    chip2 = (93, 58, 58, 255)
    marks = [
        (ox0 + t // 2, oy0 + int(u_h * 0.26), max(3, t // 7), chip),
        (ox1 - t // 2 - 1, oy0 + int(u_h * 0.26), max(3, t // 7), chip),
        (ox0 + t // 2, oy0 + int(u_h * 0.52), max(2, t // 9), chip2),
        (ox1 - t // 2, oy0 + int(u_h * 0.50), max(2, t // 8), chip),
        (ox0 + u_w // 2, oy1 - t // 2, max(3, t // 8), chip2),
        (ox0 + int(u_w * 0.36), oy1 - int(t * 0.72), max(2, t // 10), chip),
        (ox0 + int(u_w * 0.64), oy1 - int(t * 0.7), max(2, t // 10), chip),
    ]
    for x, y, r, color in marks:
        d.ellipse([x - r, y - r, x + r, y + r], fill=color)

    # Soft dough edge
    cookie = cookie.filter(ImageFilter.GaussianBlur(radius=0.35))
    composed = Image.alpha_composite(im, cookie)
    composed = composed.filter(ImageFilter.UnsharpMask(radius=1.0, percent=70, threshold=2))

    rgb = composed.convert("RGB")
    for path in OUTS:
        path.parent.mkdir(parents=True, exist_ok=True)
        rgb.save(path, "PNG", optimize=True)
        print(f"Wrote {path}")


if __name__ == "__main__":
    main()
