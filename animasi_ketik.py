from flask import Flask, Response, send_from_directory
import time

app = Flask(__name__, static_folder='.')

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/stream_message')
def stream_message():
    # The message you want typed (this is what your test.py prints)
    message = ("Wow, you've hit 100 cookie clicks. Looks like you liked cookies, "
               "would you like to make some cookies on your own using our recipe?")
    def generate():
        for ch in message:
            # SSE sends each character as a separate message
            yield f"data: {ch}\n\n"
            time.sleep(0.03)  # same pacing as your test.py
        # optional done event so client can close connection
        yield "event: done\ndata: 1\n\n"
    return Response(generate(), mimetype='text/event-stream')

@app.route('/<path:filename>')
def static_files(filename):
    return send_from_directory('.', filename)

if __name__ == '__main__':
    app.run(debug=True)
