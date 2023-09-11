import base64
import os
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
import hashlib
import random


def encrypt(plaintext, key):
    cipher = AES.new(key, AES.MODE_CBC)
    ciphertext = cipher.encrypt(pad(plaintext, AES.block_size))
    return base64.b64encode(cipher.iv + ciphertext).decode('utf-8')


def decrypt(ciphertext, key):
    decoded = base64.b64decode(ciphertext)
    iv, enc_data = decoded[:AES.block_size], decoded[AES.block_size:]
    cipher = AES.new(key, AES.MODE_CBC, iv)
    return unpad(cipher.decrypt(enc_data), AES.block_size)


def create_did():
    hash = random.getrandbits(128)
    return int(hex(hash), 16)


def generate_sha_and_did(biometric_template):
    padded = biometric_template.rjust(128, '0')
    preimage = bytes.fromhex(padded)
    biometric_hash_hex = hashlib.sha256(preimage).hexdigest()
    # print("Encrypted biometric (hex): ", biometric_hash_hex)
    # separate into two integers
    hash_bin = bin(int(biometric_hash_hex, 16))[2:].zfill(256)

    # Split the binary string into two 128-bit strings and convert to decimal
    hash_1 = int(hash_bin[:128], 2)
    hash_2 = int(hash_bin[128:], 2)

    did = str(create_did())
    print(str(hash_1), str(hash_2), did)
    return str(hash_1), str(hash_2), did
