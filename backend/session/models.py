from django.db import models
from django.contrib.auth.models import User
from subject.models import Subject
# Create your models here.

class Session(models.Model):
    date = models.DateField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)