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

# Target URL: The Smart Connect Hub that immediately shows WhatsApp 1, WhatsApp 2 and Website!
SMART_HUB_URL = "https://fluent-media-marketing-bg11.vercel.app/qr.html"
WEBSITE_MAIN = "https://fluent-media-marketing-bg11.vercel.app/"
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

def generate_super_qr(url):
    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=20,
        border=3,
    )
    qr.add_data(url)
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
            
            draw.ellipse([0, 0, badge_size-1, badge_size-1], fill=(255, 255, 255, 255), outline=(16, 185, 129, 255), width=5)
            offset = (badge_size - logo_w) // 2
            badge.paste(logo, (offset, offset), mask=logo)
            
            pos = ((qr_w - badge_size) // 2, (qr_h - badge_size) // 2)
            img.paste(badge, pos, mask=badge)
        except Exception as e:
            print("Logo overlay error:", e)
            
    return img

def create_super_framed_card(qr_img):
    qr_w, qr_h = qr_img.size
    
    padding_x = 70
    header_h = 200
    footer_h = 320
    
    card_w = qr_w + (padding_x * 2)
    card_h = qr_h + header_h + footer_h
    
    card = Image.new("RGBA", (card_w, card_h), (255, 255, 255, 255))
    draw = ImageDraw.Draw(card)
    
    # Outer luxury border (Emerald & Indigo)
    draw.rectangle([0, 0, card_w-1, card_h-1], fill=(255, 255, 255, 255), outline=(16, 185, 129, 255), width=8)
    draw.rectangle([12, 12, card_w-13, card_h-13], fill=(255, 255, 255, 255), outline=(79, 70, 229, 255), width=3)
    
    # Top header bar (Navy)
    draw.rectangle([16, 16, card_w-17, header_h - 10], fill=(15, 23, 42, 255))
    
    font_brand = get_font("segoeuib.ttf", 42)
    font_badge = get_font("segoeuib.ttf", 22)
    font_pill_title = get_font("segoeuib.ttf", 20)
    font_pill_num = get_font("segoeuib.ttf", 28)
    font_url = get_font("segoeuib.ttf", 23)
    font_tip = get_font("segoeui.ttf", 20)
    
    # Brand Name
    title = "FLUENT MEDIA MARKETING"
    brand_bbox = draw.textbbox((0, 0), title, font=font_brand)
    brand_w = brand_bbox[2] - brand_bbox[0]
    draw.text(((card_w - brand_w) // 2, 42), title, font=font_brand, fill=(255, 255, 255, 255))
    
    # Subtitle badge: WHATSAPP & WEBSITE ALL-IN-ONE
    sub = "SCAN FOR DIRECT WHATSAPP & WEBSITE"
    sub_bbox = draw.textbbox((0, 0), sub, font=font_badge)
    sub_w = sub_bbox[2] - sub_bbox[0]
    draw.text(((card_w - sub_w) // 2, 112), sub, font=font_badge, fill=(52, 211, 153, 255))
    
    # Center QR Code
    qr_x = (card_w - qr_w) // 2
    qr_y = header_h
    card.paste(qr_img, (qr_x, qr_y), mask=qr_img)
    
    # Divider
    div_y = qr_y + qr_h + 15
    draw.line([40, div_y, card_w - 40, div_y], fill=(226, 232, 240, 255), width=2)
    
    # Contact Pills:
    # Pill 1 & 2 side by side or prominent
    pill_w = (card_w - 120) // 2
    pill_h = 95
    pill_y = div_y + 25
    
    # WhatsApp 1 Box (Emerald)
    p1_x = 50
    draw.rounded_rectangle([p1_x, pill_y, p1_x + pill_w, pill_y + pill_h], radius=16, fill=(240, 253, 244, 255), outline=(16, 185, 129, 255), width=2)
    draw.text((p1_x + 20, pill_y + 14), "WHATSAPP 1 (PRIMARY)", font=font_pill_title, fill=(5, 150, 105, 255))
    draw.text((p1_x + 20, pill_y + 44), P1, font=font_pill_num, fill=(15, 23, 42, 255))
    
    # WhatsApp 2 Box (Indigo)
    p2_x = p1_x + pill_w + 20
    draw.rounded_rectangle([p2_x, pill_y, p2_x + pill_w, pill_y + pill_h], radius=16, fill=(238, 242, 255, 255), outline=(99, 102, 241, 255), width=2)
    draw.text((p2_x + 20, pill_y + 14), "WHATSAPP 2 (SUPPORT)", font=font_pill_title, fill=(79, 70, 229, 255))
    draw.text((p2_x + 20, pill_y + 44), P2, font=font_pill_num, fill=(15, 23, 42, 255))
    
    # Website Link Banner
    web_y = pill_y + pill_h + 18
    draw.rounded_rectangle([50, web_y, card_w - 50, web_y + 60], radius=12, fill=(15, 23, 42, 255))
    web_text = f"OFFICIAL WEBSITE:  {WEBSITE_MAIN}"
    w_bbox = draw.textbbox((0, 0), web_text, font=font_url)
    w_w = w_bbox[2] - w_bbox[0]
    draw.text(((card_w - w_w) // 2, web_y + 16), web_text, font=font_url, fill=(255, 255, 255, 255))
    
    # Helper Tip
    tip_text = "Scan with any smartphone camera to open instant WhatsApp chat & website"
    t_bbox = draw.textbbox((0, 0), tip_text, font=font_tip)
    t_w = t_bbox[2] - t_bbox[0]
    draw.text(((card_w - t_w) // 2, web_y + 80), tip_text, font=font_tip, fill=(100, 116, 139, 255))
    
    return card

def main():
    print("Generating Super All-in-One QR Code (WhatsApp + Website)...")
    
    qr_img = generate_super_qr(SMART_HUB_URL)
    framed = create_super_framed_card(qr_img)
    
    # Save to Desktop for instant access
    path_desktop_framed = os.path.join(DESKTOP_DIR, "Fluent_Media_WhatsApp_Website_QR.png")
    path_desktop_square = os.path.join(DESKTOP_DIR, "Fluent_Media_WhatsApp_Website_Square.png")
    
    framed.save(path_desktop_framed, "PNG")
    qr_img.save(path_desktop_square, "PNG")
    
    # Save to artifacts and scratch
    framed.save(os.path.join(ARTIFACT_DIR, "fluent_whatsapp_website_qr.png"), "PNG")
    qr_img.save(os.path.join(ARTIFACT_DIR, "fluent_whatsapp_website_square.png"), "PNG")
    framed.save(os.path.join(OUTPUT_DIR, "fluent_whatsapp_website_qr.png"), "PNG")
    
    print(f"Saved: {path_desktop_framed}")
    print(f"Saved: {path_desktop_square}")

if __name__ == "__main__":
    main()
