import os
import qrcode
import qrcode.image.svg
from qrcode.image.styledpil import StyledPilImage
from qrcode.image.styles.moduledrawers import RoundedModuleDrawer
from qrcode.image.styles.colormasks import SolidFillColorMask
from PIL import Image, ImageDraw, ImageFont

DESKTOP_DIR = r"C:\Users\lenovo\Desktop"
ARTIFACT_DIR = r"C:\Users\lenovo\.gemini\antigravity\brain\92693ac2-2e06-40c4-a910-686c14c2f34b"
OUTPUT_DIR = r"C:\Users\lenovo\.gemini\antigravity\scratch\fluent-media-portfolio\assets\qr"
LOGO_PATH = r"C:\Users\lenovo\.gemini\antigravity\scratch\fluent-media-portfolio\fluent_logo.png"

# Dedicated URL for the new interactive experience landing page
LANDING_URL = "https://fluent-media-marketing-bg11.vercel.app/connect.html"
P1 = "+92 329 4357248"
P2 = "+92 318 4628170"

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

def create_landing_qr():
    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=20,
        border=3,
    )
    qr.add_data(LANDING_URL)
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
            
            # Circular badge with emerald/indigo border
            draw.ellipse([0, 0, badge_size-1, badge_size-1], fill=(255, 255, 255, 255), outline=(16, 185, 129, 255), width=5)
            offset = (badge_size - logo_w) // 2
            badge.paste(logo, (offset, offset), mask=logo)
            
            pos = ((qr_w - badge_size) // 2, (qr_h - badge_size) // 2)
            img.paste(badge, pos, mask=badge)
        except Exception as e:
            print("Logo error:", e)
            
    return img

def create_framed_landing_card(qr_img):
    qr_w, qr_h = qr_img.size
    
    padding_x = 70
    header_h = 220
    footer_h = 320
    
    card_w = qr_w + (padding_x * 2)
    card_h = qr_h + header_h + footer_h
    
    card = Image.new("RGBA", (card_w, card_h), (255, 255, 255, 255))
    draw = ImageDraw.Draw(card)
    
    # Outer luxury border
    draw.rectangle([0, 0, card_w-1, card_h-1], fill=(255, 255, 255, 255), outline=(16, 185, 129, 255), width=8)
    draw.rectangle([12, 12, card_w-13, card_h-13], fill=(255, 255, 255, 255), outline=(79, 70, 229, 255), width=3)
    
    # Top header bar (Navy)
    draw.rectangle([16, 16, card_w-17, header_h - 10], fill=(15, 23, 42, 255))
    
    font_brand = get_font("segoeuib.ttf", 40)
    font_badge = get_font("segoeuib.ttf", 22)
    font_hook = get_font("segoeui.ttf", 20)
    font_pill_title = get_font("segoeuib.ttf", 20)
    font_pill_num = get_font("segoeuib.ttf", 28)
    font_url = get_font("segoeuib.ttf", 22)
    font_tip = get_font("segoeui.ttf", 20)
    
    # Brand Name
    title = "FLUENT MEDIA MARKETING"
    brand_bbox = draw.textbbox((0, 0), title, font=font_brand)
    draw.text(((card_w - (brand_bbox[2]-brand_bbox[0])) // 2, 38), title, font=font_brand, fill=(255, 255, 255, 255))
    
    # Gift Badge Banner
    gift_text = "SCAN TO UNLOCK FREE PKR 15,000 AUDIT"
    gt_bbox = draw.textbbox((0, 0), gift_text, font=font_badge)
    gt_w = gt_bbox[2] - gt_bbox[0] + 40
    gt_x = (card_w - gt_w) // 2
    draw.rounded_rectangle([gt_x, 96, gt_x + gt_w, 142], radius=16, fill=(245, 158, 11, 230))
    draw.text((gt_x + 20, 104), gift_text, font=font_badge, fill=(15, 23, 42, 255))
    
    # Roman Urdu Hook line
    hook = "Kya aap bhi apne business ko grow karna chahte hain?"
    h_bbox = draw.textbbox((0, 0), hook, font=font_hook)
    draw.text(((card_w - (h_bbox[2]-h_bbox[0])) // 2, 160), hook, font=font_hook, fill=(203, 213, 225, 255))
    
    # Center QR Code
    qr_x = (card_w - qr_w) // 2
    qr_y = header_h
    card.paste(qr_img, (qr_x, qr_y), mask=qr_img)
    
    # Divider line
    div_y = qr_y + qr_h + 15
    draw.line([40, div_y, card_w - 40, div_y], fill=(226, 232, 240, 255), width=2)
    
    # WhatsApp Pill Boxes
    pill_w = (card_w - 120) // 2
    pill_h = 95
    pill_y = div_y + 25
    
    p1_x = 50
    draw.rounded_rectangle([p1_x, pill_y, p1_x + pill_w, pill_y + pill_h], radius=16, fill=(240, 253, 244, 255), outline=(16, 185, 129, 255), width=2)
    draw.text((p1_x + 20, pill_y + 14), "WHATSAPP BUSINESS (OFFICIAL)", font=font_pill_title, fill=(5, 150, 105, 255))
    draw.text((p1_x + 20, pill_y + 44), P1, font=font_pill_num, fill=(15, 23, 42, 255))
    
    p2_x = p1_x + pill_w + 20
    draw.rounded_rectangle([p2_x, pill_y, p2_x + pill_w, pill_y + pill_h], radius=16, fill=(238, 242, 255, 255), outline=(99, 102, 241, 255), width=2)
    draw.text((p2_x + 20, pill_y + 14), "WHATSAPP 2 (SUPPORT LINE)", font=font_pill_title, fill=(79, 70, 229, 255))
    draw.text((p2_x + 20, pill_y + 44), P2, font=font_pill_num, fill=(15, 23, 42, 255))
    
    # Website Bar
    web_y = pill_y + pill_h + 18
    draw.rounded_rectangle([50, web_y, card_w - 50, web_y + 60], radius=12, fill=(15, 23, 42, 255))
    web_text = f"DIRECT PAGE:  {LANDING_URL}"
    w_bbox = draw.textbbox((0, 0), web_text, font=font_url)
    draw.text(((card_w - (w_bbox[2]-w_bbox[0])) // 2, web_y + 16), web_text, font=font_url, fill=(255, 255, 255, 255))
    
    # Helper Tip
    tip_text = "Scan with any smartphone camera to open Zubair Jamil's personal page & WhatsApp"
    t_bbox = draw.textbbox((0, 0), tip_text, font=font_tip)
    draw.text(((card_w - (t_bbox[2]-t_bbox[0])) // 2, web_y + 80), tip_text, font=font_tip, fill=(100, 116, 139, 255))
    
    return card

def main():
    print("Generating Dedicated Landing Experience QR Code...")
    
    qr_img = create_landing_qr()
    framed = create_framed_landing_card(qr_img)
    
    # 1. Desktop Output (for instant accessibility)
    path_desk_framed = os.path.join(DESKTOP_DIR, "Fluent_Media_Landing_QR_Framed.png")
    path_desk_square = os.path.join(DESKTOP_DIR, "Fluent_Media_Landing_QR_Square.png")
    path_desk_svg = os.path.join(DESKTOP_DIR, "Fluent_Media_Landing_QR.svg")
    
    framed.save(path_desk_framed, "PNG")
    qr_img.save(path_desk_square, "PNG")
    
    # Vector SVG
    factory = qrcode.image.svg.SvgPathImage
    qr_svg = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=20,
        border=3,
        image_factory=factory
    )
    qr_svg.add_data(LANDING_URL)
    qr_svg.make(fit=True)
    svg_img = qr_svg.make_image(fill_color="#0f172a", back_color="#ffffff")
    svg_img.save(path_desk_svg)
    
    # Also save to assets and artifacts
    framed.save(os.path.join(ARTIFACT_DIR, "fluent_landing_qr_framed.png"), "PNG")
    qr_img.save(os.path.join(ARTIFACT_DIR, "fluent_landing_qr_square.png"), "PNG")
    svg_img.save(os.path.join(ARTIFACT_DIR, "fluent_landing_qr.svg"))
    
    framed.save(os.path.join(OUTPUT_DIR, "fluent_landing_qr_framed.png"), "PNG")
    qr_img.save(os.path.join(OUTPUT_DIR, "fluent_landing_qr_square.png"), "PNG")
    svg_img.save(os.path.join(OUTPUT_DIR, "fluent_landing_qr.svg"))
    
    print("All dedicated landing QR assets generated successfully!")
    print(f"1. {path_desk_framed}")
    print(f"2. {path_desk_square}")
    print(f"3. {path_desk_svg}")

if __name__ == "__main__":
    main()
