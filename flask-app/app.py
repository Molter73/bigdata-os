#!/usr/bin/env python3

from flask import Flask

app = Flask(__name__)


@app.route('/')
def hello():
    return 'Hola Mundo desde Docker!'


if __name__ == '__main__':
    app.run(host='0.0.0.0')
