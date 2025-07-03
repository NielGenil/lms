from django.db import models
from activity.models import Activity
from django.contrib.auth.models import User
# Create your models here.
class ActivitySubmission(models.Model):
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE)
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    answer = models.TextField()
    file = models.FileField(null=True, blank=True)