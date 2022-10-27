#
FROM python:3.9.4-slim
#
WORKDIR /app
#
COPY ./app /apps
COPY ./requirements.txt .
COPY pip.conf /etc/pip.conf
#
RUN pip install --no-cache-dir --upgrade -r ./requirements.txt
RUN pip install --upgrade pip
RUN pip install python-multipart

EXPOSE 8000
#
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]