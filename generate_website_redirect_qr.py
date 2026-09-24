import os
import qrcode
import qrcode.image.svg
from qrcode.image.styledpil import StyledPilImage
from qrcode.image.styles.moduledrawers import RoundedModuleDrawer
from qrcode.image.styles.colormasks import SolidFillColorMask
from PIL import Image, ImageDraw, ImageFont

OUTPUT_DIR = r"C:\Users\lenovo\.gemini\antigravity\scratch\fluent-media-portfolio\assets\qr"
ARTIFACT_DIR = r"C:\Users\lenovo\.gemini\antigravity\brain\92693ac2-2e06-40c4-a910-686c14c2f34b"
os.makedirs(OUTPUT_DIR, exist_ok=True)

LOGO_PATH = r"C:\Users\lenovo\.gemini\antigravity\scratch\fluent-media-portfolio\fluent_logo.png"

# Direct Website Redirect URL
TARGET_URL = "https://fluent-media-marketing-bg11.vercel.app/"

WINDIR = os.environ.get("WINDIR", "C:\\Windows")
def get_font(name, size):
    path = os.path.join(WINDIR, "Fonts", name)
    if os.path.exists(path):
        try:
            return ImageFont.truetype(path, size)
        except Exception:
            pass
    try:
        return ImageFont.truetype("arial.ttf", size)
    except Exception:
        return ImageFont.load_default()

