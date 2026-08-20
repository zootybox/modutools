#!/usr/bin/env python3
"""generate_sitemap.py — 프로젝트 루트의 모든 *.html 파일을 스캔하여 sitemap.xml 생성"""

import os
import glob
from datetime import date

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOMAIN = "https://modutools.com"
EXCLUDE = {"ads.txt", "robots.txt", "sitemap.xml", "orig_"}

today = date.today().isoformat()  # YYYY-MM-DD

def should_include(path):
    """포함 대상 파일 필터"""
    basename = os.path.basename(path)
    if basename.startswith("orig_"):
        return False
    return True

def get_changefreq(rel_path):
    """URL별 변경 빈도"""
    if rel_path == "index.html":
        return "weekly"
    #도구 페이지는 weekly
    return "weekly"

def get_priority(rel_path):
    """URL별 우선순위"""
    if rel_path == "index.html":
        return "1.0"
    name = os.path.basename(rel_path)
    # info/legal pages → lower priority
    if name in ("about.html", "privacy.html", "terms.html"):
        return "0.5"
    return "0.8"

def main():
    html_files = glob.glob(os.path.join(BASE_DIR, "**", "*.html"), recursive=True)
    entries = []

    for fp in sorted(html_files):
        if not should_include(fp):
            continue

        rel = os.path.relpath(fp, BASE_DIR).replace("\\", "/")

        # index.html → root path
        if rel == "index.html":
            loc = DOMAIN + "/"
        else:
            loc = DOMAIN + "/" + rel

        entries.append({
            "loc": loc,
            "lastmod": today,
            "changefreq": get_changefreq(rel),
            "priority": get_priority(rel),
        })

    # XML 생성
    lines = []
    lines.append('<?xml version="1.0" encoding="UTF-8"?>')
    lines.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')

    for e in entries:
        lines.append("  <url>")
        lines.append(f"    <loc>{e['loc']}</loc>")
        lines.append(f"    <lastmod>{e['lastmod']}</lastmod>")
        lines.append(f"    <changefreq>{e['changefreq']}</changefreq>")
        lines.append(f"    <priority>{e['priority']}</priority>")
        lines.append("  </url>")

    lines.append("</urlset>")

    out_path = os.path.join(BASE_DIR, "sitemap.xml")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines) + "\n")

    print(f"sitemap.xml generated → {out_path}")
    print(f"  Total URLs: {len(entries)}")
    for e in entries:
        print(f"  {e['priority']} {e['loc']}")

if __name__ == "__main__":
    main()
