import uuid

from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.sites.models import Site
from django.db import models
from django.utils import timezone

User = get_user_model()

class Person(models.Model):
    name = models.CharField(max_length=30)


class UUIDModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    class Meta:
        abstract = True


class CreatableModel(models.Model):
    created = models.DateTimeField(default=timezone.now, editable=False)

    class Meta:
        abstract = True


class UpdateableModel(models.Model):
    updated = models.DateTimeField(null=True, blank=True, editable=False)

    def save(self, *args, **kwargs):
        if self.pk:
            self.updated = timezone.now()
        return super(UpdateableModel, self).save(*args, **kwargs)

    class Meta:
        abstract = True


class AbstractBaseModel(CreatableModel, UpdateableModel, UUIDModel):
    class Meta:
        abstract = True


class EmailMixin:
    @staticmethod
    def create_url(url):
        return '{}://{}/{}'.format(
            'http' if settings.DEBUG else 'https',
            Site.objects.get_current().domain,
            url
        )


class Fixture(UUIDModel):
    name = models.CharField(max_length=255, unique=True)

    class Meta:
        ordering = ['name']
        abstract = True

    def __repr__(self):
        return "<{}: {}>".format(type(self).__name__, self.name)

    def __str__(self):
        return self.name


class Region(Fixture):
    pass


class Interest(Fixture):
    pass


class Language(Fixture):
    pass


class EmailTag:
    ALL = 0
    UPDATES = 1
    CHOICES = (
        (ALL, 'All'),
        (UPDATES, 'Updates and New Features'),
    )


class EmailRecord(AbstractBaseModel):
    to = models.ForeignKey(User, on_delete=models.CASCADE)
    from_address = models.CharField(max_length=256)
    subject = models.CharField(max_length=256)
    text_content = models.TextField()

    def __str__(self):
        return '{} sent to {}'.format(self.subject, self.to)
