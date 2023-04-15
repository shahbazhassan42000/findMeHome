from backend_.findMeHome import app
import os

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 4000))
    app.run('0.0.0.0', port=port,threaded=True,debug=True)
