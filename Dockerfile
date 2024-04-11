FROM python:3.12.1-alpine

ENV PIP_DISABLE_PIP_VERSION_CHECK 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONBUFFERED 1

WORKDIR /app

RUN apk update && \
    apk add --no-cache python3-dev \
    gcc \
    musl-dev \
    libpq-dev

COPY pyproject.toml .

RUN python -m pip install --upgrade pip && \
    pip install poetry 

RUN poetry config virtualenvs.create false \
    && poetry install --no-root --no-interaction --no-ansi \
    && poetry add django-cors-headers \
    && poetry add django-3-jet
  
COPY . /app

CMD ["python", "school_feeding/manage.py", "runserver", "0.0.0.0:8000"]
# CMD ["sleep", "infinity"]