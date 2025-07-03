from django.db import models
from django.contrib.auth.models import User
from subject.models import Subject

# Create your models here.
class Section(models.Model):
    name = models.CharField(max_length=100)
    school_year = models.CharField(max_length=12)
    student = models.ManyToManyField(User)
    subjects = models.ManyToManyField(Subject)