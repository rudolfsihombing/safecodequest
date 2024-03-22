import os

basedir = os.path.abspath(os.path.dirname(__file__))

class AiConfig(object):
    OPENAI_API_KEY = str(os.environ.get("OPENAI_API_KEY"))