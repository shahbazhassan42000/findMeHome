# FMH

To install the imported packages:

    pip install -r requirements.txt
    
To run:

    python server.py

Production:

     waitress-serve --listen=127.0.0.1:4000 wsgi:app


Docker build:

    docker build -t fmh-backend .

Docker run:

    docker run -p 4000:4000 fmh-backend

