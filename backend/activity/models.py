from django.db import models
from session.models import Session
# Create your models here.
class Activity(models.Model):
    name = models.CharField(max_length=50)
    hps = models.IntegerField()
    description = models.TextField()
    session = models.ForeignKey(Session, on_delete=models.CASCADE)
    file = models.FileField(null=True, blank=True)