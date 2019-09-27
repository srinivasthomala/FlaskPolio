from flask import Flask
from flask import render_template

app = Flask(__name__)

@app.route('/')
def user():
    return render_template('user.html')

@app.route('/resume')
def resume():
    return render_template('resume.html')

@app.route('/projects')
def projects():
    return render_template('projects.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')
