Drop the two official BNPL logo files here (this folder, NOT public/pay —
the middleware matcher excludes "assets" and the whole site serves images from /assets/*) and rebuild. Nothing else to change.

  public/assets/pay/tabby.svg     (or tabby.png)
  public/assets/pay/tamara.svg    (or tamara.png)

The payment block checks for these files at build time. If a file is present it
renders as an image at the same 22px height as the card marks; if it is absent
the brand keeps its text chip. No code edit is needed either way.

WHERE TO GET THEM — official sources only

  Tabby   https://docs.tabby.ai/marketing/brand-assets
          Download pack (PNG / SVG / AI, light + dark variants).
          Tabby's own guidance: in a row of accepted payment methods, use the
          standalone "T" icon rather than the wordmark. Primary colourway is the
          black logo on Tabby green. Use the file exactly as downloaded — no
          recolouring, rotating, stretching or effects.

  Tamara  https://cdn.tamara.co/assets/png/tamara-logo-badge-en.png
          This is the badge Tamara's own merchant docs tell you to use.
          Arabic badge: same path with -ar instead of -en.
          Full merchant kit: https://tamara.co/en-sa/media-center

DO NOT hotlink either CDN. The site's Content-Security-Policy allows images from
'self' only, so an external URL is blocked by the browser. Save the file locally.