def create_redirect_qr():
    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=20,
        border=3,
    )
    qr.add_data(TARGET_URL)
    qr.make(fit=True)
    
    img = qr.make_image(
        image_factory=StyledPilImage,
        module_drawer=RoundedModuleDrawer(),
        color_mask=SolidFillColorMask(back_color=(255, 255, 255), front_color=(15, 23, 42))
    ).convert("RGBA")
    
    if os.path.exists(LOGO_PATH):
        try:
            logo = Image.open(LOGO_PATH).convert("RGBA")
            qr_w, qr_h = img.size
            logo_w = int(qr_w * 0.22)
            logo = logo.resize((logo_w, logo_w), Image.Resampling.LANCZOS)
            
            badge_size = logo_w + int(qr_w * 0.04)
            badge = Image.new("RGBA", (badge_size, badge_size), (0, 0, 0, 0))
            draw = ImageDraw.Draw(badge)
            
            draw.ellipse([0, 0, badge_size-1, badge_size-1], fill=(255, 255, 255, 255), outline=(79, 70, 229, 255), width=4)
            offset = (badge_size - logo_w) // 2
            badge.paste(logo, (offset, offset), mask=logo)
            
            pos = ((qr_w - badge_size) // 2, (qr_h - badge_size) // 2)
            img.paste(badge, pos, mask=badge)
        except Exception as e:
            print("Logo error:", e)
            
    return img

def create_redirect_framed(qr_img):
    qr_w, qr_h = qr_img.size
    
    padding_x = 70
    header_h = 175
    footer_h = 240
    
    card_w = qr_w + (padding_x * 2)
    card_h = qr_h + header_h + footer_h
    
    card = Image.new("RGBA", (card_w, card_h), (255, 255, 255, 255))
    draw = ImageDraw.Draw(card)
    
    # Outer double border (Indigo & Slate)
    draw.rectangle([0, 0, card_w-1, card_h-1], fill=(255, 255, 255, 255), outline=(79, 70, 229, 255), width=8)
    draw.rectangle([12, 12, card_w-13, card_h-13], fill=(255, 255, 255, 255), outline=(226, 232, 240, 255), width=2)
    
    # Header bar
    draw.rectangle([14, 14, card_w-15, header_h - 10], fill=(15, 23, 42, 255))
    
    font_brand = get_font("segoeuib.ttf", 40)
    font_sub = get_font("segoeuib.ttf", 22)
    font_phone = get_font("segoeuib.ttf", 30)
    font_url = get_font("segoeuib.ttf", 24)
    font_tip = get_font("segoeui.ttf", 20)
    
    # Header title
    title = "FLUENT MEDIA MARKETING"
    brand_bbox = draw.textbbox((0, 0), title, font=font_brand)
    brand_w = brand_bbox[2] - brand_bbox[0]
    draw.text(((card_w - brand_w) // 2, 42), title, font=font_brand, fill=(255, 255, 255, 255))
    
    subtitle = "SCAN TO OPEN OFFICIAL WEBSITE"
    sub_bbox = draw.textbbox((0, 0), subtitle, font=font_sub)
    sub_w = sub_bbox[2] - sub_bbox[0]
    draw.text(((card_w - sub_w) // 2, 102), subtitle, font=font_sub, fill=(129, 140, 248, 255))
    
    # Paste QR Code in center
    qr_x = (card_w - qr_w) // 2
    qr_y = header_h
    card.paste(qr_img, (qr_x, qr_y), mask=qr_img)
    
    # Divider line
    div_y = qr_y + qr_h + 15
    draw.line([40, div_y, card_w - 40, div_y], fill=(226, 232, 240, 255), width=2)
    
    # Line 1: Both Phone Numbers
    p1 = "+92 329 4357248"
    p2 = "+92 318 4628170"
    phones_text = f"WHATSAPP / CALL:  {p1}   |   {p2}"
    p_bbox = draw.textbbox((0, 0), phones_text, font=font_phone)
    p_w = p_bbox[2] - p_bbox[0]
    draw.text(((card_w - p_w) // 2, div_y + 24), phones_text, font=font_phone, fill=(16, 185, 129, 255))
    
    # Line 2: Website URL
    url_text = f"WEBSITE:  {TARGET_URL}"
    u_bbox = draw.textbbox((0, 0), url_text, font=font_url)
    u_w = u_bbox[2] - u_bbox[0]
    draw.text(((card_w - u_w) // 2, div_y + 80), url_text, font=font_url, fill=(79, 70, 229, 255))
    
    # Line 3: Helper Tip
    tip_text = "Scan with any iPhone or Android camera to instantly open website in browser"
    t_bbox = draw.textbbox((0, 0), tip_text, font=font_tip)
    t_w = t_bbox[2] - t_bbox[0]
    draw.text(((card_w - t_w) // 2, div_y + 134), tip_text, font=font_tip, fill=(100, 116, 139, 255))
    
    return card

def main():
    print("Generating Direct Website Redirect QR Code...")
    
    # 1. Pure Square Redirect QR
    qr_img = create_redirect_qr()
    path_pure = os.path.join(OUTPUT_DIR, "website_redirect_qr.png")
    qr_img.save(path_pure, "PNG")
    qr_img.save(os.path.join(ARTIFACT_DIR, "website_redirect_qr.png"), "PNG")
    
    # 2. Framed QR with Both Numbers & URL
    framed_img = create_redirect_framed(qr_img)
    path_framed = os.path.join(OUTPUT_DIR, "website_redirect_framed.png")
    framed_img.save(path_framed, "PNG")
    framed_img.save(os.path.join(ARTIFACT_DIR, "website_redirect_framed.png"), "PNG")
    
    # 3. Vector SVG
    factory = qrcode.image.svg.SvgPathImage
    qr_svg = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=20,
        border=3,
        image_factory=factory
    )
    qr_svg.add_data(TARGET_URL)
    qr_svg.make(fit=True)
    svg_img = qr_svg.make_image(fill_color="#0f172a", back_color="#ffffff")
    path_svg = os.path.join(OUTPUT_DIR, "website_redirect_qr.svg")
    svg_img.save(path_svg)
    svg_img.save(os.path.join(ARTIFACT_DIR, "website_redirect_qr.svg"))
    
    print("Direct Website Redirect QR generated successfully!")

if __name__ == "__main__":
    main()
