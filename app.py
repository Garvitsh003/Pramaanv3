import random 
import json
import string
from flask import Flask, request, send_file
from flask_cors import CORS
import os
import logging
import pickle
import qrcode
import io
import datetime

from PIL import Image
from io import BytesIO
from getpass import getpass
from noknow.core import ZK, ZKSignature, ZKData
from queue import Queue
from threading import Thread
from backend.common_utility.encryption import generate_sha_and_did
from backend.common_utility.read_config import read_config

app = Flask(__name__)
CORS(app)

config_info = read_config()
mapping_list1 = [] 
if os.path.exists('data/mappings.p'):
        mapping_list1 = pickle.load(open("data/mappings.p", "rb"))


def client(iq: Queue, oq: Queue, did):
    client_zk = ZK.new(curve_name="secp256k1", hash_alg="sha3_256")

    # Create signature and send it to the server
    signature = client_zk.create_signature(did)
    oq.put(signature.dump())

    # Receive the token from the server
    token = iq.get()


    # Create a proof that signs the provided token and send it to the server
    proof = client_zk.sign(did, token).dump()
    print("\n ZK Proof:", proof)
    # Send the token and proof to the server
    oq.put(proof)

    # Wait for server response
    success = True if iq.get() else False
    print("Success!" if success else "Failure!")
    iq.put(success)


def server(iq: Queue, oq: Queue):
    # Set up the server component
    server_password = "SecretServerPassword"
    server_zk = ZK.new(curve_name="secp384r1", hash_alg="sha3_512")
    server_signature: ZKSignature = server_zk.create_signature("SecureServerPassword")
    

    # Load the received signature from the client
    sig = iq.get()
    client_signature = ZKSignature.load(sig)
    client_zk = ZK(client_signature.params)
    
    # Create a signed token and send it to the client
    token = server_zk.sign("SecureServerPassword", client_zk.token())
    oq.put(token.dump(separator=":"))
    

    # Get the token from the client
    proof = ZKData.load(iq.get())
    token = ZKData.load(proof.data, ":")

    # In this example, the server signs the token to ensure it has not been modified
    if not server_zk.verify(token, server_signature):
        oq.put(False)
    else:
        oq.put(client_zk.verify(proof, client_signature, data=token))

def uid():
    random_number = random.randint(0, 99999)
    uid = "{:05d}".format(random_number)
    mapping_listu = []
    if os.path.exists('data/mappings.p'):
        mapping_listu = pickle.load(open("data/mappings.p", "rb"))
    for mapping in mapping_listu:
        while mapping[3]==uid:
            random_number = random.randint(0, 99999)
            uid = "{:05d}".format(random_number)
    return uid
def generate_random_string(length):
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(length))

def generate_qr_code(link):
    timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    random_string = generate_random_string(6)
    unique_url = f"{link}?timestamp={timestamp}&random={random_string}"
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(unique_url)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")

    return img

@app.route('/generateQRCode', methods=['GET'])
def generate_and_display_qr_code():
    # Generate a link (replace 'example.com' with your actual link)
    link = 'https://pramaan.live/user-verification'
    
    # Generate the QR code image
    qr_code_img = generate_qr_code(link)

    # Convert the image to bytes
    img_bytes = BytesIO()
    qr_code_img.save(img_bytes, format='PNG')
    img_bytes = img_bytes.getvalue()
    #Saving QR code image
    qr_code_img.save('qr_code.png', format='PNG')
    # Display the QR code image
    return send_file(
        io.BytesIO(img_bytes),
        mimetype='image/png',
        as_attachment=False
    )
    # Display the QR code image
    return send_file(
        io.BytesIO(img_bytes),
        mimetype='image/png',
        as_attachment=False
    )



@app.route('/register', methods=['POST'])
def register():
    logging.info("In register")
    id_info = json.loads(request.data)['id_info']
    bio_info = json.loads(request.data)['bio_info']
    hash_1, hash_2, did = generate_sha_and_did(id_info)
    hash3,hash4, did2 = generate_sha_and_did(bio_info)
    usid = uid()
    tup = (hash_1, hash_2,hash3,hash4, did, usid)
    print(tup)
    mapping_list=[]
    if os.path.exists('data/mappings.p'):
        mapping_list = pickle.load(open("data/mappings.p", "rb"))
    for mapping in mapping_list:
        if mapping[0] == hash_1 and mapping[1] == hash_2:
            return {"DID already generated": mapping[2], "UID":mapping[3]}
    mapping_list.append(tup)
    pickle.dump(mapping_list, open("data/mappings.p", "wb"))
    global mapping_list1
    mapping_list1=mapping_list
    return {"Generated UID": usid}  # changes done


@app.route('/verify', methods=['POST'])
def verify_registration():
    bio_info = json.loads(request.data)['bio_info']
    h3,h4,d= generate_sha_and_did(bio_info)
    found_mapping = None
    global mapping_list1
    hash_1 = None
    for mapping in mapping_list1:
        if (mapping[2] == h3 and mapping[3]== h4):
            found_mapping = mapping
            break

    if found_mapping:
        hash_1 = found_mapping[0]
        hash_2 = found_mapping[1]
        did = found_mapping[4]
        uid = found_mapping[5]
    else:
        print("No matching mapping found for the UID")
    mapping_list =[]
    if os.path.exists('data/mappings.p'):
        mapping_list = pickle.load(open("data/mappings.p", "rb"))
    else:
        return {"Response": "No ID registered yet"} 
    matched = False
    for mapping in mapping_list:
        if mapping[0] == hash_1 and mapping[1] == hash_2:
            did = mapping[2]
            matched = True
    if not matched:
        return {"Response": "UID not found"}
    if matched:
        q1, q2 = Queue(), Queue()
        threads = [
            Thread(target=client, args=(q1, q2, did)),
            Thread(target=server, args=(q2, q1)),
        ]
        for thread in threads:
            thread.start()

        timeout = 10  # Timeout value in seconds
        for thread in threads:
            thread.join(timeout)  # Wait for threads to finish or timeout

        if q1.get():
            return {"Verification Result": "Success"}
        else:
            return {"Verification Result": "Failure"}

    return {"Verification Result": "Failure"}

if __name__ == "__main__":
    print("PRAMAAN")
    
