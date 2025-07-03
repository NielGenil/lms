from django.db import models
from django.contrib.auth.models import User
from activity.models import Activity
# Create your models here.
class ActivityScore(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.IntegerField()
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE)