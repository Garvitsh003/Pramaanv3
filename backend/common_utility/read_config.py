import json

CONFIG_FILE_PATH = "backend/config/config.json"


def read_config():
    config_file = open(CONFIG_FILE_PATH)
    return json.load(config_file)
