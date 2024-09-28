from flask import Flask, render_template, request, redirect, url_for
from flask_socketio import SocketIO, send, emit
from datetime import timedelta, datetime
import os

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET')

socketio = SocketIO(app)

username = ''


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        global username
        username = request.form['username']
        return redirect(url_for('chatroom'))
    return render_template('index.html')


@app.route('/chatroom')
def chatroom():
    global username
    socketio.send(['join', username])
    return render_template('chatroom.html', username=username)


@socketio.on('message')
def message(data):
    time = datetime.now()+timedelta(hours=5, minutes=30)
    h = '0'+str(time.hour) if time.hour <= 9 else str(time.hour)
    m = '0'+str(time.minute) if time.minute <= 9 else str(time.minute)
    s = '0'+str(time.second) if time.second <= 9 else str(time.second)
    timestamp = f'{h}:{m}:{s}'
    socketio.send(['text', timestamp] + data)


if __name__ == '__main__':
    app.run()
