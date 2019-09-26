from flask import Flask
from flask import render_template

app = Flask(__name__)

@app.route('/')
@app.route('/hello')
def hello_world():
    return render_template('user.html')

@app.route('/projects')
def projects():
    return render_template('projects.html')