import qrcode
import random
import string
import datetime

# Function to generate a random string
def generate_random_string(length):
    letters_and_digits = string.ascii_letters + string.digits
    return ''.join(random.choice(letters_and_digits) for _ in range(length))

# Create a unique URL with dynamic content
base_url = "https://chat.openai.com/"
timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
random_string = generate_random_string(6)
unique_url = f"{base_url}?timestamp={timestamp}&random={random_string}"

# Generate QR code
qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_L,
    box_size=10,
    border=4,
)
qr.add_data(unique_url)
qr.make(fit=True)

# Create and save the QR code image
qr_image = qr.make_image(fill_color="black", back_color="white")
qr_image.save("qr_code.png")
