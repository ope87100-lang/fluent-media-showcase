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

TARGET_URL = "https://fluent-media-marketing-bg11.vercel.app/connect.html"
P1 = "+92 329 4357248"
P2 = "+92 318 4628170"
P3 = "+92 327 1000050"

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

def create_bw_qr():
    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=20,
        border=3,
    )
    qr.add_data(TARGET_URL)
    qr.make(fit=True)
    
    # Pure high-contrast black on white
    img = qr.make_image(
        image_factory=StyledPilImage,
        module_drawer=RoundedModuleDrawer(),
        color_mask=SolidFillColorMask(back_color=(255, 255, 255), front_color=(10, 10, 10))
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
            
            # Clean black outline on circular white badge
            draw.ellipse([0, 0, badge_size-1, badge_size-1], fill=(255, 255, 255, 255), outline=(10, 10, 10, 255), width=4)
            offset = (badge_size - logo_w) // 2
            badge.paste(logo, (offset, offset), mask=logo)
            
            pos = ((qr_w - badge_size) // 2, (qr_h - badge_size) // 2)
            img.paste(badge, pos, mask=badge)
        except Exception as e:
            print("Logo error:", e)
            
    return img

def create_bw_framed_card(qr_img):
    qr_w, qr_h = qr_img.size
    
    padding_x = 70
    header_h = 200
    footer_h = 300
    
    card_w = qr_w + (padding_x * 2)
    card_h = qr_h + header_h + footer_h
    
    card = Image.new("RGBA", (card_w, card_h), (255, 255, 255, 255))
    draw = ImageDraw.Draw(card)
    
    # Minimalist Solid Black architectural border frame
    draw.rectangle([0, 0, card_w-1, card_h-1], fill=(255, 255, 255, 255), outline=(10, 10, 10, 255), width=8)
    draw.rectangle([12, 12, card_w-13, card_h-13], fill=(255, 255, 255, 255), outline=(220, 220, 220, 255), width=2)
    
    # Top banner bar (Solid Charcoal #0f0f10)
    draw.rectangle([14, 14, card_w-15, header_h - 12], fill=(15, 15, 16, 255))
    
    font_brand = get_font("segoeuib.ttf", 40)
    font_badge = get_font("segoeuib.ttf", 20)
    font_phone = get_font("segoeuib.ttf", 23)
    font_url = get_font("segoeuib.ttf", 21)
    font_tip = get_font("segoeui.ttf", 19)
    
    # Brand Name
    title = "FLUENT MEDIA MARKETING"
    brand_bbox = draw.textbbox((0, 0), title, font=font_brand)
    draw.text(((card_w - (brand_bbox[2]-brand_bbox[0])) // 2, 45), title, font=font_brand, fill=(255, 255, 255, 255))
    
    subtitle = "ALL-IN-ONE BUSINESS GROWTH & PERFORMANCE AGENCY"
    sub_bbox = draw.textbbox((0, 0), subtitle, font=font_badge)
    draw.text(((card_w - (sub_bbox[2]-sub_bbox[0])) // 2, 114), subtitle, font=font_badge, fill=(190, 190, 195, 255))
    
    # Paste QR Code
    qr_x = (card_w - qr_w) // 2
    qr_y = header_h
    card.paste(qr_img, (qr_x, qr_y), mask=qr_img)
    
    # Divider line
    div_y = qr_y + qr_h + 15
    draw.line([40, div_y, card_w - 40, div_y], fill=(220, 220, 220, 255), width=2)
    
    # Line 1: ALL 3 WhatsApp / Phone Numbers
    phones_text = f"WHATSAPP / TEL:  {P1}   |   {P2}   |   {P3}"
    p_bbox = draw.textbbox((0, 0), phones_text, font=font_phone)
    draw.text(((card_w - (p_bbox[2]-p_bbox[0])) // 2, div_y + 24), phones_text, font=font_phone, fill=(10, 10, 10, 255))
    
    # Line 2: Black Pill for Website
    pill_w = card_w - 90
    pill_h = 56
    pill_x = 45
    pill_y = div_y + 80
    draw.rectangle([pill_x, pill_y, pill_x + pill_w, pill_y + pill_h], fill=(15, 15, 16, 255))
    
    url_text = f"VISIT WEBSITE:  {TARGET_URL}"
    u_bbox = draw.textbbox((0, 0), url_text, font=font_url)
    draw.text(((card_w - (u_bbox[2]-u_bbox[0])) // 2, pill_y + 14), url_text, font=font_url, fill=(255, 255, 255, 255))
    
    # Line 3: Minimalist scan helper
    tip_text = "Scan with any smartphone camera to open portfolio & claim free video audit"
    t_bbox = draw.textbbox((0, 0), tip_text, font=font_tip)
    draw.text(((card_w - (t_bbox[2]-t_bbox[0])) // 2, pill_y + 82), tip_text, font=font_tip, fill=(110, 110, 115, 255))
    
    return card

def main():
    print("Generating Minimalist Black & White QR Code Assets with 3 Numbers...")
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    os.makedirs(DESKTOP_DIR, exist_ok=True)
    os.makedirs(ARTIFACT_DIR, exist_ok=True)
    
    qr_img = create_bw_qr()
    framed = create_bw_framed_card(qr_img)
    
    # Paths on Desktop
    path_desk_framed = os.path.join(DESKTOP_DIR, "Fluent_Media_BW_QR_Framed.png")
    path_desk_square = os.path.join(DESKTOP_DIR, "Fluent_Media_BW_QR_Square.png")
    path_desk_svg = os.path.join(DESKTOP_DIR, "Fluent_Media_BW_QR.svg")
    
    framed.save(path_desk_framed, "PNG")
    qr_img.save(path_desk_square, "PNG")
    
    # Pure Vector SVG
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
    svg_img = qr_svg.make_image(fill_color="#000000", back_color="#ffffff")
    svg_img.save(path_desk_svg)
    
    # Also save to artifacts and scratch
    framed.save(os.path.join(ARTIFACT_DIR, "fluent_bw_qr_framed.png"), "PNG")
    qr_img.save(os.path.join(ARTIFACT_DIR, "fluent_bw_qr_square.png"), "PNG")
    svg_img.save(os.path.join(ARTIFACT_DIR, "fluent_bw_qr.svg"))
    
    framed.save(os.path.join(OUTPUT_DIR, "fluent_bw_qr_framed.png"), "PNG")
    qr_img.save(os.path.join(OUTPUT_DIR, "fluent_bw_qr_square.png"), "PNG")
    svg_img.save(os.path.join(OUTPUT_DIR, "fluent_bw_qr.svg"))
    
    print("SUCCESS! Generated:")
    print("1.", path_desk_framed)
    print("2.", path_desk_square)
    print("3.", path_desk_svg)

if __name__ == "__main__":
    main()
