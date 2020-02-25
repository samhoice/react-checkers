FROM python:3
ENV PYTHONUNBUFFERED 1
RUN apt-get install -y default-libmysqlclient-dev
RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
COPY . /code/
