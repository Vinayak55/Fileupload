from django.db import models

# Create your models here.
class Fileupload(models.Model):
    title = models.CharField(max_length=100)
    image = models.FileField(upload_to='files')
    
    def __str__(self):
        return self.title