FROM python:3.11.3
WORKDIR /backend
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
EXPOSE 4000
COPY ../backend_ .
CMD ["waitress-serve", "--listen=127.0.0.1:4000", "wsgi:app"]
