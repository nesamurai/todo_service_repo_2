DEBUG = False

ALLOWED_HOSTS = ['*']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'tudu_service',
        'USER': 'anton',
        'PASSWORD': 'fqrbljrf',
        'HOST': 'db',
        'PORT': '5432'
    }
}
